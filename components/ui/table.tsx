"use client";

import React from "react";
import clsx from "clsx";

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={clsx("min-w-full text-right text-[14px] text-[var(--a3-text-primary)]", className)}
      {...props}
    />
  );
}

export function TableWrapper({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "overflow-x-auto rounded-[12px] border border-[var(--a3-border)] bg-[var(--a3-surface)]",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={clsx("bg-[#F1F5F9]", className)} {...props} />;
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={clsx(className)} {...props} />;
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={clsx(
        "border-t border-[var(--a3-border)] transition-colors hover:bg-[var(--a3-background)]",
        className
      )}
      {...props}
    />
  );
}

export function TableHeaderCell({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={clsx(
        "h-12 px-4 py-3 text-right text-[14px] font-semibold text-[var(--a3-text-primary)]",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={clsx("h-11 px-4 py-3", className)} {...props} />;
}
