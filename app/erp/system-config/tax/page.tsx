"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiSave } from "react-icons/fi";

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
    return <p className="text-gray-900 dark:text-gray-100">جاري التحميل...</p>;

  return (
    <div className="text-gray-900 dark:text-gray-100 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            إعدادات الضريبة
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            إعداد نسبة ضريبة القيمة المضافة — تصميم عالمي فاخر
          </p>
        </div>

        <button
          onClick={saveTax}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FiSave size={18} />
          حفظ
        </button>
      </div>

      {/* Card */}
      <div className="p-6 bg-white dark:bg-gray-900 border rounded-xl shadow-lg space-y-6 max-w-xl">

        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
          نسبة ضريبة القيمة المضافة
        </h3>

        <div>
          <label className="block mb-1 text-sm font-medium">
            نسبة الضريبة (%)
          </label>
          <input
            type="number"
            name="tax_percentage"
            value={form.tax_percentage}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="مثال: 15"
          />
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          هذه النسبة تُستخدم في حساب ضريبة المخرجات والمدخلات والفواتير الإلكترونية.
        </p>

      </div>
    </div>
  );
}
