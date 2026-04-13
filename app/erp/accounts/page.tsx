import { FiSettings, FiLayers, FiActivity, FiBarChart2 } from "react-icons/fi";

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">وحدة الحسابات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec) => (
          <a
            key={sec.title}
            href={sec.href}
            className="p-6 border rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4"
          >
            <div className="text-green-600 dark:text-green-400">{sec.icon}</div>

            <div className="text-right flex-1">
              <h2 className="font-semibold text-xl">{sec.title}</h2>
              <p className="text-gray-500 text-sm">{sec.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
