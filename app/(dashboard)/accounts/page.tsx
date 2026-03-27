"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const accounts = [
  {
    id: 1,
    name: "الأصول",
    type: "group",
    children: [
      { id: 2, name: "الصندوق", type: "account", code: "101" },
      { id: 3, name: "البنك", type: "account", code: "102" },
      { id: 4, name: "العملاء", type: "account", code: "103" },
    ],
  },
  {
    id: 5,
    name: "الخصوم",
    type: "group",
    children: [
      { id: 6, name: "الموردين", type: "account", code: "201" },
      { id: 7, name: "القروض", type: "account", code: "202" },
    ],
  },
];

export default function AccountsPage() {
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggle = (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">شجرة الحسابات</h1>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة حساب
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الحسابات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accounts.map((group) => (
              <div key={group.id}>
                <div
                  className="cursor-pointer font-semibold text-lg"
                  onClick={() => toggle(group.id)}
                >
                  {group.name}
                </div>

                {expanded.includes(group.id) && (
                  <div className="ml-6 mt-2 space-y-2">
                    {group.children.map((acc) => (
                      <div
                        key={acc.id}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <span>{acc.name}</span>
                        <span className="text-gray-500">{acc.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
