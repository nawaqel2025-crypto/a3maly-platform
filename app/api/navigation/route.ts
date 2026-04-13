import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1) Fetch modules
  const { data: modules } = await supabase
    .from("modules")
    .select("*")
    .order("sort_order", { ascending: true });

  // 2) Fetch sections
  const { data: sections } = await supabase
    .from("module_sections")
    .select("*")
    .order("sort_order", { ascending: true });

  // 3) Fetch items
  const { data: items } = await supabase
    .from("module_section_items")
    .select("*")
    .order("sort_order", { ascending: true });

  // 4) Build hierarchical structure
  const result = modules?.map((module) => {
    const moduleSections = sections
      ?.filter((s) => s.module_id === module.id)
      .map((section) => {
        const sectionItems = items?.filter(
          (i) => i.section_id === section.id
        );

        return {
          id: section.id,
          code: section.code,
          title: section.title,
          sort_order: section.sort_order,
          items: sectionItems,
        };
      });

    return {
      id: module.id,
      code: module.code,
      title: module.title,
      icon: module.icon,
      sort_order: module.sort_order,
      sections: moduleSections,
    };
  });

  return NextResponse.json(result);
}
