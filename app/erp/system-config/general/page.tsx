"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiSave } from "react-icons/fi";

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
    return <p className="text-gray-900 dark:text-gray-100">جاري التحميل...</p>;

  return (
    <div className="text-gray-900 dark:text-gray-100 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            الإعدادات العامة
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            إعدادات النظام الأساسية — تصميم عالمي فاخر
          </p>
        </div>

        <button
          onClick={saveSettings}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FiSave size={18} />
          حفظ
        </button>
      </div>

      {/* Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Card 1 — Fiscal Year */}
        <div className="p-6 bg-white dark:bg-gray-900 border rounded-xl shadow-lg space-y-4">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
            السنة المالية
          </h3>

          <div>
            <label className="block mb-1 text-sm font-medium">تاريخ البداية</label>
            <input
              type="date"
              name="fiscal_start"
              value={form.fiscal_start}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">تاريخ النهاية</label>
            <input
              type="date"
              name="fiscal_end"
              value={form.fiscal_end}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Card 2 — Journal Options */}
        <div className="p-6 bg-white dark:bg-gray-900 border rounded-xl shadow-lg space-y-4">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
            خيارات القيود المحاسبية
          </h3>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="allow_past"
              checked={form.allow_past}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span>السماح بالقيود بتاريخ سابق</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="allow_future"
              checked={form.allow_future}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span>السماح بالقيود بتاريخ مستقبلي</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="require_description"
              checked={form.require_description}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span>إلزامية البيان في القيود</span>
          </label>
        </div>

      </div>
    </div>
  );
}
