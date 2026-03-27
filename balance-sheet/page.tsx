"use client";

import { useEffect, useState } from "react";

export default function BalanceSheetPage() {
  const [journal, setJournal] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  // دوال تحديد نوع الحساب حسب رقم الحساب
  const getCode = (name) => parseInt(name.match(/\((\d+)\)/)?.[1] || 0);

  const isAsset = (code) => code >= 1000 && code <= 1999;
  const isLiability = (code) => code >= 2000 && code <= 2999;
  const isEquity = (code) => code >= 3000 && code <= 3999;

  // تجميع أرصدة الحسابات
  const balances = {};

  filteredJournal.forEach((entry) => {
    // مدين
    if (entry.debitAccountId) {
      const code = getCode(entry.debitAccountName);
      if (!balances[code]) balances[code] = { name: entry.debitAccountName, balance: 0 };
      balances[code].balance += entry.amount;
    }

    // دائن
    if (entry.creditAccountId) {
      const code = getCode(entry.creditAccountName);
      if (!balances[code]) balances[code] = { name: entry.creditAccountName, balance: 0 };
      balances[code].balance -= entry.amount;
    }
  });

  // تقسيم الحسابات حسب الفئات
  const assets = [];
  const liabilities = [];
  const equity = [];

  Object.keys(balances).forEach((code) => {
    const acc = balances[code];

    if (isAsset(code)) assets.push(acc);
    if (isLiability(code)) liabilities.push(acc);
    if (isEquity(code)) equity.push(acc);
  });

  // الإجماليات
  const totalAssets = assets.reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = liabilities.reduce((sum, a) => sum + a.balance, 0);
  const totalEquity = equity.reduce((sum, a) => sum + a.balance, 0);

  if (loading) return <p className="p-6">جاري تحميل الميزانية العمومية...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">الميزانية العمومية</h1>

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

      {/* الأصول */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold text-blue-600">الأصول</h2>

        <table className="w-full border-collapse text-right">
          <tbody>
            {assets.map((acc, i) => (
              <tr key={i}>
                <td className="border p-2">{acc.name}</td>
                <td className="border p-2">{acc.balance}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td className="border p-2">إجمالي الأصول</td>
              <td className="border p-2">{totalAssets}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* الالتزامات */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold text-blue-600">الالتزامات</h2>

        <table className="w-full border-collapse text-right">
          <tbody>
            {liabilities.map((acc, i) => (
              <tr key={i}>
                <td className="border p-2">{acc.name}</td>
                <td className="border p-2">{acc.balance}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td className="border p-2">إجمالي الالتزامات</td>
              <td className="border p-2">{totalLiabilities}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* حقوق الملكية */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold text-blue-600">حقوق الملكية</h2>

        <table className="w-full border-collapse text-right">
          <tbody>
            {equity.map((acc, i) => (
              <tr key={i}>
                <td className="border p-2">{acc.name}</td>
                <td className="border p-2">{acc.balance}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td className="border p-2">إجمالي حقوق الملكية</td>
              <td className="border p-2">{totalEquity}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* التحقق من توازن الميزانية */}
      <div className="p-4 bg-gray-100 rounded-lg text-lg font-semibold">
        <p>الأصول: {totalAssets}</p>
        <p>الالتزامات + حقوق الملكية: {totalLiabilities + totalEquity}</p>

        <p className="mt-2 text-xl font-bold">
          {totalAssets === totalLiabilities + totalEquity
            ? "✔ الميزانية متزنة"
            : "❌ الميزانية غير متزنة"}
        </p>
      </div>
    </div>
  );
}
