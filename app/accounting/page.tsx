export default function AccountingHome() {
  return (
    <div className="space-y-6">

      {/* عنوان الوحدة */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-50 mb-1">
          إدارة الحسابات
        </h1>
        <p className="text-sm text-gray-400">
          نظرة عامة على عمليات الحسابات في منصتك.
        </p>
      </div>

      {/* بطاقات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold text-gray-200 mb-1">المدخلات</h3>
          <p className="text-gray-400 text-sm">
            العمليات المحاسبية الأساسية التي تبدأ بها الدورة المالية.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold text-gray-200 mb-1">المعالجة</h3>
          <p className="text-gray-400 text-sm">
            تحويل البيانات إلى قيود وتقارير مالية.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold text-gray-200 mb-1">التقارير</h3>
          <p className="text-gray-400 text-sm">
            عرض النتائج المالية بشكل احترافي وواضح.
          </p>
        </div>
      </div>

    </div>
  );
}
