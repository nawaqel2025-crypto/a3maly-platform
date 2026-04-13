"use client";

import { useState } from "react";

const tabs = [
  { id: "general", label: "الإعدادات العامة", icon: "⚙️" },
  { id: "defaults", label: "الحسابات الافتراضية", icon: "📁" },
  { id: "periods", label: "الفترات", icon: "📅" },
  { id: "numbering", label: "الترقيم", icon: "🔢" },
  { id: "tax", label: "الضريبة", icon: "💰" },
  { id: "currency", label: "العملة", icon: "💱" },

  /* ← تمت الإضافة */
  { id: "branches", label: "الفروع", icon: "🏢" },
  { id: "company", label: "بيانات الشركة", icon: "🏛️" },
];

export default function AccountingSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        إعدادات المحاسبة
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[var(--color-border)] pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-1 px-3 py-2 text-sm
              ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              }
            `}
          >
            <span className="text-[12px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "defaults" && <DefaultAccounts />}
        {activeTab === "periods" && <PeriodsSettings />}
        {activeTab === "numbering" && <NumberingSettings />}
        {activeTab === "tax" && <TaxSettings />}
        {activeTab === "currency" && <CurrencySettings />}

        {/* ← تمت الإضافة */}
        {activeTab === "branches" && <BranchesSettings />}
        {activeTab === "company" && <CompanySettings />}
      </div>
    </div>
  );
}

/* ===========================
   Cards
=========================== */

function Card({ title, children }: any) {
  return (
    <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-3">
      <h3 className="text-lg font-semibold text-[var(--color-fg)]">{title}</h3>
      {children}
    </div>
  );
}

/* الإعدادات العامة */
function GeneralSettings() {
  return (
    <div className="space-y-4">
      <Card title="السنة المالية">
        <div className="grid grid-cols-2 gap-4">
          <Input label="تاريخ البداية" type="date" />
          <Input label="تاريخ النهاية" type="date" />
        </div>
      </Card>

      <Card title="خيارات القيود">
        <div className="space-y-2">
          <Checkbox label="السماح بالقيود بتاريخ سابق" />
          <Checkbox label="السماح بالقيود بتاريخ مستقبلي" />
          <Checkbox label="إلزامية البيان" />
        </div>
      </Card>
    </div>
  );
}

/* الحسابات الافتراضية */
function DefaultAccounts() {
  return (
    <Card title="الحسابات الافتراضية">
      <div className="grid grid-cols-2 gap-4">
        <Select label="حساب الأرباح والخسائر" />
        <Select label="حساب الأرباح المرحلة" />
        <Select label="حساب المخزون" />
        <Select label="حساب تكلفة البضاعة" />
        <Select label="حساب الضريبة" />
      </div>
    </Card>
  );
}

/* الفترات */
function PeriodsSettings() {
  return (
    <Card title="الفترات المحاسبية">
      <Checkbox label="السماح بالتعديل بعد الإغلاق" />
    </Card>
  );
}

/* الترقيم */
function NumberingSettings() {
  return (
    <Card title="ترقيم المستندات">
      <div className="grid grid-cols-2 gap-4">
        <Input label="بادئة القيود" />
        <Input label="بادئة الفواتير" />
        <Input label="بادئة السندات" />
      </div>
    </Card>
  );
}

/* الضريبة */
function TaxSettings() {
  return (
    <Card title="إعدادات الضريبة">
      <Input label="نسبة الضريبة (%)" type="number" />
    </Card>
  );
}

/* العملة */
function CurrencySettings() {
  return (
    <Card title="إعدادات العملة">
      <Input label="العملة الرئيسية" />
      <Input label="عدد المنازل العشرية" type="number" />
    </Card>
  );
}

/* ===========================
   الفروع  (تمت الإضافة)
=========================== */

function BranchesSettings() {
  return (
    <Card title="الفروع">
      <div className="space-y-3">
        <Input label="اسم الفرع" />
        <Input label="كود الفرع" />
        <Select label="العملة" />
      </div>
    </Card>
  );
}

/* ===========================
   بيانات الشركة  (تمت الإضافة)
=========================== */

function CompanySettings() {
  return (
    <Card title="بيانات الشركة">
      <div className="space-y-3">
        <Input label="اسم الشركة" />
        <Input label="الرقم الضريبي" />
        <Input label="العنوان" />
        <Input label="رقم الهاتف" />
        <Input label="البريد الإلكتروني" type="email" />
      </div>
    </Card>
  );
}

/* عناصر UI صغيرة */
function Input({ label, type = "text" }: any) {
  return (
    <div>
      <label className="block mb-1 text-sm">{label}</label>
      <input
        type={type}
        className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
      />
    </div>
  );
}

function Select({ label }: any) {
  return (
    <div>
      <label className="block mb-1 text-sm">{label}</label>
      <select className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]">
        <option>اختر…</option>
      </select>
    </div>
  );
}

function Checkbox({ label }: any) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" />
      {label}
    </label>
  );
}
