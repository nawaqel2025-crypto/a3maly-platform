"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBranches = async () => {
    const { data, error } = await supabase
      .from("branches")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.log("Fetch Error:", error);
    if (data) setBranches(data);

    setLoading(false);
  };

  const deleteBranch = async (id: string) => {
    if (!confirm("هل تريد حذف هذا الفرع؟")) return;

    const { error } = await supabase.from("branches").delete().eq("id", id);

    if (error) console.log("Delete Error:", error);

    fetchBranches();
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  if (loading)
    return (
      <p className="text-gray-900 dark:text-gray-100">جاري التحميل...</p>
    );

  return (
    <div className="text-gray-900 dark:text-gray-100 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            الفروع
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            إدارة فروع الشركة — تصميم عالمي فاخر
          </p>
        </div>

        <Link
          href="/erp/system-config/branches/new"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + إضافة فرع
        </Link>
      </div>

      {/* TABLE — يظهر على الشاشات الكبيرة */}
      <div className="hidden md:block overflow-x-auto border rounded-xl bg-white dark:bg-gray-900 shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200">
            <tr>
              <th className="p-3 border">اسم الفرع</th>
              <th className="p-3 border">المدينة</th>
              <th className="p-3 border">إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {branches.map((b) => (
              <tr
                key={b.id}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
              >
                <td className="p-3 border">{b.name}</td>
                <td className="p-3 border">{b.city}</td>
                <td className="p-3 border">
                  <div className="flex gap-4 justify-center">

                    <Link
                      href={`/erp/system-config/branches/${b.id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 transition flex items-center gap-1"
                    >
                      <FiEdit2 size={16} />
                      تعديل
                    </Link>

                    <button
                      onClick={() => deleteBranch(b.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition flex items-center gap-1"
                    >
                      <FiTrash2 size={16} />
                      حذف
                    </button>

                  </div>
                </td>
              </tr>
            ))}

            {branches.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  لا توجد فروع مسجلة حتى الآن.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CARDS — تظهر على الجوال */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {branches.map((b) => (
          <div
            key={b.id}
            className="p-4 bg-white dark:bg-gray-900 border rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">
              {b.name}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              المدينة: {b.city}
            </p>

            <div className="flex justify-end gap-6 mt-4">

              <Link
                href={`/erp/system-config/branches/${b.id}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 transition flex items-center gap-1"
              >
                <FiEdit2 size={18} />
                تعديل
              </Link>

              <button
                onClick={() => deleteBranch(b.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition flex items-center gap-1"
              >
                <FiTrash2 size={18} />
                حذف
              </button>

            </div>
          </div>
        ))}

        {branches.length === 0 && (
          <p className="text-center text-gray-500">لا توجد فروع مسجلة.</p>
        )}
      </div>
    </div>
  );
}
