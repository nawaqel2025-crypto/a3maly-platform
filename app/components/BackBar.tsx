"use client";

import { useRouter } from "next/navigation";

export default function BackBar({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-6 p-3 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)]">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="px-3 py-1 rounded bg-[var(--color-bg-muted)] hover:bg-[var(--color-bg-hover)] transition text-sm"
        >
          ◀ رجوع
        </button>

        <button
          onClick={() => router.push("/erp")}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
        >
          🏠 العودة للنظام
        </button>
      </div>
    </div>
  );
}
