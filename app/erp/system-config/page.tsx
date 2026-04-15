export default function SystemConfigHome() {
  return (
    <div className="text-gray-900 dark:text-gray-100 space-y-4">
      <h2 className="text-2xl font-bold">تهيئة النظام</h2>

      <p className="text-gray-600 dark:text-gray-300">
        اختر أحد الأقسام من التبويبات أعلاه لبدء إعداد النظام.
      </p>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          تحتوي هذه الوحدة على إعدادات النظام الأساسية مثل بيانات الشركة، الفروع، العملة، الضريبة، الترقيم، الفترات، الحسابات الافتراضية، والإعدادات العامة.
        </p>
      </div>
    </div>
  );
}
