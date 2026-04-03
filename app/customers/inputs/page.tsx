export default function CustomersInputsPage() {
  const companyId = "demo-company";

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">مدخلات العملاء</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">

        <div>
          <label className="block mb-1 font-medium">اسم العميل</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">اسم الشركة</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">رقم الجوال</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">الرقم الضريبي (VAT)</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">البريد الإلكتروني</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">الدولة</label>
          <input className="border rounded px-3 py-2 w-full" defaultValue="السعودية" />
        </div>

        <div>
          <label className="block mb-1 font-medium">المدينة</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">العنوان</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">اسم البنك</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">رقم الحساب</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">اسم المسؤول</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">رقم المسؤول</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">الموقع الإلكتروني</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">السجل التجاري</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">رقم الآيبان (IBAN)</label>
          <input className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">حد الائتمان</label>
          <input type="number" className="border rounded px-3 py-2 w-full" />
        </div>

        <div className="flex items-center gap-2">
          <input id="is_active" type="checkbox" className="h-4 w-4" defaultChecked />
          <label htmlFor="is_active">نشط</label>
        </div>

      </div>
    </div>
  );
}
