"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

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
    return <p className="text-[var(--a3-text-secondary)]">جاري التحميل...</p>;

  return (
    <div className="space-y-8" dir="rtl">

      <h2 className="text-[24px] font-bold text-[var(--a3-text-primary)]">
        اختيار العملة الرئيسية
      </h2>

      <p className="text-[14px] text-[var(--a3-text-secondary)]">
        اختر العملة التي سيتم استخدامها كعملة أساسية في النظام.
      </p>

      <Card className="max-w-xl space-y-4">
        <div className="space-y-2">
          <label className="block text-[14px] font-medium text-[var(--a3-text-secondary)]">العملة الرئيسية</label>

          <select
            value={mainCurrency}
            onChange={(e) => setMainCurrency(e.target.value)}
            className="min-h-[42px] w-full rounded-[8px] border border-[var(--a3-border)] bg-[var(--a3-surface)] px-3 py-2 text-[var(--a3-text-primary)] outline-none focus:border-[var(--a3-primary)]"
          >
            <option value="">— اختر العملة —</option>

            {currencies.map((c) => (
              <option key={c.id} value={c.currency_code}>
                {c.currency_name} ({c.currency_code})
              </option>
            ))}
          </select>
        </div>

        <Button onClick={saveMainCurrency} disabled={saving}>
          {saving ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </Card>
    </div>
  );
}
