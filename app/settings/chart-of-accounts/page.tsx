'use client';

import { useState, useEffect } from 'react';
import TreeView from './TreeView';
import { buildAccountTree } from '@/accounting/settings/chartOfAccounts/accountHierarchy';

export default function ChartOfAccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAccounts() {
      try {
        const res = await fetch('/api/accounting/chart-of-accounts');
        const json = await res.json();
        setAccounts(json.data || []);
      } catch (err) {
        console.error('Failed to load accounts', err);
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, []);

  if (loading) {
    return <div className="p-6 text-lg">جاري تحميل الحسابات...</div>;
  }

  return (
    <div className="flex h-screen">

      {/* LEFT SIDE — TREE VIEW */}
      <div className="w-1/3 border-r p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">شجرة الحسابات</h2>

        <TreeView
          nodes={buildAccountTree(accounts)}
          onSelect={(acc) => setSelectedAccount(acc)}
        />
      </div>

      {/* RIGHT SIDE — ACCOUNT DETAILS */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">تفاصيل الحساب</h2>

        {!selectedAccount && (
          <div className="text-gray-500">
            اختر حسابًا من الشجرة لعرض التفاصيل…
          </div>
        )}

        {selectedAccount && (
          <div className="space-y-2">
            <p><strong>الكود:</strong> {selectedAccount.code}</p>
            <p><strong>الاسم:</strong> {selectedAccount.name}</p>
            <p><strong>النوع:</strong> {selectedAccount.type}</p>
            <p><strong>الطبيعة:</strong> {selectedAccount.nature}</p>
            <p><strong>المستوى:</strong> {selectedAccount.level}</p>
            <p><strong>نشط؟</strong> {selectedAccount.isActive ? 'نعم' : 'لا'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
