"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProjects(data);
      }

      setLoading(false);
    }

    loadProjects();
  }, []);

  if (loading) {
    return <p className="p-6">جاري تحميل المشاريع...</p>;
  }

  const total = projects.length;
  const inProgress = projects.filter((p) => p.status === "active").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">المشاريع</h1>

        <Link
          href="/dashboard/projects/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + إضافة مشروع جديد
        </Link>
      </div>

      {/* كروت الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">إجمالي المشاريع</p>
          <p className="text-2xl font-bold mt-2">{total}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">قيد التنفيذ</p>
          <p className="text-2xl font-bold mt-2">{inProgress}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">المكتملة</p>
          <p className="text-2xl font-bold mt-2">{completed}</p>
        </div>
      </div>

      {/* جدول المشاريع */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">قائمة المشاريع</h2>

        <table className="w-full text-right">
          <thead>
            <tr className="border-b">
              <th className="p-3">اسم المشروع</th>
              <th className="p-3">الوصف</th>
              <th className="p-3">الحالة</th>
              <th className="p-3">تاريخ الإنشاء</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{project.name}</td>
                <td className="p-3">{project.description || "—"}</td>
                <td className="p-3">{project.status}</td>
                <td className="p-3">
                  {new Date(project.created_at).toLocaleDateString("ar-SA")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
