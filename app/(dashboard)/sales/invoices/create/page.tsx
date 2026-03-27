"use client";

import { useState, useEffect } from "react";

export default function CreateInvoicePage() {
  const companyId = "demo-company";

  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch(`/api/customers?companyId=${companyId}`)
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  useEffect(() => {
    fetch(`/api/inventory/items?companyId=${companyId}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const addItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { item_id: "", qty: 1, price: 0, total: 0 },
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...invoiceItems];
    updated[index][field] = value;

    if (field === "qty" || field === "price") {
      updated[index].total =
        (parseFloat(updated[index].qty) || 0) *
        (parseFloat(updated[index].price) || 0);
    }

    setInvoiceItems(updated);
  };

  const subtotal = invoiceItems.reduce((sum, i) => sum + (i.total || 0), 0);
  const vat = subtotal * 0.15;
  const grandTotal = subtotal + vat;

  const saveInvoice = async () => {
    const payload = {
      company_id: companyId,
      customer_id: selectedCustomer,
      invoice_date: invoiceDate,
      notes,
      subtotal,
      vat,
      total: grandTotal,
      items: invoiceItems,
    };

    const res = await fetch("/api/sales/invoices", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok) {
      alert("تم حفظ الفاتورة بنجاح");
    } else {
      alert("خطأ: " + JSON.stringify(result.error));
    }
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">إنشاء فاتورة جديدة</h1>

      {/* بيانات الفاتورة */}
      <div className="space-y-4 max-w-2xl mb-6">
        <div>
          <label className="block mb-1 font-medium">العميل</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">اختر العميل</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">تاريخ الفاتورة</label>
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">ملاحظات</label>
          <textarea
            className="border rounded px-3 py-2 w-full"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      {/* أصناف الفاتورة */}
      <h2 className="text-xl font-bold mb-2">أصناف الفاتورة</h2>

      <button
        onClick={addItem}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + إضافة صنف
      </button>

      <table className="w-full border text-right text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">الصنف</th>
            <th className="border px-2 py-1">الكمية</th>
            <th className="border px-2 py-1">السعر</th>
            <th className="border px-2 py-1">الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((row, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={row.item_id}
                  onChange={(e) =>
                    updateItem(index, "item_id", e.target.value)
                  }
                >
                  <option value="">اختر الصنف</option>
                  {items.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </td>

              <td className="border px-2 py-1">
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={row.qty}
                  onChange={(e) => updateItem(index, "qty", e.target.value)}
                />
              </td>

              <td className="border px-2 py-1">
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={row.price}
                  onChange={(e) => updateItem(index, "price", e.target.value)}
                />
              </td>

              <td className="border px-2 py-1">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* إجماليات */}
      <div className="mt-6 max-w-md ml-auto text-right space-y-2">
        <div className="flex justify-between">
          <span>إجمالي الأصناف:</span>
          <span>{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>ضريبة القيمة المضافة (15%):</span>
          <span>{vat.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>الإجمالي النهائي:</span>
          <span>{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={saveInvoice}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded text-lg"
      >
        حفظ الفاتورة
      </button>
    </div>
  );
}

