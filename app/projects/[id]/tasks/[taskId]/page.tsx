"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

type TaskStatus = "لم يبدأ" | "قيد التنفيذ" | "مكتمل";
type TaskPriority = "منخفضة" | "متوسطة" | "عالية";

export default function TaskDetailsPage() {
  const { id, taskId } = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "قيد التنفيذ" as TaskStatus,
    priority: "متوسطة" as TaskPriority,
    assignee: "",
    progress: 0,
    notes: "",
  });

  // محاكاة جلب البيانات من Supabase
  useEffect(() => {
    setTask({
      title: "تصميم قاعدة البيانات",
      description: "إنشاء مخطط قاعدة البيانات وربط الجداول.",
      status: "قيد التنفيذ",
      priority: "عالية",
      assignee: "سارة",
      progress: 60,
      notes: "يجب مراجعة العلاقات قبل البدء بالتنفيذ.",
    });
  }, [taskId]);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "لم يبدأ":
        return "bg-gray-100 text-gray-700";
      case "قيد التنفيذ":
        return "bg-yellow-100 text-yellow-800";
      case "مكتمل":
        return "bg-green-100 text-green-800";
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "منخفضة":
        return "bg-blue-100 text-blue-700";
      case "متوسطة":
        return "bg-purple-100 text-purple-700";
      case "عالية":
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* العنوان */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">تفاصيل المهمة</h1>

        <Link
          href={`/dashboard/projects/${id}/tasks`}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          ← العودة للمهام
        </Link>
      </div>

      {/* بطاقة تفاصيل المهمة */}
      <div className="bg-white p-6 rounded shadow space-y-4 max-w-3xl">
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>

        {/* الحالة + الأولوية + المسؤول */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-gray-500">الحالة</p>
            <span
              className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500">الأولوية</p>
            <span
              className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>

          <div>
            <p className="text-gray-500">المسؤول</p>
            <p className="font-semibold">{task.assignee}</p>
          </div>
        </div>

        {/* نسبة الإنجاز */}
        <div className="mt-4">
          <p className="text-gray-500">نسبة الإنجاز</p>
          <div className="w-full bg-gray-200 rounded h-2 mt-1">
            <div
              className="bg-green-600 h-2 rounded"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>

        {/* ملاحظات */}
        <div className="mt-4">
          <p className="text-gray-500">ملاحظات</p>
          <p className="font-semibold">{task.notes}</p>
        </div>

        {/* زر تعديل */}
        <div className="mt-6">
          <Link
            href={`/dashboard/projects/${id}/tasks/${taskId}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            تعديل المهمة
          </Link>
        </div>
      </div>
    </div>
  );
}
