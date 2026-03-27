import { createClient } from "@supabase/supabase-js";
import CreateAccountForm from "./CreateAccountForm";

export default async function CreateAccountPage({ params }: { params: { id: string } }) {
  const companyId = params.id;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: accounts } = await supabase
    .from("chart_of_accounts")
    .select("id, name, code")
    .eq("company_id", companyId)
    .order("code", { ascending: true });

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">إضافة حساب جديد</h1>
      <CreateAccountForm companyId={companyId} accounts={accounts || []} />
    </div>
  );
}
