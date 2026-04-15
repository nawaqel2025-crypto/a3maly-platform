"use client";

import React, { useEffect } from "react";
import clsx from "clsx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg";
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  width = "md",
}: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const widthMap = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center bg-black/35
      "
      onClick={onClose}
    >
      <div
        className={clsx(
          "bg-[var(--a3-surface)] text-[var(--a3-text-primary)] rounded-[12px] shadow-xl border border-[var(--a3-border)]",
          "w-full mx-4 overflow-hidden",
          widthMap[width]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="p-4 border-b border-[var(--a3-border)] bg-[var(--a3-surface)] sticky top-0 z-30">
            <h2 className="text-[20px] font-semibold">{title}</h2>
          </div>
        )}

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
