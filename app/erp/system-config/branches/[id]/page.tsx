"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

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
    <div className="text-gray-900 dark:text-gray-100 space-y-6">
      <h2 className="text-2xl font-bold">تعديل الفرع</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm font-medium">اسم الفرع</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">المدينة</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white dark:bg-gray-900"
          />
        </div>
      </div>

      <button
        onClick={updateBranch}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        تحديث
      </button>
    </div>
  );
}