"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Branch = {
  id: number;
  name: string;
  code: string;
  currency: string;
};

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [currency, setCurrency] = useState("SAR");

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("branches")
      .select("*")
      .order("id");

    if (data) setBranches(data);

    setLoading(false);
  };

  const addBranch = async () => {
    if (!name || !code) return;

    await supabase.from("branches").insert({
      name,
      code,
      currency,
    });

    setName("");
    setCode("");
    setCurrency("SAR");

    loadBranches();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        الفروع
      </h1>

      {/* إضافة فرع */}
      <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-4 max-w-xl">
        <h2 className="text-lg font-semibold">إضافة فرع جديد</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="اسم الفرع"
            className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="كود الفرع"
            className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <select
            className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="SAR">SAR — ريال سعودي</option>
            <option value="USD">USD — دولار</option>
            <option value="AED">AED — درهم</option>
            <option value="EGP">EGP — جنيه</option>
          </select>

          <button
            onClick={addBranch}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            إضافة الفرع
          </button>
        </div>
      </div>

      {/* قائمة الفروع */}
      <div className="border rounded-lg overflow-hidden max-w-3xl">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-bg-muted)] text-[var(--color-fg)]">
            <tr>
              <th className="p-2 text-right">الكود</th>
              <th className="p-2 text-right">اسم الفرع</th>
              <th className="p-2 text-right">العملة</th>
            </tr>
          </thead>

          <tbody>
            {branches.map((b) => (
              <tr key={b.id} className="border-t border-[var(--color-border)]">
                <td className="p-2">{b.code}</td>
                <td className="p-2">{b.name}</td>
                <td className="p-2">{b.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
