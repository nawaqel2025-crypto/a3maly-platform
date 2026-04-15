import Link from "next/link";
import Card from "@/components/ui/card";

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
    <div className="p-10" dir="rtl">
      <h1 className="mb-10 text-right text-[32px] font-bold text-[var(--a3-text-primary)]">A3MALY ERP — الوحدات الأساسية</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {modules.map((m) => (
          <Link
            key={m.path}
            href={m.path}
            className="block"
          >
            <Card className="cursor-pointer text-right transition hover:bg-[var(--a3-background)]">
              <h2 className="text-[20px] font-semibold">{m.name}</h2>
              <p className="mt-2 text-[14px] text-[var(--a3-text-secondary)]">الدخول إلى وحدة {m.name}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
