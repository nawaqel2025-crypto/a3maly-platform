"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const revenueData = [
  { month: "يناير", value: 2400 },
  { month: "فبراير", value: 3200 },
  { month: "مارس", value: 4100 },
  { month: "أبريل", value: 5300 },
  { month: "مايو", value: 6200 },
  { month: "يونيو", value: 7100 },
];

const modules = [
  { name: "الحسابات", href: "/modules/accounting", color: "from-blue-500 to-blue-700" },
  { name: "المبيعات", href: "/dashboard/sales", color: "from-purple-500 to-purple-700" },
  { name: "المشتريات", href: "/purchasing", color: "from-pink-500 to-pink-700" },
  { name: "المخزون", href: "/dashboard/inventory", color: "from-green-500 to-green-700" },
  { name: "المشاريع", href: "/dashboard/projects", color: "from-yellow-500 to-yellow-700" },
  { name: "العملاء", href: "/dashboard/customers", color: "from-teal-500 to-teal-700" },
  { name: "الموردين", href: "/suppliers", color: "from-red-500 to-red-700" },
  { name: "التقارير", href: "/reports", color: "from-indigo-500 to-indigo-700" },
  { name: "الإعدادات", href: "/dashboard/settings", color: "from-gray-500 to-gray-700" },
];

export default function Dashboard() {
  return (
    <div className="space-y-12">

      {/* العنوان */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-white"
      >
        لوحة التحكم
      </motion.h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {[
          { label: "إجمالي الإيرادات", value: "12,400 ر.س", color: "text-blue-400" },
          { label: "عدد العملاء", value: "89", color: "text-green-400" },
          { label: "عدد الموردين", value: "42", color: "text-red-400" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/10 shadow-lg"
          >
            <div className="text-gray-300 text-sm">{item.label}</div>
            <div className={`text-3xl font-bold mt-2 ${item.color}`}>{item.value}</div>
          </motion.div>
        ))}

      </div>

      {/* الوحدات الرئيسية */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">الوحدات الرئيسية</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={m.href}
                className={`block p-6 rounded-xl bg-gradient-to-br ${m.color} text-white font-semibold shadow-lg hover:scale-105 transition`}
              >
                {m.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* الرسم البياني */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/10 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-white">نمو الإيرادات</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4f9cff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
}