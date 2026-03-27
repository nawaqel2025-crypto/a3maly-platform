import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET — جلب فاتورة واحدة
export async function GET(req: Request, { params }: any) {
  const { id } = params;

  const { data, error } = await supabase
    .from("sales_invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json(data);
}

// PUT — تحديث فاتورة
export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("sales_invoices")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json(data);
}

// DELETE — حذف فاتورة
export async function DELETE(req: Request, { params }: any) {
  const { id } = params;

  const { error } = await supabase
    .from("sales_invoices")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ success: true });
}
