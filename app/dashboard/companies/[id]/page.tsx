@"
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

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

export default function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setCompany(data);
      }

      setLoading(false);
    }

    loadCompany();
  }, [id]);

  if (loading) {
    return <p className="p-6">جاري تحميل بيانات الشركة...</p>;
  }

  if (!company) {
    return <p className="p-6 text-red-600">لم يتم العثور على الشركة.</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{company.name}</h1>

        <Link
          href="/dashboard/companies"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← العودة للقائمة
        </Link>
      </div>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <p className="text-gray-500 text-sm">الكود</p>
          <p className="text-lg font-semibold">{company.code}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">الدولة</p>
          <p className="text-lg">{company.country || "—"}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">المدينة</p>
          <p className="text-lg">{company.city || "—"}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">تاريخ الإنشاء</p>
          <p className="text-lg">
            {new Date(company.created_at).toLocaleDateString("ar-SA")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href={`/dashboard/companies/${company.id}/branches`}
          className="block bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700 transition text-center"
        >
          الفروع
        </Link>

        <Link
          href={`/dashboard/companies/${company.id}/chart-of-accounts`}
          className="block bg-green-600 text-white p-4 rounded shadow hover:bg-green-700 transition text-center"
        >
          شجرة الحسابات
        </Link>

        <Link
          href={`/dashboard/companies/${company.id}/journals`}
          className="block bg-purple-600 text-white p-4 rounded shadow hover:bg-purple-700 transition text-center"
        >
          القيود اليومية
        </Link>
      </div>
    </div>
  );
}
"@ | Set-Content -LiteralPath "C:\Users\wasee\a3maly-platform\app\dashboard\companies

\[id]\page.tsx"
