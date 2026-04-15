"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Modal from "@/components/ui/modal";

type Line = {
  account_id: string;
  account_name: string;
  description: string;
  debit: number | string;
  credit: number | string;
};

type AccountRow = {
  id: number;
  code: string;
  name: string;
  parent_id: number | null;
};

export default function NewJournalEntryPage() {
  const [entryDate, setEntryDate] = useState("");
  const [entryType, setEntryType] = useState("قيد عادي");
  const [description, setDescription] = useState("");

  const [lines, setLines] = useState<Line[]>([
    { account_id: "", account_name: "", description: "", debit: 0, credit: 0 },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const [leafAccounts, setLeafAccounts] = useState<AccountRow[]>([]);

  useEffect(() => {
    const loadAccounts = async () => {
      const { data, error } = await supabase
        .from("chart_of_accounts")
        .select("id, code, name, parent_id")
        .order("code", { ascending: true });

      if (error || !data) {
        console.error(error);
        return;
      }

      const rows = data as AccountRow[];

      const parentIds = new Set<number>();
      rows.forEach((acc) => {
        if (acc.parent_id) parentIds.add(acc.parent_id);
      });

      const leaves = rows.filter((acc) => !parentIds.has(acc.id));

      setLeafAccounts(leaves);
    };

    loadAccounts();
  }, []);

  const addLine = () => {
    setLines([
      ...lines,
      { account_id: "", account_name: "", description: "", debit: 0, credit: 0 },
    ]);
  };

  const updateLine = (index: number, field: keyof Line, value: any) => {
    const updated = [...lines];
    updated[index] = { ...updated[index], [field]: value };
    setLines(updated);
  };

  const totalDebit = lines.reduce((sum, l) => sum + Number(l.debit || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + Number(l.credit || 0), 0);

  const inputClass =
    "w-full p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)]";

  const filteredAccounts = leafAccounts.filter((acc) => {
    const q = search.trim();
    if (!q) return true;
    return (
      acc.code.toString().includes(q) ||
      acc.name.includes(q)
    );
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">إنشاء قيد جديد</h1>

      {/* معلومات القيد */}
      <div className="p-6 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-4">
        <h2 className="text-xl font-semibold text-[var(--color-fg)]">معلومات القيد</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
          <div>
            <label className="block mb-1 text-[var(--color-fg)]">تاريخ القيد</label>
            <input
              type="date"
              className={inputClass}
              onChange={(e) => setEntryDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-[var(--color-fg)]">نوع القيد</label>
            <select
              className={inputClass}
              onChange={(e) => setEntryType(e.target.value)}
              value={entryType}
            >
              <option>قيد عادي</option>
              <option>قيد افتتاحي</option>
              <option>قيد تسوية</option>
              <option>قيد إقفال</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-[var(--color-fg)]">الوصف</label>
            <input
              type="text"
              placeholder="مثال: قيد قبض من عميل"
              className={inputClass}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* أسطر القيد */}
      <div className="p-6 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-4">
        <h2 className="text-xl font-semibold text-[var(--color-fg)]">أسطر القيد</h2>

        {lines.map((line, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-3 items-center p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]"
          >
            <div className="col-span-3">
              <label className="block mb-1 text-sm text-[var(--color-fg)]">الحساب</label>
              <input
                type="text"
                placeholder="اختر الحساب"
                readOnly
                value={
                  line.account_id
                    ? `${line.account_id} — ${line.account_name}`
                    : ""
                }
                onClick={() => {
                  setSelectedLineIndex(index);
                  setOpenModal(true);
                }}
                className={`${inputClass} cursor-pointer`}
              />
            </div>

            <div className="col-span-4">
              <label className="block mb-1 text-sm text-[var(--color-fg)]">البيان</label>
              <input
                type="text"
                placeholder="البيان"
                className={inputClass}
                onChange={(e) =>
                  updateLine(index, "description", e.target.value)
                }
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 text-sm text-[var(--color-fg)]">مدين</label>
              <input
                type="number"
                placeholder="0.00"
                className={inputClass}
                onChange={(e) => updateLine(index, "debit", e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 text-sm text-[var(--color-fg)]">دائن</label>
              <input
                type="number"
                placeholder="0.00"
                className={inputClass}
                onChange={(e) => updateLine(index, "credit", e.target.value)}
              />
            </div>
          </div>
        ))}

        <button
          onClick={addLine}
          className="px-4 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)]"
        >
          إضافة سطر
        </button>

        <div className="flex justify-between text-lg font-semibold pt-4 text-[var(--color-fg)]">
          <span>إجمالي المدين: {totalDebit}</span>
          <span>إجمالي الدائن: {totalCredit}</span>
        </div>
      </div>

      {/* Modal اختيار الحساب */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="اختيار الحساب"
      >
        {/* مربع البحث ثابت */}
        <div className="sticky top-0 bg-[var(--color-bg)] pb-3 z-20">
          <input
            type="text"
            placeholder="بحث برقم أو اسم الحساب..."
            className="w-full p-2 mb-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)]"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        {/* قائمة الحسابات */}
        <div className="space-y-2">
          {filteredAccounts.map((acc) => (
            <div
              key={acc.id}
              className="flex items-center gap-2 p-2 rounded-lg border border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-bg-soft)]"
              onClick={() => {
                if (selectedLineIndex === null) return;

                updateLine(selectedLineIndex, "account_id", acc.code);
                updateLine(selectedLineIndex, "account_name", acc.name);

                setOpenModal(false);
              }}
            >
              <span className="text-sm font-mono text-[var(--color-fg-muted)]">
                {acc.code}
              </span>
              <span className="text-sm font-medium">{acc.name}</span>
            </div>
          ))}

          {filteredAccounts.length === 0 && (
            <div className="text-sm text-[var(--color-fg-muted)]">
              لا توجد حسابات مطابقة لبحثك.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
