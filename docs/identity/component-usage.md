# A3MALY Component Usage Guide

This guide defines how to use unified UI components in the A3MALY platform.
All UI implementations must follow the identity tokens and design-system structure from:

- `docs/identity/a3maly-identity.yaml`
- `docs/identity/design-system/colors.yaml`
- `docs/identity/design-system/typography.yaml`
- `docs/identity/design-system/spacing.yaml`
- `docs/identity/design-system/layout.yaml`
- `docs/identity/design-system/components.yaml`

## Core Identity Rules

- Use components from `/components/ui/` only.
- Do not create ad-hoc button, card, input, or table styles inside pages.
- Keep spacing and typography aligned with official tokens.
- Use semantic color tokens (primary, border, text, success, warning, danger, info).
- Keep visual behavior consistent across modules (ERP, auth, dashboard, reports).

---

## Buttons

Use `Button` variants and sizes exactly as defined in the design system.

- Variants: `primary`, `secondary`, `outline`, `danger`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Radius: `8px`

```tsx
import Button from "@/components/ui/button";

export default function ButtonExamples() {
  return (
    <div className="flex flex-wrap gap-3" dir="rtl">
      <Button variant="primary" size="md">حفظ</Button>
      <Button variant="secondary" size="md">إلغاء</Button>
      <Button variant="outline" size="md">عرض التفاصيل</Button>
      <Button variant="danger" size="md">حذف</Button>
      <Button variant="ghost" size="sm">رجوع</Button>
    </div>
  );
}
```

```tsx
import Button from "@/components/ui/button";

export default function LoadingButtonExample() {
  return (
    <Button variant="primary" size="lg" loading>
      جاري الحفظ...
    </Button>
  );
}
```

---

## Cards

Use `Card` for all content containers.

- Background: surface color
- Border: official border color
- Padding defaults to design token (`20px` equivalent in system usage)
- Typical radius: `12px`

```tsx
import Card from "@/components/ui/card";

export default function CardExample() {
  return (
    <Card className="space-y-2" dir="rtl">
      <h3 className="text-[20px] font-semibold">ملخص الحساب</h3>
      <p className="text-[14px] text-[var(--a3-text-secondary)]">
        هذا القسم يعرض أهم مؤشرات الأداء المالية بشكل موحّد.
      </p>
    </Card>
  );
}
```

```tsx
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";

export default function CardWithStatusExample() {
  return (
    <Card className="flex items-center justify-between" dir="rtl">
      <div>
        <h4 className="text-[16px] font-semibold">حالة المهمة</h4>
        <p className="text-[14px] text-[var(--a3-text-secondary)]">تمت المراجعة الأخيرة الآن</p>
      </div>
      <Badge variant="success">مكتمل</Badge>
    </Card>
  );
}
```

---

## Tables

Tables must follow identity specs:

- Header background: light neutral (`#F1F5F9` style)
- Header text: primary text color
- Row hover: identity background hover
- Border color: identity border token
- Row height and spacing should remain consistent

```tsx
type Row = {
  id: string;
  account: string;
  balance: string;
  status: string;
};

const rows: Row[] = [
  { id: "1", account: "الصندوق", balance: "25,000", status: "نشط" },
  { id: "2", account: "البنك", balance: "120,500", status: "نشط" },
];

export default function TableExample() {
  return (
    <div className="overflow-x-auto rounded-[12px] border border-[var(--a3-border)]" dir="rtl">
      <table className="min-w-full text-right">
        <thead className="bg-[#F1F5F9] text-[var(--a3-text-primary)]">
          <tr>
            <th className="px-4 py-3 text-[14px] font-semibold">الحساب</th>
            <th className="px-4 py-3 text-[14px] font-semibold">الرصيد</th>
            <th className="px-4 py-3 text-[14px] font-semibold">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[var(--a3-border)] hover:bg-[var(--a3-background)]">
              <td className="px-4 py-3 text-[14px]">{row.account}</td>
              <td className="px-4 py-3 text-[14px]">{row.balance}</td>
              <td className="px-4 py-3 text-[14px]">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Inputs

Use unified `Input` component for text, email, password, numbers, and search fields.

- Height: `42px` equivalent
- Radius: `8px`
- Border and focus border from identity tokens
- Label style must be consistent

```tsx
import Input from "@/components/ui/input";
import { Search } from "lucide-react";

export default function InputExample() {
  return (
    <div className="grid gap-4" dir="rtl">
      <Input label="اسم الفرع" placeholder="أدخل اسم الفرع" />
      <Input label="البريد الإلكتروني" type="email" placeholder="branch@company.com" />
      <Input
        label="بحث سريع"
        placeholder="ابحث عن عميل أو فاتورة..."
        icon={<Search size={16} className="text-[var(--a3-text-secondary)]" />}
      />
    </div>
  );
}
```

```tsx
import Input from "@/components/ui/input";

export default function InputValidationExample() {
  return (
    <Input
      label="رقم الهوية"
      placeholder="أدخل رقم الهوية"
      error="رقم الهوية غير صالح"
    />
  );
}
```

---

## Tabs

Tabs should be visually lightweight and token-driven.

- Active tab: primary text + subtle primary background
- Inactive tab: secondary text + transparent background
- Keep spacing and typography consistent

```tsx
import { useState } from "react";

const tabs = ["البيانات الأساسية", "الإعدادات", "المرفقات"];

export default function TabsExample() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-2 border-b border-[var(--a3-border)] pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={[
                "rounded-[8px] px-4 py-2 text-[14px] font-medium transition-colors",
                isActive
                  ? "bg-[var(--a3-primary)]/10 text-[var(--a3-primary)]"
                  : "text-[var(--a3-text-secondary)] hover:bg-[var(--a3-background)]",
              ].join(" ")}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div className="text-[14px] text-[var(--a3-text-secondary)]">المحتوى الحالي: {activeTab}</div>
    </div>
  );
}
```

---

## Form Layout

Form layout must use predictable spacing and clear grouping.

- Vertical rhythm should use identity spacing tokens (`8`, `16`, `24`, `32`)
- Group related fields inside cards
- Keep labels, field heights, and button placements consistent

```tsx
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function FormLayoutExample() {
  return (
    <Card className="space-y-4" dir="rtl">
      <h2 className="text-[20px] font-semibold">بيانات الشركة</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="اسم الشركة" placeholder="أدخل اسم الشركة" />
        <Input label="رقم السجل التجاري" placeholder="أدخل الرقم" />
        <Input label="البريد الإلكتروني" type="email" placeholder="info@company.com" />
        <Input label="رقم الهاتف" placeholder="+966 5X XXX XXXX" />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary">إلغاء</Button>
        <Button variant="primary">حفظ</Button>
      </div>
    </Card>
  );
}
```

---

## Table Actions

Row and table-level actions must remain consistent in position and behavior.

- Primary actions use `primary` button
- Neutral actions use `outline` or `secondary`
- Destructive actions use `danger`
- Keep action sets compact and readable

```tsx
import Button from "@/components/ui/button";

export default function TableActionsExample() {
  return (
    <div className="flex items-center gap-2" dir="rtl">
      <Button size="sm" variant="outline">عرض</Button>
      <Button size="sm" variant="secondary">تعديل</Button>
      <Button size="sm" variant="danger">حذف</Button>
    </div>
  );
}
```

```tsx
import Button from "@/components/ui/button";

export default function TableBulkActionsExample() {
  return (
    <div className="flex flex-wrap gap-2" dir="rtl">
      <Button variant="primary">اعتماد المحدد</Button>
      <Button variant="outline">تصدير</Button>
      <Button variant="danger">حذف المحدد</Button>
    </div>
  );
}
```

---

## Notes

- All new interfaces must start from `/components/ui/` components.
- Avoid legacy utility combinations that bypass design tokens.
- If a component is missing, extend the existing UI layer instead of creating page-local variants.
- Keep Arabic RTL alignment as default where applicable.
- Keep examples isolated; do not merge unrelated patterns into one snippet.
- Every code sample in this guide is intentionally placed in a separate, closed `tsx` block.

---

## Goals

- Unify visual identity across all pages and modules.
- Reduce design drift and duplicated UI logic.
- Improve maintainability by centralizing UI behavior.
- Ensure consistent accessibility and readability.
- Speed up feature development using predictable, reusable components.
- Keep A3MALY branding clear, modern, and system-wide.
