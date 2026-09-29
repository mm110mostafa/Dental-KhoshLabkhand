import React from "react";
import { Sparkles, Calendar, Clock, UserCheck, Check, BadgeCheck } from "lucide-react";
import { PORTFOLIO_CASES } from "../data/dentistryData";

interface PortfolioPageProps {
  onOpenBooking: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenBooking }) => {
  // فیلترهای تصویری: تا زمان جایگزینی تصاویر اختصاصی هر مورد، ظاهر «قبل» و «بعد»
  // هر کارت را با فیلترهای متفاوت متمایز می‌کنیم.
  const BEFORE_FILTERS = [
    "sepia-[0.35] saturate-150 brightness-95",
    "sepia-[0.2] saturate-125 brightness-90 contrast-125",
    "grayscale-[0.3] brightness-95",
    "saturate-200 brightness-90"
  ];
  const AFTER_FILTERS = [
    "saturate-[0.85] brightness-110",
    "brightness-105 saturate-[1.1]",
    "saturate-[0.9] brightness-[1.15]"
  ];
  const beforeFilter = (i: number) => (i === 0 ? "" : BEFORE_FILTERS[(i - 1) % BEFORE_FILTERS.length]);
  const afterFilter = (i: number) => (i === 0 ? "" : AFTER_FILTERS[(i - 1) % AFTER_FILTERS.length]);


  return (
    <section className="py-16 sm:py-20 bg-stone-50/60 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 -right-40 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/70">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>گالری نمونه کارهای کلینیک دُرسا</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            نمونه کارهای واقعی لبخند مراجعین
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            تصاویر قبل و بعد از درمان در ۹ مورد از موفق‌ترین تحولات لبخند در کلینیک دُرسا. هر مورد توسط پزشک متخصص مربوطه و با تجهیزات دیجیتال انجام شده است.
          </p>
        </div>

        {/* Portfolio Grid — 1 / 2 / 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_CASES.map((item, idx) => (
            <article
              key={item.id}
              className="group bg-white rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col text-right"
            >
              {/* Before / After image pair */}
              <div className="grid grid-cols-2 gap-1 p-2 bg-stone-50">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={item.beforeImg}
                    alt={`${item.title} - قبل از درمان`}
                    className={`absolute inset-0 w-full h-full object-cover object-center ${beforeFilter(idx)}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-2 right-2 bg-slate-950/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                    قبل
                  </span>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={item.afterImg}
                    alt={`${item.title} - بعد از درمان`}
                    className={`absolute inset-0 w-full h-full object-cover object-center ${afterFilter(idx)}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-2 left-2 bg-teal-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                    بعد
                  </span>
                </div>
              </div>
              {/* Card body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                    نمونه کار {idx + 1}
                  </span>
                  <BadgeCheck className="w-4 h-4 text-teal-500 shrink-0" />
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Meta info */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{item.doctor}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{item.duration}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-teal-50 text-teal-800 text-[11px] font-semibold border border-teal-200/60"
                    >
                      <Check className="w-3 h-3 text-teal-600" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-3 mt-auto border-t border-stone-100">
                  <button
                    onClick={onOpenBooking}
                    className="cursor-pointer w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>رزرو نوبت مشاوره</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* Bottom CTA band */}
        <div className="mt-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-800 p-8 sm:p-10 text-center">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              لبخند رویایی شما می‌تواند نمونه کار بعدی ما باشد
            </h2>
            <p className="text-sm text-teal-50/90 leading-relaxed max-w-2xl mx-auto">
              مشاوره و ویزیت اولیه در کلینیک دُرسا رایگان است؛ همین حالا نوبت خود را رزرو کنید.
            </p>
            <button
              onClick={onOpenBooking}
              className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-teal-800 font-black text-sm shadow-xl shadow-teal-950/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>رزرو نوبت آنلاین</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


