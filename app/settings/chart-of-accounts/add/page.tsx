'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddAccountPage() {
  const router = useRouter();

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    code: '',
    name: '',
    type: '',
    nature: '',
    parentId: '',
    allowPosting: true,
    isActive: true,
  });

  useEffect(() => {
    async function loadAccounts() {
      try {
        const res = await fetch('/api/accounting/chart-of-accounts');
        const json = await res.json();
        setAccounts(json.data || []);
      } catch (err) {
        console.error('Failed to load accounts', err);
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/accounting/chart-of-accounts', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/accounting/settings/chart-of-accounts');
    } else {
      alert('حدث خطأ أثناء إضافة الحساب');
    }
  }

  if (loading) {
    return <div className="p-6 text-lg">جاري تحميل البيانات...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">إضافة حساب جديد</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-semibold">الكود</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">اسم الحساب</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">النوع</label>
          <select
            className="border p-2 w-full rounded"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">اختر النوع</option>
            <option value="asset">أصل</option>
            <option value="liability">التزام</option>
            <option value="equity">حقوق ملكية</option>
            <option value="revenue">إيراد</option>
            <option value="expense">مصروف</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">الطبيعة</label>
          <select
            className="border p-2 w-full rounded"
            value={form.nature}
            onChange={(e) => setForm({ ...form, nature: e.target.value })}
            required
          >
            <option value="">اختر الطبيعة</option>
            <option value="debit">مدين</option>
            <option value="credit">دائن</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">الحساب الأب (اختياري)</label>
          <select
            className="border p-2 w-full rounded"
            value={form.parentId}
            onChange={(e) => setForm({ ...form, parentId: e.target.value })}
          >
            <option value="">— حساب رئيسي —</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.code} — {acc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.allowPosting}
              onChange={(e) =>
                setForm({ ...form, allowPosting: e.target.checked })
              }
            />
            السماح بالترحيل
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
            />
            نشط
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          حفظ الحساب
        </button>
      </form>
    </div>
  );
}
