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

export default function PeriodsSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [recordId, setRecordId] = useState<string | null>(null);

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch periods
  const fetchPeriods = async () => {
    const { data } = await supabase
      .from("periods")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setRecordId(data.id);
      setForm({
        start_date: data.start_date || "",
        end_date: data.end_date || "",
      });
    }

    setLoading(false);
  };

  // Save periods
  const savePeriods = async () => {
    setLoading(true);

    if (recordId) {
      await supabase
        .from("periods")
        .update({ ...form, updated_at: new Date() })
        .eq("id", recordId);
    } else {
      const { data } = await supabase
        .from("periods")
        .insert([{ ...form }])
        .select()
        .single();

      if (data) setRecordId(data.id);
    }

    setLoading(false);
    alert("تم حفظ الفترات المحاسبية بنجاح");
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  if (loading)
    return <p className="text-[var(--a3-text-secondary)]">جاري التحميل...</p>;

  return (
    <div className="space-y-10" dir="rtl">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--a3-text-primary)]">
            الفترات المحاسبية
          </h2>
          <p className="mt-1 text-[14px] text-[var(--a3-text-secondary)]">
            تحديد الفترة المحاسبية المعتمدة — تصميم عالمي فاخر
          </p>
        </div>

        <Button
          onClick={savePeriods}
          className="flex items-center gap-2"
        >
          <FiSave size={18} />
          حفظ
        </Button>
      </div>

      <Card className="max-w-xl space-y-6">

        <h3 className="text-[20px] font-bold text-[var(--a3-text-primary)]">
          الفترة المحاسبية
        </h3>

        <Input
          type="date"
          name="start_date"
          label="تاريخ البداية"
          value={form.start_date}
          onChange={handleChange}
        />

        <Input
          type="date"
          name="end_date"
          label="تاريخ النهاية"
          value={form.end_date}
          onChange={handleChange}
        />

        <p className="text-[14px] text-[var(--a3-text-secondary)]">
          تُستخدم هذه الفترة في التقارير المالية، الإقفال المحاسبي، والفواتير.
        </p>

      </Card>
    </div>
  );
}
