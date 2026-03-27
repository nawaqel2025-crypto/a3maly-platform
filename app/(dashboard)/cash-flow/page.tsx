"use client";

import { useEffect, useState } from "react";

export default function CashFlowPage() {
  const [journal, setJournal] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => {
        setJournal(data.data ?? []);
        setLoading(false);
      });
  }, []);

  const filteredJournal = journal.filter((entry) => {
    if (fromDate && entry.date < fromDate) return false;
    if (toDate && entry.date > toDate) return false;
    return true;
  });

  // استخراج رقم الحساب من الاسم
  const getCode = (name) => parseInt(name.match(/\((\d+)\)/)?.[1] || 0);

  // تحديد الحسابات النقدية
  const isCashAccount = (code) => code >= 1100 && code <= 1199;

  let operating = 0;
  let investing = 0;
  let financing = 0;

  filteredJournal.forEach((entry) => {
    // مدين
    if (entry.debitAccountId) {
      const code = getCode(entry.debitAccountName);

      if (isCashAccount(code)) {
        // زيادة النقدية
        operating += entry.amount;
      }
    }

    // دائن
    if (entry.creditAccountId) {
      const code = getCode(entry.creditAccountName);

      if (isCashAccount(code)) {
        // نقص النقدية
        operating -= entry.amount;
      }
    }
  });

  const netCashFlow = operating + investing + financing;

  if (loading) return <p className="p-6">جاري تحميل التدفقات النقدية...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">التدفقات النقدية</h1>

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

      {/* التقرير */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6 text-lg">

        <div>
          <h2 className="text-xl font-bold text-blue-600">التدفقات التشغيلية</h2>
          <p className="mt-2">{operating}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-600">التدفقات الاستثمارية</h2>
          <p className="mt-2">{investing}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-600">التدفقات التمويلية</h2>
          <p className="mt-2">{financing}</p>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-bold text-purple-600">صافي التدفق النقدي</h2>
          <p className="mt-2 font-bold text-2xl">
            {netCashFlow > 0 ? `${netCashFlow} زيادة` : `${Math.abs(netCashFlow)} نقص`}
          </p>
        </div>

      </div>
    </div>
  );
}
