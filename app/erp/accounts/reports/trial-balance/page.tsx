"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function TrialBalancePage() {
  return (
    <div className="space-y-4" dir="rtl">
      <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">ميزان المراجعة</h1>
      <Card className="space-y-3">
        <p className="text-[14px] text-[var(--a3-text-secondary)]">
          صفحة تقرير ميزان المراجعة قيد إعادة البناء وفق مكونات A3MALY الموحدة.
        </p>
        <Link href="/erp/accounts/reports">
          <Button variant="outline">العودة إلى التقارير</Button>
        </Link>
      </Card>
    </div>
  );
}
