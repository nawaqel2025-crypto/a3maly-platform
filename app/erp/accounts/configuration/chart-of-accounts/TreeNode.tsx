"use client";

import type { TreeNodeType } from "../../lib/buildChartTree";

type Props = {
  node: TreeNodeType;
  level: number;
  expanded: Record<string, boolean>;
  toggle: (id: string) => void;
  searchQuery: string;
};

function highlight(text: string, query: string) {
  if (!query) return text;
  const q = query.toLowerCase();
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text;

  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-yellow-200">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function TreeNode({
  node,
  level,
  expanded,
  toggle,
  searchQuery,
}: Props) {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = expanded[node.id];

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1 pl-2 pr-2 rounded cursor-pointer hover:bg-gray-50"
        style={{ marginInlineStart: level * 16 }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => toggle(node.id)}
            className="w-4 h-4 flex items-center justify-center text-xs border rounded bg-gray-50"
          >
            {isOpen ? "−" : "+"}
          </button>
        ) : (
          <span className="w-4 h-4" />
        )}

        <span className="text-xs text-gray-500">{node.code}</span>

        <span className="text-sm">
          {highlight(node.name, searchQuery)}
        </span>

        {hasChildren && (
          <span className="ml-1 text-[10px] text-gray-400">
            ({node.children.length})
          </span>
        )}

        {node.is_group && (
          <span className="ml-1 text-[10px] px-1 rounded bg-blue-50 text-blue-600 border border-blue-100">
            مجموعة
          </span>
        )}
      </div>

      {isOpen && hasChildren && (
        <div className="border-s border-dashed ms-4 ps-3">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              toggle={toggle}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
}
