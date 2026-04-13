"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4" dir="rtl">
      <h2 className="text-lg font-bold mb-4">القائمة</h2>

      <ul className="space-y-2">

        <li><Link href="/dashboard" className="hover:text-blue-300">لوحة التحكم</Link></li>

        <li><Link href="/accounting/chart-of-accounts" className="hover:text-blue-300">شجرة الحسابات</Link></li>
        <li><Link href="/accounting/journal-entries" className="hover:text-blue-300">قيود اليومية</Link></li>
        <li><Link href="/accounting/trial-balance" className="hover:text-blue-300">ميزان المراجعة</Link></li>
        <li><Link href="/accounting/income-statement" className="hover:text-blue-300">قائمة الدخل</Link></li>
        <li><Link href="/accounting/cost-centers" className="hover:text-blue-300">مراكز التكلفة</Link></li>

        <li><Link href="/inventory/items" className="hover:text-blue-300">الأصناف</Link></li>
        <li><Link href="/inventory/warehouses" className="hover:text-blue-300">المستودعات</Link></li>

        <li><Link href="/sales/invoices" className="hover:text-blue-300">فواتير المبيعات</Link></li>

        <li><Link href="/purchases/bills" className="hover:text-blue-300">فواتير المشتريات</Link></li>

        <li><Link href="/hr/employees" className="hover:text-blue-300">الموظفون</Link></li>

      </ul>
    </div>
  );
}
