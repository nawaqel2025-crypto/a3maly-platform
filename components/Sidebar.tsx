"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  ChevronDown,
  ChevronRight,
  Settings,
  ShoppingCart,
  Users,
  Boxes
} from "lucide-react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState({
    accounting: false,
    projects: false,
    settings: false,
    sales: false,
    inventory: false,
    customers: false,
  });

  const toggle = (key) => {
    setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-64 h-screen bg-white border-l border-gray-200 shadow-sm flex flex-col">
      <div className="p-4 text-xl font-bold text-gray-800 border-b">
        منصة أعمالي
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-2">

        {/* لوحة التحكم */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-gray-700"
        >
          <LayoutDashboard size={20} />
          <span>لوحة التحكم</span>
        </Link>

        {/* إدارة الحسابات */}
        <div>
          <button
            onClick={() => toggle("accounting")}
            className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <span className="flex items-center gap-3">
              <FileText size={20} />
              <span>إدارة الحسابات</span>
            </span>
            {openMenu.accounting ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openMenu.accounting && (
            <div className="ml-8 mt-1 space-y-1">

              <Link href="/modules/accounting/chart-of-accounts/1" className="block p-2 hover:bg-gray-100 rounded-md">
                شجرة الحسابات
              </Link>

              <Link href="/dashboard/accounting/journal" className="block p-2 hover:bg-gray-100 rounded-md">
                القيود اليومية
              </Link>

              <Link href="/dashboard/accounting/manual-entry" className="block p-2 hover:bg-gray-100 rounded-md">
                قيد يومية يدوي
              </Link>

              <Link href="/dashboard/accounting/receipt-voucher" className="block p-2 hover:bg-gray-100 rounded-md">
                سند قبض
              </Link>

              <Link href="/dashboard/accounting/payment-voucher" className="block p-2 hover:bg-gray-100 rounded-md">
                سند صرف
              </Link>

              <Link href="/ledger" className="block p-2 hover:bg-gray-100 rounded-md">
                دفتر الأستاذ
              </Link>

              <Link href="/trial-balance" className="block p-2 hover:bg-gray-100 rounded-md">
                ميزان المراجعة
              </Link>

              <Link href="/income-statement" className="block p-2 hover:bg-gray-100 rounded-md">
                قائمة الدخل
              </Link>

              <Link href="/balance-sheet" className="block p-2 hover:bg-gray-100 rounded-md">
                الميزانية العمومية
              </Link>

              <Link href="/cash-flow" className="block p-2 hover:bg-gray-100 rounded-md">
                التدفقات النقدية
              </Link>

            </div>
          )}
        </div>

        {/* إدارة المشاريع */}
        <div>
          <button
            onClick={() => toggle("projects")}
            className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <span className="flex items-center gap-3">
              <FolderKanban size={20} />
              <span>إدارة المشاريع</span>
            </span>
            {openMenu.projects ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openMenu.projects && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/dashboard/projects" className="block p-2 hover:bg-gray-100 rounded-md">
                قائمة المشاريع
              </Link>

              <Link href="/dashboard/projects/create" className="block p-2 hover:bg-gray-100 rounded-md">
                إنشاء مشروع
              </Link>
            </div>
          )}
        </div>

        {/* إدارة المبيعات */}
        <div>
          <button
            onClick={() => toggle("sales")}
            className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <span className="flex items-center gap-3">
              <ShoppingCart size={20} />
              <span>إدارة المبيعات</span>
            </span>
            {openMenu.sales ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openMenu.sales && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/dashboard/sales/invoices" className="block p-2 hover:bg-gray-100 rounded-md">
                الفواتير
              </Link>

              <Link href="/dashboard/sales/invoices/create" className="block p-2 hover:bg-gray-100 rounded-md">
                إنشاء فاتورة
              </Link>
            </div>
          )}
        </div>

        {/* إدارة المخزون */}
        <div>
          <button
            onClick={() => toggle("inventory")}
            className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <span className="flex items-center gap-3">
              <Boxes size={20} />
              <span>إدارة المخزون</span>
            </span>
            {openMenu.inventory ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openMenu.inventory && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/dashboard/inventory/items" className="block p-2 hover:bg-gray-100 rounded-md">
                الأصناف
              </Link>
            </div>
          )}
        </div>

        {/* إدارة العملاء */}
        <div>
          <button
            onClick={() => toggle("customers")}
            className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <span className="flex items-center gap-3">
              <Users size={20} />
              <span>إدارة العملاء</span>
            </span>
            {openMenu.customers ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openMenu.customers && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/dashboard/customers" className="block p-2 hover:bg-gray-100 rounded-md">
                قائمة العملاء
              </Link>
            </div>
          )}
        </div>

        {/* الإعدادات */}
        <div>
          <button
            onClick={() => toggle("settings")}
            className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <span className="flex items-center gap-3">
              <Settings size={20} />
              <span>الإعدادات</span>
            </span>
            {openMenu.settings ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openMenu.settings && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/dashboard/settings/profile" className="block p-2 hover:bg-gray-100 rounded-md">
                الملف الشخصي
              </Link>
              <Link href="/dashboard/settings/company" className="block p-2 hover:bg-gray-100 rounded-md">
                إعدادات الشركة
              </Link>
              <Link href="/dashboard/settings/users" className="block p-2 hover:bg-gray-100 rounded-md">
                إدارة المستخدمين
              </Link>
            </div>
          )}
        </div>

      </nav>
    </aside>
  );
}
