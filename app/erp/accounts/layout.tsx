"use client";

import { FiSettings, FiLayers, FiActivity, FiBarChart2 } from "react-icons/fi";
import Link from "next/link";
import Card from "@/components/ui/card";

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
    <div className="flex h-full w-full bg-[var(--a3-background)] text-[var(--a3-text-primary)]" dir="rtl">
      
      {/* Sidebar */}
      <aside className="w-64 border-l border-[var(--a3-border)] bg-[var(--a3-surface)] p-4">
        <nav className="space-y-2 text-right">
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="
                flex items-center gap-3 
                p-3 rounded-[8px] 
                hover:bg-[var(--a3-background)]
                transition-all
              "
            >
              <span className="text-[var(--a3-primary)]">
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
        <Card>{children}</Card>
      </main>
    </div>
  );
}
