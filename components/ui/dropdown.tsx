"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  width?: "sm" | "md" | "lg";
}

export default function Dropdown({
  trigger,
  children,
  align = "right",
  width = "md",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const widthMap = {
    sm: "w-32",
    md: "w-48",
    lg: "w-64",
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Trigger */}
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Menu */}
      {open && (
        <div
          className={clsx(
            "absolute mt-2 bg-[var(--color-bg)] border border-[var(--color-border)] shadow-lg rounded-[var(--radius-md)] overflow-hidden animate-dropdown",
            widthMap[width],
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {children}
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        .animate-dropdown {
          animation: dropdown var(--duration-normal) var(--ease);
        }
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------
   Dropdown Item
------------------------------ */

export function DropdownItem({
  children,
  onClick,
  danger = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full text-right px-4 py-2 text-sm transition-all duration-150",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        danger
          ? "text-[var(--color-danger)]"
          : "text-[var(--color-fg)]"
      )}
    >
      {children}
    </button>
  );
}
