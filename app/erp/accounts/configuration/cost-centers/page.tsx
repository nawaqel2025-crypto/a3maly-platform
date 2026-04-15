"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function CostCentersPage() {
  return (
    <div className="space-y-4" dir="rtl">
      <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">مراكز التكلفة</h1>
      <Card className="space-y-3">
        <p className="text-[14px] text-[var(--a3-text-secondary)]">
          تم توحيد واجهة هذا القسم ضمن هوية A3MALY. سيتم ربط نموذج الإدارة الكامل في المرحلة التالية.
        </p>
        <Link href="/erp/accounts/configuration">
          <Button variant="outline">العودة إلى قسم التهيئة</Button>
        </Link>
      </Card>
    </div>
  );
}
