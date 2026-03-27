"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateJournalEntry() {
  const [accounts, setAccounts] = useState([]);
  const [lines, setLines] = useState([
    { accountId: "", debit: "", credit: "" },
  ]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // جلب الحسابات
  useEffect(() => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data.data ?? []));
  }, []);

  // إضافة سطر جديد
  const addLine = () => {
    setLines([...lines, { accountId: "", debit: "", credit: "" }]);
  };

  // حذف سطر
  const removeLine = (index) => {
    const updated = [...lines];
    updated.splice(index, 1);
    setLines(updated);
  };

  // تحديث قيمة سطر
  const updateLine = (index, field, value) => {
    const updated = [...lines];
    updated[index][field] = value;
    setLines(updated);
  };

  // حساب الإجماليات
  const totalDebit = lines.reduce(
    (sum, line) => sum + (parseFloat(line.debit) || 0),
    0
  );
  const totalCredit = lines.reduce(
    (sum, line) => sum + (parseFloat(line.credit) || 0),
    0
  );

  // حفظ القيد
  const saveEntry = async () => {
    if (!date || !description) {
      alert("الرجاء إدخال التاريخ والوصف");
      return;
    }

    if (totalDebit !== totalCredit) {
      alert("القيد غير متوازن! يجب أن يساوي مجموع المدين مجموع الدائن.");
      return;
    }

    for (const line of lines) {
      if (!line.accountId || (!line.debit && !line.credit)) {
        alert("كل سطر يجب أن يحتوي على حساب ومبلغ.");
        return;
      }
    }

    // إرسال كل سطر كقيد مستقل
    for (const line of lines) {
      const account = accounts.find((a) => a.id == line.accountId);

      await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          description,
          debitAccountId: line.debit ? line.accountId : null,
          debitAccountName: line.debit ? `${account.name} (${account.code})` : null,
          creditAccountId: line.credit ? line.accountId : null,
          creditAccountName: line.credit ? `${account.name} (${account.code})` : null,
          amount: parseFloat(line.debit || line.credit),
          source: "manual",
        }),
      });
    }

    alert("تم حفظ القيد بنجاح");
    setLines([{ accountId: "", debit: "", credit: "" }]);
    setDate("");
    setDescription("");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">إنشاء قيد يومية يدوي</h1>

      {/* التاريخ والوصف */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">التاريخ</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div>
          <label className="block mb-1 font-medium">الوصف</label>
          <Input
            type="text"
            placeholder="وصف القيد"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* الأسطر */}
      <div className="space-y-4">
        {lines.map((line, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border p-4 rounded-lg bg-white shadow-sm">

            {/* الحساب */}
            <div>
              <label className="block mb-1 font-medium">الحساب</label>
              <select
                className="w-full border p-2 rounded"
                value={line.accountId}
                onChange={(e) => updateLine(index, "accountId", e.target.value)}
              >
                <option value="">اختر حساب</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} ({acc.code})
                  </option>
                ))}
              </select>
            </div>

            {/* مدين */}
            <div>
              <label className="block mb-1 font-medium">مدين</label>
              <Input
                type="number"
                value={line.debit}
                onChange={(e) => updateLine(index, "debit", e.target.value)}
              />
            </div>

            {/* دائن */}
            <div>
              <label className="block mb-1 font-medium">دائن</label>
              <Input
                type="number"
                value={line.credit}
                onChange={(e) => updateLine(index, "credit", e.target.value)}
              />
            </div>

            {/* حذف السطر */}
            <div className="flex justify-end">
              {lines.length > 1 && (
                <Button variant="destructive" onClick={() => removeLine(index)}>
                  حذف
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button onClick={addLine} className="w-full">
          + إضافة سطر جديد
        </Button>
      </div>

      {/* الإجماليات */}
      <div className="p-4 bg-gray-100 rounded-lg text-lg font-semibold">
        <p>إجمالي المدين: {totalDebit}</p>
        <p>إجمالي الدائن: {totalCredit}</p>
      </div>

      {/* زر الحفظ */}
      <Button className="w-full py-3 text-lg" onClick={saveEntry}>
        حفظ القيد
      </Button>
    </div>
  );
}
