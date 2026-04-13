"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Account = {
  id: number;
  code: string;
  name: string;
};

type EntryLine = {
  id: number;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
};

export default function AccountStatementPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [openingBalance, setOpeningBalance] = useState(0);
  const [lines, setLines] = useState<EntryLine[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    const { data } = await supabase
      .from("chart_of_accounts")
      .select("id, code, name")
      .order("code");

    if (data) setAccounts(data);
  };

  const loadStatement = async () => {
    if (!selectedAccount || !fromDate || !toDate) return;

    setLoading(true);

    const { data, error } = await supabase.rpc("get_account_statement", {
      acc_id: selectedAccount,
      date_from: fromDate,
      date_to: toDate,
    });

    if (!error && data) {
      setOpeningBalance(data.opening_balance);
      setLines(data.lines);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        كشف حساب
      </h1>

      {/* Filters */}
      <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Account */}
          <div>
            <label className="block mb-1 text-sm">الحساب</label>
            <select
              className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
              onChange={(e) => setSelectedAccount(Number(e.target.value))}
            >
              <option value="">اختر حسابًا…</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.code} — {acc.name}
                </option>
              ))}
            </select>
          </div>

          {/* From */}
          <div>
            <label className="block mb-1 text-sm">من تاريخ</label>
            <input
              type="date"
              className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To */}
          <div>
            <label className="block mb-1 text-sm">إلى تاريخ</label>
            <input
              type="date"
              className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={loadStatement}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          عرض التقرير
        </button>
      </div>

      {/* Report */}
      {!loading && lines.length > 0 && (
        <div className="space-y-6">

          {/* Opening Balance */}
          <div className="p-4 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] flex justify-between font-semibold">
            <span>الرصيد الافتتاحي</span>
            <span>{openingBalance.toLocaleString("en-US")}</span>
          </div>

          {/* Lines */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-bg-muted)] text-[var(--color-fg)]">
                <tr>
                  <th className="p-2 text-right">التاريخ</th>
                  <th className="p-2 text-right">البيان</th>
                  <th className="p-2 text-right">مدين</th>
                  <th className="p-2 text-right">دائن</th>
                  <th className="p-2 text-right">الرصيد</th>
                </tr>
              </thead>

              <tbody>
                {lines.map((line) => (
                  <tr key={line.id} className="border-t border-[var(--color-border)]">
                    <td className="p-2">{line.date}</td>
                    <td className="p-2">{line.description}</td>
                    <td className="p-2">{line.debit.toLocaleString("en-US")}</td>
                    <td className="p-2">{line.credit.toLocaleString("en-US")}</td>
                    <td className="p-2 font-semibold">
                      {line.balance.toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {loading && (
        <div className="text-[var(--color-fg-muted)]">جاري التحميل…</div>
      )}
    </div>
  );
}
