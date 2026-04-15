"use client";

import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label className="text-[14px] font-medium text-[var(--a3-text-secondary)]">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={clsx(
          "flex min-h-[42px] items-center gap-2 rounded-[8px] border px-3 py-2 transition-colors",
          "bg-[var(--a3-surface)] text-[var(--a3-text-primary)] border-[var(--a3-border)]",
          "focus-within:border-[var(--a3-primary)] focus-within:ring-2 focus-within:ring-[var(--a3-primary)]/15",
          error && "border-[var(--a3-danger)]",
          props.disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {/* Icon */}
        {icon && <span className="text-[var(--a3-text-secondary)]">{icon}</span>}

        {/* Input Element */}
        <input
          {...props}
          className={clsx(
            "flex-1 bg-transparent outline-none",
            "text-[var(--a3-text-primary)] placeholder-[var(--a3-text-secondary)]"
          )}
        />
      </div>

      {/* Error Message */}
      {error && (
        <span className="text-[var(--a3-danger)] text-xs font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
