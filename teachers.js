// teachers.js
// قائمة المدرسين الثمانية - مشترك بين كل الصفحات
// كل مدرس له id ثابت يُستخدم في users.teacherId و courses.teacherId

const TEACHERS = [
  { id: "t1", name: "أ. أيمن صابر",     subject: "كبير معلمي اللغة العربية" },
  { id: "t2", name: "أ. أحمد الزيات ",   subject: "العلوم والرياضيات (ابتدائي) والرياضيات (إعدادي)" },
  { id: "t3", name: "أ. رامي جاويش",    subject: "الدراسات الاجتماعية والتاريخ" },
  { id: "t4", name: "أ. رامي أبو نور",  subject: "الدراسات الاجتماعية والتاريخ" },
  { id: "t5", name: "أ. علاء أبو حلاوة", subject: "العلوم والعلوم المتكاملة" },
  { id: "t6", name: "أ. محمد مكي",      subject: "الرياضيات (إعدادي وثانوي)" },
  { id: "t7", name: "أ. محمد الإبياوي", subject: "اللغة الإنجليزية (إعدادي وثانوي)" },
  { id: "t8", name: "أ. محمد سلطان",  subject: "اللغة الإنجليزية (ابتدائي وإعدادي)" }
];

function getTeacherName(id){
  const t = TEACHERS.find(x=> x.id === id);
  return t ? t.name : '';
}
