"use client";

import Link from "next/link";
import React from "react";

type ProjectStatus = "قيد التنفيذ" | "مكتمل" | "لم يبدأ";

interface Project {
  id: number;
  name: string;
  manager: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      id: 1,
      name: "نظام إدارة الموارد ERP",
      manager: "نشوان مجاهد",
      status: "قيد التنفيذ",
      progress: 65,
      startDate: "2024-01-10",
    },
    {
      id: 2,
      name: "منصة التجارة الإلكترونية B2B",
      manager: "نشوان مجاهد",
      status: "مكتمل",
      progress: 100,
      startDate: "2023-09-01",
    },
    {
      id: 3,
      name: "نظام إدارة العملاء CRM",
      manager: "نشوان مجاهد",
      status: "لم يبدأ",
      progress: 0,
      startDate: "2024-05-01",
    },
  ];

  const total = projects.length;
  const inProgress = projects.filter((p) => p.status === "قيد التنفيذ").length;
  const completed = projects.filter((p) => p.status === "مكتمل").length;
  const avgProgress =
    projects.reduce((sum, p) => sum + p.progress, 0) / (projects.length || 1);

  const getStatusClasses = (status: ProjectStatus) => {
    switch (status) {
      case "قيد التنفيذ":
        return "bg-yellow-100 text-yellow-800";
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "لم يبدأ":
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* العنوان + زر إضافة */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">المشاريع</h1>

        <Link
          href="/dashboard/projects/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + إضافة مشروع جديد
        </Link>
      </div>

      {/* كروت إحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">إجمالي المشاريع</p>
          <p className="text-2xl font-bold mt-2">{total}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">قيد التنفيذ</p>
          <p className="text-2xl font-bold mt-2">{inProgress}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">المكتملة</p>
          <p className="text-2xl font-bold mt-2">{completed}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">متوسط نسبة الإنجاز</p>
          <p className="text-2xl font-bold mt-2">
            {Math.round(avgProgress)}%
          </p>
        </div>
      </div>

      {/* جدول المشاريع */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">قائمة المشاريع</h2>
        </div>

        <table className="w-full text-right">
          <thead>
            <tr className="border-b">
              <th className="p-3">اسم المشروع</th>
              <th className="p-3">مدير المشروع</th>
              <th className="p-3">الحالة</th>
              <th className="p-3">تاريخ البدء</th>
              <th className="p-3">نسبة الإنجاز</th>
              <th className="p-3">التفاصيل</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{project.name}</td>
                <td className="p-3">{project.manager}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusClasses(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="p-3">{project.startDate}</td>
                <td className="p-3">
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-green-600 h-2 rounded"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </td>
                <td className="p-3">
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    عرض التفاصيل →
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
