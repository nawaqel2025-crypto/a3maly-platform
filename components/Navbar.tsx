"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, FileText } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    clients: [],
    invoices: [],
    products: [],
    projects: [],
    tasks: [],
    users: [],
  });
  const [open, setOpen] = useState(false);

  // جلب نتائج البحث
  useEffect(() => {
    if (!query.trim()) {
      setResults({
        clients: [],
        invoices: [],
        products: [],
        projects: [],
        tasks: [],
        users: [],
      });
      setOpen(false);
      return;
    }

    const fetchData = async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
      setOpen(true);
    };

    const delay = setTimeout(fetchData, 200);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <nav className="w-full border-b border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <Link href="/" className="font-bold text-lg">
        أعمالي
      </Link>

      {/* Search Box */}
      <div className="relative w-full max-w-md">
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-muted)] rounded-lg border border-[var(--color-border)]">
          <Search size={16} className="text-[var(--color-fg-muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في العملاء، الفواتير، المنتجات..."
            className="flex-1 bg-transparent outline-none text-sm text-[var(--color-fg)]"
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute top-12 left-0 right-0 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">

            {/* العملاء */}
            {results.clients.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">العملاء</div>
            )}
            {results.clients.map((c: any) => (
              <Link
                key={c.id}
                href={`/clients/${c.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <User size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{c.name}</span>
                  <span className="text-xs text-[var(--color-fg-muted)]">{c.email}</span>
                </div>
              </Link>
            ))}

            {/* الفواتير */}
            {results.invoices.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">الفواتير</div>
            )}
            {results.invoices.map((inv: any) => (
              <Link
                key={inv.id}
                href={`/invoices/${inv.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FileText size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">فاتورة #{inv.number}</span>
                  <span className="text-xs text-[var(--color-fg-muted)]">{inv.status}</span>
                </div>
              </Link>
            ))}

            {/* المنتجات */}
            {results.products.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">المنتجات</div>
            )}
            {results.products.map((p: any) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FileText size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{p.name}</span>
                  <span className="text-xs text-[var(--color-fg-muted)]">{p.price} ريال</span>
                </div>
              </Link>
            ))}

            {/* المشاريع */}
            {results.projects.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">المشاريع</div>
            )}
            {results.projects.map((pr: any) => (
              <Link
                key={pr.id}
                href={`/projects/${pr.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FileText size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{pr.title}</span>
                  <span className="text-xs text-[var(--color-fg-muted)]">{pr.status}</span>
                </div>
              </Link>
            ))}

            {/* المهام */}
            {results.tasks.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">المهام</div>
            )}
            {results.tasks.map((t: any) => (
              <Link
                key={t.id}
                href={`/tasks/${t.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FileText size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{t.title}</span>
                  <span className="text-xs text-[var(--color-fg-muted)]">{t.priority}</span>
                </div>
              </Link>
            ))}

            {/* المستخدمين */}
            {results.users.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">المستخدمين</div>
            )}
            {results.users.map((u: any) => (
              <Link
                key={u.id}
                href={`/users/${u.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <User size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{u.name}</span>
                  <span className="text-xs text-[var(--color-fg-muted)]">{u.role}</span>
                </div>
              </Link>
            ))}

          </div>
        )}
      </div>

    </nav>
  );
}
