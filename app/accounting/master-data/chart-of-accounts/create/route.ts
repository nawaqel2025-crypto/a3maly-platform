import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// -----------------------------
// ZOD SCHEMA
// -----------------------------
const ChartOfAccountSchema = z.object({
  code: z.string().min(1, "Account code is required"),
  name: z.string().min(1, "Account name is required"),
  type: z.enum([
    "ASSET",
    "LIABILITY",
    "EQUITY",
    "REVENUE",
    "EXPENSE"
  ]),
  parentId: z.string().optional().nullable(),
  companyId: z.string().min(1, "Company ID is required"),
});

// -----------------------------
// POST: Create Chart of Account
// -----------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = ChartOfAccountSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { code, name, type, parentId, companyId } = parsed.data;

    // Check duplicate code
    const exists = await prisma.chartOfAccounts.findFirst({
      where: { code, companyId },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Account code already exists for this company" },
        { status: 409 }
      );
    }

    const account = await prisma.chartOfAccounts.create({
      data: {
        code,
        name,
        type,
        parentId,
        companyId,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully", account },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Chart of Account Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}