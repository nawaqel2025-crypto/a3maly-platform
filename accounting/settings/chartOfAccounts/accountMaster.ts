// accounting/settings/chartOfAccounts/accountMaster.ts

export type AccountNature =
  | 'DEBIT'
  | 'CREDIT';

export type AccountType =
  | 'ASSET'
  | 'LIABILITY'
  | 'EQUITY'
  | 'REVENUE'
  | 'EXPENSE';

export interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  nature: AccountNature;
  parentId?: string | null;
  level: number;
  allowPosting: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
