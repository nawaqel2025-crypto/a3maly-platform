"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center text-center gap-16 py-20 px-6">

      {/* العنوان الرئيسي */}
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

      {/* الأقسام الرئيسية */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">

        <FeatureCard
          title="المحاسبة"
          desc="إدارة الحسابات، القيود اليومية، دفتر الأستاذ، ميزان المراجعة، التقارير المالية."
        />

        <FeatureCard
          title="العملاء"
          desc="إدارة العملاء، أرصدتهم، فواتيرهم، مدفوعاتهم، وتتبع تعاملاتهم المالية."
        />

        <FeatureCard
          title="الموردين"
          desc="إدارة الموردين، أرصدتهم، فواتير الشراء، وسندات الصرف."
        />

        <FeatureCard
          title="المبيعات"
          desc="إنشاء عروض الأسعار، أوامر البيع، الفواتير، وتتبع التحصيل."
        />

        <FeatureCard
          title="المخزون"
          desc="إدارة المنتجات، الكميات، المستودعات، حركة المخزون، وتنبيهات النقص."
        />

        <FeatureCard
          title="المشاريع"
          desc="إدارة المشاريع، المهام، التكاليف، الأرباح، وتتبع الأداء."
        />

        <FeatureCard
          title="التقارير المالية"
          desc="قائمة الدخل، المركز المالي، التدفقات النقدية، تقارير مخصصة."
        />

        <FeatureCard
          title="التحليل المالي"
          desc="مؤشرات الأداء، الربحية، السيولة، النمو، وتحليل الاتجاهات."
        />

        <FeatureCard
          title="الفوترة"
          desc="إنشاء الفواتير، إرسالها للعملاء، تتبع المدفوعات، وإدارة الضرائب."
        />

      </section>
    </main>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-xl text-right hover:shadow-md transition">
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

