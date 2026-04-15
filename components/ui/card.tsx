"use client";

import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: "none" | "sm" | "md" | "lg";
  padding?: "none" | "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg";
}

export default function Card({
  children,
  shadow = "sm",
  padding = "md",
  radius = "md",
  className,
  ...props
}: CardProps) {
  const shadowMap = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const paddingMap = {
    none: "p-0",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  const radiusMap = {
    sm: "rounded-[var(--radius-sm)]",
    md: "rounded-[var(--radius-md)]",
    lg: "rounded-[var(--radius-lg)]",
  };

  return (
    <div
      className={clsx(
        "bg-[var(--a3-surface)] border border-[var(--a3-border)] transition-all duration-200",
        shadowMap[shadow],
        paddingMap[padding],
        radiusMap[radius],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
