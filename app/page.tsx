export default function Home() {
  return (
    <main className="flex flex-col items-center text-center gap-10 py-20">
      <h1 className="text-4xl font-bold text-gray-900">
        مرحبًا بك في منصة أعمالي
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl">
        نظام ERP شامل لإدارة المبيعات، المحاسبة، الفواتير، إدارة المخزون، وكل
        ما تحتاجه لتسيير أعمالك باحترافية.
      </p>

      <a
        href="/dashboard"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition"
      >
        الانتقال إلى لوحة التحكم
      </a>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-xl font-bold mb-2">المحاسبة</h3>
          <p className="text-gray-600">
            إدارة النقد، الحسابات، البنود، الفواتير، والتقارير المالية.
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-xl font-bold mb-2">المبيعات</h3>
          <p className="text-gray-600">
            إنشاء وتتبع المبيعات والمشتريات والعملاء بسهولة.
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-xl font-bold mb-2">المخزون</h3>
          <p className="text-gray-600">
            إدارة وتتبع المخزون، التوريد، التخزين، والحركة.
          </p>
        </div>
      </section>
    </main>
  );
}
