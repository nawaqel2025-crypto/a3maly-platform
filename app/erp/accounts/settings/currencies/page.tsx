"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function CurrenciesSettingsPage() {
  return (
    <div className="space-y-4" dir="rtl">
      <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">إعدادات العملات</h1>
      <Card className="space-y-3">
        <p className="text-[14px] text-[var(--a3-text-secondary)]">
          تمت إحالة هذا القسم إلى إعدادات العملات الموحدة ضمن تهيئة النظام.
        </p>
        <Link href="/erp/system-config/currency">
          <Button>فتح إعدادات العملات</Button>
        </Link>
      </Card>
    </div>
  );
}
