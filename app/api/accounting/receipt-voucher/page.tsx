"use client";

import { useState } from "react";

export default function ReceiptVoucherPage() {
  const [rows, setRows] = useState([
    { account: "", debit: 0, credit: 0 }
  ]);

  const addRow = () => {
    setRows([...rows, { account: "", debit: 0, credit: 0 }]);
  };

  const updateRow = (index: number, field: string, value: any) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const totalDebit = rows.reduce((sum, r) => sum + Number(r.debit || 0), 0);
  const totalCredit = rows.reduce((sum, r) => sum + Number(r.credit || 0), 0);

  const isBalanced = totalDebit === totalCredit;

  const saveVoucher = () => {
    if (!isBalanced) {
      alert("⚠️ القيد غير متوازن. يجب أن يتساوى المدين مع الدائن.");
      return;
    }

    const payload = {
      voucherType: "receipt",
      date: new Date().toISOString(),
      rows,
    };

    console.log("Saving voucher:", payload);

    alert("✔ تم حفظ سند القبض بنجاح (محاكاة).");
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold mb-4">سند قبض</h1>

      {/* معلومات السند */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow">

        <div>
          <label className="block mb-1 font-semibold">رقم السند</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="يتم توليده تلقائيًا"
            disabled
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">التاريخ</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">طريقة الدفع</label>
          <select className="w-full border p-2 rounded">
            <option>نقدًا</option>
            <option>تحويل بنكي</option>
            <option>شيك</option>
          </select>
        </div>

      </div>

      {/* جدول القيد */}
      <div className="bg-white p-4 rounded shadow">

        <table className="w-full text-right">
          <thead>
            <tr className="border-b">
              <th className="p-2">الحساب</th>
              <th className="p-2">مدين</th>
              <th className="p-2">دائن</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="اسم الحساب"
                    value={row.account}
                    onChange={(e) =>
                      updateRow(index, "account", e.target.value)
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={row.debit}
                    onChange={(e) =>
                      updateRow(index, "debit", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={row.credit}
                    onChange={(e) =>
                      updateRow(index, "credit", Number(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addRow}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
        >
          + إضافة سطر
        </button>

      </div>

      {/* الإجمالي */}
      <div className="bg-white p-4 rounded shadow text-lg font-semibold">
        <div>إجمالي المدين: {totalDebit}</div>
        <div>إجمالي الدائن: {totalCredit}</div>

        {!isBalanced && (
          <div className="text-red-600 mt-2">
            ⚠️ القيد غير متوازن — يجب أن يتساوى المدين مع الدائن
          </div>
        )}
      </div>

      {/* زر الحفظ */}
      <button
        onClick={saveVoucher}
        className="px-6 py-3 bg-green-600 text-white rounded text-lg"
      >
        حفظ السند
      </button>

    </div>
  );
}

