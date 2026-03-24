import { NextResponse } from 'next/server';
import {
  getAccountById,
  updateAccount,
  deleteAccount
} from '@/accounting/settings/chartOfAccounts/accountRepository';

export async function GET(_: Request, { params }: any) {
  try {
    const account = await getAccountById(params.id);
    return NextResponse.json({ data: account });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to fetch account' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    const body = await req.json();
    const updated = await updateAccount(params.id, body);
    return NextResponse.json({ data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to update account' },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: any) {
  try {
    await deleteAccount(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to delete account' },
      { status: 500 }
    );
  }
}
