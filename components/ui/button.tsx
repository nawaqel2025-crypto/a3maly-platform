"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className,
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
    secondary:
      "bg-[var(--color-bg-muted)] text-[var(--color-fg)] hover:bg-gray-200 dark:hover:bg-gray-700",
    ghost:
      "bg-transparent text-[var(--color-fg)] hover:bg-gray-100 dark:hover:bg-gray-800",
    danger:
      "bg-[var(--color-danger)] text-white hover:bg-red-600",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {children}
    </button>
  );
}
