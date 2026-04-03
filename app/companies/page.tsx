"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Company {
  id: string;
  name: string;
  code: string;
  country: string | null;
  city: string | null;
  created_at: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompanies() {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setCompanies(data);
      }

      setLoading(false);
    }

    loadCompanies();
  }, []);

  if (loading) {
    return <p className="p-6">جاري تحميل الشركات...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">الشركات</h1>

        <Link
          href="/dashboard/companies/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + إضافة شركة جديدة
        </Link>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b">
              <th className="p-3">اسم الشركة</th>
              <th className="p-3">الكود</th>
              <th className="p-3">الدولة</th>
              <th className="p-3">المدينة</th>
              <th className="p-3">تاريخ الإنشاء</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{company.name}</td>
                <td className="p-3">{company.code}</td>
                <td className="p-3">{company.country || "—"}</td>
                <td className="p-3">{company.city || "—"}</td>
                <td className="p-3">
                  {new Date(company.created_at).toLocaleDateString("ar-SA")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
