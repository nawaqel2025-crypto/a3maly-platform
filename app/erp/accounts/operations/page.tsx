import { FiEdit3, FiArrowDownCircle, FiArrowUpCircle, FiShuffle } from "react-icons/fi";
import Link from "next/link";
import Card from "@/components/ui/card";

export default function OperationsDashboard() {
  const items = [
    {
      title: "قيود اليومية",
      description: "إنشاء وتعديل وترحيل قيود اليومية.",
      icon: <FiEdit3 size={26} />,
      href: "/erp/accounts/operations/journal-entries",
    },
    {
      title: "سندات القبض",
      description: "إدارة عمليات القبض النقدي والبنكي.",
      icon: <FiArrowDownCircle size={26} />,
      href: "/erp/accounts/operations/vouchers/receipt",
    },
    {
      title: "سندات الصرف",
      description: "إدارة عمليات الصرف النقدي والبنكي.",
      icon: <FiArrowUpCircle size={26} />,
      href: "/erp/accounts/operations/vouchers/payment",
    },
    {
      title: "التحويلات المالية",
      description: "تحويلات بين الحسابات أو الفروع.",
      icon: <FiShuffle size={26} />,
      href: "/erp/accounts/operations/transfers",
    },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">قسم العمليات</h1>

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
