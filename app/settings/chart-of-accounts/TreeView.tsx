'use client';

import { useState } from 'react';

export default function TreeView({ nodes, onSelect }) {
  return (
    <div>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} onSelect={onSelect} />
      ))}
    </div>
  );
}

function TreeNode({ node, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="mb-1">
      <div
        className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
        onClick={() => onSelect(node)}
      >
        {hasChildren && (
          <button
            className="mr-2 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? '−' : '+'}
          </button>
        )}

        <span>{node.code} — {node.name}</span>
      </div>

      {expanded && hasChildren && (
        <div className="ml-6 border-l pl-3">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
