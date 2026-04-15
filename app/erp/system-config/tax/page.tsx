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

export default function TaxSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [recordId, setRecordId] = useState<string | null>(null);

  const [form, setForm] = useState({
    tax_percentage: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch tax settings
  const fetchTax = async () => {
    const { data } = await supabase
      .from("tax_settings")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setRecordId(data.id);
      setForm({
        tax_percentage: data.tax_percentage || "",
      });
    }

    setLoading(false);
  };

  // Save tax settings
  const saveTax = async () => {
    setLoading(true);

    if (recordId) {
      await supabase
        .from("tax_settings")
        .update({ ...form, updated_at: new Date() })
        .eq("id", recordId);
    } else {
      const { data } = await supabase
        .from("tax_settings")
        .insert([{ ...form }])
        .select()
        .single();

      if (data) setRecordId(data.id);
    }

    setLoading(false);
    alert("تم حفظ إعدادات الضريبة بنجاح");
  };

  useEffect(() => {
    fetchTax();
  }, []);

  if (loading)
    return <p className="text-[var(--a3-text-secondary)]">جاري التحميل...</p>;

  return (
    <div className="space-y-10" dir="rtl">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--a3-text-primary)]">
            إعدادات الضريبة
          </h2>
          <p className="mt-1 text-[14px] text-[var(--a3-text-secondary)]">
            إعداد نسبة ضريبة القيمة المضافة — تصميم عالمي فاخر
          </p>
        </div>

        <Button
          onClick={saveTax}
          className="flex items-center gap-2"
        >
          <FiSave size={18} />
          حفظ
        </Button>
      </div>

      <Card className="max-w-xl space-y-6">

        <h3 className="text-[20px] font-bold text-[var(--a3-text-primary)]">
          نسبة ضريبة القيمة المضافة
        </h3>

        <Input
          type="number"
          name="tax_percentage"
          label="نسبة الضريبة (%)"
          value={form.tax_percentage}
          onChange={handleChange}
          placeholder="مثال: 15"
        />

        <p className="text-[14px] text-[var(--a3-text-secondary)]">
          هذه النسبة تُستخدم في حساب ضريبة المخرجات والمدخلات والفواتير الإلكترونية.
        </p>

      </Card>
    </div>
  );
}
