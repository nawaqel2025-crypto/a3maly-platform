"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  FileText,
  PlusCircle,
} from "lucide-react";
import Input from "@/components/ui/input";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

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
      <Card className="mx-4 w-full max-w-xl overflow-hidden p-0" onClick={(e) => e.stopPropagation()}>
        {/* شريط البحث */}
        <div className="border-b border-[var(--a3-border)] p-3">
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في العملاء، الفواتير، المنتجات، المشاريع، المهام، المستخدمين..."
            icon={<Search size={16} className="text-[var(--a3-text-secondary)]" />}
          />
        </div>

        {/* النتائج */}
        <div className="max-h-80 overflow-y-auto py-2">

          {/* إجراءات سريعة */}
          <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">إجراءات سريعة</div>

          <Button
            onClick={() => router.push("/clients/new")}
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-none px-4 py-2 text-right hover:bg-[var(--a3-background)]"
          >
            <PlusCircle size={16} />
            <span className="text-sm">إنشاء عميل جديد</span>
          </Button>

          <Button
            onClick={() => router.push("/invoices/new")}
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-none px-4 py-2 text-right hover:bg-[var(--a3-background)]"
          >
            <PlusCircle size={16} />
            <span className="text-sm">إنشاء فاتورة جديدة</span>
          </Button>

          <Button
            onClick={() => router.push("/projects/new")}
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-none px-4 py-2 text-right hover:bg-[var(--a3-background)]"
          >
            <PlusCircle size={16} />
            <span className="text-sm">إنشاء مشروع جديد</span>
          </Button>

          {/* العملاء */}
          {results.clients.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">العملاء</div>
              {results.clients.map((c: any) => (
                <Link key={c.id} href={`/clients/${c.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]">
                    <User size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{c.name}</span>
                      <span className="text-xs text-[var(--a3-text-secondary)]">{c.email}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* الفواتير */}
          {results.invoices.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">الفواتير</div>
              {results.invoices.map((inv: any) => (
                <Link key={inv.id} href={`/invoices/${inv.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]">
                    <FileText size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">فاتورة #{inv.number}</span>
                      <span className="text-xs text-[var(--a3-text-secondary)]">{inv.status}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* المنتجات */}
          {results.products.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">المنتجات</div>
              {results.products.map((p: any) => (
                <Link key={p.id} href={`/products/${p.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]">
                    <FileText size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{p.name}</span>
                      <span className="text-xs text-[var(--a3-text-secondary)]">{p.price} ريال</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* المشاريع */}
          {results.projects.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">المشاريع</div>
              {results.projects.map((pr: any) => (
                <Link key={pr.id} href={`/projects/${pr.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]">
                    <FileText size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{pr.title}</span>
                      <span className="text-xs text-[var(--a3-text-secondary)]">{pr.status}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* المهام */}
          {results.tasks.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">المهام</div>
              {results.tasks.map((t: any) => (
                <Link key={t.id} href={`/tasks/${t.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]">
                    <FileText size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{t.title}</span>
                      <span className="text-xs text-[var(--a3-text-secondary)]">{t.priority}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* المستخدمين */}
          {results.users.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-[var(--a3-text-secondary)]">المستخدمين</div>
              {results.users.map((u: any) => (
                <Link key={u.id} href={`/users/${u.id}`} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--a3-background)]">
                    <User size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm">{u.name}</span>
                      <span className="text-xs text-[var(--a3-text-secondary)]">{u.role}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

        </div>
      </Card>
    </div>,
    document.body
  );
}
