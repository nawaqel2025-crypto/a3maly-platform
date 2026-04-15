"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiSave } from "react-icons/fi";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NumberingSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [recordId, setRecordId] = useState<string | null>(null);

  const [form, setForm] = useState({
    prefix: "",
    start_number: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch numbering settings
  const fetchNumbering = async () => {
    const { data } = await supabase
      .from("numbering_settings")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setRecordId(data.id);
      setForm({
        prefix: data.prefix || "",
        start_number: data.start_number || "",
      });
    }

    setLoading(false);
  };

  // Save numbering settings
  const saveNumbering = async () => {
    setLoading(true);

    if (recordId) {
      await supabase
        .from("numbering_settings")
        .update({ ...form, updated_at: new Date() })
        .eq("id", recordId);
    } else {
      const { data } = await supabase
        .from("numbering_settings")
        .insert([{ ...form }])
        .select()
        .single();

      if (data) setRecordId(data.id);
    }

    setLoading(false);
    alert("تم حفظ إعدادات الترقيم بنجاح");
  };

  useEffect(() => {
    fetchNumbering();
  }, []);

  if (loading)
    return <p className="text-gray-900 dark:text-gray-100">جاري التحميل...</p>;

  return (
    <div className="text-gray-900 dark:text-gray-100 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            إعدادات الترقيم
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            إعداد البادئة ورقم البداية — تصميم عالمي فاخر
          </p>
        </div>

        <button
          onClick={saveNumbering}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FiSave size={18} />
          حفظ
        </button>
      </div>

      {/* Card */}
      <div className="p-6 bg-white dark:bg-gray-900 border rounded-xl shadow-lg space-y-6 max-w-xl">

        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
          إعدادات الترقيم
        </h3>

        <div>
          <label className="block mb-1 text-sm font-medium">البادئة</label>
          <input
            name="prefix"
            value={form.prefix}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="مثال: INV أو PO أو JV"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">رقم البداية</label>
          <input
            type="number"
            name="start_number"
            value={form.start_number}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="مثال: 1000"
          />
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          تُستخدم هذه الإعدادات في إنشاء أرقام المستندات مثل الفواتير، القيود، أوامر الشراء، وغيرها.
        </p>

      </div>
    </div>
  );
}
