"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function BackBar({ title }: { title: string }) {
  const router = useRouter();

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between gap-3" dir="rtl">
        <h1 className="text-[20px] font-semibold text-[var(--a3-text-primary)]">{title}</h1>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => router.back()}
          >
            رجوع
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => router.push("/erp")}
          >
            العودة للنظام
          </Button>
        </div>
      </div>
    </Card>
  );
}
