import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET — جلب أصناف الفاتورة حسب invoice_id
export async function GET(req: Request, { params }: any) {
  const { invoice_id } = params;

  const { data, error } = await supabase
    .from("sales_invoice_items")
    .select("*")
    .eq("invoice_id", invoice_id)
    .order("line_no", { ascending: true });

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json(data);
}
