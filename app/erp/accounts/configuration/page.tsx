import { FiLayers, FiGitBranch, FiList } from "react-icons/fi";

export default function ConfigurationDashboard() {
  const items = [
    {
      title: "شجرة الحسابات",
      description: "إدارة الحسابات التجميعية والتفصيلية.",
      icon: <FiLayers size={26} />,
      href: "/erp/accounts/configuration/chart-of-accounts",
    },
    {
      title: "مراكز التكلفة",
      description: "إدارة مراكز التكلفة وربطها بالحسابات.",
      icon: <FiGitBranch size={26} />,
      href: "/erp/accounts/configuration/cost-centers",
    },
    {
      title: "أنواع الحسابات",
      description: "تصنيف الحسابات حسب النوع المحاسبي.",
      icon: <FiList size={26} />,
      href: "/erp/accounts/configuration/account-types",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">قسم التهيئة</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="p-6 border rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4"
          >
            <div className="text-green-600 dark:text-green-400">{item.icon}</div>

            <div className="text-right flex-1">
              <h2 className="font-semibold text-xl">{item.title}</h2>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
