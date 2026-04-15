"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type LogoVariant = "A" | "B" | "C" | "D";

export default function HomePage() {
  const [variant, setVariant] = useState<LogoVariant>("C");

  // Mouse Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 40,
        y: (e.clientY - window.innerHeight / 2) / 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll Parallax
  const { scrollY } = useScroll();
  const scrollParallax = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-[#001F26] via-[#00363D] to-[#004F5A] text-white relative overflow-hidden"
      dir="rtl"
    >
      {/* GLOBAL GLOW PARALLAX */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: mousePos.x,
          y: mousePos.y,
        }}
      >
        <motion.div
          style={{ y: scrollParallax }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px]
          bg-[#00E5C1]/20 blur-[140px] rounded-full"
        />
      </motion.div>

      {/* ANNOUNCEMENT BAR */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-black/20 backdrop-blur-sm border-b border-white/10 py-2 px-6 text-center text-xs md:text-sm text-gray-200 flex items-center justify-center gap-2"
      >
        <span className="text-[#00E5C1] text-base">🚀</span>
        <span>إطلاق تحديث جديد في منصة أعمالي — تحسينات في الأداء وإدارة الحسابات</span>
        <button className="text-[#00E5C1] hover:underline transition">
          عرض التفاصيل
        </button>
      </motion.div>

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 flex items-center justify-between px-10 py-5 backdrop-blur-sm bg-black/10 border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <LogoIcon variant={variant} />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-wide">منصة أعمالي</span>
            <span className="text-xs text-gray-300">A3MALY Global ERP Platform</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-300">نمط الشعار:</span>
          <div className="flex gap-2 bg-white/5 rounded-full px-2 py-1">
            {(["A", "B", "C", "D"] as LogoVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-3 py-1 rounded-full transition text-xs
                  ${variant === v ? "bg-[#00A896] text-white" : "text-gray-300 hover:bg-white/10"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3 py-1 text-sm rounded-full border border-white/20 text-gray-100 hover:bg-white/10 transition">
            توثيق المنصة
          </button>
          <a
            href="/login"
            className="px-5 py-2 text-sm rounded-full bg-[#00A896] hover:bg-[#00C4A8] transition shadow-lg"
          >
            تسجيل الدخول
          </a>
        </div>
      </motion.header>

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 text-center">

        {/* HERO — PARALLAX + MOTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl space-y-6 mt-10"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/30 border border-white/10 text-xs text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00E5C1]" />
            منصة ERP عربية سحابية — هوية عالمية
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold leading-snug"
          >
            إدارة أعمالك من منصة واحدة
            <span className="block text-[#00E5C1] text-2xl md:text-3xl mt-2">
              منصة أعمالي — A3MALY ERP
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base md:text-lg text-gray-200 leading-relaxed"
          >
            نظام ERP سحابي متكامل لإدارة الحسابات، الموارد البشرية، المخزون، المبيعات، المشاريع، التقارير،
            والمزيد — بهوية عربية حديثة، وتجربة استخدام عالمية.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 mb-10"
          >
            <a
              href="/login"
              className="px-10 py-3 text-base font-semibold rounded-xl
              bg-[#00A896] hover:bg-[#00C4A8] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              تسجيل الدخول إلى المنصة
            </a>
            <button className="px-8 py-3 text-sm rounded-xl border border-white/20 text-gray-100 hover:bg-white/5 transition">
              استعراض وحدات النظام
            </button>
          </motion.div>
        </motion.div>

        {/* FEATURES SECTION */}
        <SectionWrapper
          title="لماذا منصة أعمالي؟"
          subtitle="منصة ERP عربية سحابية تجمع القوة، السهولة، والهوية العالمية في نظام واحد متكامل."
        >
          <GridWrapper cols={3}>
            <FeatureCard
              icon="📊"
              title="إدارة مالية متقدمة"
              text="نظام محاسبي متكامل لإدارة الحسابات العامة، القيود، الفواتير، المصروفات، والتقارير المالية."
            />
            <FeatureCard
              icon="👥"
              title="موارد بشرية ذكية"
              text="إدارة الموظفين، الرواتب، الحضور والانصراف، العقود، والإجازات — كل ذلك من مكان واحد."
            />
            <FeatureCard
              icon="📦"
              title="مخزون ومشتريات احترافية"
              text="تتبع المخزون، المستودعات، أوامر الشراء، الموردين، وحركات الأصناف بدقة عالية."
            />
          </GridWrapper>
        </SectionWrapper>

        {/* MODULES SECTION */}
        <SectionWrapper
          title="وحدات النظام الأساسية"
          subtitle="منصة أعمالي توفر مجموعة متكاملة من الوحدات لإدارة جميع جوانب عملك من مكان واحد."
        >
          <GridWrapper cols={3}>
            <ModuleCard
              icon="💰"
              title="الحسابات العامة"
              text="إدارة القيود، الفواتير، المصروفات، مراكز التكلفة، التقارير المالية، وأكثر."
            />
            <ModuleCard
              icon="👥"
              title="الموارد البشرية"
              text="إدارة الموظفين، الرواتب، الحضور والانصراف، العقود، والإجازات."
            />
            <ModuleCard
              icon="📦"
              title="المخزون والمستودعات"
              text="تتبع الأصناف، المستودعات، الحركات، الجرد، وأوامر الشراء."
            />
            <ModuleCard
              icon="🧾"
              title="المبيعات والفوترة"
              text="إدارة عروض الأسعار، أوامر البيع، الفواتير، العملاء، والتحصيل."
            />
            <ModuleCard
              icon="📊"
              title="التقارير والتحليلات"
              text="لوحات معلومات تفاعلية، تقارير مالية، تقارير أداء، وتحليلات لحظية."
            />
            <ModuleCard
              icon="📁"
              title="إدارة المشاريع"
              text="مهام، مراحل، تتبع تقدم، ميزانيات، وإدارة فرق العمل."
            />
          </GridWrapper>
        </SectionWrapper>

        {/* STATS SECTION */}
        <SectionWrapper
          title="أرقام تثبت قوة المنصة"
          subtitle="منصة أعمالي تنمو بسرعة وتخدم شركات في مختلف القطاعات، مع أداء عالي وموثوقية عالمية."
        >
          <GridWrapper cols={4}>
            <StatCard number="+1200" label="شركة تستخدم النظام" />
            <StatCard number="98%" label="رضا العملاء" />
            <StatCard number="99.9%" label="نسبة التوفر (Uptime)" />
            <StatCard number="3.2M" label="عملية تمت عبر النظام" />
          </GridWrapper>
        </SectionWrapper>

        {/* TRUST SECTION */}
        <SectionWrapper
          title="شركات تثق بمنصة أعمالي"
          subtitle="نخدم مؤسسات في مختلف القطاعات، من الشركات الناشئة إلى المؤسسات الكبيرة، بثبات وأداء عالي."
        >
          <GridWrapper cols={4}>
            <TrustLogo name="شركة النخبة" />
            <TrustLogo name="حلول المستقبل" />
            <TrustLogo name="المركز الذهبي" />
            <TrustLogo name="تقنية الأعمال" />
          </GridWrapper>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-14 text-xs text-gray-300"
          >
            <Badge label="ISO 27001 Ready" />
            <Badge label="99.9% Uptime SLA" />
            <Badge label="Secure Cloud Infrastructure" />
            <Badge label="Data Encryption Enabled" />
          </motion.div>
        </SectionWrapper>

        {/* FINAL CTA SECTION */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full py-24 px-6 md:px-12"
        >
          <div className="max-w-4xl mx-auto text-center bg-white/5 border border-white/10 
            rounded-3xl p-12 backdrop-blur-md shadow-xl hover:shadow-2xl transition relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] 
                bg-[#00E5C1]/10 blur-[120px] rounded-full" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ابدأ إدارة أعمالك بطريقة أكثر ذكاءً
            </h2>

            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              انضم إلى مئات الشركات التي تستخدم منصة أعمالي لإدارة الحسابات، الموارد البشرية، المخزون، 
              المبيعات، المشاريع، والتقارير — كل ذلك من مكان واحد وبهوية عربية عالمية.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="/login"
                className="px-10 py-3 text-base font-semibold rounded-xl
                bg-[#00A896] hover:bg-[#00C4A8] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                تسجيل الدخول الآن
              </a>

              <button className="px-8 py-3 text-sm rounded-xl border border-white/20 text-gray-100 
                hover:bg-white/5 transition">
                استعراض النظام
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 px-8 py-4 text-xs text-gray-300 flex flex-col md:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} منصة أعمالي — جميع الحقوق محفوظة</span>
        <div className="flex gap-4">
          <button className="hover:text-white transition">سياسة الخصوصية</button>
          <button className="hover:text-white transition">شروط الاستخدام</button>
          <button className="hover:text-white transition">التواصل</button>
        </div>
      </footer>
    </div>
  );
}

/* COMPONENTS */

function SectionWrapper({ title, subtitle, children }: any) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative z-10 w-full py-20 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}

function GridWrapper({ children, cols = 3 }: any) {
  const colClass =
    cols === 4
      ? "md:grid-cols-4"
      : cols === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-8 max-w-6xl mx-auto`}>
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, text }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A896] to-[#004F5A] flex items-center justify-center mb-5 shadow-lg">
        <span className="text-[#00E5C1] text-xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

function ModuleCard({ icon, title, text }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm 
      hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-2xl"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A896] to-[#004F5A] 
        flex items-center justify-center mb-5 shadow-lg">
        <span className="text-[#00E5C1] text-xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

function StatCard({ number, label }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm 
      hover:bg-white/10 transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-2xl text-center"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-[#00E5C1] mb-2">
        {number}
      </h3>
      <p className="text-gray-300 text-sm md:text-base">{label}</p>
    </motion.div>
  );
}

function TrustLogo({ name }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-xl py-6 px-4 text-center 
      backdrop-blur-sm hover:bg-white/10 transition shadow-lg hover:shadow-2xl"
    >
      <span className="text-gray-200 text-sm">{name}</span>
    </motion.div>
  );
}

function Badge({ label }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      {label}
    </motion.div>
  );
}

function LogoIcon({ variant }: { variant: LogoVariant }) {
  if (variant === "A") {
    return (
      <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#004F5A] to-[#00A896] flex items-center justify-center shadow-lg border border-white/10">
        <div className="w-6 h-6 border-2 border-[#00E5C1] clip-path-[polygon(50%_0%,0%_100%,100%_100%)]" />
      </div>
    );
  }

  if (variant === "B") {
    return (
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00363D] to-[#00A896] flex items-center justify-center shadow-lg border border-white/10">
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 border-b-2 border-[#00E5C1]" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-4 border-l-2 border-[#00E5C1]" />
        </div>
      </div>
    );
  }

  if (variant === "D") {
    return (
      <div className="w-9 h-9 bg-gradient-to-br from-[#002B36] to-[#005F73] flex items-center justify-center shadow-lg border border-white/10 rounded-md">
        <div className="w-7 h-7 bg-black/20 rounded-md flex items-center justify-center">
          <div className="relative w-4 h-4">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-[#00E5C1]" />
            <div className="absolute left-0 top-1 h-3 w-[2px] bg-[#00E5C1]" />
            <div className="absolute right-0 top-1 h-3 w-[2px] bg-[#00E5C1]" />
          </div>
        </div>
      </div>
    );
  }

  // Variant C — Freeform Icon
  return (
    <div className="w-9 h-9 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00A896] via-[#00E5C1] to-[#004F5A] rounded-xl opacity-90 shadow-xl" />
      <div className="absolute inset-[3px] bg-black/40 rounded-xl" />
      <div className="absolute inset-[5px] flex items-center justify-center">
        <div className="relative w-6 h-6">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-[#00E5C1]/80" />
          <div className="absolute inset-x-1 top-2 h-[2px] bg-[#00C4A8]/80" />
          <div className="absolute inset-x-2 top-4 h-[2px] bg-[#00A896]/80" />
          <div className="absolute left-0 bottom-0 w-[2px] h-5 bg-[#00E5C1] rotate-[-15deg] origin-bottom" />
          <div className="absolute right-0 bottom-0 w-[2px] h-5 bg-[#00E5C1] rotate-[15deg] origin-bottom" />
        </div>
      </div>
    </div>
  );
}