"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateCompanyPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("companies").insert([
      {
        name,
        code,
        country: country || null,
        city: city || null,
      },
    ]);

    setLoading(false);

    if (!error) {
      router.push("/dashboard/companies");
    } else {
      alert("حدث خطأ أثناء إضافة الشركة");
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">إضافة شركة جديدة</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">

        <div>
          <label className="block mb-1 font-semibold">اسم الشركة</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">الكود</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">الدولة</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">المدينة</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "جاري الحفظ..." : "حفظ الشركة"}
        </button>
      </form>
    </div>
  );
}
