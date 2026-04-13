"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Voucher = {
  id: number;
  date: string;
  amount: number;
  payee: string;
  description: string;
};

export default function PaymentVouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadVouchers();
  }, []);

  const loadVouchers = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("payment_vouchers")
      .select("*")
      .order("id", { ascending: false });

    if (data) setVouchers(data);

    setLoading(false);
  };

  const addVoucher = async () => {
    if (!date || !amount || !payee) return;

    await supabase.from("payment_vouchers").insert({
      date,
      amount: Number(amount),
      payee,
      description,
    });

    setDate("");
    setAmount("");
    setPayee("");
    setDescription("");

    loadVouchers();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        إدارة سندات الصرف
      </h1>

      {/* إضافة سند */}
      <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-4 max-w-xl">
        <h2 className="text-lg font-semibold">إضافة سند صرف</h2>

        <div className="space-y-3">
          <Input label="التاريخ" type="date" value={date} onChange={setDate} />
          <Input label="المبلغ" type="number" value={amount} onChange={setAmount} />
          <Input label="المستفيد" value={payee} onChange={setPayee} />
          <Input label="البيان" value={description} onChange={setDescription} />

          <button
            onClick={addVoucher}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            إضافة السند
          </button>
        </div>
      </div>

      {/* قائمة السندات */}
      <div className="border rounded-lg overflow-hidden max-w-3xl">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-bg-muted)] text-[var(--color-fg)]">
            <tr>
              <th className="p-2 text-right">التاريخ</th>
              <th className="p-2 text-right">المبلغ</th>
              <th className="p-2 text-right">المستفيد</th>
              <th className="p-2 text-right">البيان</th>
            </tr>
          </thead>

          <tbody>
            {vouchers.map((v) => (
              <tr key={v.id} className="border-t border-[var(--color-border)]">
                <td className="p-2">{v.date}</td>
                <td className="p-2">{v.amount.toLocaleString("en-US")}</td>
                <td className="p-2">{v.payee}</td>
                <td className="p-2">{v.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* عناصر UI */
function Input({ label, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block mb-1 text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
      />
    </div>
  );
}
