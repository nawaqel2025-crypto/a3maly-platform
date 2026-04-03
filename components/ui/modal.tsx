"use client";

import React, { useEffect } from "react";
import clsx from "clsx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "sm" | "md" | "lg";
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = "md",
}: ModalProps) {
  // Close on ESC
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
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        animate-fadeIn
      "
      onClick={onClose}
    >
      <div
        className={clsx(
          "bg-[var(--color-bg)] text-[var(--color-fg)] rounded-[var(--radius-lg)] shadow-lg border border-[var(--color-border)]",
          "w-full mx-4 p-0 overflow-hidden animate-scaleIn",
          widthMap[width]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="p-4 border-b border-[var(--color-border)]">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-[var(--color-border)] flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn var(--duration-normal) var(--ease);
        }
        .animate-scaleIn {
          animation: scaleIn var(--duration-normal) var(--ease);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
