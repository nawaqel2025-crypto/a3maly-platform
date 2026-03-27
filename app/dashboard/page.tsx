"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardHome() {
  const [usersCount, setUsersCount] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [chartData] = useState({
    series: [
      {
        name: "Revenue",
        data: [1200, 1900, 3000, 5000, 4200, 6100, 7000, 8500, 9000, 11000, 13000, 15000],
      },
    ],
    options: {
      chart: { type: "area", height: 350, toolbar: { show: false } },
      colors: ["#2563eb"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      xaxis: {
        categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      },
      grid: { borderColor: "#e5e7eb" },
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
    <div className="min-h-screen bg-slate-50 p-8 space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">A3maly Dashboard</h1>
        <p className="text-slate-500 mt-1">Modern SaaS Accounting Overview</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Users"
          value={usersCount}
          icon={<Users size={26} className="text-blue-600" />}
          bg="bg-blue-50"
        />

        <StatCard
          title="Orders"
          value="45"
          icon={<ShoppingCart size={26} className="text-green-600" />}
          bg="bg-green-50"
        />

        <StatCard
          title="Revenue"
          value="$12,400"
          icon={<DollarSign size={26} className="text-yellow-600" />}
          bg="bg-yellow-50"
        />

        <StatCard
          title="Active"
          value="89"
          icon={<Activity size={26} className="text-purple-600" />}
          bg="bg-purple-50"
        />

      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-4">Revenue Growth</h2>
        <Chart options={chartData.options} series={chartData.series} type="area" height={350} />
      </div>

      {/* Projects */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold mb-4">My Projects</h2>

        {loadingProjects && <p className="text-slate-500">Loading...</p>}

        {!loadingProjects && projects.length === 0 && (
          <p className="text-slate-500">No projects yet.</p>
        )}

        {!loadingProjects && projects.length > 0 && (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
              >
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-slate-500">{project.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
      <div className={`p-3 rounded-full ${bg}`}>{icon}</div>
      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
