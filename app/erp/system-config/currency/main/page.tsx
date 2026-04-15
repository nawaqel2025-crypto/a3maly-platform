"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function MainCurrencyPage() {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [mainCurrency, setMainCurrency] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch all currencies
  const fetchCurrencies = async () => {
    const { data } = await supabase
      .from("currency_settings")
      .select("*")
      .order("currency_code", { ascending: true });

    if (data) setCurrencies(data);
  };

  // Fetch main currency from system_settings
  const fetchMainCurrency = async () => {
    const { data } = await supabase
      .from("system_settings")
      .select("main_currency")
      .limit(1)
      .single();

    if (data?.main_currency) setMainCurrency(data.main_currency);
  };

  // Save main currency
  const saveMainCurrency = async () => {
    setSaving(true);

    // Check if row exists
    const { data } = await supabase
      .from("system_settings")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      // Update
      await supabase
        .from("system_settings")
        .update({ main_currency: mainCurrency })
        .eq("id", data.id);
    } else {
      // Insert
      await supabase.from("system_settings").insert({
        main_currency: mainCurrency,
      });
    }

    setSaving(false);
    alert("تم حفظ العملة الرئيسية بنجاح");
  };

  useEffect(() => {
    (async () => {
      await fetchCurrencies();
      await fetchMainCurrency();
      setLoading(false);
    })();
  }, []);

  if (loading)
    return <p className="text-gray-900 dark:text-gray-100">جاري التحميل...</p>;

  return (
    <div className="text-gray-900 dark:text-gray-100 space-y-8">

      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
        اختيار العملة الرئيسية
      </h2>

      <p className="text-gray-600 dark:text-gray-400 text-sm">
        اختر العملة التي سيتم استخدامها كعملة أساسية في النظام.
      </p>

      {/* Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">العملة الرئيسية</label>

        <select
          value={mainCurrency}
          onChange={(e) => setMainCurrency(e.target.value)}
          className="w-full border rounded-lg p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
          <option value="">— اختر العملة —</option>

          {currencies.map((c) => (
            <option key={c.id} value={c.currency_code}>
              {c.currency_name} ({c.currency_code})
            </option>
          ))}
        </select>
      </div>

      {/* Save Button */}
      <button
        onClick={saveMainCurrency}
        disabled={saving}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
      >
        {saving ? "جاري الحفظ..." : "حفظ"}
      </button>
    </div>
  );
}
