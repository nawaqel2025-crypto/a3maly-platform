import { FiLayers, FiGitBranch, FiList } from "react-icons/fi";
import Link from "next/link";
import Card from "@/components/ui/card";

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
    <div className="space-y-6" dir="rtl">
      <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">قسم التهيئة</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="block"
          >
            <Card className="flex items-center gap-4 transition hover:bg-[var(--a3-background)]">
              <div className="text-[var(--a3-primary)]">{item.icon}</div>
              <div className="flex-1 text-right">
                <h2 className="text-[20px] font-semibold">{item.title}</h2>
                <p className="text-[14px] text-[var(--a3-text-secondary)]">{item.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
