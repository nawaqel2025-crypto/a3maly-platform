export default function SystemConfigHome() {
  return (
    <div className="space-y-4" dir="rtl">
      <h2 className="text-[24px] font-bold text-[var(--a3-text-primary)]">تهيئة النظام</h2>

      <p className="text-[14px] text-[var(--a3-text-secondary)]">
        اختر أحد الأقسام من التبويبات أعلاه لبدء إعداد النظام.
      </p>

      <div className="rounded-[8px] border border-[var(--a3-border)] bg-[var(--a3-background)] p-4">
        <p className="text-[14px] text-[var(--a3-text-secondary)]">
          تحتوي هذه الوحدة على إعدادات النظام الأساسية مثل بيانات الشركة، الفروع، العملة، الضريبة، الترقيم، الفترات، الحسابات الافتراضية، والإعدادات العامة.
        </p>
      </div>
    </div>
  );
}
