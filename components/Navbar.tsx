"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, FileText } from "lucide-react";
import Input from "@/components/ui/input";
import Card from "@/components/ui/card";

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
    <nav className="flex w-full items-center justify-between border-b border-[var(--a3-border)] bg-[var(--a3-surface)] px-6 py-3">
      
      {/* Logo */}
      <Link href="/" className="font-bold text-lg">
        أعمالي
      </Link>

      {/* Search Box */}
      <div className="relative w-full max-w-md">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في العملاء، الفواتير، المنتجات..."
          icon={<Search size={16} className="text-[var(--a3-text-secondary)]" />}
        />

        {/* Dropdown */}
        {open && (
          <Card className="absolute left-0 right-0 top-12 z-50 max-h-80 overflow-y-auto p-0">

            {/* العملاء */}
            {results.clients.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">العملاء</div>
            )}
            {results.clients.map((c: any) => (
              <Link
                key={c.id}
                href={`/clients/${c.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]"
              >
                <User size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{c.name}</span>
                  <span className="text-xs text-[var(--a3-text-secondary)]">{c.email}</span>
                </div>
              </Link>
            ))}

            {/* الفواتير */}
            {results.invoices.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">الفواتير</div>
            )}
            {results.invoices.map((inv: any) => (
              <Link
                key={inv.id}
                href={`/invoices/${inv.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]"
              >
                <FileText size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">فاتورة #{inv.number}</span>
                  <span className="text-xs text-[var(--a3-text-secondary)]">{inv.status}</span>
                </div>
              </Link>
            ))}

            {/* المنتجات */}
            {results.products.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">المنتجات</div>
            )}
            {results.products.map((p: any) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]"
              >
                <FileText size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{p.name}</span>
                  <span className="text-xs text-[var(--a3-text-secondary)]">{p.price} ريال</span>
                </div>
              </Link>
            ))}

            {/* المشاريع */}
            {results.projects.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">المشاريع</div>
            )}
            {results.projects.map((pr: any) => (
              <Link
                key={pr.id}
                href={`/projects/${pr.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]"
              >
                <FileText size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{pr.title}</span>
                  <span className="text-xs text-[var(--a3-text-secondary)]">{pr.status}</span>
                </div>
              </Link>
            ))}

            {/* المهام */}
            {results.tasks.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">المهام</div>
            )}
            {results.tasks.map((t: any) => (
              <Link
                key={t.id}
                href={`/tasks/${t.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]"
              >
                <FileText size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{t.title}</span>
                  <span className="text-xs text-[var(--a3-text-secondary)]">{t.priority}</span>
                </div>
              </Link>
            ))}

            {/* المستخدمين */}
            {results.users.length > 0 && (
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">المستخدمين</div>
            )}
            {results.users.map((u: any) => (
              <Link
                key={u.id}
                href={`/users/${u.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]"
              >
                <User size={16} />
                <div className="flex flex-col">
                  <span className="text-sm">{u.name}</span>
                  <span className="text-xs text-[var(--a3-text-secondary)]">{u.role}</span>
                </div>
              </Link>
            ))}

          </Card>
        )}
      </div>

    </nav>
  );
}
