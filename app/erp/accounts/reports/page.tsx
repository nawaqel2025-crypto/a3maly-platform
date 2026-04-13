"use client";

import Link from "next/link";

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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        التقارير المحاسبية
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reports.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="
              p-4 border rounded-lg bg-[var(--color-bg)]
              border-[var(--color-border)] hover:bg-[var(--color-bg-muted)]
              transition duration-150 flex flex-col items-center gap-2
            "
          >
            <span className="text-xl">{r.icon}</span>

            {/* ←← التعديل هنا: خط واضح وقوي */}
            <span className="text-sm font-semibold text-[var(--color-fg)] opacity-90">
              {r.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
