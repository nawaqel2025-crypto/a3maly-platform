export default function ERPModules() {
  const modules = [
    { name: "الحسابات", path: "/erp/accounts" },
    { name: "العملاء", path: "/erp/customers" },
    { name: "الموردين", path: "/erp/vendors" },
    { name: "المبيعات", path: "/erp/sales" },
    { name: "المشتريات", path: "/erp/purchasing" },
    { name: "المخزون", path: "/erp/inventory" },
    { name: "المشاريع", path: "/erp/projects" },
    { name: "الموارد البشرية", path: "/erp/hr" },
    { name: "التحليل المالي", path: "/erp/financial-analytics" },
    { name: "النمذجة المالية", path: "/erp/financial-modeling" },
    { name: "إدارة النظام", path: "/erp/system-admin" },
    { name: "تهيئة النظام", path: "/erp/system-config" },
  ];

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10 text-right">A3MALY ERP — الوحدات الأساسية</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {modules.map((m) => (
          <a
            key={m.path}
            href={m.path}
            className="p-6 rounded-xl border bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition cursor-pointer text-right"
          >
            <h2 className="text-xl font-semibold">{m.name}</h2>
            <p className="text-gray-500 mt-2">الدخول إلى وحدة {m.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
