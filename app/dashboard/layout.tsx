import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* Navbar */}
        <Navbar />

        {/* Quick Access Links */}
        <div className="p-4 border-b bg-white shadow-sm">
          <Link
            href="/modules/accounting/chart-of-accounts/1"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            Chart of Accounts
          </Link>
        </div>

        {/* Page content */}
        <main className="p-6 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}
