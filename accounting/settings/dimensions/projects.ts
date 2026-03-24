// accounting/settings/dimensions/projects.ts

export interface Project {
  id: string;
  code: string;              // PRJ-2024-01
  name: string;              // مشروع تطوير منصة أعمالي
  description?: string;
  startDate: string;
  endDate?: string;
  budget?: number;           // ميزانية المشروع
  departmentId?: string;     // الإدارة المسؤولة
  costCenterId?: string;     // مركز التكلفة
  status: "planned" | "active" | "on-hold" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const projects: Project[] = [
  {
    id: "prj-001",
    code: "PRJ-001",
    name: "مشروع تطوير منصة أعمالي",
    description: "تطوير نظام ERP سحابي متكامل",
    startDate: "2024-01-01",
    budget: 150000,
    departmentId: "dep-001",
    costCenterId: "cc-002",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
