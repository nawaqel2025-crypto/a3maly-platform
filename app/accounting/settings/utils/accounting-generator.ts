// modules/accounting/utils/accounting-generator.ts

export type AccountNode = {
  id: string;
  code: string;
  name: string;
  parent_id: string | null;
  level: number;
  is_leaf: boolean;
};

export function generateAccountCode(
  siblings: AccountNode[],
  parent: AccountNode | null
): string {
  // إذا كان الحساب بدون أب (حساب رئيسي)
  if (!parent) {
    const topLevel = siblings
      .filter((s) => s.parent_id === null)
      .map((s) => parseInt(s.code))
      .sort((a, b) => a - b);

    const next = topLevel.length > 0 ? topLevel[topLevel.length - 1] + 1 : 1;
    return next.toString().padStart(1, "0");
  }

  // إذا كان الحساب له أب
  const children = siblings
    .filter((s) => s.parent_id === parent.id)
    .map((s) => parseInt(s.code.split(".").pop() || "0"))
    .sort((a, b) => a - b);

  const nextChild = children.length > 0 ? children[children.length - 1] + 1 : 1;

  return `${parent.code}.${nextChild}`;
}
