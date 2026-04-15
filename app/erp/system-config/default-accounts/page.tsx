"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiSave } from "react-icons/fi";

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
    return <p className="text-gray-900 dark:text-gray-100">جاري التحميل...</p>;

  return (
    <div className="text-gray-900 dark:text-gray-100 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            الحسابات الافتراضية
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            ربط النظام بالحسابات الأساسية — تصميم عالمي فاخر
          </p>
        </div>

        <button
          onClick={saveDefaults}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FiSave size={18} />
          حفظ
        </button>
      </div>

      {/* Card */}
      <div className="p-6 bg-white dark:bg-gray-900 border rounded-xl shadow-lg space-y-6 max-w-xl">

        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
          الحسابات الافتراضية
        </h3>

        <div>
          <label className="block mb-1 text-sm font-medium">حساب المبيعات</label>
          <input
            name="sales_account"
            value={form.sales_account}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800"
            placeholder="مثال: 411000 — المبيعات"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">حساب المشتريات</label>
          <input
            name="purchases_account"
            value={form.purchases_account}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800"
            placeholder="مثال: 511000 — المشتريات"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">حساب ضريبة القيمة المضافة</label>
          <input
            name="vat_account"
            value={form.vat_account}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800"
            placeholder="مثال: 217000 — ضريبة القيمة المضافة"
          />
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          سيتم استخدام هذه الحسابات تلقائيًا في الفواتير، القيود، والتقارير.
        </p>

      </div>
    </div>
  );
}
