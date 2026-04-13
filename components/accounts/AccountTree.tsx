"use client";

import { useState } from "react";

export type Account = {
  id: number;
  code: string;
  name: string;
  parent_id: number | null;
  is_group: boolean;
  children?: Account[];
};

type AccountTreeProps = {
  accounts: Account[];
  onSelect: (acc: Account) => void;
};

export default function AccountTree({ accounts, onSelect }: AccountTreeProps) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const handleSelect = (acc: Account) => {
    if (acc.is_group) return; // منع اختيار الحسابات التجميعية
    setSelectedId(acc.id);
    onSelect(acc);
  };

  const renderNode = (node: Account, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const isSelected = selectedId === node.id;

    return (
      <div key={node.id}>
        <div
          className={`
            flex items-center gap-2 py-1 px-2 rounded-lg cursor-pointer
            ${isSelected ? "bg-blue-600 text-white" : "hover:bg-[var(--color-bg-soft)]"}
          `}
          style={{ paddingRight: level * 16 }}
          onClick={() => handleSelect(node)}
        >
          {/* زر الفتح/الإغلاق */}
          {hasChildren ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              className="w-5 text-xs text-[var(--color-fg-muted)]"
            >
              {isExpanded ? "▾" : "▸"}
            </button>
          ) : (
            <span className="w-5" />
          )}

          {/* الأيقونة حسب نوع الحساب */}
          <span className="text-sm">
            {node.is_group ? "📂" : "📄"}
          </span>

          {/* الكود + الاسم */}
          <span className="text-sm font-mono text-[var(--color-fg-muted)]">
            {node.code}
          </span>
          <span className="text-sm font-medium">{node.name}</span>
        </div>

        {/* الأبناء */}
        {hasChildren && isExpanded && (
          <div className="border-r border-dashed border-[var(--color-border-soft)] mr-4">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {accounts.map((acc) => renderNode(acc, 0))}
    </div>
  );
}
