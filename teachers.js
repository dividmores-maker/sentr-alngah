// teachers.js
// قائمة المدرسين الثمانية - مشترك بين كل الصفحات
// كل مدرس له id ثابت يُستخدم في users.teacherId و courses.teacherId

const TEACHERS = [
  { id: "t1", name: "أ. أيمن صابر" },
  { id: "t2", name: "أ. أحمد الزياد" },
  { id: "t3", name: "أ. رامي جاويش" },
  { id: "t4", name: "أ. رامي أبو نور" },
  { id: "t5", name: "أ. علاء أبو حلاوة" },
  { id: "t6", name: "أ. محمد مكي" },
  { id: "t7", name: "أ. محمد الإبياوي" },
  { id: "t8", name: "أ. محمد السلطان" }
];

function getTeacherName(id){
  const t = TEACHERS.find(x=> x.id === id);
  return t ? t.name : '';
}
