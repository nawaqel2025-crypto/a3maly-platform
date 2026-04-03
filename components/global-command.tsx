"use client";

import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  FileText,
  Settings,
  Home,
  PlusCircle,
  Sun,
  Moon,
} from "lucide-react";

export default function GlobalCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    clients: [],
    invoices: [],
    products: [],
    projects: [],
    tasks: [],
    users: [],
  });
  const [loading, setLoading] = useState(false);

  // فتح/إغلاق بـ Ctrl+K أو Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      if ((isMac && e.metaKey && e.key === "k") || (!isMac && e.ctrlKey && e.key === "k")) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // جلب البيانات من API
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
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    };

    const delay = setTimeout(fetchData, 200);
    return () => clearTimeout(delay);
  }, [query]);

  if (typeof document === "undefined") return null;
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center pt-24"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl mx-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* شريط البحث */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--color-border)]">
          <Search size={16} className="text-[var(--color-fg-muted)]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في العملاء، الفواتير، المنتجات، المشاريع، المهام، المستخدمين..."
            className="flex-1 bg-transparent outline-none text-[var(--color-fg)] placeholder-[var(--color-fg-muted)] text-sm"
          />
        </div>

        {/* النتائج */}
        <div className="max-h-80 overflow-y-auto py-2">

          {/* إجراءات سريعة */}
          <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">إجراءات سريعة</div>

          <button
            onClick={() => router.push("/clients/new")}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-right"
          >
            <PlusCircle size={16} />
            <span className="text-sm">إنشاء عميل جديد</span>
          </button>

          <button
            onClick={() => router.push("/invoices/new")}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-right"
          >
            <PlusCircle size={16} />
            <span className="text-sm">إنشاء فاتورة جديدة</span>
          </button>

          <button
            onClick={() => router.push("/projects/new")}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-right"
          >
            <PlusCircle size={16} />
            <span className="text-sm">إنشاء مشروع جديد</span>
          </button>

          {/* العملاء */}
          {results.clients.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">العملاء</div>
              {results.clients.map((c: any) => (
                <Link key={c.id} href={`/clients/${c.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <User size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{c.name}</span>
                      <span className="text-xs text-[var(--color-fg-muted)]">{c.email}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* الفواتير */}
          {results.invoices.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">الفواتير</div>
              {results.invoices.map((inv: any) => (
                <Link key={inv.id} href={`/invoices/${inv.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <FileText size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">فاتورة #{inv.number}</span>
                      <span className="text-xs text-[var(--color-fg-muted)]">{inv.status}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* المنتجات */}
          {results.products.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">المنتجات</div>
              {results.products.map((p: any) => (
                <Link key={p.id} href={`/products/${p.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <FileText size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{p.name}</span>
                      <span className="text-xs text-[var(--color-fg-muted)]">{p.price} ريال</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* المشاريع */}
          {results.projects.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">المشاريع</div>
              {results.projects.map((pr: any) => (
                <Link key={pr.id} href={`/projects/${pr.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <FileText size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{pr.title}</span>
                      <span className="text-xs text-[var(--color-fg-muted)]">{pr.status}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* المهام */}
          {results.tasks.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">المهام</div>
              {results.tasks.map((t: any) => (
                <Link key={t.id} href={`/tasks/${t.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <FileText size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{t.title}</span>
                      <span className="text-xs text-[var(--color-fg-muted)]">{t.priority}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* المستخدمين */}
          {results.users.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--color-fg-muted)]">المستخدمين</div>
              {results.users.map((u: any) => (
                <Link key={u.id} href={`/users/${u.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <User size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{u.name}</span>
                      <span className="text-xs text-[var(--color-fg-muted)]">{u.role}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}
