"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BalanceSheetPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [assets, setAssets] = useState<any>(null);
  const [liabilities, setLiabilities] = useState<any>(null);
  const [equity, setEquity] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const loadReport = async () => {
    setLoading(true);

    const { data } = await supabase.rpc("get_balance_sheet_by_period", {
      date_from: fromDate || null,
      date_to: toDate || null,
    });

    if (data) {
      setAssets(data.assets);
      setLiabilities(data.liabilities);
      setEquity(data.equity);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        الميزانية العمومية
      </h1>

      {/* Filters */}
      <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-4 max-w-2xl">
        <h2 className="text-lg font-semibold">تصفية التقرير</h2>

        <div className="grid grid-cols-2 gap-4">
          <Input label="من تاريخ" type="date" value={fromDate} onChange={setFromDate} />
          <Input label="إلى تاريخ" type="date" value={toDate} onChange={setToDate} />
        </div>

        <button
          onClick={loadReport}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          عرض التقرير
        </button>
      </div>

      {loading && <div className="text-[var(--color-fg-muted)]">جاري تحميل البيانات…</div>}

      {!loading && assets && liabilities && equity && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <ReportCard title="الأصول" color="green">
            {assets.items?.map((a: any) => (
              <Row key={a.id} label={`${a.code} - ${a.name}`} value={a.amount} />
            ))}
            <TotalRow label="إجمالي الأصول" value={assets.total} />
          </ReportCard>

          <ReportCard title="الخصوم" color="red">
            {liabilities.items?.map((a: any) => (
              <Row key={a.id} label={`${a.code} - ${a.name}`} value={a.amount} />
            ))}
            <TotalRow label="إجمالي الخصوم" value={liabilities.total} />
          </ReportCard>

          <ReportCard title="حقوق الملكية" color="blue">
            {equity.items?.map((a: any) => (
              <Row key={a.id} label={`${a.code} - ${a.name}`} value={a.amount} />
            ))}
            <TotalRow label="إجمالي حقوق الملكية" value={equity.total} />
          </ReportCard>

        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block mb-1 text-sm text-[var(--color-fg)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)]"
      />
    </div>
  );
}

function ReportCard({ title, children, color }: any) {
  const colors: any = {
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
  };

  return (
    <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-3">
      <h3 className={`text-lg font-semibold ${colors[color]}`}>{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm text-[var(--color-fg)]">
      <span>{label}</span>
      <span>{Number(value).toLocaleString("en-US")}</span>
    </div>
  );
}

function TotalRow({ label, value }: any) {
  return (
    <div className="flex justify-between font-semibold border-t pt-2 mt-2 text-[var(--color-fg)]">
      <span>{label}</span>
      <span>{Number(value).toLocaleString("en-US")}</span>
    </div>
  );
}
