import { NextResponse } from "next/server";

let journalEntries: any[] = []; // مؤقتًا في الذاكرة – لاحقًا تربطه بقاعدة البيانات

export async function GET() {
  return NextResponse.json({ data: journalEntries });
}

export async function POST(req: Request) {
  const body = await req.json();

  const newEntry = {
    id: journalEntries.length + 1,
    date: body.date,
    description: body.description,
    debitAccountId: body.debitAccountId,
    debitAccountName: body.debitAccountName,
    creditAccountId: body.creditAccountId,
    creditAccountName: body.creditAccountName,
    amount: body.amount,
    source: body.source,   // "receipt-voucher" | "payment-voucher" | "manual"
    sourceId: body.sourceId ?? null,
  };

  journalEntries.push(newEntry);

  return NextResponse.json({ data: newEntry }, { status: 201 });
}
