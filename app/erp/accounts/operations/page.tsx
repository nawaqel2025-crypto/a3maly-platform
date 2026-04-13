import { FiEdit3, FiArrowDownCircle, FiArrowUpCircle, FiShuffle } from "react-icons/fi";

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">قسم العمليات</h1>

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
