export type TreeNodeType = {
  id: string;
  code: string;
  name: string;
  parent_id: string | null;
  is_group: boolean;
  children: TreeNodeType[];
};

export function buildChartTree(rows: any[]): TreeNodeType[] {
  const map: Record<string, TreeNodeType> = {};
  const roots: TreeNodeType[] = [];

  for (const r of rows) {
    map[r.id] = {
      id: r.id,
      code: r.code,
      name: r.name,
      parent_id: r.parent_id,
      is_group: r.is_group,
      children: [],
    };
  }

  for (const r of rows) {
    const node = map[r.id];
    if (r.parent_id && map[r.parent_id]) {
      map[r.parent_id].children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

