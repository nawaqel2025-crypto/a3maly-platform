import { useInventory } from "@/hooks/useInventory";

export default function InventoryBalancesReport() {
  const companyId = "demo-company";
  const { items, loading } = useInventory(companyId);

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4"> ﬁ—Ì— √—’œ… «·„Œ“Ê‰</h1>

      {loading ? (
        <p>Ã«—Ì  Õ„Ì· «·»Ì«‰« ...</p>
      ) : (
        <table className="w-full border text-right text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">«·ﬂÊœ</th>
              <th className="border px-2 py-1">«·«”„</th>
              <th className="border px-2 py-1">«·ÊÕœ…</th>
              <th className="border px-2 py-1">«·—’Ìœ</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">{item.code}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.unit}</td>
                <td className="border px-2 py-1">{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
