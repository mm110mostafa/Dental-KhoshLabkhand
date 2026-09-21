import React, { useState, useId } from "react";
import {
  Calculator,
  Sparkles,
  Calendar,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";

interface SmileCalculatorProps {
  onSelectBooking: (treatmentTitle: string, estimatedCost: string) => void;
}

interface TreatmentOption {
  id: string;
  name: string;
  basePricePerUnit: number; // in Toman
  minUnits: number;
  maxUnits: number;
  defaultUnits: number;
  unitLabel: string;
  brands: { name: string; multiplier: number; country: string }[];
  warrantyYears: number;
  sessions: string;
}

const TREATMENTS: TreatmentOption[] = [
  {
    id: "laminate",
    name: "لمینت سرامیکی فوق‌نازک E-Max",
    basePricePerUnit: 8200000,
    minUnits: 2,
    maxUnits: 20,
    defaultUnits: 8,
    unitLabel: "واحد دندان",
    brands: [
      { name: "ایماکس (E-Max) ایوکلار سوئیس", multiplier: 1.15, country: "سوئیس" },
      { name: "ویتا (Vita) کادکام آلمان", multiplier: 1.05, country: "آلمان" },
      { name: "امپرس (Empress) پرسلن اتریش", multiplier: 1.0, country: "اتریش" }
    ],
    warrantyYears: 10,
    sessions: "۲ الی ۳ جلسه"
  },
  {
    id: "composite",
    name: "کامپوزیت ونیر زیبایی (لیرینگ)",
    basePricePerUnit: 3900000,
    minUnits: 2,
    maxUnits: 20,
    defaultUnits: 8,
    unitLabel: "واحد دندان",
    brands: [
      { name: "توکویاما استلایت (Tokuyama) ژاپن", multiplier: 1.1, country: "ژاپن" },
      { name: "گرادیا (Gradia Direct) سوئیس", multiplier: 1.05, country: "سوئیس" },
      { name: "فیلتک زِد۳۵۰ (3M) آمریکا", multiplier: 1.15, country: "آمریکا" },
      { name: "زنیت (Zenit) نانوسرامیک آلمان", multiplier: 0.95, country: "آلمان" }
    ],
    warrantyYears: 5,
    sessions: "۱ جلسه (یک‌روزه)"
  },
  {
    id: "implant",
    name: "ایمپلنت دیجیتال فوری با سرجیکال گاید",
    basePricePerUnit: 14500000,
    minUnits: 1,
    maxUnits: 12,
    defaultUnits: 2,
    unitLabel: "پایه فیکسچر",
    brands: [
      { name: "اشترومن (Straumann ITI) سوئیس", multiplier: 1.35, country: "سوئیس (مادام‌العمر)" },
      { name: "مگاژن (MegaGen AnyRidge) کره جنوبی", multiplier: 1.0, country: "کره جنوبی" },
      { name: "سیکام (SIC) سوئیس", multiplier: 1.15, country: "سوئیس" }
    ],
    warrantyYears: 25,
    sessions: "۱ جلسه کاشت + تحویل پروتز"
  },
  {
    id: "aligners",
    name: "ارتودنسی نامرئی (الاینر شفاف)",
    basePricePerUnit: 24000000,
    minUnits: 1,
    maxUnits: 2,
    defaultUnits: 2,
    unitLabel: "فک",
    brands: [
      { name: "الاینر دیجیتال هوشمند زایس آلمان", multiplier: 1.2, country: "آلمان" },
      { name: "سیستم شفاف اسمارت کانتور", multiplier: 1.0, country: "ایران / سوئیس" }
    ],
    warrantyYears: 8,
    sessions: "چکاپ هر ۶ هفته یک‌بار"
  },
  {
    id: "bleaching",
    name: "بلیچینگ دوفکی لیزری (آفیس + هوم)",
    basePricePerUnit: 3200000,
    minUnits: 1,
    maxUnits: 2,
    defaultUnits: 2,
    unitLabel: "فک",
    brands: [
      { name: "کیت کامل اولترادنت (Ultradent) آمریکا", multiplier: 1.15, country: "آمریکا" },
      { name: "وایت اسمایل (WhiteSmile) آلمان", multiplier: 1.0, country: "آلمان" }
    ],
    warrantyYears: 3,
    sessions: "۱ جلسه ۴۵ دقیقه‌ای مطب"
  }
];

export const SmileCalculator: React.FC<SmileCalculatorProps> = ({ onSelectBooking }) => {
  const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(0);
  const treatment = TREATMENTS[selectedTreatmentIndex];

  const [units, setUnits] = useState(treatment.defaultUnits);
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<"cash" | "6months" | "12months">("12months");
  const unitsRangeId = useId();

  // Reset units and brand when treatment changes
  const handleTreatmentChange = (idx: number) => {
    setSelectedTreatmentIndex(idx);
    setUnits(TREATMENTS[idx].defaultUnits);
    setSelectedBrandIndex(0);
  };

  const currentBrand = treatment.brands[selectedBrandIndex] || treatment.brands[0];
  const unitPrice = treatment.basePricePerUnit * currentBrand.multiplier;
  const rawTotalPrice = unitPrice * units;

  // Discounts & Installment calculations
  const cashDiscountPercent = 10;
  const isCash = paymentPlan === "cash";
  const finalTotalPrice = isCash
    ? rawTotalPrice * (1 - cashDiscountPercent / 100)
    : rawTotalPrice;

  const installmentMonths = paymentPlan === "6months" ? 6 : paymentPlan === "12months" ? 12 : 1;
  const monthlyPayment = isCash ? 0 : Math.round(finalTotalPrice / installmentMonths);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(Math.round(price)) + " تومان";
  };

  const handleBookingClick = () => {
    const summary = `${treatment.name} (${units} ${treatment.unitLabel} - برند ${currentBrand.name})`;
    const costText = `${formatPrice(finalTotalPrice)} (${paymentPlan === "cash" ? "پرداخت نقدی با تخفیف" : `اقساط ${installmentMonths} ماهه`})`;
    onSelectBooking(summary, costText);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-stone-50 via-teal-50/20 to-white relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/80">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>محاسبه‌گر هوشمند و شفاف هزینه‌ها</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            برآورد آنلاین و بی‌واسطه هزینه لبخند شما
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            نوع درمان، برند و تعداد دندان‌های مدنظرتان را مشخص کنید تا هزینه تمام‌شده و اقساط ماهانه بدون کارمزد بلافاصله محاسبه گردد.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-white rounded-3xl shadow-xl shadow-teal-950/5 border border-stone-200/80 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Input Controls (7 cols on lg) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 text-right border-b lg:border-b-0 lg:border-l border-stone-200/80">
              
              {/* Step 1: Treatment Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-extrabold">۱</span>
                  انتخاب خدمت و درمان مورد نظر:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TREATMENTS.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => handleTreatmentChange(idx)}
                      className={`cursor-pointer text-right p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-between ${
                        selectedTreatmentIndex === idx
                          ? "bg-teal-50/90 border-teal-500 text-teal-900 shadow-sm ring-1 ring-teal-500"
                          : "bg-stone-50/70 border-stone-200 text-slate-700 hover:bg-stone-100"
                      }`}
                    >
                      <span>{t.name}</span>
                      {selectedTreatmentIndex === idx && (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Units Range Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor={unitsRangeId} className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-extrabold">۲</span>
                    تعداد {treatment.unitLabel}:
                  </label>
                  <span className="text-base font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-xl border border-teal-200">
                    {units} {treatment.unitLabel}
                  </span>
                </div>

                <div className="space-y-2">
                  <input
                    id={unitsRangeId}
                    type="range"
                    min={treatment.minUnits}
                    max={treatment.maxUnits}
                    value={units}
                    onChange={(e) => setUnits(parseInt(e.target.value))}
                    aria-label={`تعداد ${treatment.unitLabel}`}
                    className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between gap-2 text-[11px] text-slate-400 font-medium">
                    <span className="shrink-0">حداقل: {treatment.minUnits} {treatment.unitLabel}</span>
                    <span className="text-teal-700 font-bold hidden sm:block text-center">
                      {units === 8 ? "بسته لبخند استاندارد (۸ دندان بالا)" : units === 16 ? "لبخند کامل دو فک (۱۶ دندان)" : ""}
                    </span>
                    <span className="shrink-0">حداکثر: {treatment.maxUnits} {treatment.unitLabel}</span>
                  </div>
                </div>

                {/* Quick select unit pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[4, 8, 10, 16, 20].filter(n => n >= treatment.minUnits && n <= treatment.maxUnits).map(num => (
                    <button
                      key={num}
                      onClick={() => setUnits(num)}
                      className={`cursor-pointer px-3 py-1 text-xs rounded-lg border font-semibold transition-colors ${
                        units === num
                          ? "bg-teal-600 text-white border-teal-600"
                          : "bg-white text-slate-600 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      {num} {treatment.unitLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Material & Brand Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-extrabold">۳</span>
                  برند و متریال ساخت:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {treatment.brands.map((b, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedBrandIndex(idx)}
                      className={`cursor-pointer text-right p-3 rounded-xl border text-xs font-semibold transition-all ${
                        selectedBrandIndex === idx
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100"
                      }`}
                    >
                      <div className="font-bold">{b.name}</div>
                      <div className={`text-[11px] mt-0.5 ${selectedBrandIndex === idx ? "text-stone-300" : "text-stone-500"}`}>
                        کشور سازنده: {b.country}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Payment Terms */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-extrabold">۴</span>
                  شیوه پرداخت:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentPlan("cash")}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                      paymentPlan === "cash"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">نقدی یکجا</div>
                    <div className={`text-[10px] mt-0.5 ${paymentPlan === "cash" ? "text-emerald-100" : "text-emerald-600 font-bold"}`}>
                      ۱۰٪ تخفیف هدیه
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentPlan("6months")}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                      paymentPlan === "6months"
                        ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                        : "bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">اقساط ۶ ماهه</div>
                    <div className={`text-[10px] mt-0.5 ${paymentPlan === "6months" ? "text-teal-200" : "text-slate-500"}`}>
                      با چک صیادی
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentPlan("12months")}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                      paymentPlan === "12months"
                        ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                        : "bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">اقساط ۱۲ ماهه</div>
                    <div className={`text-[10px] mt-0.5 ${paymentPlan === "12months" ? "text-teal-200" : "text-amber-600 font-bold"}`}>
                      بدون کارمزد
                    </div>
                  </button>
                </div>
              </div>

            </div>

            {/* Price Summary & Instant Booking Action (5 cols on lg) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-10 flex flex-col justify-between text-right space-y-6">
              
              <div className="space-y-6">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    خلاصه برآورد هزینه
                  </span>
                  <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-full text-stone-200 border border-white/10">
                    تعرفه رسمی بهار ۱۴۰۴
                  </span>
                </div>

                {/* Selected Details Preview */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between gap-x-3 flex-wrap items-center text-stone-300">
                    <span>درمان منتخب:</span>
                    <span className="font-bold text-white">{treatment.name}</span>
                  </div>
                  <div className="flex justify-between gap-x-3 flex-wrap items-center text-stone-300">
                    <span>تعداد {treatment.unitLabel}:</span>
                    <span className="font-bold text-white">{units} واحد</span>
                  </div>
                  <div className="flex justify-between gap-x-3 flex-wrap items-center text-stone-300">
                    <span>برند انتخابی:</span>
                    <span className="font-bold text-teal-200">{currentBrand.name}</span>
                  </div>
                  <div className="flex justify-between gap-x-3 flex-wrap items-center text-stone-300">
                    <span>طول درمان تقریبی:</span>
                    <span className="font-bold text-white">{treatment.sessions}</span>
                  </div>
                  <div className="flex justify-between gap-x-3 flex-wrap items-center text-stone-300">
                    <span>گارانتی طلایی دُرسا:</span>
                    <span className="font-bold text-amber-300">{treatment.warrantyYears} سال کتبی</span>
                  </div>
                </div>

                {/* Big Total Price Display */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
                  <div className="text-xs text-stone-400">
                    {isCash ? "مبلغ نهایی با اعمال ۱۰٪ تخفیف نقدی:" : "مبلغ کل دوره درمان:"}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white via-teal-100 to-amber-200">
                    {formatPrice(finalTotalPrice)}
                  </div>

                  {!isCash && (
                    <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                      <span className="text-stone-300">هر قسط ماهانه ({installmentMonths} قسط):</span>
                      <span className="text-emerald-400 font-extrabold text-base">
                        {formatPrice(monthlyPayment)}
                      </span>
                    </div>
                  )}

                  {isCash && (
                    <div className="text-[11px] text-emerald-300 font-semibold pt-1">
                      ✓ شما با پرداخت نقدی {formatPrice(rawTotalPrice * 0.1)} صرفه‌جویی کردید!
                    </div>
                  )}
                </div>

                {/* Reassurance perks */}
                <div className="space-y-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>ویزیت اولیه و اسکن ۳ بعدی کامپوزیت و لمینت رایگان است.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>بدون دریافت بهره، کارمزد پنهان یا سفته اضافی.</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleBookingClick}
                  className="cursor-pointer w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-400 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-teal-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                  <span>رزرو نوبت با این برآورد هزینه</span>
                  <ChevronLeft className="w-4 h-4 text-slate-950 group-hover:-translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-stone-400 text-center font-medium">
                  برآورد دقیق‌تر پس از بررسی عکس رادیوگرافی و معاینه بالینی ارائه می‌گردد.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
