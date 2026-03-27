"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewInvoicePage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [invoice, setInvoice] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب بيانات الفاتورة
  useEffect(() => {
    async function load() {
      const inv = await fetch(`/api/sales/invoices/${id}`).then((r) => r.json());
      const its = await fetch(`/api/sales/invoice-items/${id}`).then((r) => r.json());

      setInvoice(inv);
      setItems(its);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="p-6">جاري التحميل...</div>;

  if (!invoice) return <div className="p-6">لم يتم العثور على الفاتورة</div>;

  // حذف الفاتورة
  const deleteInvoice = async () => {
    if (!confirm("هل أنت متأكد من حذف الفاتورة؟")) return;

    await fetch(`/api/sales/invoices/${id}`, {
      method: "DELETE",
    });

    alert("تم حذف الفاتورة");
    router.push("/dashboard/sales/invoices");
  };

  // طباعة PDF
  const printPDF = () => {
    window.print();
  };

  return (
    <div className="p-6" dir="rtl">
      {/* العنوان + الأزرار */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          عرض الفاتورة #{invoice.invoice_number}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/dashboard/sales/invoices/${id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            تعديل
          </button>

          <button
            onClick={printPDF}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            طباعة PDF
          </button>

          <button
            onClick={deleteInvoice}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            حذف
          </button>
        </div>
      </div>

      {/* بيانات الفاتورة */}
      <div className="grid grid-cols-2 gap-6 mb-8 max-w-3xl">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">العميل:</span>
            <span>{invoice.customer_id}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">تاريخ الفاتورة:</span>
            <span>{invoice.invoice_date}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">الملاحظات:</span>
            <span>{invoice.notes || "—"}</span>
          </div>
        </div>
      </div>

      {/* جدول الأصناف */}
      <h2 className="text-xl font-bold mb-2">أصناف الفاتورة</h2>

      <table className="w-full border text-right text-sm mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">الصنف</th>
            <th className="border px-2 py-1">الكمية</th>
            <th className="border px-2 py-1">السعر</th>
            <th className="border px-2 py-1">الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{row.item_id}</td>
              <td className="border px-2 py-1">{row.qty}</td>
              <td className="border px-2 py-1">{row.price}</td>
              <td className="border px-2 py-1">{row.line_total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* الإجماليات */}
      <div className="max-w-md ml-auto text-right space-y-2">
        <div className="flex justify-between">
          <span>إجمالي الأصناف:</span>
          <span>{invoice.subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>ضريبة القيمة المضافة:</span>
          <span>{invoice.vat}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>الإجمالي النهائي:</span>
          <span>{invoice.total}</span>
        </div>
      </div>
    </div>
  );
}
