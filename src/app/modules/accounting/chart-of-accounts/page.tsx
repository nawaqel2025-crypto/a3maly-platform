import { supabase } from '@/lib/supabase';

export default async function Page() {
  const { data, error } = await supabase.from('chart_of_accounts').select('*');

  if (error) return <pre>{error.message}</pre>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Chart of Accounts</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
