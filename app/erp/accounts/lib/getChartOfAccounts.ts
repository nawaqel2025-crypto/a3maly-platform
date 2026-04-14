import { createClient } from '@supabase/supabase-js';
import { buildChartTree } from './buildChartTree';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getChartOfAccounts() {
  const { data, error } = await supabase
    .from('chart_of_accounts')
    .select('*')
    .order('code', { ascending: true });

  if (error) throw error;

  return buildChartTree(data || []);
}

export async function updateAccountParent(id: string, parent_id: string | null) {
  const { error } = await supabase
    .from('chart_of_accounts')
    .update({ parent_id })
    .eq('id', id);

  if (error) throw error;
}

