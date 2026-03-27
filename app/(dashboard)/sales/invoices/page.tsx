"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InvoicesListPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("/api/sales/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, []);

  return (
    <div className="p-6" dir="rtl">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">الفواتير</h1>

        <Link
          href="/dashboard/sales/invoices/create"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + إنشاء فاتورة
        </Link>
      </div>

      <table className="w-full border text-right text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">رقم الفاتورة</th>
            <th className="border px-2 py-1">العميل</th>
            <th className="border px-2 py-1">التاريخ</th>
            <th className="border px-2 py-1">الإجمالي</th>
            <th className="border px-2 py-1">عرض</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td className="border px-2 py-1">{inv.invoice_number}</td>
              <td className="border px-2 py-1">{inv.customer_id}</td>
              <td className="border px-2 py-1">{inv.invoice_date}</td>
              <td className="border px-2 py-1">{inv.total}</td>
              <td className="border px-2 py-1">
                <Link
                  href={`/dashboard/sales/invoices/${inv.id}`}
                  className="text-blue-600 underline"
                >
                  عرض
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

