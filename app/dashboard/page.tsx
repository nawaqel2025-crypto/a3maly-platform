"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardHome() {
  const [usersCount, setUsersCount] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [chartData] = useState({
    series: [
      {
        name: "Revenue",
        data: [1200, 1900, 3000, 5000, 4200, 6100, 7000, 8500, 9000, 11000, 13000, 15000],
      },
    ],
    options: {
      chart: { type: "area", height: 200, toolbar: { show: false } },
      colors: ["#3b82f6"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      xaxis: {
        categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        labels: { style: { colors: "#6b7280" } }
      },
      yaxis: { labels: { style: { colors: "#6b7280" } } },
      grid: { borderColor: "#f1f5f9" },
    },
  });

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from("projects").select("*");
      setProjects(data || []);
      setLoadingProjects(false);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    async function fetchUsersCount() {
      const { count } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      if (typeof count === "number") setUsersCount(count);
    }
    fetchUsersCount();
  }, []);

  return (
    <div className="bg-slate-50 p-6 space-y-4 w-full">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">A3maly Platform</h1>
        <p className="text-slate-500 mt-1">Modern SaaS Accounting Overview</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-0">

        <StatCard
          title="Users"
          value={usersCount}
          icon={<Users size={18} className="text-blue-600" />}
        />

        <StatCard
          title="Orders"
          value="45"
          icon={<ShoppingCart size={18} className="text-green-600" />}
        />

        <StatCard
          title="Revenue"
          value="$12,400"
          icon={<DollarSign size={18} className="text-yellow-600" />}
        />

        <StatCard
          title="Active"
          value="89"
          icon={<Activity size={18} className="text-purple-600" />}
        />

      </div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <h2 className="text-md font-medium text-slate-700 mb-2">Revenue Growth</h2>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={200}
        />
      </div>

      {/* Projects */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <h2 className="text-lg font-medium text-slate-700 mb-3">My Projects</h2>

        {loadingProjects && <p className="text-slate-500">Loading...</p>}

        {!loadingProjects && projects.length === 0 && (
          <p className="text-slate-500">No projects yet.</p>
        )}

        {!loadingProjects && projects.length > 0 && (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition"
              >
                <h3 className="font-medium text-slate-800">{project.name}</h3>
                <p className="text-slate-500 text-sm">{project.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4">
      <div className="p-2.5 rounded-xl bg-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-xs">{title}</p>
        <p className="text-xl font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
