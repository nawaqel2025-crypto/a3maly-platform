// accounting/settings/chartOfAccounts/accountHierarchy.ts

import type { Account } from './accountMaster';

export function buildAccountTree(accounts: Account[]) {
  const map = new Map<string, Account & { children: Account[] }>();

  accounts.forEach(acc => {
    map.set(acc.id, { ...acc, children: [] });
  });

  const roots: (Account & { children: Account[] })[] = [];

  map.forEach(acc => {
    if (acc.parentId) {
      const parent = map.get(acc.parentId);
      if (parent) parent.children.push(acc);
    } else {
      roots.push(acc);
    }
  });

  return roots;
}
