"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="p-6 space-y-6">
      {/* العنوان + العودة */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">إضافة مشروع جديد</h1>

        <a
          href="/dashboard/projects"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          ← العودة للمشاريع
        </a>
      </div>

      {/* النموذج */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-6 max-w-4xl"
      >
        {/* الصف الأول: الاسم + العميل */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">اسم المشروع</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
              placeholder="مثال: نظام إدارة الموارد ERP"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">العميل</label>
            <input
              type="text"
              name="client"
              value={form.client}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="اسم العميل أو الجهة"
            />
          </div>
        </div>

        {/* الوصف */}
        <div>
          <label className="block mb-1 font-semibold">الوصف</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded h-28"
            placeholder="وصف مختصر للمشروع، الأهداف، النطاق..."
          ></textarea>
        </div>

        {/* الصف الثاني: المدير + الحالة + الأولوية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-semibold">مدير المشروع</label>
            <input
              type="text"
              name="manager"
              value={form.manager}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">الحالة</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="لم يبدأ">لم يبدأ</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="مكتمل">مكتمل</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">الأولوية</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="منخفضة">منخفضة</option>
              <option value="متوسطة">متوسطة</option>
              <option value="عالية">عالية</option>
            </select>
          </div>
        </div>

        {/* الصف الثالث: الميزانية + التواريخ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-semibold">الميزانية (اختياري)</label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="مثال: 50000"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">تاريخ البدء</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">تاريخ الانتهاء</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* ملاحظات إضافية */}
        <div>
          <label className="block mb-1 font-semibold">ملاحظات إضافية</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24"
            placeholder="أي تفاصيل إضافية عن المشروع، شروط خاصة، ملاحظات داخلية..."
          ></textarea>
        </div>

        {/* زر الإرسال */}
        <div className="flex justify-start">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            حفظ المشروع
          </button>
        </div>
      </form>
    </div>
  );
}
