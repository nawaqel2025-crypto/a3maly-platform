"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type TaskStatus = "لم يبدأ" | "قيد التنفيذ" | "مكتمل";
type TaskPriority = "منخفضة" | "متوسطة" | "عالية";

export default function EditTaskPage() {
  const { id, taskId } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "قيد التنفيذ" as TaskStatus,
    priority: "متوسطة" as TaskPriority,
    assignee: "",
    progress: 0,
    notes: "",
  });

  // محاكاة جلب بيانات المهمة من Supabase
  useEffect(() => {
    setForm({
      title: "تصميم قاعدة البيانات",
      description: "إنشاء مخطط قاعدة البيانات وربط الجداول.",
      status: "قيد التنفيذ",
      priority: "عالية",
      assignee: "سارة",
      progress: 60,
      notes: "يجب مراجعة العلاقات قبل البدء بالتنفيذ.",
    });
  }, [taskId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // لاحقاً: تحديث المهمة في Supabase
    console.log("Updated Task:", form);

    router.push(`/dashboard/projects/${id}/tasks/${taskId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* العنوان */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">تعديل المهمة</h1>

        <a
          href={`/dashboard/projects/${id}/tasks/${taskId}`}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          ← العودة للتفاصيل
        </a>
      </div>

      {/* النموذج */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-6 max-w-3xl"
      >
        {/* عنوان المهمة */}
        <div>
          <label className="block mb-1 font-semibold">عنوان المهمة</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
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

        {/* الحالة + الأولوية + المسؤول */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div>
            <label className="block mb-1 font-semibold">المسؤول</label>
            <input
              type="text"
              name="assignee"
              value={form.assignee}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* نسبة الإنجاز */}
        <div>
          <label className="block mb-1 font-semibold">نسبة الإنجاز (%)</label>
          <input
            type="number"
            name="progress"
            value={form.progress}
            onChange={handleChange}
            min={0}
            max={100}
            className="w-full border p-2 rounded"
          />
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
