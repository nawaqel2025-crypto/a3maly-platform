"use client";

import React from "react";
import clsx from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
  rounded?: "sm" | "full";
}

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  rounded = "sm",
  className,
  ...props
}: BadgeProps) {
  const variantMap = {
    success: "bg-[var(--a3-success)]/15 text-[var(--a3-success)]",
    warning: "bg-[var(--a3-warning)]/15 text-[var(--a3-warning)]",
    danger: "bg-[var(--a3-danger)]/15 text-[var(--a3-danger)]",
    info: "bg-[var(--a3-info)]/15 text-[var(--a3-info)]",
    neutral: "bg-[var(--a3-border)] text-[var(--a3-text-secondary)]",
  };

  const sizeMap = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  const roundedMap = {
    sm: "rounded-[var(--radius-sm)]",
    full: "rounded-full",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium transition-all duration-200",
        variantMap[variant],
        sizeMap[size],
        roundedMap[rounded],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
