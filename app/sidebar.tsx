"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pin,
  PinOff,
  Sun,
  Moon,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [pinned, setPinned] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState<boolean | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
      return;
    }

    if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
      return;
    }

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setDark(systemPrefersDark);

    if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newValue = !dark;
    setDark(newValue);

    if (newValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isCollapsed = collapsed && !hovering;

  const handleMouseEnter = () => {
    if (collapsed) setHovering(true);
  };

  const handleMouseLeave = () => {
    if (collapsed) setHovering(false);
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
    setHovering(false);
  };

  const toggle = (key: string) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePin = (href: string) => {
    setPinned((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const groups = [
    {
      key: "accounting",
      label: "الحسابات",
      icon: "📒",
      items: [
        { href: "/modules/accounting/chart-of-accounts/1", label: "شجرة الحسابات" },
        { href: "/dashboard/accounting/journal", label: "القيود اليومية" },
        { href: "/dashboard/accounting/receipt-voucher", label: "سند قبض" },
        { href: "/dashboard/accounting/payment-voucher", label: "سند صرف" },
      ],
    },
    {
      key: "sales",
      label: "المبيعات",
      icon: "🧾",
      items: [
        { href: "/dashboard/sales/invoices", label: "الفواتير" },
        { href: "/dashboard/sales/invoices/create", label: "إنشاء فاتورة" },
      ],
    },
    {
      key: "purchasing",
      label: "المشتريات",
      icon: "📦",
      items: [
        { href: "/purchasing/orders", label: "أوامر الشراء" },
        { href: "/purchasing/bills", label: "فواتير الموردين" },
      ],
    },
    {
      key: "inventory",
      label: "المخزون",
      icon: "🏷️",
      items: [{ href: "/dashboard/inventory/items", label: "الأصناف" }],
    },
    {
      key: "customers",
      label: "العملاء",
      icon: "👥",
      items: [{ href: "/dashboard/customers", label: "قائمة العملاء" }],
    },
    {
      key: "suppliers",
      label: "الموردين",
      icon: "🏭",
      items: [
        { href: "/suppliers", label: "قائمة الموردين" },
        { href: "/suppliers/create", label: "إضافة مورد" },
      ],
    },
  ];

  const isActive = (href: string) => pathname.startsWith(href);
  const matchesSearch = (text: string) =>
    text.toLowerCase().includes(search.toLowerCase());

  const sidebarWidthClass = isCollapsed ? "w-16" : "w-64";

  return (
    <aside
      className={`
        ${sidebarWidthClass}
        h-screen
        bg-[#F9FAFB] dark:bg-[#1E1E1E]
        border-l border-[#E5E7EB] dark:border-[#2A2A2A]
        flex flex-col shadow-sm
        transition-all duration-300
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`
          p-4 border-b dark:border-[#2A2A2A]
          flex items-center ${isCollapsed ? "justify-center" : "justify-between"}
        `}
      >
        {!isCollapsed && (
          <h1 className="text-xl font-bold tracking-tight text-[#2CC5C0]">
            منصة أعمالي
          </h1>
        )}

        {isCollapsed && (
          <span className="text-lg font-bold text-[#2CC5C0]">ع</span>
        )}

        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="hover:opacity-70 transition">
              {dark ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button onClick={toggleCollapse} className="hover:opacity-70 transition">
              <ChevronLeft size={18} />
            </button>
          </div>
        )}

        {isCollapsed && (
          <button onClick={toggleCollapse} className="hover:opacity-70 transition">
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-4 border-b dark:border-[#2A2A2A]">
          <input
            type="text"
            placeholder="بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full p-2 rounded-md 
              border border-[#CBD5E1] dark:border-[#2A2A2A]
              bg-white dark:bg-[#121212]
              text-sm
            "
          />
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {pinned.length > 0 && (
          <div>
            {!isCollapsed && (
              <div className="text-xs opacity-60 mb-1">العناصر المثبتة</div>
            )}

            <div className="space-y-1">
              {pinned.map((href) => {
                const item = groups
                  .flatMap((g) => g.items)
                  .find((i) => i.href === href);
                if (!item || !matchesSearch(item.label)) return null;

                return (
                  <div
                    key={href}
                    className={`
                      flex items-center justify-between 
                      p-2 rounded-md text-sm 
                      transition-colors duration-300
                      ${isActive(href)
                        ? "bg-[#E6FAF9] dark:bg-[#0F3F3D]"
                        : "hover:bg-gray-100 dark:hover:bg-[#2A2A2A]"}
                    `}
                  >
                    <Link href={href} className="flex-1 truncate">
                      {isCollapsed ? "★" : item.label}
                    </Link>

                    {!isCollapsed && (
                      <button
                        onClick={() => togglePin(href)}
                        className="text-[#2CC5C0]"
                      >
                        <PinOff size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {!isCollapsed && (
              <div className="border-b dark:border-[#2A2A2A] my-3"></div>
            )}
          </div>
        )}

        {groups.map((group) => {
          const groupMatches = matchesSearch(group.label);
          const visibleItems = group.items.filter((i) =>
            matchesSearch(i.label)
          );

          if (!groupMatches && visibleItems.length === 0) return null;

          const groupActive = group.items.some((i) => isActive(i.href));

          return (
            <div key={group.key}>
              <button
                onClick={() => !isCollapsed && toggle(group.key)}
                className={`
                  flex items-center 
                  ${isCollapsed ? "justify-center" : "justify-between"}
                  w-full p-2 rounded-md font-medium 
                  transition-colors duration-300
                  ${groupActive
                    ? "bg-[#E6FAF9] dark:bg-[#0F3F3D]"
                    : "hover:bg-gray-100 dark:hover:bg-[#2A2A2A]"}
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{group.icon}</span>
                  {!isCollapsed && <span>{group.label}</span>}
                </div>

                {!isCollapsed && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      open[group.key] ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {!isCollapsed && (
                <div
                  className={`
                    ml-6 overflow-hidden transition-all duration-300
                    ${open[group.key] ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="space-y-1 text-sm">
                    {visibleItems.map((item) => (
                      <div
                        key={item.href}
                        className={`
                          relative flex items-center justify-between 
                          p-2 rounded-md 
                          transition-colors duration-300
                          ${isActive(item.href)
                            ? "bg-[#E6FAF9] dark:bg-[#0F3F3D]"
                            : "hover:bg-gray-100 dark:hover:bg-[#2A2A2A]"}
                        `}
                      >
                        {isActive(item.href) && (
                          <span className="absolute right-0 top-0 bottom-0 w-1 bg-[#2CC5C0] rounded-l-md" />
                        )}

                        <Link
                          href={item.href}
                          className="flex items-center gap-2 flex-1"
                        >
                          <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full" />
                          <span className="truncate">{item.label}</span>
                        </Link>

                        <button
                          onClick={() => togglePin(item.href)}
                          className={`transition ${
                            pinned.includes(item.href)
                              ? "text-[#2CC5C0]"
                              : "text-gray-400"
                          }`}
                        >
                          <Pin size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div
        className={`
          p-4 border-t dark:border-[#2A2A2A] text-sm opacity-80
          ${isCollapsed ? "text-center" : ""}
        `}
      >
        {isCollapsed ? "ن ع" : "نشوان علي"}
      </div>
    </aside>
  );
}
