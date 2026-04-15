"use client";

import React from "react";
import clsx from "clsx";

export type TabItem = {
  id: string;
  label: string;
};

interface TabsProps {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ items, active, onChange, className }: TabsProps) {
  return (
    <div className={clsx("flex flex-wrap gap-2 border-b border-[var(--a3-border)] pb-2", className)}>
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={clsx(
              "rounded-[8px] px-3 py-2 text-[14px] font-medium transition-colors",
              isActive
                ? "bg-[var(--a3-primary)]/10 text-[var(--a3-primary)]"
                : "text-[var(--a3-text-secondary)] hover:bg-[var(--a3-background)] hover:text-[var(--a3-text-primary)]"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
