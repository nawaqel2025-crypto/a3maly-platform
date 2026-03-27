"use client";

export default function EditInvoicePage({ params }) {
  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">
        تعديل الفاتورة رقم #{params.id}
      </h1>

      <p>سيتم إضافة نموذج التعديل لاحقًا.</p>
    </div>
  );
}
