"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

type TaskStatus = "لم يبدأ" | "قيد التنفيذ" | "مكتمل";
type TaskPriority = "منخفضة" | "متوسطة" | "عالية";

export default function CreateTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "لم يبدأ" as TaskStatus,
    priority: "متوسطة" as TaskPriority,
    assignee: "",
    progress: 0,
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // لاحقاً: سيتم الحفظ في Supabase
    console.log("New Task:", form);

    router.push(`/dashboard/projects/${id}/tasks`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* العنوان */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">إضافة مهمة جديدة</h1>

        <a
          href={`/dashboard/projects/${id}/tasks`}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          ← العودة للمهام
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
            placeholder="مثال: تحليل المتطلبات"
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
            placeholder="شرح مختصر للمهمة"
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
              placeholder="اسم الشخص المسؤول"
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
            placeholder="أي ملاحظات إضافية"
          ></textarea>
        </div>

        {/* زر الحفظ */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          حفظ المهمة
        </button>
      </form>
    </div>
  );
}
