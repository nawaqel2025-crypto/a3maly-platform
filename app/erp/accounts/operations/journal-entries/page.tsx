export default function JournalEntriesPage() {
  const entries = [
    {
      id: 1,
      date: "2026-04-13",
      description: "قيد افتتاحي",
      status: "مسودة",
      amount: 15000,
    },
    {
      id: 2,
      date: "2026-04-12",
      description: "قيد قبض من عميل",
      status: "مرحّل",
      amount: 3200,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">قيود اليومية</h1>

        <a
          href="/erp/accounts/operations/journal-entries/new"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          إنشاء قيد جديد
        </a>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3">رقم القيد</th>
              <th className="p-3">التاريخ</th>
              <th className="p-3">الوصف</th>
              <th className="p-3">الحالة</th>
              <th className="p-3">المبلغ</th>
              <th className="p-3">إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-3">{e.id}</td>
                <td className="p-3">{e.date}</td>
                <td className="p-3">{e.description}</td>
                <td className="p-3">{e.status}</td>
                <td className="p-3">{e.amount.toLocaleString()}</td>
                <td className="p-3">
                  <a
                    href={`/erp/accounts/operations/journal-entries/${e.id}`}
                    className="text-green-600 hover:underline"
                  >
                    عرض التفاصيل
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
