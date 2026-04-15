"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

const tabs = [
  { id: "general", label: "الإعدادات العامة", icon: "⚙️" },
  { id: "defaults", label: "الحسابات الافتراضية", icon: "📁" },
  { id: "periods", label: "الفترات", icon: "📅" },
  { id: "numbering", label: "الترقيم", icon: "🔢" },
  { id: "tax", label: "الضريبة", icon: "💰" },
  { id: "currency", label: "العملة", icon: "💱" },

  /* ← تمت الإضافة */
  { id: "branches", label: "الفروع", icon: "🏢" },
  { id: "company", label: "بيانات الشركة", icon: "🏛️" },
];

export default function AccountingSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const routeMap: Record<string, string> = {
    general: "/erp/system-config/general",
    defaults: "/erp/system-config/default-accounts",
    periods: "/erp/system-config/periods",
    numbering: "/erp/system-config/numbering",
    tax: "/erp/system-config/tax",
    currency: "/erp/system-config/currency",
    branches: "/erp/system-config/branches",
    company: "/erp/system-config/company",
  };

  return (
    <div className="space-y-8" dir="rtl">
      <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">
        إعدادات المحاسبة
      </h1>

      <div className="flex flex-wrap gap-2 border-b border-[var(--a3-border)] pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? "primary" : "ghost"}
            size="sm"
          >
            <span className="text-[12px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      <Card className="space-y-3">
        <h2 className="text-[20px] font-semibold">{tabs.find((t) => t.id === activeTab)?.label}</h2>
        <p className="text-[14px] text-[var(--a3-text-secondary)]">
          تم توحيد صفحات الإعدادات لاستخدام مكونات A3MALY من وحدة `system-config`.
        </p>
        <Link href={routeMap[activeTab]}>
          <Button>فتح الصفحة</Button>
        </Link>
      </Card>
    </div>
  );
}
