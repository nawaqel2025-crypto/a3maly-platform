export function helpCommand() {
  console.log(`
A3MALY ENGINE CLI — Commands:

  a3maly scan              فحص المشروع بالكامل
  a3maly fix               إصلاح الأخطاء والمسارات
  a3maly generate module X توليد وحدة ERP كاملة
  a3maly regen             إعادة بناء المشروع بالكامل
  a3maly doctor            تقرير شامل عن صحة المشروع
  a3maly help              عرض هذه القائمة
`);
}
