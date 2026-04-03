"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type ProjectStatus = "لم يبدأ" | "قيد التنفيذ" | "مكتمل";
type ProjectPriority = "منخفضة" | "متوسطة" | "عالية";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();

  // بيانات المشروع قبل التعديل (لاحقاً ستأتي من Supabase)
  const [form, setForm] = useState({
    name: "",
    description: "",
    manager: "نشوان مجاهد",
    client: "",
    status: "قيد التنفيذ" as ProjectStatus,
    priority: "متوسطة" as ProjectPriority,
    budget: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  // محاكاة جلب البيانات من قاعدة البيانات
  useEffect(() => {
    // لاحقاً: fetch from Supabase
    setForm({
      name: "نظام إدارة الموارد ERP",
      description: "مشروع تطوير نظام ERP متكامل.",
      manager: "نشوان مجاهد",
      client: "شركة التقنية الحديثة",
      status: "قيد التنفيذ",
      priority: "عالية",
      budget: "50000",
      startDate: "2024-01-10",
      endDate: "2024-06-30",
      notes: "يحتاج متابعة أسبوعية.",
    });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // لاحقاً: تحديث البيانات في Supabase
    console.log("Updated Project:", form);

    router.push(`/dashboard/projects/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* العنوان */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">تعديل المشروع</h1>

        <a
          href={`/dashboard/projects/${id}`}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          ← العودة للتفاصيل
        </a>
      </div>

      {/* النموذج */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-6 max-w-4xl"
      >
        {/* الاسم + العميل */}
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
          ></textarea>
        </div>

        {/* المدير + الحالة + الأولوية */}
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

        {/* الميزانية + التواريخ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-semibold">الميزانية</label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">تاريخ البدء</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
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
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* ملاحظات */}
        <div>
          <label className="block mb-1 font-semibold">ملاحظات</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24"
          ></textarea>
        </div>

        {/* زر الحفظ */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
