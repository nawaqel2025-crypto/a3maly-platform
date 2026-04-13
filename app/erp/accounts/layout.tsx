"use client";

import { FiSettings, FiLayers, FiActivity, FiBarChart2 } from "react-icons/fi";
import Link from "next/link";

export default function AccountsLayout({ children }) {
  const menu = [
    {
      title: "الإعدادات",
      icon: <FiSettings size={20} />,
      href: "/erp/accounts/settings",
    },
    {
      title: "التهيئة",
      icon: <FiLayers size={20} />,
      href: "/erp/accounts/configuration",
    },
    {
      title: "العمليات",
      icon: <FiActivity size={20} />,
      href: "/erp/accounts/operations",
    },
    {
      title: "التقارير",
      icon: <FiBarChart2 size={20} />,
      href: "/erp/accounts/reports",
    },
  ];

  return (
    <div className="flex w-full h-full bg-[var(--color-bg)] text-[var(--color-fg)]">
      
      {/* Sidebar */}
      <aside className="w-64 border-l border-[var(--color-border)] bg-[var(--color-bg-muted)] p-4">
        <nav className="space-y-2 text-right">
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="
                flex items-center gap-3 
                p-3 rounded-lg 
                hover:bg-[var(--color-bg-hover)]
                transition-all
              "
            >
              <span className="text-green-600 dark:text-green-400">
                {item.icon}
              </span>

              <span className="font-medium flex-1 text-right">
                {item.title}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
