"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b">

      {/* زر القائمة للشاشات الصغيرة */}
      <button 
        className="md:hidden p-2 rounded hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <Menu size={24} />
      </button>

      {/* عنوان الصفحة */}
      <div className="text-lg font-semibold">
        لوحة التحكم
      </div>

      {/* زر تغيير الثيم */}
      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        تبديل الثيم
      </button>
    </header>
  );
}
