export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-8 mt-20">

      <h1 className="text-4xl font-bold text-gray-800">
        مرحبًا بك في منصة أعمالي
      </h1>

      <p className="text-lg text-gray-600 max-w-xl">
        نظام ERP محاسبي متكامل يساعدك على إدارة الحسابات، الفواتير، العملاء، المخزون،
        والتقارير المالية بسهولة واحترافية.
      </p>

      <a
        href="/dashboard"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition"
      >
        الانتقال إلى لوحة التحكم
      </a>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-bold mb-2">الحسابات</h3>
          <p className="text-gray-600">إدارة شجرة الحسابات والقيود اليومية.</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-bold mb-2">الفواتير</h3>
          <p className="text-gray-600">إنشاء فواتير المبيعات والمشتريات بسهولة.</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-bold mb-2">التقارير</h3>
          <p className="text-gray-600">تحليل الأداء المالي عبر تقارير دقيقة.</p>
        </div>

      </div>
    </div>
  );
}
