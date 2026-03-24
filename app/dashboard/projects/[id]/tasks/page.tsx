"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type TaskStatus = "لم يبدأ" | "قيد التنفيذ" | "مكتمل";
type TaskPriority = "منخفضة" | "متوسطة" | "عالية";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  progress: number;
}

export default function ProjectTasksPage() {
  const { id } = useParams();
  const router = useRouter();

  // بيانات تجريبية — لاحقاً ستأتي من Supabase
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "تحليل المتطلبات",
      status: "مكتمل",
      priority: "متوسطة",
      assignee: "أحمد",
      progress: 100,
    },
    {
      id: 2,
      title: "تصميم قاعدة البيانات",
      status: "قيد التنفيذ",
      priority: "عالية",
      assignee: "سارة",
      progress: 60,
    },
    {
      id: 3,
      title: "تطوير الواجهات",
      status: "لم يبدأ",
      priority: "منخفضة",
      assignee: "محمد",
      progress: 0,
    },
  ]);

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
        <h1 className="text-3xl font-bold">مهام المشروع</h1>

        <Link
          href={`/dashboard/projects/${id}`}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          ← العودة للتفاصيل
        </Link>
      </div>

      {/* زر إضافة مهمة */}
      <div className="flex justify-end">
        <Link
          href={`/dashboard/projects/${id}/tasks/create`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + إضافة مهمة جديدة
        </Link>
      </div>

      {/* جدول المهام */}
      <div className="bg-white p-6 rounded shadow">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b">
              <th className="p-3">المهمة</th>
              <th className="p-3">الحالة</th>
              <th className="p-3">الأولوية</th>
              <th className="p-3">المسؤول</th>
              <th className="p-3">نسبة الإنجاز</th>
              <th className="p-3">التفاصيل</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{task.title}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td className="p-3">{task.assignee}</td>

                <td className="p-3">
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-green-600 h-2 rounded"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </td>

                <td className="p-3">
                  <Link
                    href={`/dashboard/projects/${id}/tasks/${task.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    عرض →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
