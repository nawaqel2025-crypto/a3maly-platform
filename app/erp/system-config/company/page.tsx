"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// العملات الأساسية
const defaultCurrencies = [
  { code: "SAR", name: "الريال السعودي", symbol: "﷼" },
  { code: "USD", name: "الدولار الأمريكي", symbol: "$" },
  { code: "EUR", name: "اليورو", symbol: "€" },
  { code: "AED", name: "الدرهم الإماراتي", symbol: "د.إ" },
  { code: "KWD", name: "الدينار الكويتي", symbol: "د.ك" },
  { code: "QAR", name: "الريال القطري", symbol: "ر.ق" },
  { code: "OMR", name: "الريال العماني", symbol: "ر.ع" },
  { code: "GBP", name: "الجنيه الإسترليني", symbol: "£" },
  { code: "JPY", name: "الين الياباني", symbol: "¥" },
];

export default function CurrencyPage() {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // إدخال العملات الأساسية إذا كان الجدول فارغًا
  const insertDefaultsIfNeeded = async () => {
    const { data } = await supabase.from("currency_settings").select("*");

    if (!data || data.length === 0) {
      await supabase.from("currency_settings").insert(
        defaultCurrencies.map((c) => ({
          currency_code: c.code,
          currency_name: c.name,
          symbol: c.symbol,
        }))
      );
    }
  };

  // Fetch currencies
  const fetchCurrencies = async () => {
    await insertDefaultsIfNeeded();

    const { data } = await supabase
      .from("currency_settings")
      .select("*")
      .order("currency_code", { ascending: true });

    if (data) setCurrencies(data);

    setLoading(false);
  };

  // Delete currency
  const deleteCurrency = async (id: string) => {
    if (!confirm("هل تريد حذف هذه العملة؟")) return;

    await supabase.from("currency_settings").delete().eq("id", id);

    fetchCurrencies();
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  if (loading)
    return <p className="text-gray-900 dark:text-gray-100">جاري التحميل...</p>;

  return (
    <div className="text-gray-900 dark:text-gray-100 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            العملات
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            إدارة العملات الأساسية — تصميم عالمي فاخر
          </p>
        </div>

        <Link
          href="/erp/system-config/currency/new"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + إضافة عملة
        </Link>
      </div>

      {/* TABLE — Desktop */}
      <div className="hidden md:block overflow-x-auto border rounded-xl bg-white dark:bg-gray-900 shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200">
            <tr>
              <th className="p-3 border">الكود</th>
              <th className="p-3 border">العملة</th>
              <th className="p-3 border">الرمز</th>
              <th className="p-3 border">إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {currencies.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
              >
                <td className="p-3 border">{c.currency_code}</td>
                <td className="p-3 border">{c.currency_name}</td>
                <td className="p-3 border">{c.symbol}</td>
                <td className="p-3 border">
                  <div className="flex gap-4 justify-center">

                    <Link
                      href={`/erp/system-config/currency/${c.id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 transition flex items-center gap-1"
                    >
                      <FiEdit2 size={16} />
                      تعديل
                    </Link>

                    <button
                      onClick={() => deleteCurrency(c.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition flex items-center gap-1"
                    >
                      <FiTrash2 size={16} />
                      حذف
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARDS — Mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {currencies.map((c) => (
          <div
            key={c.id}
            className="p-4 bg-white dark:bg-gray-900 border rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">
              {c.currency_name}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              الكود: {c.currency_code}
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              الرمز: {c.symbol}
            </p>

            <div className="flex justify-end gap-6 mt-4">

              <Link
                href={`/erp/system-config/currency/${c.id}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 transition flex items-center gap-1"
              >
                <FiEdit2 size={18} />
                تعديل
              </Link>

              <button
                onClick={() => deleteCurrency(c.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition flex items-center gap-1"
              >
                <FiTrash2 size={18} />
                حذف
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
