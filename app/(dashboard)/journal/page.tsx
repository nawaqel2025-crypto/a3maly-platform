"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => setEntries(data.data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">اليومية العامة</h1>

      <Card>
        <CardHeader>
          <CardTitle>القيود اليومية</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-right">
                <th className="p-2 border">رقم القيد</th>
                <th className="p-2 border">التاريخ</th>
                <th className="p-2 border">البيان</th>
                <th className="p-2 border">الحساب المدين</th>
                <th className="p-2 border">الحساب الدائن</th>
                <th className="p-2 border">المبلغ</th>
              </tr>
            </thead>

            <tbody>
              {entries.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    لا توجد قيود حتى الآن.
                  </td>
                </tr>
              )}

              {entries.map((entry: any) => (
                <tr key={entry.id} className="text-right">
                  <td className="p-2 border">{entry.id}</td>
                  <td className="p-2 border">{entry.date}</td>
                  <td className="p-2 border">{entry.description}</td>
                  <td className="p-2 border">{entry.debitAccountName}</td>
                  <td className="p-2 border">{entry.creditAccountName}</td>
                  <td className="p-2 border">{entry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
