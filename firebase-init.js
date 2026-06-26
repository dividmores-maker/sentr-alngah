// firebase-init.js
// تهيئة Firebase - يستخدم في كل صفحات المنصة
// لازم يتم تحميل سكريبتات Firebase compat قبل هذا الملف:
// <script src="https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.13.0/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore-compat.js"></script>

const firebaseConfig = {
  apiKey: "AIzaSyBFBEMmbjD7ecKkyop04o-e6oLGHkxYehc",
  authDomain: "alngah-fa16d.firebaseapp.com",
  projectId: "alngah-fa16d",
  storageBucket: "alngah-fa16d.firebasestorage.app",
  messagingSenderId: "516921926820",
  appId: "1:516921926820:web:bfcfbbdeba4ae73111b231"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// نطاق بريد إلكتروني وهمي لتحويل رقم الهاتف إلى صيغة بريد (Firebase Auth يحتاج بريد)
const PHONE_EMAIL_DOMAIN = "alngah-students.app";

function phoneToEmail(phone) {
  return phone.trim() + "@" + PHONE_EMAIL_DOMAIN;
}
