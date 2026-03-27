import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET — جلب كل أصناف الفواتير
export async function GET() {
  const { data, error } = await supabase
    .from("sales_invoice_items")
    .select("*")
    .order("id", { ascending: true });

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json(data);
}

// POST — إنشاء أصناف الفاتورة (مجموعة أصناف دفعة واحدة)
export async function POST(req: Request) {
  const body = await req.json();

  // body يجب أن يكون مصفوفة أصناف
  if (!Array.isArray(body)) {
    return NextResponse.json(
      { error: "البيانات يجب أن تكون مصفوفة أصناف" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("sales_invoice_items")
    .insert(body)
    .select();

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json(data);
}
