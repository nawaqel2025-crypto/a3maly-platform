import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 ml-64">

        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
