"use client";

import { useEffect, useState } from "react";

export default function TrialBalancePage() {
  const [accounts, setAccounts] = useState([]);
  const [journal, setJournal] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // جلب الحسابات
  useEffect(() => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data.data ?? []));
  }, []);

  // جلب القيود
  useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => {
        setJournal(data.data ?? []);
        setLoading(false);
      });
  }, []);

  // فلترة حسب التاريخ
  const filteredJournal = journal.filter((entry) => {
    if (fromDate && entry.date < fromDate) return false;
    if (toDate && entry.date > toDate) return false;
    return true;
  });

  // بناء ميزان المراجعة
  const trial = {};

  filteredJournal.forEach((entry) => {
    // مدين
    if (entry.debitAccountId) {
      if (!trial[entry.debitAccountId]) {
        trial[entry.debitAccountId] = {
          name: entry.debitAccountName,
          debit: 0,
          credit: 0,
        };
      }
      trial[entry.debitAccountId].debit += entry.amount;
    }

    // دائن
    if (entry.creditAccountId) {
      if (!trial[entry.creditAccountId]) {
        trial[entry.creditAccountId] = {
          name: entry.creditAccountName,
          debit: 0,
          credit: 0,
        };
      }
      trial[entry.creditAccountId].credit += entry.amount;
    }
  });

  if (loading) return <p className="p-6">جاري تحميل ميزان المراجعة...</p>;

  const totalDebit = Object.values(trial).reduce((sum, acc) => sum + acc.debit, 0);
  const totalCredit = Object.values(trial).reduce((sum, acc) => sum + acc.credit, 0);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">ميزان المراجعة</h1>

      {/* فلترة التاريخ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
        <div>
          <label className="block mb-1 font-medium">من تاريخ</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">إلى تاريخ</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* جدول ميزان المراجعة */}
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full border-collapse text-right">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">الحساب</th>
              <th className="border p-2">مدين</th>
              <th className="border p-2">دائن</th>
              <th className="border p-2">الرصيد</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(trial).map((id) => {
              const acc = trial[id];
              const balance = acc.debit - acc.credit;

              return (
                <tr key={id}>
                  <td className="border p-2">{acc.name}</td>
                  <td className="border p-2">{acc.debit}</td>
                  <td className="border p-2">{acc.credit}</td>
                  <td className="border p-2">
                    {balance > 0
                      ? `${balance} مدين`
                      : balance < 0
                      ? `${Math.abs(balance)} دائن`
                      : "متزن"}
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td className="border p-2">الإجمالي</td>
              <td className="border p-2">{totalDebit}</td>
              <td className="border p-2">{totalCredit}</td>
              <td className="border p-2">
                {totalDebit === totalCredit ? "✔ متزن" : "❌ غير متزن"}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
