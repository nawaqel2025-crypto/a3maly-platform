"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Account {
  id: string;
  company_id: string;
  code: string;
  name: string;
  parent_id: string | null;
  level: number;
  account_type: string;
  is_leaf: boolean;
  is_active: boolean;
}

export default function ChartOfAccountsPage({ params }: any) {
  const companyId = params.id;
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [tree, setTree] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    const { data, error } = await supabase
      .from("chart_of_accounts")
      .select("*")
      .eq("company_id", companyId)
      .order("code", { ascending: true });

    if (!error && data) {
      setAccounts(data);
      setTree(buildTree(data));
    }
  }

  function buildTree(list: Account[]) {
    const map: any = {};
    const roots: any[] = [];

    list.forEach((acc) => (map[acc.id] = { ...acc, children: [] }));

    list.forEach((acc) => {
      if (acc.parent_id) {
        map[acc.parent_id].children.push(map[acc.id]);
      } else {
        roots.push(map[acc.id]);
      }
    });

    return roots;
  }

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function renderNode(node: any, level = 0) {
    const hasChildren = node.children.length > 0;
    const isOpen = expanded[node.id];

    return (
      <div key={node.id} className="mb-1">
        <div
          className="flex items-center cursor-pointer select-none"
          style={{ paddingRight: level * 20 }}
          onClick={() => hasChildren && toggle(node.id)}
        >
          {hasChildren ? (
            <span className="text-xl mr-2">{isOpen ? "▼" : "▶"}</span>
          ) : (
            <span className="text-xl mr-2 opacity-30">•</span>
          )}

          <span className="font-medium">{node.code} — {node.name}</span>

          <Link
            href={`/dashboard/companies/${companyId}/chart-of-accounts/${node.id}`}
            className="text-blue-600 mr-4 text-sm"
          >
            تفاصيل
          </Link>

          <Link
            href={`/dashboard/companies/${companyId}/chart-of-accounts/${node.id}/edit`}
            className="text-green-600 text-sm"
          >
            تعديل
          </Link>
        </div>

        {isOpen &&
          node.children.map((child: any) => renderNode(child, level + 1))}
      </div>
    );
  }

  return (
    <div className="p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">شجرة الحسابات</h1>

        <Link
          href={`/dashboard/companies/${companyId}/chart-of-accounts/create`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          إضافة حساب جديد
        </Link>
      </div>

      <div className="border rounded p-4 bg-white shadow">
        {tree.length === 0 ? (
          <p className="text-gray-500">لا توجد حسابات بعد.</p>
        ) : (
          tree.map((node) => renderNode(node))
        )}
      </div>
    </div>
  );
}
