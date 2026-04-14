import TreeView from './TreeView';
import { getChartOfAccounts } from '../../lib/getChartOfAccounts';

export default async function Page() {
  const tree = await getChartOfAccounts();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">شجرة الحسابات</h1>
      <TreeView initialTree={tree} />
    </div>
  );
}
