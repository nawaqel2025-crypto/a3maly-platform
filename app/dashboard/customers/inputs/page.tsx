export default function CustomersInputsPage() {
  const companyId = "demo-company";

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">»Ì«‰«  «·⁄„·«¡</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">

        <div>
          <label className="block mb-1 font-medium">ﬂÊœ «·⁄„Ì·</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«”„ «·⁄„Ì·</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·«”„ »«·⁄—»Ì…</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·—ﬁ„ «·÷—Ì»Ì (VAT)</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·”Ã· «· Ã«—Ì</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·œÊ·…</label>
          <input className="border rounded px-3 py-2 w-full" defaultValue="«·”⁄ÊœÌ…" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·„œÌ‰…</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·ÕÌ</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«”„ «·‘«—⁄</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">—ﬁ„ «·„»‰Ï</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·—„“ «·»—ÌœÌ</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·—ﬁ„ «·≈÷«›Ì</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·ÃÊ«·</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·»—Ìœ «·≈·ﬂ —Ê‰Ì</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·¬Ì»«‰ (IBAN)</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">«·Õœ «·«∆ „«‰Ì</label>
          <input type="number" className="border rounded px-3 py-2 w-full" />
        </div>

        <div className="flex items-center gap-2">
          <input id="is_active" type="checkbox" className="h-4 w-4" defaultChecked />
          <label htmlFor="is_active">‰‘ÿ</label>
        </div>

      </div>
    </div>
  );
}
