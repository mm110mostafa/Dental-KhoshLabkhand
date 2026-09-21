import React from "react";
import {
  Award,
  Smile,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Cpu,
  Building2,
  CheckCircle,
  Calendar
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ABOUT_STATS, ABOUT_VALUES } from "../data/dentistryData";

interface AboutSectionProps {
  onOpenBooking: () => void;
}

const VALUE_ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Cpu,
  Award,
  HeartPulse
};

const STAT_ICONS: Record<string, LucideIcon> = {
  Award,
  Smile,
  Stethoscope,
  HeartPulse
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white via-teal-50/20 to-white relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-20 -right-32 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <Building2 className="w-3.5 h-3.5 text-teal-600" />
            <span>درباره کلینیک دُرسا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            جایی که هنر زیبایی با تخصص پزشکی گره می‌خورد
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            کلینیک تخصصی دندانپزشکی و زیبایی دُرسا با بیش از یک دهه تجربه، مرکزی پیشرو در طراحی لبخند دیجیتال، ایمپلنت بدون جراحی و زیباسازی تخصصی دندان است.
          </p>
        </div>

        {/* Story + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3]">
              <img
                src="/images/clinic-lounge.jpg"
                alt="فضای کلینیک دُرسا"
                className="w-full h-full object-cover object-center"
                width={1200}
                height={900}
                decoding="async"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Floating badge card */}
            <div className="absolute -bottom-6 right-6 sm:-right-6 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 flex items-center gap-3 max-w-[15rem]">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">گواهی رسمی DSD</div>
                <div className="text-[11px] text-slate-500">آکادمی دندانپزشکی سوئیس</div>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="space-y-5 text-right">
            <h3 className="text-2xl font-extrabold text-slate-900">
              داستان ما: از یک مطب کوچک تا مرکز فوق‌تخصصی لبخند
            </h3>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                کلینیک دُرسا در سال ۱۳۸۶ با هدفی ساده آغاز به کار کرد: تبدیل دندانپزشکی از یک تجربه استرس‌زا به لحظه‌ای دلپذیر و ماندگار. امروز ما به یکی از معتبرترین مراکز طراحی لبخند دیجیتال و ایمپلنت دیجیتال کشور تبدیل شده‌ایم.
              </p>
              <p>
                ترکیب تخصص پزشکان فلوشیپ‌دار اروپا، تجهیزات اصلی ۳شِیپ دانمارک و اشترومن سوئیس، و لابراتوار اختصاصی CAD/CAM، امکان ارائه خدماتی با استانداردهای بین‌المللی را در قلب تهران فراهم آورده است.
              </p>
            </div>

            {/* Highlight checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {[
                "مجوز رسمی وزارت بهداشت",
                "عضو آکادمی زیبایی آمریکا (AACD)",
                "گواهی طراحی لبخند DSD سوئیس",
                "فلوشیپ ایمپلنتولوژی اشترومن"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>مشاوره رایگان با متخصصین</span>
              </button>
            </div>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {ABOUT_STATS.map((stat, idx) => {
            const Icon = STAT_ICONS[stat.icon] ?? Award;
            return (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all text-center space-y-2"
              >
                <div className="w-11 h-11 mx-auto rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center text-teal-600">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-700">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Values Grid */}
        <div>
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900">چرا کلینیک دُرسا؟</h3>
            <p className="text-sm text-slate-500">ارزش‌هایی که ما را از سایرین متمایز می‌کند</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ABOUT_VALUES.map((value, idx) => {
              const Icon = VALUE_ICONS[value.icon] ?? ShieldCheck;
              return (
                <div
                  key={idx}
                  className="group bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm hover:border-teal-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-right space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-teal-600 flex items-center justify-center text-teal-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">{value.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};