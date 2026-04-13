export async function useCustomers(companyId?: string) {
  const url = companyId
    ? `/api/customers?companyId=${companyId}`
    : `/api/customers`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
}
