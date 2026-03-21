export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to A3maly Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Users: 120</div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Orders: 45</div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Revenue: $12,400</div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Active: 87%</div>
      </div>
    </div>
  );
}
