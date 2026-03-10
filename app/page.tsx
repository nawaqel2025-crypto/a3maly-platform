export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-8 mt-20">
      <h1 className="text-4xl font-bold text-gray-800">
        مرحبًا بك في منصة أعمال
      </h1>

      <p className="text-lg text-gray-600 max-w-xl">
        محاسبة، تكامل، مالي، إدارة، احتياجات، التوزيع، ERP، تقارير، سهلة، مفصلة، واحترافية
      </p>

      <a
        href="/dashboard"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition"
      >
        ابدأ الآن، لوحة التحكم
      </a>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-bold mb-2">محاسبة</h3>
          <p className="text-gray-600">إدارة القيود، الحسابات، البنود اليومية</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-bold mb-2">المبيعات</h3>
          <p className="text-gray-600">إنشاء فواتير المبيعات والمشتريات</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-bold mb-2">الأداء</h3>
          <p className="text-gray-600">تحليل الأداء بشكل احترافي</p>
        </div>
      </div>
    </div>
  );
}
