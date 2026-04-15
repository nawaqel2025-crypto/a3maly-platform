import React from "react";
import Link from "next/link";
import Card from "@/components/ui/card";

export default function SystemConfigLayout({ children }: { children: React.ReactNode }) {
  const tabs = [
    { href: "/erp/system-config/company", label: "بيانات الشركة" },
    { href: "/erp/system-config/branches", label: "الفروع" },
    { href: "/erp/system-config/currency", label: "العملة" },
    { href: "/erp/system-config/tax", label: "الضريبة" },
    { href: "/erp/system-config/numbering", label: "الترقيم" },
    { href: "/erp/system-config/periods", label: "الفترات" },
    { href: "/erp/system-config/default-accounts", label: "الحسابات الافتراضية" },
    { href: "/erp/system-config/general", label: "الإعدادات العامة" },
  ];

  return (
    <div className="flex w-full flex-col gap-6 p-6" dir="rtl">
      <div>
        <h1 className="text-[32px] font-bold text-[var(--a3-text-primary)]">تهيئة النظام</h1>
        <p className="mt-1 text-[14px] text-[var(--a3-text-secondary)]">
          إعدادات النظام الأساسية لمنصة أعمالي
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[var(--a3-border)] pb-2 text-sm font-medium">
        {tabs.map((tab) => (
          <Tab key={tab.href} href={tab.href} label={tab.label} />
        ))}
      </div>

      <Card>{children}</Card>
    </div>
  );
}

function Tab({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-[8px] px-3 py-2 text-[14px] text-[var(--a3-text-secondary)] transition hover:bg-[var(--a3-background)] hover:text-[var(--a3-primary)]"
    >
      {label}
    </Link>
  );
}
