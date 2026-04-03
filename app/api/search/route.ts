import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  if (!q) {
    return NextResponse.json({
      clients: [],
      invoices: [],
      products: [],
      projects: [],
      tasks: [],
      users: [],
    });
  }

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, email")
    .ilike("name", `%${q}%`);

  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, number, status")
    .ilike("number", `%${q}%`);

  const { data: products } = await supabase
    .from("products")
    .select("id, name, price")
    .ilike("name", `%${q}%`);

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, status")
    .ilike("title", `%${q}%`);

  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, title, priority")
    .ilike("title", `%${q}%`);

  const { data: users } = await supabase
    .from("users")
    .select("id, name, role")
    .ilike("name", `%${q}%`);

  return NextResponse.json({
    clients: clients || [],
    invoices: invoices || [],
    products: products || [],
    projects: projects || [],
    tasks: tasks || [],
    users: users || [],
  });
}
