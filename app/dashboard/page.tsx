"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// تحميل الرسم البياني ديناميكياً
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardHome() {

  // 🟦 عدد المستخدمين (جديد)
  const [usersCount, setUsersCount] = useState(0);

  // بيانات الرسم البياني
  const [chartData] = useState({
    series: [
      {
        name: "Revenue",
        data: [1200, 1900, 3000, 5000, 4200, 6100, 7000, 8500, 9000, 11000, 13000, 15000],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: { show: false },
      },
      colors: ["#3b82f6"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
      },
    },
  });

  // جلب المشاريع من Supabase
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*");

      if (!error) {
        setProjects(data);
      }

      setLoadingProjects(false);
    }

    fetchProjects();
  }, []);

  // 🟩 جلب عدد المستخدمين من Supabase (جديد)
  useEffect(() => {
    async function fetchUsersCount() {
      const { count, error } = await supabase
        .from("users") // ← غيّر الاسم إذا كان جدولك اسمه مختلف
        .select("*", { count: "exact", head: true });

      if (!error && typeof count === "number") {
        setUsersCount(count);
      }
    }

    fetchUsersCount();
  }, []);

  return (
    <div className="space-y-10 p-6">
      {/* العنوان */}
      <h1 className="text-3xl font-bold">Welcome to A3maly Dashboard</h1>

      {/* البطاقات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Users */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Users className="text-blue-600 dark:text-blue-300" size={28} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Users</p>

            {/* 🟦 العدد الحقيقي بدل 120 */}
            <p className="text-2xl font-bold">{usersCount}</p>
          </div>
        </div>

        {/* Orders */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <ShoppingCart className="text-green-600 dark:text-green-300" size={28} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Orders</p>
            <p className="text-2xl font-bold">45</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex items-center gap-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
            <DollarSign className="text-yellow-600 dark:text-yellow-300" size={28} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Revenue</p>
            <p className="text-2xl font-bold">$12,400</p>
          </div>
        </div>

        {/* Active */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
            <Activity className="text-purple-600 dark:text-purple-300" size={28} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Active</p>
            <p className="text-2xl font-bold">89</p>
          </div>
        </div>
      </div>

      {/* الرسم البياني */}
      <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
        <Chart options={chartData.options} series={chartData.series} type="area" height={350} />
      </div>

      {/* قسم المشاريع من Supabase */}
      <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">مشاريعي</h2>

        {loadingProjects && <p>جاري تحميل المشاريع...</p>}

        {!loadingProjects && projects.length === 0 && (
          <p>لا توجد مشاريع حتى الآن.</p>
        )}

        {!loadingProjects && projects.length > 0 && (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li key={project.id} className="p-4 border rounded-lg dark:border-gray-700">
                <strong className="text-lg">{project.name}</strong>
                <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
