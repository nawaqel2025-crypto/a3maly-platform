// accounting/settings/chartOfAccounts/accountGroups.ts

export interface AccountGroup {
  id: string;
  name: string;
  description?: string;
  parentGroupId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const defaultAccountGroups: AccountGroup[] = [
  { id: '1', name: 'Current Assets', createdAt: '', updatedAt: '' },
  { id: '2', name: 'Fixed Assets', createdAt: '', updatedAt: '' },
  { id: '3', name: 'Current Liabilities', createdAt: '', updatedAt: '' },
  { id: '4', name: 'Equity', createdAt: '', updatedAt: '' },
  { id: '5', name: 'Revenue', createdAt: '', updatedAt: '' },
  { id: '6', name: 'Expenses', createdAt: '', updatedAt: '' }
];
