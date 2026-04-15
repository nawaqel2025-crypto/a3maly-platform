"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiSave } from "react-icons/fi";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DefaultAccountsPage() {
  const [loading, setLoading] = useState(true);
  const [recordId, setRecordId] = useState<string | null>(null);

  const [form, setForm] = useState({
    sales_account: "",
    purchases_account: "",
    vat_account: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch default accounts
  const fetchDefaults = async () => {
    const { data } = await supabase
      .from("default_accounts")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setRecordId(data.id);
      setForm({
        sales_account: data.sales_account || "",
        purchases_account: data.purchases_account || "",
        vat_account: data.vat_account || "",
      });
    }

    setLoading(false);
  };

  // Save default accounts
  const saveDefaults = async () => {
    setLoading(true);

    if (recordId) {
      await supabase
        .from("default_accounts")
        .update({ ...form, updated_at: new Date() })
        .eq("id", recordId);
    } else {
      const { data } = await supabase
        .from("default_accounts")
        .insert([{ ...form }])
        .select()
        .single();

      if (data) setRecordId(data.id);
    }

    setLoading(false);
    alert("تم حفظ الحسابات الافتراضية بنجاح");
  };

  useEffect(() => {
    fetchDefaults();
  }, []);

  if (loading)
    return <p className="text-[var(--a3-text-secondary)]">جاري التحميل...</p>;

  return (
    <div className="space-y-10" dir="rtl">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--a3-text-primary)]">
            الحسابات الافتراضية
          </h2>
          <p className="mt-1 text-[14px] text-[var(--a3-text-secondary)]">
            ربط النظام بالحسابات الأساسية — تصميم عالمي فاخر
          </p>
        </div>

        <Button
          onClick={saveDefaults}
          className="flex items-center gap-2"
        >
          <FiSave size={18} />
          حفظ
        </Button>
      </div>

      <Card className="max-w-xl space-y-6">

        <h3 className="text-[20px] font-bold text-[var(--a3-text-primary)]">
          الحسابات الافتراضية
        </h3>

        <Input
          name="sales_account"
          label="حساب المبيعات"
          value={form.sales_account}
          onChange={handleChange}
          placeholder="مثال: 411000 — المبيعات"
        />
        <Input
          name="purchases_account"
          label="حساب المشتريات"
          value={form.purchases_account}
          onChange={handleChange}
          placeholder="مثال: 511000 — المشتريات"
        />
        <Input
          name="vat_account"
          label="حساب ضريبة القيمة المضافة"
          value={form.vat_account}
          onChange={handleChange}
          placeholder="مثال: 217000 — ضريبة القيمة المضافة"
        />

        <p className="text-[14px] text-[var(--a3-text-secondary)]">
          سيتم استخدام هذه الحسابات تلقائيًا في الفواتير، القيود، والتقارير.
        </p>

      </Card>
    </div>
  );
}
