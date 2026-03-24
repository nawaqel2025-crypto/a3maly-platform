// accounting/settings/chartOfAccounts/accountMapping.ts

export interface AccountMapping {
  id: string;

  // Sales
  salesRevenueAccount?: string;
  salesReturnAccount?: string;

  // Inventory
  inventoryAccount?: string;
  cogsAccount?: string;

  // Fixed Assets
  depreciationExpenseAccount?: string;
  accumulatedDepreciationAccount?: string;

  // Payables
  apControlAccount?: string;

  // Receivables
  arControlAccount?: string;

  createdAt: string;
  updatedAt: string;
}
