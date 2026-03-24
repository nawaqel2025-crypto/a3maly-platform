"use client";

import { useParams } from "next/navigation";

export default function ProjectDetailsPage() {
  const { id } = useParams();

  // بيانات تجريبية – سيتم استبدالها لاحقاً ببيانات Supabase
  const project = {
    id,
    name: "نظام إدارة الموارد",
    description: "مشروع تطوير نظام ERP متكامل لإدارة العمليات الداخلية.",
    manager: "نشوان مجاهد",
    status: "قيد التنفيذ",
    progress: 65,
    startDate: "2024-01-10",
    endDate: "2024-06-30",
    team: ["أحمد", "سارة", "محمد", "سلطان"],
    tasks: [
      { title: "تحليل المتطلبات", status: "مكتمل" },
      { title: "تصميم قاعدة البيانات", status: "قيد التنفيذ" },
      { title: "تطوير الواجهات", status: "لم يبدأ" },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* العنوان */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">تفاصيل المشروع</h1>

        <a
          href="/dashboard/projects"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          ← العودة للمشاريع
        </a>
      </div>

      {/* بطاقة معلومات المشروع */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <p className="text-gray-600">{project.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-gray-500">مدير المشروع</p>
            <p className="font-semibold">{project.manager}</p>
          </div>

          <div>
            <p className="text-gray-500">الحالة</p>
            <p className="font-semibold">{project.status}</p>
          </div>

          <div>
            <p className="text-gray-500">نسبة الإنجاز</p>
            <div className="w-full bg-gray-200 rounded h-2 mt-1">
              <div
                className="bg-green-600 h-2 rounded"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-gray-500">تاريخ البدء</p>
            <p className="font-semibold">{project.startDate}</p>
          </div>

          <div>
            <p className="text-gray-500">تاريخ الانتهاء</p>
            <p className="font-semibold">{project.endDate}</p>
          </div>
        </div>
      </div>

      {/* فريق العمل */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">فريق العمل</h3>

        <div className="flex flex-wrap gap-3">
          {project.team.map((member, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
            >
              {member}
            </span>
          ))}
        </div>
      </div>

      {/* المهام */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">المهام</h3>

        <table className="w-full text-right">
          <thead>
            <tr className="border-b">
              <th className="p-3">المهمة</th>
              <th className="p-3">الحالة</th>
            </tr>
          </thead>

          <tbody>
            {project.tasks.map((task, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
