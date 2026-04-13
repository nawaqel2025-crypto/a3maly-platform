"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Account {
  id: number;
  code: string;
  name: string;
  account_type: string;
  normal_balance: string;
  parent_id: number | null;
  level: number;
  is_posting: boolean;
  is_active: boolean;
  children?: Account[];
}

export default function ChartOfAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [tree, setTree] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch accounts
  useEffect(() => {
    async function loadAccounts() {
      const { data, error } = await supabase
        .from("chart_of_accounts")
        .select("*")
        .order("code", { ascending: true });

      if (error) {
        console.error("Error loading accounts:", error);
      } else {
        setAccounts(data as Account[]);
        setTree(buildTree(data as Account[]));
      }

      setLoading(false);
    }

    loadAccounts();
  }, []);

  // Build hierarchical tree
  function buildTree(list: Account[]) {
    const map: Record<number, Account> = {};
    const roots: Account[] = [];

    list.forEach((acc) => {
      map[acc.id] = { ...acc, children: [] };
    });

    list.forEach((acc) => {
      if (acc.parent_id) {
        map[acc.parent_id].children!.push(map[acc.id]);
      } else {
        roots.push(map[acc.id]);
      }
    });

    return roots;
  }

  // Render tree recursively
  function renderNode(node: Account) {
    return (
      <div key={node.id} className="ml-4 border-r pr-4">
        <div className="py-1 flex justify-between">
          <span>
            <strong>{node.code}</strong> — {node.name}
          </span>
          <span className="text-xs text-gray-500">
            {node.is_posting ? "حساب تفصيلي" : "حساب تجميعي"}
          </span>
        </div>

        {node.children && node.children.length > 0 && (
          <div className="ml-4 border-r border-gray-300">
            {node.children.map((child) => renderNode(child))}
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return <p>جاري تحميل شجرة الحسابات...</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">شجرة الحسابات</h1>
      <p className="text-gray-500">عرض هرمي كامل لشجرة الحسابات من Supabase.</p>

      <div className="mt-6">
        {tree.length === 0 ? (
          <p className="text-gray-500">لا توجد حسابات بعد.</p>
        ) : (
          tree.map((node) => renderNode(node))
        )}
      </div>
    </div>
  );
}