"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mouse Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Login Handler
  const handleLogin = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!email || !password) {
      alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("خطأ في تسجيل الدخول: " + error.message);
      return;
    }

    // ⭐ التوجيه الجديد إلى النظام المحاسبي
    router.push("/erp");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#001F26] relative overflow-hidden"
      dir="rtl"
    >
      {/* GLOBAL GLOW */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: mousePos.x, y: mousePos.y }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00E5C1]/15 blur-[140px] rounded-full" />
      </motion.div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl"
      >
        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00A896] via-[#00E5C1] to-[#004F5A] shadow-xl flex items-center justify-center">
            <div className="w-8 h-8 border-b-2 border-[#001F26] rounded-sm" />
          </div>
          <h1 className="text-xl font-semibold mt-4 text-white">منصة أعمالي</h1>
          <p className="text-gray-300 text-sm mt-1">A3MALY ERP Platform</p>
        </div>

        {/* FORM */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col text-right">
            <label className="text-sm text-gray-200 mb-1">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#00E5C1] transition"
              placeholder="example@company.com"
            />
          </div>

          <div className="flex flex-col text-right">
            <label className="text-sm text-gray-200 mb-1">كلمة المرور</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#00E5C1] transition"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#00E5C1]" />
              تذكرني
            </label>
            <button type="button" className="hover:text-white transition">
              نسيت كلمة المرور؟
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#00A896] hover:bg-[#00C4A8] transition text-white font-semibold shadow-lg"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </motion.button>
        </form>

        {/* FOOTER */}
        <div className="text-center text-gray-400 text-xs mt-8">
          © {new Date().getFullYear()} منصة أعمالي — جميع الحقوق محفوظة
        </div>
      </motion.div>
    </div>
  );
}
