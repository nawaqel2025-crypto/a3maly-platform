"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

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
    return <p className="p-6 text-[var(--a3-text-secondary)]">جاري تحميل بيانات الشركة...</p>;
  }

  if (!company) {
    return <p className="p-6 text-[var(--a3-danger)]">لم يتم العثور على الشركة.</p>;
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">{company.name}</h1>
        <Link href="/dashboard/companies" className="text-[14px] text-[var(--a3-primary)] hover:underline">
          ← العودة للقائمة
        </Link>
      </div>

      <Card className="space-y-4">
        <div>
          <p className="text-[14px] text-[var(--a3-text-secondary)]">الكود</p>
          <p className="text-[16px] font-semibold">{company.code}</p>
        </div>
        <div>
          <p className="text-[14px] text-[var(--a3-text-secondary)]">الدولة</p>
          <p className="text-[16px]">{company.country || "—"}</p>
        </div>
        <div>
          <p className="text-[14px] text-[var(--a3-text-secondary)]">المدينة</p>
          <p className="text-[16px]">{company.city || "—"}</p>
        </div>
        <div>
          <p className="text-[14px] text-[var(--a3-text-secondary)]">تاريخ الإنشاء</p>
          <p className="text-[16px]">{new Date(company.created_at).toLocaleDateString("ar-SA")}</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Link href={`/dashboard/companies/${company.id}/branches`}><Button className="w-full">الفروع</Button></Link>
        <Link href={`/dashboard/companies/${company.id}/chart-of-accounts`}><Button variant="secondary" className="w-full">شجرة الحسابات</Button></Link>
        <Link href={`/dashboard/companies/${company.id}/journals`}><Button variant="outline" className="w-full">القيود اليومية</Button></Link>
      </div>
    </div>
  );
}
