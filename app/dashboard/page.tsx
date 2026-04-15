import Card from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div dir="rtl">
      <Card className="space-y-2">
        <h1 className="text-[24px] font-bold text-[var(--a3-text-primary)]">لوحة التحكم</h1>
        <p className="text-[14px] text-[var(--a3-text-secondary)]">
          مرحباً نَشوان، هذه الصفحة تستخدم الآن مكونات واجهة A3MALY الموحدة.
        </p>
      </Card>
    </div>
  );
}
