"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

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
    <div className="mx-auto max-w-xl p-6" dir="rtl">
      <h1 className="mb-6 text-[24px] font-bold text-[var(--a3-text-primary)]">إضافة شركة جديدة</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" label="اسم الشركة" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="text" label="الكود" value={code} onChange={(e) => setCode(e.target.value)} required />
          <Input type="text" label="الدولة" value={country} onChange={(e) => setCountry(e.target.value)} />
          <Input type="text" label="المدينة" value={city} onChange={(e) => setCity(e.target.value)} />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "جاري الحفظ..." : "حفظ الشركة"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
