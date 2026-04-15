"use client";

import Link from "next/link";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";

const links = [
  { href: "/dashboard", label: "لوحة التحكم" },
  { href: "/accounting/chart-of-accounts", label: "شجرة الحسابات" },
  { href: "/accounting/journal-entries", label: "قيود اليومية" },
  { href: "/accounting/trial-balance", label: "ميزان المراجعة" },
  { href: "/accounting/income-statement", label: "قائمة الدخل" },
  { href: "/accounting/cost-centers", label: "مراكز التكلفة" },
  { href: "/inventory/items", label: "الأصناف" },
  { href: "/inventory/warehouses", label: "المستودعات" },
  { href: "/sales/invoices", label: "فواتير المبيعات" },
  { href: "/purchases/bills", label: "فواتير المشتريات" },
  { href: "/hr/employees", label: "الموظفون" },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-[var(--layout-sidebar-width)] p-4" dir="rtl">
      <Card className="h-full">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold text-[var(--a3-text-primary)]">القائمة</h2>
          <Badge variant="info">A3MALY</Badge>
        </div>
        <ul className="space-y-1">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-[8px] px-3 py-2 text-[14px] text-[var(--a3-text-secondary)] transition hover:bg-[var(--a3-background)] hover:text-[var(--a3-primary)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
