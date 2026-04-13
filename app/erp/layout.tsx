"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Theme = "dark" | "light";

export default function ERPLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");
  const [collapsed, setCollapsed] = useState(false);

  const isDark = theme === "dark";

  // -----------------------------
  // 1) ترتيب الوحدات الجديد
  // -----------------------------
  const modules = [
    // 🔥 القسم الإداري (أعلى القائمة)
    { name: "إدارة النظام", path: "/erp/system-admin", admin: true },
    { name: "تهيئة النظام", path: "/erp/system-config", admin: true },

    // 🔥 فاصل ديناميكي
    { separator: true },

    // 🔥 الوحدات التشغيلية
    { name: "لوحة الوحدات", path: "/erp" },
    { name: "الحسابات", path: "/erp/accounts" },
    { name: "العملاء", path: "/erp/customers" },
    { name: "الموردين", path: "/erp/vendors" },
    { name: "المبيعات", path: "/erp/sales" },
    { name: "المشتريات", path: "/erp/purchasing" },
    { name: "المخزون", path: "/erp/inventory" },
    { name: "المشاريع", path: "/erp/projects" },
    { name: "الموارد البشرية", path: "/erp/hr" },
    { name: "التحليل المالي", path: "/erp/financial-analytics" },
    { name: "النمذجة المالية", path: "/erp/financial-modeling" },
  ];

  // -----------------------------
  // 2) الثيمات
  // -----------------------------
  const bgMain = isDark ? "bg-[#001417]" : "bg-[#F4F6F7]";
  const bgSidebar = isDark ? "bg-[#0A1A1F]" : "bg-[#F7F9FA]";
  const bgHeader = isDark ? "bg-[#0F2A30]" : "bg-white";
  const textMain = isDark ? "text-white" : "text-[#0B1A1F]";
  const borderColor = isDark ? "border-white/10" : "border-[#D5DDE3]";
  const mutedText = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`${bgMain} ${textMain} min-h-screen flex`} dir="rtl">
      
      {/* SIDEBAR */}
      <aside
        className={`
          ${bgSidebar} ${borderColor}
          border-l flex flex-col transition-all duration-200
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* BRAND + TOGGLE */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#00A896] via-[#00E5C1] to-[#004F5A]" />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">منصة أعمالي</span>
                <span className={`text-[11px] ${mutedText}`}>A3MALY ERP</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="text-xs px-2 py-1 rounded-md border border-white/10 hover:border-[#00E5C1]/60 hover:text-[#00E5C1] transition"
          >
            {collapsed ? "›" : "‹"}
          </button>
        </div>

        {/* MODULES NAV */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1 text-sm">
          {modules.map((m, index) => {
            if (m.separator) {
              return (
                <div
                  key={`sep-${index}`}
                  className={`my-3 border-t ${borderColor} opacity-50`}
                />
              );
            }

            const active =
              m.path === "/erp"
                ? pathname === "/erp"
                : pathname.startsWith(m.path);

            return (
              <Link
                key={m.path}
                href={m.path}
                className={`
                  flex items-center gap-2 rounded-lg px-3 py-2 transition
                  ${active
                    ? "bg-[#00A896]/15 text-[#00E5C1] border border-[#00E5C1]/40"
                    : isDark
                    ? "hover:bg-white/5 text-gray-300"
                    : "hover:bg-[#E6EEF3] text-gray-700"
                  }
                `}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C1]" />
                {!collapsed && <span>{m.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER / THEME TOGGLE */}
        <div className={`px-3 py-3 border-t ${borderColor} flex flex-col gap-2`}>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`
              w-full text-xs rounded-md px-3 py-2 flex items-center justify-between
              ${isDark ? "bg-[#0F2A30] hover:bg-[#123341]" : "bg-white hover:bg-[#E9F0F5]"}
              border ${borderColor} transition
            `}
          >
            <span>وضع الواجهة</span>
            <span className={mutedText}>{isDark ? "داكن" : "فاتح"}</span>
          </button>

          {!collapsed && (
            <div className={`text-[11px] ${mutedText}`}>
              © {new Date().getFullYear()} منصة أعمالي
            </div>
          )}
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* HEADER */}
        <header
          className={`
            ${bgHeader} ${borderColor}
            border-b h-14 flex items-center justify-between px-6
          `}
        >
          <div className="flex flex-col">
            <span className="text-sm font-semibold">A3MALY ERP — النظام المحاسبي</span>
            <span className={`text-[11px] ${mutedText}`}>
              بوابة الوحدات المحاسبية والمالية لمنصة أعمالي
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              className={`
                rounded-md px-3 py-1 border ${borderColor}
                ${isDark ? "hover:bg-white/5" : "hover:bg-[#E9F0F5]"}
                transition
              `}
            >
              المستخدم
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1 px-8 py-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
