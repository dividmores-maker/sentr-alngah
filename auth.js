// auth.js
// منطق التسجيل / تسجيل الدخول / الخروج / حماية الصفحات
// يعتمد على firebase-init.js (يجب تحميله قبل هذا الملف)

const USERS_COLLECTION = "users";

/**
 * إنشاء حساب طالب جديد
 * @param {Object} data { name, phone, grade, teacherId, password, realEmail }
 */
async function registerStudent(data) {
  const { name, phone, grade, teacherId, password, realEmail } = data;
  const email = phoneToEmail(phone);

  // Firebase Auth نفسه هيرفض لو الإيميل (المبني من رقم الهاتف) مستخدم بالفعل
  // عبر خطأ auth/email-already-in-use، فمش محتاجين نقرأ من Firestore قبل تسجيل الدخول
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  const uid = cred.user.uid;

  const teacherName = (typeof getTeacherName === 'function') ? getTeacherName(teacherId) : '';
  let linkedEmail = '';
  let emailLinkFailed = false;

  // لو الطالب كتب إيميل حقيقي، نربطه (link) بنفس الحساب كوسيلة دخول إضافية
  // ده يسمح باستخدام "نسيت كلمة المرور" عبر هذا الإيميل لاحقًا، مع بقاء تسجيل الدخول بالهاتف شغال
  if (realEmail && realEmail.trim()) {
    try {
      const emailCred = firebase.auth.EmailAuthProvider.credential(realEmail.trim(), password);
      await cred.user.linkWithCredential(emailCred);
      linkedEmail = realEmail.trim();
    } catch (linkErr) {
      // لو فشل الربط (مثلاً الإيميل مستخدم بحساب تاني) لا نخزن الإيميل
      // عشان "نسيت كلمة المرور" ما توعدش بحاجة غير متاحة فعليًا
      console.warn("تعذر ربط الإيميل الحقيقي:", linkErr.message);
      emailLinkFailed = true;
    }
  }

  await db.collection(USERS_COLLECTION).doc(uid).set({
    name: name.trim(),
    phone: phone.trim(),
    grade: grade.trim(),
    teacherId: teacherId || '',
    teacherName: teacherName,
    realEmail: linkedEmail,
    role: "student",
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    avatar: "🎓"
  });

  return { uid, emailLinkFailed };
}

/**
 * تسجيل دخول طالب أو أدمن برقم الهاتف وكلمة المرور
 */
async function loginWithPhone(phone, password) {
  const email = phoneToEmail(phone);
  const cred = await auth.signInWithEmailAndPassword(email, password);
  return cred.user;
}

async function logout() {
  await auth.signOut();
  // لو كنا في صفحة من صفحات الأدمن، رجّع لصفحة دخول المدرسين، وإلا رجّع لصفحة الطلاب
  const isAdminPage = window.location.pathname.includes('admin');
  window.location.href = isAdminPage ? "admin-login.html" : "index.html";
}

/**
 * إرسال لينك إعادة تعيين كلمة المرور للطالب بناءً على رقم هاتفه
 * يبحث عن الإيميل الحقيقي المرتبط بالحساب في Firestore، ولو موجود يبعت لينك Firebase الرسمي عليه
 * @param {string} phone
 * @returns {Promise<string>} الإيميل اللي تم الإرسال له (لإظهاره للطالب)
 */
async function sendResetLinkByPhone(phone) {
  const trimmedPhone = phone.trim();
  const snap = await db.collection(USERS_COLLECTION)
    .where("phone", "==", trimmedPhone)
    .limit(1)
    .get();

  if (snap.empty) {
    throw { code: "custom/phone-not-found", message: "لا يوجد حساب مسجل بهذا رقم الهاتف." };
  }

  const userData = snap.docs[0].data();
  const realEmail = userData.realEmail;

  if (!realEmail) {
    throw {
      code: "custom/no-email-linked",
      message: "لا يوجد إيميل احتياطي مسجل لهذا الحساب. تواصل مع الإدارة لإعادة ضبط كلمة المرور."
    };
  }

  await auth.sendPasswordResetEmail(realEmail);
  return realEmail;
}

/**
 * جلب بيانات المستخدم من Firestore
 */
async function getUserProfile(uid) {
  const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

/**
 * حماية الصفحة: يستخدم في كل الصفحات الداخلية
 * - لو المستخدم مش مسجل دخول -> يرجعه لصفحة الدخول المناسبة (admin-login.html لصفحات الأدمن، index.html لصفحات الطالب)
 * - requiredRole: لو محدد ("admin") ولم تتطابق -> يرجعه لـ dashboard.html
 * @param {function} callback يستقبل (user, profile)
 */
function requireAuth(callback, requiredRole) {
  const isAdminPage = window.location.pathname.includes('admin');
  const loginPage = isAdminPage ? "admin-login.html" : "index.html";

  // منع أي redirect قبل ما Firebase يرجع الـ auth state الحقيقي
  let resolved = false;

  auth.onAuthStateChanged(async (user) => {
    resolved = true;

    if (!user) {
      window.location.href = loginPage;
      return;
    }
    const profile = await getUserProfile(user.uid);
    if (!profile) {
      await logout();
      return;
    }
    if (requiredRole && profile.role !== requiredRole) {
      window.location.href = "dashboard.html";
      return;
    }
    callback(user, profile);
  });

  // لو Firebase اتأخر أكتر من 8 ثواني من غير ما يرجع state -> روح للـ login
  setTimeout(() => {
    if (!resolved) {
      window.location.href = loginPage;
    }
  }, 8000);
}

/**
 * ترجمة أكواد أخطاء Firebase لرسائل عربية مفهومة
 */
function translateAuthError(error) {
  const code = error.code || "";
  const map = {
    "auth/email-already-in-use": "رقم الهاتف ده مسجل بالفعل.",
    "auth/invalid-email": "رقم الهاتف غير صحيح.",
    "auth/weak-password": "كلمة المرور لازم تكون 6 أحرف على الأقل.",
    "auth/user-not-found": "الحساب غير موجود، تأكد من رقم الهاتف.",
    "auth/wrong-password": "كلمة المرور غير صحيحة.",
    "auth/invalid-credential": "رقم الهاتف أو كلمة المرور غير صحيحة.",
    "auth/too-many-requests": "محاولات كثيرة، حاول بعد قليل.",
    "custom/phone-not-found": "لا يوجد حساب مسجل بهذا رقم الهاتف.",
    "custom/no-email-linked": "لا يوجد إيميل احتياطي مسجل لهذا الحساب. تواصل مع الإدارة لإعادة ضبط كلمة المرور."
  };
  return map[code] || error.message || "حدث خطأ غير متوقع.";
}
