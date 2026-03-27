import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET — جلب كل الفواتير
export async function GET() {
  const { data, error } = await supabase
    .from("sales_invoices")
    .select("*")
    .order("id", { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json(data);
}

// POST — إنشاء فاتورة + أصنافها في نفس الطلب
export async function POST(req: Request) {
  const body = await req.json();

  const {
    company_id,
    items, // ← الأصناف تأتي هنا من الواجهة
    ...invoiceData // ← باقي بيانات الفاتورة
  } = body;

  if (!company_id) {
    return NextResponse.json(
      { error: "company_id مطلوب" },
      { status: 400 }
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "يجب إرسال أصناف الفاتورة" },
      { status: 400 }
    );
  }

  // 1) جلب آخر فاتورة للشركة
  const { data: lastInvoice } = await supabase
    .from("sales_invoices")
    .select("invoice_number")
    .eq("company_id", company_id)
    .order("id", { ascending: false })
    .limit(1)
    .single();

  // 2) استخراج الرقم السابق
  let nextNumber = 1;

  if (lastInvoice?.invoice_number) {
    const parts = lastInvoice.invoice_number.split("-");
    const lastNum = parseInt(parts[2]);
    nextNumber = lastNum + 1;
  }

  // 3) توليد رقم جديد
  const year = new Date().getFullYear();
  const padded = String(nextNumber).padStart(4, "0");
  const invoice_number = `INV-${year}-${padded}`;

  // 4) إنشاء الفاتورة
  const { data: invoice, error: invoiceError } = await supabase
    .from("sales_invoices")
    .insert({
      ...invoiceData,
      company_id,
      invoice_number,
    })
    .select()
    .single();

  if (invoiceError) {
    return NextResponse.json({ error: invoiceError }, { status: 400 });
  }

  // 5) تجهيز أصناف الفاتورة
  const itemsPayload = items.map((item: any, index: number) => ({
    invoice_id: invoice.id,
    line_no: index + 1,
    item_id: item.item_id ? Number(item.item_id) : null,
    item_name: item.item_name || null,
    unit: item.unit || null,
    qty: Number(item.qty) || 0,
    price: Number(item.price) || 0,
    discount_percent: Number(item.discount_percent) || 0,
    discount_amount: Number(item.discount_amount) || 0,
    vat_percent: Number(item.vat_percent) || 0,
    vat_amount: Number(item.vat_amount) || 0,
    line_total: Number(item.line_total) || 0,
    line_notes: item.line_notes || null,
  }));

  // 6) إدخال الأصناف
  const { error: itemsError } = await supabase
    .from("sales_invoice_items")
    .insert(itemsPayload);

  if (itemsError) {
    return NextResponse.json({ error: itemsError }, { status: 400 });
  }

  // 7) إرجاع الفاتورة + الأصناف
  return NextResponse.json({
    invoice,
    items: itemsPayload,
  });
}
