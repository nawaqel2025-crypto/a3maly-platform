"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";

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

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">تفاصيل المهمة</h1>

        <Link
          href={`/dashboard/projects/${id}/tasks`}
          className="text-[14px] text-[var(--a3-primary)] hover:underline"
        >
          ← العودة للمهام
        </Link>
      </div>

      <Card className="max-w-3xl space-y-4">
        <h2 className="text-[24px] font-bold">{task.title}</h2>
        <p className="text-[14px] text-[var(--a3-text-secondary)]">{task.description}</p>

        {/* الحالة + الأولوية + المسؤول */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-[14px] text-[var(--a3-text-secondary)]">الحالة</p>
            <Badge variant={task.status === "مكتمل" ? "success" : task.status === "قيد التنفيذ" ? "warning" : "neutral"}>{task.status}</Badge>
          </div>

          <div>
            <p className="text-[14px] text-[var(--a3-text-secondary)]">الأولوية</p>
            <Badge variant={task.priority === "عالية" ? "danger" : task.priority === "متوسطة" ? "warning" : "info"}>{task.priority}</Badge>
          </div>

          <div>
            <p className="text-[14px] text-[var(--a3-text-secondary)]">المسؤول</p>
            <p className="font-semibold">{task.assignee}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[14px] text-[var(--a3-text-secondary)]">نسبة الإنجاز</p>
          <div className="mt-1 h-2 w-full rounded bg-[var(--a3-border)]">
            <div
              className="h-2 rounded bg-[var(--a3-success)]"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[14px] text-[var(--a3-text-secondary)]">ملاحظات</p>
          <p className="font-semibold">{task.notes}</p>
        </div>

        <div className="mt-6">
          <Link href={`/dashboard/projects/${id}/tasks/${taskId}/edit`}>
            <Button>تعديل المهمة</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
