"use client";

import { useEffect, useState } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/inventory/items?companyId=demo-company")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">المخزون</h1>

      <table className="w-full border text-right text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">الصنف</th>
            <th className="border px-2 py-1">الوحدة</th>
            <th className="border px-2 py-1">السعر</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td className="border px-2 py-1">{i.name}</td>
              <td className="border px-2 py-1">{i.unit}</td>
              <td className="border px-2 py-1">{i.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
