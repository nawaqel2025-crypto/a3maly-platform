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

export default function GeneralSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [recordId, setRecordId] = useState<string | null>(null);

  const [form, setForm] = useState({
    fiscal_start: "",
    fiscal_end: "",
    allow_past: false,
    allow_future: false,
    require_description: true,
  });

  const handleChange = (e: any) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Fetch settings
  const fetchSettings = async () => {
    const { data } = await supabase
      .from("general_settings")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setRecordId(data.id);
      setForm({
        fiscal_start: data.fiscal_start || "",
        fiscal_end: data.fiscal_end || "",
        allow_past: data.allow_past || false,
        allow_future: data.allow_future || false,
        require_description: data.require_description ?? true,
      });
    }

    setLoading(false);
  };

  // Save settings
  const saveSettings = async () => {
    setLoading(true);

    if (recordId) {
      await supabase
        .from("general_settings")
        .update({ ...form, updated_at: new Date() })
        .eq("id", recordId);
    } else {
      const { data } = await supabase
        .from("general_settings")
        .insert([{ ...form }])
        .select()
        .single();

      if (data) setRecordId(data.id);
    }

    setLoading(false);
    alert("تم حفظ الإعدادات العامة بنجاح");
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading)
    return <p className="text-[var(--a3-text-secondary)]">جاري التحميل...</p>;

  return (
    <div className="space-y-10" dir="rtl">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--a3-text-primary)]">
            الإعدادات العامة
          </h2>
          <p className="mt-1 text-[14px] text-[var(--a3-text-secondary)]">
            إعدادات النظام الأساسية — تصميم عالمي فاخر
          </p>
        </div>

        <Button
          onClick={saveSettings}
          className="flex items-center gap-2"
        >
          <FiSave size={18} />
          حفظ
        </Button>
      </div>

      {/* Cards Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* Card 1 — Fiscal Year */}
        <Card className="space-y-4">
          <h3 className="text-[20px] font-bold text-[var(--a3-text-primary)]">
            السنة المالية
          </h3>

          <Input
            type="date"
            name="fiscal_start"
            label="تاريخ البداية"
            value={form.fiscal_start}
            onChange={handleChange}
          />

          <Input
            type="date"
            name="fiscal_end"
            label="تاريخ النهاية"
            value={form.fiscal_end}
            onChange={handleChange}
          />
        </Card>

        {/* Card 2 — Journal Options */}
        <Card className="space-y-4">
          <h3 className="text-[20px] font-bold text-[var(--a3-text-primary)]">
            خيارات القيود المحاسبية
          </h3>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="allow_past"
              checked={form.allow_past}
              onChange={handleChange}
              className="h-5 w-5 accent-[var(--a3-primary)]"
            />
            <span>السماح بالقيود بتاريخ سابق</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="allow_future"
              checked={form.allow_future}
              onChange={handleChange}
              className="h-5 w-5 accent-[var(--a3-primary)]"
            />
            <span>السماح بالقيود بتاريخ مستقبلي</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="require_description"
              checked={form.require_description}
              onChange={handleChange}
              className="h-5 w-5 accent-[var(--a3-primary)]"
            />
            <span>إلزامية البيان في القيود</span>
          </label>
        </Card>

      </div>
    </div>
  );
}
