"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateAccountPage({ params }: any) {
  const companyId = params.id;
  const router = useRouter();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [accountType, setAccountType] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [level, setLevel] = useState(1);
  const [isActive, setIsActive] = useState(true);

  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    const { data } = await supabase
      .from("chart_of_accounts")
      .select("id, name, code")
      .eq("company_id", companyId)
      .order("code", { ascending: true });

    if (data) setAccounts(data);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const { error } = await supabase.from("chart_of_accounts").insert({
      company_id: companyId,
      name,
      code,
      account_type: accountType,
      parent_id: parentId || null,
      level,
      is_active: isActive,
      is_leaf: true,
    });

    if (!error) {
      router.push(`/dashboard/companies/${companyId}/chart-of-accounts`);
    }
  }

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">إضافة حساب جديد</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-xl"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">اسم الحساب</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">كود الحساب</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">نوع الحساب</label>
          <select
            className="w-full border p-2 rounded"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          >
            <option value="">اختر النوع</option>
            <option value="asset">أصل</option>
            <option value="liability">التزام</option>
            <option value="equity">حقوق ملكية</option>
            <option value="revenue">إيراد</option>
            <option value="expense">مصروف</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">الحساب الأب</label>
          <select
            className="w-full border p-2 rounded"
            value={parentId || ""}
            onChange={(e) => setParentId(e.target.value || null)}
          >
            <option value="">بدون (حساب رئيسي)</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.code} — {acc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">المستوى</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            min={1}
            required
          />
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label className="font-medium">الحساب مفعل</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          حفظ الحساب
        </button>
      </form>
    </div>
  );
}
