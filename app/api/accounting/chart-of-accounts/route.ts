import { NextResponse } from 'next/server';
import {
  getAllAccounts,
  createAccount
} from '@/accounting/settings/chartOfAccounts/accountRepository';

export async function GET() {
  try {
    const accounts = await getAllAccounts();
    return NextResponse.json({ data: accounts });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const account = await createAccount({
      code: body.code,
      name: body.name,
      type: body.type,
      nature: body.nature,
      parentId: body.parentId ?? null,
      level: body.level ?? 1,
      allowPosting: body.allowPosting ?? true,
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ data: account }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to create account' },
      { status: 500 }
    );
  }
}
