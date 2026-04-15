"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiSave } from "react-icons/fi";

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
    return <p className="text-gray-900 dark:text-gray-100">جاري التحميل...</p>;

  return (
    <div className="text-gray-900 dark:text-gray-100 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            الفترات المحاسبية
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            تحديد الفترة المحاسبية المعتمدة — تصميم عالمي فاخر
          </p>
        </div>

        <button
          onClick={savePeriods}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FiSave size={18} />
          حفظ
        </button>
      </div>

      {/* Card */}
      <div className="p-6 bg-white dark:bg-gray-900 border rounded-xl shadow-lg space-y-6 max-w-xl">

        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
          الفترة المحاسبية
        </h3>

        <div>
          <label className="block mb-1 text-sm font-medium">تاريخ البداية</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">تاريخ النهاية</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          تُستخدم هذه الفترة في التقارير المالية، الإقفال المحاسبي، والفواتير.
        </p>

      </div>
    </div>
  );
}
