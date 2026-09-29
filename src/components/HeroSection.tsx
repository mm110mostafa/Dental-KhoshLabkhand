import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Star,
  Scan,
  Heart,
  ChevronLeft
} from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
  scrollY: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenCalculator,
  scrollY
}) => {
  // Mouse movement parallax for desktop
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [quickTreatment, setQuickTreatment] = useState("طراحی لبخند و لمینت");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickSuccess, setQuickSuccess] = useState(false);

  // Disable scroll/mouse parallax on small screens so floating badges don't
  // collide with the hero image / adjacent sections on mobile & tablet.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const node = heroRef.current;
    if (node) {
      node.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (node) node.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone || quickPhone.length < 10) {
      alert("لطفاً شماره تماس معتبر وارد فرمایید.");
      return;
    }
    setQuickSuccess(true);
    setTimeout(() => {
      setQuickSuccess(false);
      setQuickPhone("");
    }, 4500);
  };

  // Scroll parallax calculations (disabled on mobile/tablet to avoid overlap
  // between floating badges and the hero image / neighbouring sections)
  const heroParallaxY = isMobile ? 0 : scrollY * 0.18;
  const floatingCardParallaxY = isMobile ? 0 : scrollY * -0.22;
  const badgeParallaxY = isMobile ? 0 : scrollY * -0.12;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAFDFD] via-[#F4F9F9] to-[#ECF5F5] pt-8 pb-16 lg:py-20"
    >
      {/* Background Decorative Ambient Blurs */}
      <div
        className="absolute top-10 right-10 w-96 h-96 bg-teal-200/35 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 40 + heroParallaxY * 0.5}px, 0)`
        }}
      />
      <div
        className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30 - heroParallaxY * 0.3}px, 0)`
        }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-100/30 rounded-full blur-2xl pointer-events-none"
        style={{
          transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`
        }}
      />

      {/* Subtle Pattern Grid */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center hero-landscape-grid">
          
          {/* Column 1: Engaging Persian Typography & Quick Consultation (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-teal-200/80 shadow-sm shadow-teal-500/10 text-teal-800 text-xs sm:text-sm font-semibold backdrop-blur-md animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>مجهزترین مرکز طراحی لبخند هالیوودی و ایمپلنت دیجیتال</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.25] tracking-tight">
              هنر آفرینش <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-teal-700 via-teal-600 to-emerald-600">
                لبخندی بی‌نقص
                <svg
                  className="absolute -bottom-2 right-0 w-full text-teal-300/60 -z-10"
                  viewBox="0 0 250 14"
                  fill="none"
                >
                  <path
                    d="M3 11C60 3 190 3 247 11"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br className="hidden sm:inline" />
              و طبیعی با هوش مصنوعی
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              در کلینیک تخصصی <strong className="text-slate-800 font-semibold">دُرسا</strong>، لبخند شما تنها ترمیم نمی‌شود؛ بلکه با بهره‌گیری از اسکنر سه‌بعدی دانمارکی و بدون تراش مینا، متناسب با هارمونی چهره و استانداردهای جهانی بازآفرینی می‌گردد.
            </p>

            {/* Feature Bullets: on mobile keep only two pills side-by-side (one line each) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
              <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-stone-200/70 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium whitespace-nowrap">بدون درد و بیحسی سوزنی</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-2 rounded-xl border border-stone-200/70 text-[10.5px] sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium whitespace-nowrap">اسکن دیجیتال سه‌بعدی</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-2 rounded-xl border border-stone-200/70 text-[10.5px] sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium whitespace-nowrap">اقساط ۱۲ ماهه بدون کارمزد</span>
              </div>
            </div>

            {/* Primary Action Buttons: full-width booking CTA on mobile; calculator hidden on mobile */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 active:scale-95 transition-all duration-200 group"
              >
                <Calendar className="w-5 h-5 text-teal-200 group-hover:rotate-12 transition-transform" />
                <span>رزرو آنلاین وقت مشاوره و اسکن</span>
                <ChevronLeft className="w-4 h-4 text-teal-200 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="cursor-pointer hidden sm:inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-slate-800 bg-white hover:bg-stone-50 border border-stone-200/90 shadow-sm hover:shadow-md transition-all active:scale-95 group"
              >
                <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                <span>محاسبه آنلاین هزینه لبخند</span>
              </button>
            </div>

            {/* Quick Consultation Inline Box */}
            <div className="mt-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-teal-100 shadow-md shadow-teal-900/5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">
                    <span className="sm:hidden whitespace-nowrap">مشاوره تلفنی فوری</span>
                    <span className="hidden sm:inline">مشاوره تلفنی فوری (ظرف ۱۵ دقیقه تماس می‌گیریم)</span>
                  </span>
                </div>
                <span className="text-[11px] text-teal-700 font-medium shrink-0">رایگان و بدون تعهد</span>
              </div>

              {quickSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>درخواست شما با موفقیت ثبت شد! مشاور دندانپزشکی دُرسا به‌زودی با شما تماس می‌گیرد.</span>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={quickTreatment}
                    onChange={(e) => setQuickTreatment(e.target.value)}
                    className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  >
                    <option value="طراحی لبخند و لمینت">طراحی لبخند و لمینت سرامیکی</option>
                    <option value="کامپوزیت لیرینگ">کامپوزیت ونیر زیبایی</option>
                    <option value="ایمپلنت دیجیتال فوری">ایمپلنت دیجیتال فوری</option>
                    <option value="ارتودنسی نامرئی">ارتودنسی نامرئی</option>
                    <option value="جرم‌گیری و بلیچینگ لیزری">سفیدکردن و بلیچینگ لیزری</option>
                  </select>

                  <input
                    type="tel"
                    placeholder="شماره تماس شما (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    dir="ltr"
                    className="flex-1 text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-slate-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans text-right"
                  />

                  <button
                    type="submit"
                    className="cursor-pointer whitespace-nowrap px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    ثبت درخواست مشاوره
                  </button>
                </form>
              )}
            </div>

            {/* Social Proof / Doctor Credentials Mini Row */}
            <div className="flex flex-col items-start gap-2 pt-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex -space-x-2 -space-x-reverse overflow-hidden shrink-0">
                <img
                  src="/images/doctor-sararostami.jpg"
                  alt="دکتر سارا رستمی"
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  width={64}
                  height={64}
                  decoding="async"
                  loading="lazy"
                />
                <img
                  src="/images/doctor-alirezamehrabi.jpg"
                  alt="دکتر علیرضا خلیلی"
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  width={64}
                  height={64}
                  decoding="async"
                  loading="lazy"
                />
                <div className="h-8 w-8 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                  +12
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-slate-700">۴.۹۵ از ۵</span>
                <span className="text-stone-400">|</span>
                <span>بیش از ۱۵,۰۰۰ مراجع راضی در سراسر ایران</span>
              </div>
            </div>
          </div>

          {/* Column 2: REAL High-Quality Dental Photo with 3D Tilt & Parallax Badges (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            
            {/* The Main Real Photograph Hero Container */}
            <div
              className="relative mx-auto max-w-md lg:max-w-none transition-transform duration-300 ease-out mt-3 mb-10 lg:my-0"
              style={{
                transform: `perspective(1000px) rotateY(${isMobile ? 0 : mousePos.x * 8}deg) rotateX(${isMobile ? 0 : -mousePos.y * 8}deg) translateY(${heroParallaxY * 0.4}px)`
              }}
            >
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500/30 via-emerald-400/20 to-amber-300/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000"></div>

              {/* Real Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-950/15 border border-white/80 bg-white">
                <img
                  src="/images/hero-dentist-banner.jpg"
                  alt="کلینیک تخصصی دندانپزشکی درسا - دندانپزشک و بیمار با لبخند طبیعی در کلینیک مدرن"
                  className="w-full h-[400px] sm:h-[470px] lg:h-[520px] object-cover object-center scale-[1.02] hover:scale-105 transition-transform duration-700 hero-landscape-img"
                  width={1200}
                  height={800}
                  fetchPriority="high"
                  decoding="async"
                  loading="eager"
                />

                {/* Subtle gradient overlay at bottom of photo for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/10 pointer-events-none" />

                {/* Bottom Overlay Info on the Real Photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-right space-y-1 backdrop-blur-md bg-slate-950/40 p-4 rounded-2xl border border-white/15">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
                      <Scan className="w-3.5 h-3.5" />
                      اسکنر ۳Shape دانمارک در حال اجرا
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
                      زنده در کلینیک
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    تجربه درمانی آرام، VIP و کاملاً متناسب با آناتومی لبخند شما
                  </p>
                </div>
              </div>

              {/* Floating Badge 1 (Top Left): Real Satisfaction Metric */}
              <div
                className="absolute -top-8 -left-3 sm:-top-5 sm:-left-6 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl shadow-slate-900/10 border border-stone-200/80 flex items-center gap-3 transition-transform duration-500"
                style={{
                  transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20 + floatingCardParallaxY}px, 0)`
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/30">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                    <span>۹۹.۸٪ رضایت</span>
                    <Heart className="w-3 h-3 text-rose-500 fill-current" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">
                    ثبت بیش از ۴,۸۰۰ کیس لبخند
                  </p>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Right): 10-Year Warranty */}
              <div
                className="absolute -bottom-8 -right-3 sm:-bottom-5 sm:-right-6 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl shadow-slate-900/10 border border-stone-200/80 flex items-center gap-3 transition-transform duration-500"
                style={{
                  transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20 + badgeParallaxY}px, 0)`
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    ۱۰ سال ضمانت طلایی
                  </span>
                  <p className="text-[10px] text-teal-700 font-semibold">
                    کارت گارانتی کتبی هولوگرام‌دار
                  </p>
                </div>
              </div>

              {/* Floating Badge 3 (Middle Right): Digital Tech */}
              <div
                className="hidden sm:flex absolute top-1/3 -right-8 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-700 items-center gap-2 text-xs font-semibold"
                style={{
                  transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)`
                }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>میکروسکوپ زایس آلمان</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
