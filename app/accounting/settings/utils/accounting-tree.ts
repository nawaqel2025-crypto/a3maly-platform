// modules/accounting/utils/accounting-tree.ts

export type ChartAccount = {
  id: string;
  code: string;
  name: string;
  english_name?: string;
  parent_id: string | null;
  level: number;
  is_leaf: boolean;
  account_type: string;
  allow_posting: boolean;
  is_cost_center: boolean;
  tax_applicable: boolean;
  opening_debit: number;
  opening_credit: number;
  opening_date: string | null;
  description?: string;
};

export type TreeNode = ChartAccount & {
  children: TreeNode[];
};

export function buildTree(accounts: ChartAccount[]): TreeNode[] {
  const map = new Map<string, TreeNode>();

  accounts.forEach((acc) => {
    map.set(acc.id, { ...acc, children: [] });
  });

  const roots: TreeNode[] = [];

  map.forEach((node) => {
    if (node.parent_id) {
      const parent = map.get(node.parent_id);
      if (parent) parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  // ترتيب الشجرة حسب الكود
  const sortTree = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => a.code.localeCompare(b.code));
    nodes.forEach((n) => sortTree(n.children));
  };

  sortTree(roots);

  return roots;
}