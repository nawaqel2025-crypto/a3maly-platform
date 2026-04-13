export async function useInventory(companyId?: string) {
  const url = companyId
    ? `/api/inventory/items?companyId=${companyId}`
    : `/api/inventory/items`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
}
