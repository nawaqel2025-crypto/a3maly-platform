"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

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
    <div className="space-y-8" dir="rtl">
      <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">
        الفروع
      </h1>

      <Card className="max-w-xl space-y-4">
        <h2 className="text-[20px] font-semibold">إضافة فرع جديد</h2>

        <div className="space-y-3">
          <Input type="text" placeholder="اسم الفرع" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="text" placeholder="كود الفرع" value={code} onChange={(e) => setCode(e.target.value)} />

          <select
            className="min-h-[42px] w-full rounded-[8px] border border-[var(--a3-border)] bg-[var(--a3-surface)] px-3"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="SAR">SAR — ريال سعودي</option>
            <option value="USD">USD — دولار</option>
            <option value="AED">AED — درهم</option>
            <option value="EGP">EGP — جنيه</option>
          </select>

          <Button onClick={addBranch}>إضافة الفرع</Button>
        </div>
      </Card>

      <div className="max-w-3xl overflow-hidden rounded-[12px] border border-[var(--a3-border)]">
        <table className="w-full text-sm">
          <thead className="bg-[#F1F5F9] text-[var(--a3-text-primary)]">
            <tr>
              <th className="p-2 text-right">الكود</th>
              <th className="p-2 text-right">اسم الفرع</th>
              <th className="p-2 text-right">العملة</th>
            </tr>
          </thead>

          <tbody>
            {branches.map((b) => (
              <tr key={b.id} className="border-t border-[var(--a3-border)] hover:bg-[var(--a3-background)]">
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
