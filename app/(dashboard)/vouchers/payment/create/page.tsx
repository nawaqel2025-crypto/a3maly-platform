"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Account = {
  id: number | string;
  name: string;
  code: string;
};

export default function CreatePaymentVoucher() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    date: "",
    fromAccountId: "",
    toAccountId: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data.data ?? []));
  }, []);

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (
      !form.date ||
      !form.fromAccountId ||
      !form.toAccountId ||
      !form.amount
    ) {
      alert("الرجاء تعبئة جميع الحقول الأساسية");
      return;
    }

    const fromAcc = accounts.find(
      (a) => String(a.id) === String(form.fromAccountId)
    );
    const toAcc = accounts.find(
      (a) => String(a.id) === String(form.toAccountId)
    );

    if (!fromAcc || !toAcc) {
      alert("حدث خطأ في اختيار الحسابات");
      return;
    }

    setLoading(true);

    try {
      // إنشاء قيد يومية تلقائي لسند الصرف
      await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          description:
            form.description || `سند صرف من ${fromAcc.name} إلى ${toAcc.name}`,
          // في سند الصرف: المصروف/المورد مدين
          debitAccountId: fromAcc.id,
          debitAccountName: `${fromAcc.name} (${fromAcc.code})`,
          // الصندوق/البنك دائن
          creditAccountId: toAcc.id,
          creditAccountName: `${toAcc.name} (${toAcc.code})`,
          amount: Number(form.amount),
          source: "payment-voucher",
          sourceId: null,
        }),
      });

      alert("تم إنشاء سند الصرف وقيد اليومية بنجاح");
      setForm({
        date: "",
        fromAccountId: "",
        toAccountId: "",
        amount: "",
        description: "",
      });
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">إنشاء سند صرف</h1>

      <Card>
        <CardHeader>
          <CardTitle>بيانات السند</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">التاريخ</label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">من حساب</label>
            <select
              className="w-full border p-2 rounded"
              value={form.fromAccountId}
              onChange={(e) => updateField("fromAccountId", e.target.value)}
            >
              <option value="">اختر حساب</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} ({acc.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">إلى حساب</label>
            <select
              className="w-full border p-2 rounded"
              value={form.toAccountId}
              onChange={(e) => updateField("toAccountId", e.target.value)}
            >
              <option value="">اختر حساب</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} ({acc.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">المبلغ</label>
            <Input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => updateField("amount", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">الوصف</label>
            <Textarea
              placeholder="سبب الصرف"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSave} disabled={loading}>
            {loading ? "جاري الحفظ..." : "حفظ السند وإنشاء القيد"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
