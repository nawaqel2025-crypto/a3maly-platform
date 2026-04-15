"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

type ProjectStatus = "لم يبدأ" | "قيد التنفيذ" | "مكتمل";
type ProjectPriority = "منخفضة" | "متوسطة" | "عالية";

interface ProjectForm {
  name: string;
  description: string;
  manager: string;
  client: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  budget: string;
  startDate: string;
  endDate: string;
  notes: string;
}

export default function CreateProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState<ProjectForm>({
    name: "",
    description: "",
    manager: "نشوان مجاهد",
    client: "",
    status: "لم يبدأ",
    priority: "متوسطة",
    budget: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // لاحقاً: استبدال هذا بإرسال البيانات إلى Supabase
    console.log("New Project (ERP):", form);

    // العودة لصفحة المشاريع
    router.push("/dashboard/projects");
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">إضافة مشروع جديد</h1>
        <Link href="/dashboard/projects" className="text-[14px] text-[var(--a3-primary)] hover:underline">
          ← العودة للمشاريع
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl space-y-6"
      >
        <Card className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input type="text" name="name" label="اسم المشروع" value={form.name} onChange={handleChange} required placeholder="مثال: نظام إدارة الموارد ERP" />
            <Input type="text" name="client" label="العميل" value={form.client} onChange={handleChange} placeholder="اسم العميل أو الجهة" />
          </div>

          <div>
            <label className="mb-1 block text-[14px] font-medium text-[var(--a3-text-secondary)]">الوصف</label>
            <textarea name="description" value={form.description} onChange={handleChange} required className="min-h-[120px] w-full rounded-[8px] border border-[var(--a3-border)] p-3" placeholder="وصف مختصر للمشروع، الأهداف، النطاق..." />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input type="text" name="manager" label="مدير المشروع" value={form.manager} onChange={handleChange} />
            <div>
              <label className="mb-1 block text-[14px] font-medium text-[var(--a3-text-secondary)]">الحالة</label>
              <select name="status" value={form.status} onChange={handleChange} className="min-h-[42px] w-full rounded-[8px] border border-[var(--a3-border)] px-3">
                <option value="لم يبدأ">لم يبدأ</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="مكتمل">مكتمل</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[14px] font-medium text-[var(--a3-text-secondary)]">الأولوية</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="min-h-[42px] w-full rounded-[8px] border border-[var(--a3-border)] px-3">
                <option value="منخفضة">منخفضة</option>
                <option value="متوسطة">متوسطة</option>
                <option value="عالية">عالية</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input type="number" name="budget" label="الميزانية (اختياري)" value={form.budget} onChange={handleChange} placeholder="مثال: 50000" />
            <Input type="date" name="startDate" label="تاريخ البدء" value={form.startDate} onChange={handleChange} required />
            <Input type="date" name="endDate" label="تاريخ الانتهاء" value={form.endDate} onChange={handleChange} required />
          </div>

          <div>
            <label className="mb-1 block text-[14px] font-medium text-[var(--a3-text-secondary)]">ملاحظات إضافية</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="min-h-[96px] w-full rounded-[8px] border border-[var(--a3-border)] p-3" placeholder="أي تفاصيل إضافية عن المشروع..." />
          </div>

          <div className="flex justify-start">
            <Button type="submit">حفظ المشروع</Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
