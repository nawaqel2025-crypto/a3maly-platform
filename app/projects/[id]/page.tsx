"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableWrapper,
} from "@/components/ui/table";

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
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">تفاصيل المشروع</h1>
        <Link href="/dashboard/projects" className="text-[14px] text-[var(--a3-primary)] hover:underline">
          ← العودة للمشاريع
        </Link>
      </div>

      <Card className="space-y-4">
        <h2 className="text-[24px] font-bold">{project.name}</h2>
        <p className="text-[14px] text-[var(--a3-text-secondary)]">{project.description}</p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-[14px] text-[var(--a3-text-secondary)]">مدير المشروع</p>
            <p className="font-semibold">{project.manager}</p>
          </div>

          <div>
            <p className="text-[14px] text-[var(--a3-text-secondary)]">الحالة</p>
            <Badge variant="info">{project.status}</Badge>
          </div>

          <div>
            <p className="text-[14px] text-[var(--a3-text-secondary)]">نسبة الإنجاز</p>
            <div className="mt-1 h-2 w-full rounded bg-[var(--a3-border)]">
              <div
                className="h-2 rounded bg-[var(--a3-success)]"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-[14px] text-[var(--a3-text-secondary)]">تاريخ البدء</p>
            <p className="font-semibold">{project.startDate}</p>
          </div>

          <div>
            <p className="text-[14px] text-[var(--a3-text-secondary)]">تاريخ الانتهاء</p>
            <p className="font-semibold">{project.endDate}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-[20px] font-bold">فريق العمل</h3>
        <div className="flex flex-wrap gap-2">
          {project.team.map((member, index) => (
            <Badge key={index} variant="neutral" rounded="full">{member}</Badge>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-bold">المهام</h3>
          <Link href={`/dashboard/projects/${id}/tasks/create`}><Button size="sm">إضافة مهمة</Button></Link>
        </div>
        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>المهمة</TableHeaderCell>
                <TableHeaderCell>الحالة</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
            {project.tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Card>
    </div>
  );
}
