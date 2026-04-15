"use client";

import Link from "next/link";
import Card from "@/components/ui/card";

const reports = [
  { icon: "📊", label: "الميزانية العمومية", href: "/erp/accounts/reports/balance-sheet" },
  { icon: "📈", label: "قائمة الدخل", href: "/erp/accounts/reports/income-statement" },
  { icon: "💧", label: "التدفقات النقدية", href: "/erp/accounts/reports/cash-flow" },
  { icon: "📘", label: "دفتر اليومية", href: "/erp/accounts/reports/journal" },
  { icon: "📗", label: "دفتر الأستاذ", href: "/erp/accounts/reports/ledger" },
  { icon: "📄", label: "كشف حساب", href: "/erp/accounts/reports/account-statement" },
  { icon: "🧾", label: "تقرير الضريبة", href: "/erp/accounts/reports/vat" },
  { icon: "🕒", label: "أعمار الديون", href: "/erp/accounts/reports/aging" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8" dir="rtl">
      <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">
        التقارير المحاسبية
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reports.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="block"
          >
            <Card className="flex flex-col items-center gap-2 p-4 transition hover:bg-[var(--a3-background)]">
              <span className="text-xl">{r.icon}</span>
              <span className="text-sm font-semibold text-[var(--a3-text-primary)] opacity-90">{r.label}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
