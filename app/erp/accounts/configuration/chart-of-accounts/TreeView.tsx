"use client";

import { useEffect, useMemo, useState } from "react";
import TreeNode from "./TreeNode";
import TreeSearch from "./TreeSearch";
import type { TreeNodeType } from "../../lib/buildChartTree";

type Props = {
  initialTree: TreeNodeType[];
};

function filterTree(nodes: TreeNodeType[], query: string): TreeNodeType[] {
  if (!query) return nodes;
  const q = query.toLowerCase();

  const walk = (node: TreeNodeType): TreeNodeType | null => {
    const selfMatch =
      node.name.toLowerCase().includes(q) ||
      node.code.toLowerCase().includes(q);

    const children = node.children
      .map(walk)
      .filter((c): c is TreeNodeType => c !== null);

    if (selfMatch || children.length > 0) {
      return { ...node, children };
    }
    return null;
  };

  return nodes
    .map(walk)
    .filter((n): n is TreeNodeType => n !== null);
}

export default function TreeView({ initialTree }: Props) {
  const [tree] = useState<TreeNodeType[]>(initialTree);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // الشجرة مطوية بالكامل عند البداية
  useEffect(() => {
    setExpanded({});
  }, [initialTree]);

  const filteredTree = useMemo(
    () => filterTree(tree, searchQuery),
    [tree, searchQuery]
  );

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      <TreeSearch query={searchQuery} onChange={setSearchQuery} />

      <div className="rounded border bg-white p-3 text-sm">
        {filteredTree.length === 0 ? (
          <div className="text-gray-400 text-center py-6">
            لا توجد نتائج مطابقة لبحثك.
          </div>
        ) : (
          filteredTree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              expanded={expanded}
              toggle={toggle}
              searchQuery={searchQuery}
            />
          ))
        )}
      </div>
    </div>
  );
}
