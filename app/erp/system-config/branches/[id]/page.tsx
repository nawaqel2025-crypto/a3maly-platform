"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditBranchPage({ params }: any) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    city: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch branch
  const fetchBranch = async () => {
    const { data, error } = await supabase
      .from("branches")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) console.log("Fetch Error:", error);

    if (data) {
      setForm({
        name: data.name,
        city: data.city,
      });
    }
  };

  // Update branch
  const updateBranch = async () => {
    const { error } = await supabase
      .from("branches")
      .update({ ...form, updated_at: new Date() })
      .eq("id", params.id);

    if (error) console.log("Update Error:", error);

    alert("تم تحديث بيانات الفرع");
    router.push("/erp/system-config/branches");
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
    <div className="space-y-6" dir="rtl">
      <h2 className="text-[24px] font-bold text-[var(--a3-text-primary)]">تعديل الفرع</h2>

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
        <Button onClick={updateBranch}>تحديث</Button>
      </Card>
      </div>
  );
}