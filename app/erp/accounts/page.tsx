import { FiSettings, FiLayers, FiActivity, FiBarChart2 } from "react-icons/fi";
import Link from "next/link";
import Card from "@/components/ui/card";

export default function AccountsDashboard() {
  const sections = [
    {
      title: "الإعدادات",
      description: "الفترات المالية، العملات، الفروع.",
      icon: <FiSettings size={28} />,
      href: "/erp/accounts/settings",
    },
    {
      title: "التهيئة",
      description: "شجرة الحسابات، مراكز التكلفة، أنواع الحسابات.",
      icon: <FiLayers size={28} />,
      href: "/erp/accounts/configuration",
    },
    {
      title: "العمليات",
      description: "قيود اليومية، سندات القبض والصرف.",
      icon: <FiActivity size={28} />,
      href: "/erp/accounts/operations",
    },
    {
      title: "التقارير",
      description: "ميزان المراجعة، الأستاذ العام، التدفقات النقدية.",
      icon: <FiBarChart2 size={28} />,
      href: "/erp/accounts/reports",
    },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">وحدة الحسابات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec) => (
          <Link
            key={sec.title}
            href={sec.href}
            className="block"
          >
            <Card className="flex items-center gap-4 transition hover:bg-[var(--a3-background)]">
              <div className="text-[var(--a3-primary)]">{sec.icon}</div>
              <div className="flex-1 text-right">
                <h2 className="text-[20px] font-semibold">{sec.title}</h2>
                <p className="text-[14px] text-[var(--a3-text-secondary)]">{sec.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
