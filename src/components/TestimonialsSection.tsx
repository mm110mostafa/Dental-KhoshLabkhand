import React from "react";
import { Star, MessageSquare, BadgeCheck, Quote, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "../data/dentistryData";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span>تجربه مراجعین محترم</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            داستان لبخندهایی که در دُرسا متولد شدند
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            افتخار ما رضایت و اعتماد عزیزانی است که با آرامش کامل، درمان و زیبایی دندان‌های خود را به ما سپردند.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-stone-50/70 p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-right relative"
            >
              <div className="space-y-4">
                
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" />
                </div>

                {/* Patient Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>

                {/* Treatment Pill */}
                <div className="pt-2">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200/60">
                    درمان: {t.treatment}
                  </span>
                </div>

              </div>

              {/* Patient Footer */}
              <div className="pt-4 border-t border-stone-200/80 mt-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-extrabold text-sm text-slate-900">
                    <span>{t.patientName}</span>
                    {t.verified && (
                      <span title="مراجع تایید شده کلینیک" className="inline-flex">
                        <BadgeCheck className="w-4 h-4 text-teal-600 fill-teal-50" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    پزشک: {t.doctorName} • {t.city}
                  </span>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  {t.date}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Banner Callout */}
        <div className="mt-12 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-right">
            <h3 className="text-lg sm:text-xl font-bold flex items-center justify-center md:justify-start gap-2 text-white">
              <Sparkles className="w-5 h-5 text-amber-400" />
              آیا برای لبخندی جدید و بی‌نقص آماده‌اید؟
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              اولین قدم، یک گفتگوی صمیمی و معاینه دقیق با اسکنر ۳ بعدی سه‌دقیقه‌ای است.
            </p>
          </div>

          <a
            href="tel:02188990022"
            className="cursor-pointer px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all whitespace-nowrap"
          >
            تماس با مشاور دندانپزشک (۰۲۱-۸۸۹۹۰۰۲۲)
          </a>
        </div>

      </div>
    </section>
  );
};
