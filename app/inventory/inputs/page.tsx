import { INVENTORY_VALUATION_METHODS } from "@/constants/inventory";

export default function InventoryInputsPage() {
  const companyId = "demo-company";

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">مدخلات المخزون</h1>

      <div className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-medium">طريقة تقييم المخزون</label>
          <select className="border rounded px-3 py-2 w-full">
            {INVENTORY_VALUATION_METHODS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input id="allow_negative" type="checkbox" className="h-4 w-4" />
          <label htmlFor="allow_negative">السماح برصيد سالب</label>
        </div>
      </div>
    </div>
  );
}
