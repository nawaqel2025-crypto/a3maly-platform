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
        <label className="text-[var(--color-fg)] text-sm font-medium">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md border transition-all duration-200",
          "bg-[var(--color-bg)] text-[var(--color-fg)]",
          "border-[var(--color-border)]",
          "focus-within:border-[var(--color-primary)] focus-within:shadow-sm",
          error && "border-[var(--color-danger)]",
          props.disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {/* Icon */}
        {icon && <span className="text-[var(--color-fg-muted)]">{icon}</span>}

        {/* Input Element */}
        <input
          {...props}
          className={clsx(
            "flex-1 bg-transparent outline-none",
            "text-[var(--color-fg)] placeholder-[var(--color-fg-muted)]"
          )}
        />
      </div>

      {/* Error Message */}
      {error && (
        <span className="text-[var(--color-danger)] text-xs font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
