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
    success: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
    warning: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]",
    danger: "bg-[var(--color-danger)]/15 text-[var(--color-danger)]",
    info: "bg-blue-500/15 text-blue-500",
    neutral: "bg-[var(--color-bg-muted)] text-[var(--color-fg-muted)]",
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
