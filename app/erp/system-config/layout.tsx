import React from "react";
import Link from "next/link";

export default function SystemConfigLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col gap-6 p-6">

      {/* العنوان الرئيسي */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">تهيئة النظام</h1>
        <p className="text-gray-500 text-sm mt-1">
          إعدادات النظام الأساسية لمنصة أعمالي
        </p>
      </div>

      {/* التبويبات */}
      <div className="flex gap-4 border-b pb-2 text-sm font-medium">
        <Tab href="/erp/system-config/company" label="بيانات الشركة" />
        <Tab href="/erp/system-config/branches" label="الفروع" />
        <Tab href="/erp/system-config/currency" label="العملة" />
        <Tab href="/erp/system-config/tax" label="الضريبة" />
        <Tab href="/erp/system-config/numbering" label="الترقيم" />
        <Tab href="/erp/system-config/periods" label="الفترات" />
        <Tab href="/erp/system-config/default-accounts" label="الحسابات الافتراضية" />
        <Tab href="/erp/system-config/general" label="الإعدادات العامة" />
      </div>

      {/* محتوى الصفحة */}
      <div className="bg-white rounded-lg shadow p-6">
        {children}
      </div>

    </div>
  );
}

function Tab({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-1 rounded hover:bg-gray-100 text-gray-700"
    >
      {label}
    </Link>
  );
}
