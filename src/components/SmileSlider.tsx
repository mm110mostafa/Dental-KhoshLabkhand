import React, { useState, useRef, useCallback } from "react";
import {
  Sparkles,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Clock
} from "lucide-react";
import { BEFORE_AFTER_CASES } from "../data/dentistryData";

interface SmileSliderProps {
  onOpenBooking: () => void;
}

export const SmileSlider: React.FC<SmileSliderProps> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = BEFORE_AFTER_CASES[activeCaseIndex] || BEFORE_AFTER_CASES[0];

  // فیلترهای تصویری: در کیس‌هایی که «قبل» و «بعد» از یک تصویر پایه واحد ساخته می‌شوند،
  // ظاهر هر لایه را با فیلتر متمایز می‌کنیم تا حس واقعی مقایسه قبل/بعد منتقل شود.
  const BEFORE_FILTERS = [
    "",
    "sepia-[0.35] saturate-150 brightness-95",
    "sepia-[0.2] saturate-125 brightness-90 contrast-125",
    "grayscale-[0.3] brightness-95"
  ];
  const AFTER_FILTERS = [
    "",
    "saturate-[0.85] brightness-110",
    "brightness-105 saturate-[1.1]",
    "saturate-[0.9] brightness-[1.15]"
  ];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="before-after" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/70">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>گالری تحول لبخند مراجعین دُرسا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            جادوی تغییر؛ مقایسه دقیق قبل و بعد
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            اهرم وسط تصویر را به چپ و راست بکشید تا ظرافت و طبیعی‌بودن اصلاح فرم دندان‌ها، اصلاح رنگ و بستن فواصل را با چشمان خود مشاهده کنید.
          </p>

          {/* Case switcher tabs — 2-column grid on mobile, centered flex row on sm+ */}
          <div className="grid grid-cols-2 gap-2 pt-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
            {BEFORE_AFTER_CASES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`cursor-pointer px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 text-center w-full sm:w-auto ${
                  activeCaseIndex === idx
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "bg-stone-100 text-slate-600 hover:bg-stone-200"
                }`}
              >
                کیس {idx + 1}: {item.treatmentType.split(" ").slice(0, 3).join(" ")}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Draggable Slider (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[340px] sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl shadow-teal-950/10 border-4 border-stone-100 select-none cursor-ew-resize bg-stone-900 compare-landscape-img"
            >
              {/* After Image (Background) */}
              <img
                src={activeCase.afterImg}
                alt="لبخند بعد از درمان دندانپزشکی درسا"
                className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none ${AFTER_FILTERS[activeCaseIndex]}`}
                width={1200}
                height={800}
                decoding="async"
                loading="lazy"
              />

              {/* Before Image (Clipped Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeCase.beforeImg}
                  alt="دندان قبل از درمان"
                  className={`absolute inset-0 h-full object-cover object-center pointer-events-none ${BEFORE_FILTERS[activeCaseIndex]}`}
                  width={1200}
                  height={800}
                  decoding="async"
                  loading="lazy"
                  style={{
                    width: containerRef.current
                      ? `${containerRef.current.clientWidth}px`
                      : "100%",
                    maxWidth: "none"
                  }}
                />
              </div>

              {/* Floating Badges on Image */}
              <div className="absolute top-4 right-4 bg-slate-950/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-md">
                قبل از درمان (Before)
              </div>
              <div className="absolute top-4 left-4 bg-teal-600/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-teal-400/40 shadow-md">
                بعد از درمان (After)
              </div>

              {/* Central Divider Handle Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 shadow-xl border-2 border-teal-500 flex items-center justify-center font-bold">
                  <div className="flex items-center gap-0.5 text-teal-700">
                    <ChevronRight className="w-3.5 h-3.5 -mr-1" />
                    <ChevronLeft className="w-3.5 h-3.5 -ml-1" />
                  </div>
                </div>
              </div>

              {/* Bottom Drag Helper Notice */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-stone-200 text-[11px] font-medium px-4 py-1 rounded-full pointer-events-none">
                برای مقایسه نشانگر را حرکت دهید
              </div>
            </div>
          </div>

          {/* Case Detail Card (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6 text-right">
            <div className="bg-stone-50/80 p-6 sm:p-8 rounded-3xl border border-stone-200/80 space-y-5">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  گزارش بالینی درمان
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {activeCase.title}
                </h3>
                <p className="text-sm font-semibold text-slate-700">
                  نوع درمان: {activeCase.treatmentType}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeCase.description}
              </p>

              {/* Details Metric Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white border border-stone-200/70 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>پزشک معالج</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">
                    {activeCase.doctor}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-stone-200/70 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>طول درمان</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">
                    {activeCase.duration}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeCase.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200/60"
                  >
                    <Check className="w-3 h-3 text-teal-600" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="cursor-pointer w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 text-teal-200 group-hover:rotate-12 transition-transform" />
                  <span>من هم این لبخند را می‌خواهم (رزرو نوبت مشاوره)</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
