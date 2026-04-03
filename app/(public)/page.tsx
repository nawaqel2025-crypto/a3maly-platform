"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

      {/* العنوان الرئيسي */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
      >
        منصة أعمالي
      </motion.h1>

      {/* الوصف */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-gray-300 max-w-2xl text-lg leading-relaxed mb-10"
      >
        نظام ERP سحابي متكامل لإدارة الحسابات، المبيعات، العملاء، الموردين، المخزون، المشاريع،
        التقارير المالية والتحليلية — مصمم ليكون أفخم منصة أعمال في العالم العربي.
      </motion.p>

      {/* زر الانتقال */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link
          href="/dashboard"
          className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-xl font-semibold shadow-lg transition-all hover:shadow-blue-500/30"
        >
          الانتقال إلى لوحة التحكم
        </Link>
      </motion.div>

      {/* خلفية زخرفية */}
      <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,122,255,0.4),transparent_70%)]"></div>
    </div>
  );
}
