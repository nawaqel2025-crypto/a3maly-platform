"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors border disabled:opacity-60 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-3 py-1.5 text-[14px] rounded-[8px]",
    md: "px-4 py-2 text-[16px] rounded-[8px]",
    lg: "px-5 py-3 text-[18px] rounded-[8px]",
  };

  const variants = {
    primary:
      "bg-[var(--a3-primary)] border-[var(--a3-primary)] text-white hover:bg-[var(--a3-primary-dark)] hover:border-[var(--a3-primary-dark)]",
    secondary:
      "bg-[var(--a3-border)] border-[var(--a3-border)] text-[var(--a3-text-primary)] hover:bg-[#cbd5e1] hover:border-[#cbd5e1]",
    outline:
      "bg-transparent border-[var(--a3-primary)] text-[var(--a3-primary)] hover:bg-[var(--a3-primary)]/10",
    danger:
      "bg-[var(--a3-danger)] border-[var(--a3-danger)] text-white hover:brightness-95",
    ghost:
      "bg-transparent border-transparent text-[var(--a3-text-primary)] hover:bg-[var(--a3-border)]",
  };

  return (
    <button
      className={clsx(base, sizes[size], variants[variant], className)}
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
