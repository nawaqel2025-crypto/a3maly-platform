"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white flex">

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold">A3maly</div>

        <nav className="mt-6 flex flex-col gap-3 px-4">
          <Link href="/dashboard" className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Dashboard</Link>
          <Link href="/dashboard/users" className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Users</Link>
          <Link href="/dashboard/reports" className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Reports</Link>
          <Link href="/dashboard/settings" className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Settings</Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64">

        {/* Navbar */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu size={28} />
          </button>

          <div className="font-semibold">Dashboard</div>

          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            Toggle Theme
          </button>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
