"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center text-center gap-16 py-20 px-6">

      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          مرحبًا بك في <span className="text-blue-600">منصة أعمالي</span>
        </h1>

        <p className="text-lg text-gray-600 mt-4">
          نظام ERP حديث لإدارة المحاسبة، المبيعات، العملاء، الموردين، المخزون، المشاريع،
          التقارير المالية، والتحليل المالي — كل ما تحتاجه لإدارة أعمالك باحترافية.
        </p>

        <a
          href="/dashboard"
          className="inline-block mt-8 bg-blue-600 text-white px-10 py-4 rounded-xl text-lg shadow hover:bg-blue-700 transition"
        >
          الانتقال إلى لوحة التحكم
        </a>
      </div>

    </main>
  );
}
