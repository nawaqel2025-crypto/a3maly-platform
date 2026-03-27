"use client";

import { useEffect, useState } from "react";

export default function LedgerPage() {
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

  // تجميع القيود حسب الحساب
  const ledger = {};

  filteredJournal.forEach((entry) => {
    // مدين
    if (entry.debitAccountId) {
      if (!ledger[entry.debitAccountId]) {
        ledger[entry.debitAccountId] = {
          accountName: entry.debitAccountName,
          rows: [],
          totalDebit: 0,
          totalCredit: 0,
        };
      }

      ledger[entry.debitAccountId].rows.push({
        date: entry.date,
        description: entry.description,
        debit: entry.amount,
        credit: 0,
      });

      ledger[entry.debitAccountId].totalDebit += entry.amount;
    }

    // دائن
    if (entry.creditAccountId) {
      if (!ledger[entry.creditAccountId]) {
        ledger[entry.creditAccountId] = {
          accountName: entry.creditAccountName,
          rows: [],
          totalDebit: 0,
          totalCredit: 0,
        };
      }

      ledger[entry.creditAccountId].rows.push({
        date: entry.date,
        description: entry.description,
        debit: 0,
        credit: entry.amount,
      });

      ledger[entry.creditAccountId].totalCredit += entry.amount;
    }
  });

  if (loading) return <p className="p-6">جاري تحميل دفتر الأستاذ...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">دفتر الأستاذ</h1>

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

      {/* عرض دفتر الأستاذ */}
      {Object.keys(ledger).length === 0 && (
        <p className="text-gray-500">لا توجد حركات في الفترة المحددة.</p>
      )}

      {Object.keys(ledger).map((accountId) => {
        const acc = ledger[accountId];
        const balance = acc.totalDebit - acc.totalCredit;

        return (
          <div key={accountId} className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-bold text-blue-600">
              {acc.accountName}
            </h2>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-right">
                  <th className="border p-2">التاريخ</th>
                  <th className="border p-2">البيان</th>
                  <th className="border p-2">مدين</th>
                  <th className="border p-2">دائن</th>
                </tr>
              </thead>

              <tbody>
                {acc.rows.map((row, i) => (
                  <tr key={i} className="text-right">
                    <td className="border p-2">{row.date}</td>
                    <td className="border p-2">{row.description}</td>
                    <td className="border p-2">{row.debit}</td>
                    <td className="border p-2">{row.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-lg font-semibold mt-4">
              <p>إجمالي المدين: {acc.totalDebit}</p>
              <p>إجمالي الدائن: {acc.totalCredit}</p>
              <p className="text-blue-700">
                الرصيد: {balance > 0 ? `${balance} مدين` : `${Math.abs(balance)} دائن`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
