"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  ClipboardList, 
  FileText, 
  ChevronDown,
  ChevronRight,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState({
    accounting: false,
    projects: false,
    settings: false,
  });

  const toggle = (key: string) => {
    setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-64 h-screen bg-white border-l border-gray-200 shadow-sm flex flex-col">
      <div className="p-4 text-xl font-bold text-gray-800 border-b">
        منصة أعمالي
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-2">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-gray-700"
        >
          <LayoutDashboard size={20} />
          <span>لوحة التحكم</span>
        </Link>

        <div>
          <button
            onClick={() => toggle("accounting")}
            className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <span className="flex items-center gap-3">
              <FileText size={20} />
              <span>النظام المحاسبي</span>
            </span>
            {openMenu.accounting ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openMenu.accounting && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/dashboard/accounting/journal" className="block p-2 hover:bg-gray-100 rounded-md">
                القيود اليومية
              </Link>
              <Link href="/dashboard/accounting/ledger" className="block p-2 hover:bg-gray-100 rounded-md">
                دفتر الأستاذ
              </Link>
              <Link href="/dashboard/accounting/reports" className="block p-2 hover:bg-gray-100 rounded-md">
                التقارير المالية
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggle("projects")}
            className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <span className="flex items-center gap-3">
              <FolderKanban size={20} />
              <span>المشاريع</span>
            </span>
            {openMenu.projects ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openMenu.projects && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/dashboard/projects" className="block p-2 hover:bg-gray-100 rounded-md">
                قائمة المشاريع
              </Link>
              <Link href="/dashboard/tasks" className="block p-2 hover:bg-gray-100 rounded-md">
                المهام
              </Link>
              <Link href="/dashboard/clients" className="block p-2 hover:bg-gray-100 rounded-md">
                العملاء
              </Link>
            </div>
          )}
        </div>

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
