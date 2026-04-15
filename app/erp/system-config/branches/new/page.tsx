"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewBranchPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    city: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveBranch = async () => {
    const { error } = await supabase.from("branches").insert([form]);

    if (error) console.log("Insert Error:", error);

    alert("تم إضافة الفرع بنجاح");
    router.push("/erp/system-config/branches");
  };

  return (
    <div className="space-y-6" dir="rtl">
      <h2 className="text-[24px] font-bold text-[var(--a3-text-primary)]">إضافة فرع جديد</h2>

      <Card className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            name="name"
            label="اسم الفرع"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="city"
            label="المدينة"
            value={form.city}
            onChange={handleChange}
          />
        </div>
        <Button onClick={saveBranch}>حفظ</Button>
      </Card>
      </div>
  );
}
