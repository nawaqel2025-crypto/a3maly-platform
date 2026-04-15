"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TableWrapper } from "@/components/ui/table";

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

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">مهام المشروع</h1>

        <Link
          href={`/dashboard/projects/${id}`}
          className="text-[14px] text-[var(--a3-primary)] hover:underline"
        >
          ← العودة للتفاصيل
        </Link>
      </div>

      <div className="flex justify-end">
        <Link href={`/dashboard/projects/${id}/tasks/create`}><Button>إضافة مهمة جديدة</Button></Link>
      </div>

      <Card className="p-0">
        <TableWrapper className="border-0 rounded-[12px]">
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>المهمة</TableHeaderCell>
                <TableHeaderCell>الحالة</TableHeaderCell>
                <TableHeaderCell>الأولوية</TableHeaderCell>
                <TableHeaderCell>المسؤول</TableHeaderCell>
                <TableHeaderCell>نسبة الإنجاز</TableHeaderCell>
                <TableHeaderCell>التفاصيل</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-semibold">{task.title}</TableCell>
                <TableCell><Badge variant={task.status === "مكتمل" ? "success" : task.status === "قيد التنفيذ" ? "warning" : "neutral"}>{task.status}</Badge></TableCell>
                <TableCell><Badge variant={task.priority === "عالية" ? "danger" : task.priority === "متوسطة" ? "warning" : "info"}>{task.priority}</Badge></TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>
                  <div className="h-2 w-full rounded bg-[var(--a3-border)]">
                    <div
                      className="h-2 rounded bg-[var(--a3-success)]"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/projects/${id}/tasks/${task.id}`}
                    className="text-[var(--a3-primary)] hover:underline"
                  >
                    عرض →
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Card>
    </div>
  );
}
