"use client";

import { useEffect, useState } from "react";

export default function IncomeStatementPage() {
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

  // دوال مساعدة لتحديد نوع الحساب حسب رقم الحساب
  const isRevenue = (code) => code >= 4000 && code <= 4999;
  const isCOGS = (code) => code >= 5000 && code <= 5999;
  const isExpense = (code) => code >= 6000 && code <= 6999;

  let totalRevenue = 0;
  let totalCOGS = 0;
  let totalExpenses = 0;

  // حساب الإجماليات
  filteredJournal.forEach((entry) => {
    // مدين
    if (entry.debitAccountId) {
      const code = parseInt(entry.debitAccountName.match(/\((\d+)\)/)?.[1] || 0);

      if (isRevenue(code)) totalRevenue -= entry.amount; // الإيرادات طبيعتها دائنة
      if (isCOGS(code)) totalCOGS += entry.amount;
      if (isExpense(code)) totalExpenses += entry.amount;
    }

    // دائن
    if (entry.creditAccountId) {
      const code = parseInt(entry.creditAccountName.match(/\((\d+)\)/)?.[1] || 0);

      if (isRevenue(code)) totalRevenue += entry.amount;
      if (isCOGS(code)) totalCOGS -= entry.amount;
      if (isExpense(code)) totalExpenses -= entry.amount;
    }
  });

  const grossProfit = totalRevenue - totalCOGS;
  const netProfit = grossProfit - totalExpenses;

  if (loading) return <p className="p-6">جاري تحميل قائمة الدخل...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">قائمة الدخل</h1>

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

      {/* قائمة الدخل */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6 text-lg">

        <div>
          <h2 className="text-xl font-bold text-blue-600">الإيرادات</h2>
          <p className="mt-2">{totalRevenue}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-600">تكلفة المبيعات</h2>
          <p className="mt-2">{totalCOGS}</p>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-bold text-green-600">الربح الإجمالي</h2>
          <p className="mt-2">{grossProfit}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-600">المصاريف التشغيلية</h2>
          <p className="mt-2">{totalExpenses}</p>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-bold text-purple-600">صافي الربح</h2>
          <p className="mt-2 font-bold text-2xl">
            {netProfit > 0 ? `${netProfit} ربح` : `${Math.abs(netProfit)} خسارة`}
          </p>
        </div>

      </div>
    </div>
  );
}
