import React, { useState } from "react";
import {
  Scan,
  HeartPulse,
  Coffee,
  ShieldCheck,
  CheckCircle,
  Eye
} from "lucide-react";
import { CLINIC_AMENITIES } from "../data/dentistryData";

interface ClinicTechSectionProps {
  onOpenBooking: () => void;
}

export const ClinicTechSection: React.FC<ClinicTechSectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      id: "scan",
      title: "لابراتوار دیجیتال و اسکنر ۳ بعدی",
      desc: "طراحی لبخند در حضور بیمار با اسکنر رنگی 3Shape دانمارک بدون کوچک‌ترین خطا و بدون نیاز به خمیر قالب‌گیری سنتی.",
      image: "/images/digital-dentistry.jpg",
      tag: "تکنولوژی CAD/CAM",
      bullets: [
        "دقت تا ۵ میکرون در ثبت زوایای دندان",
        "مشاهده نتیجه قبل از شروع درمان در مانیتور لمسی",
        "طراحی و ساخت روکش در کمتر از ۴۸ ساعت",
        "کاهش ۹۰ درصدی تعداد جلسات ویزیت"
      ]
    },
    {
      id: "lounge",
      title: "فضای کلینیک و سالن اختصاصی VIP",
      desc: "محیطی آرام‌بخش با معماری ارگانیک، دور از استرس‌های رایج پزشکی، همراه با کافی‌بار باریستا و سالن پذیرایی ویژه.",
      image: "/images/clinic-lounge.jpg",
      tag: "آرامش ۵ ستاره",
      bullets: [
        "طراحی مینیمال با تهویه هوای بیمارستانی فیلتر هپا",
        "پذیرایی نوشیدنی‌های ارگانیک برای مراجع و همراهان",
        "اتاق ریلکسیشن اختصاصی پس از جراحی",
        "سیستم نوبت‌دهی هوشمند بدون معطلی و انتظار"
      ]
    },
    {
      id: "painless",
      title: "درمان بدون استرس و بیحسی هوشمند",
      desc: "سیستم تزریق کنترل‌شده توسط ریزپردازنده بدون سرنگ ترسناک، یونیت‌های ماساژوردار و عینک واقعیت مجازی حین کار.",
      image: "/images/painless-care.jpg",
      tag: "دندانپزشکی در خواب (Sedation)",
      bullets: [
        "بیحسی کامپیوتری The Wand بدون حس سوزش و سنگینی لب",
        "امکان تماشای فیلم یا شنیدن موسیقی با هدفون سایلنت",
        "پتو و بالشتک ارگونومیک ضدحساسیت برای راحتی گردن",
        "امکان سدیشن ملایم تحت نظر متخصص بیهوشی برای افراد مضطرب"
      ]
    }
  ];

  const currentTab = tabs[activeTab];

  return (
    <section id="tech" className="py-20 bg-white relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <Scan className="w-3.5 h-3.5 text-teal-600" />
            <span>استاندارد جهانی پزشکی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            فراتر از یک مطب؛ تجربه فناوری و آرامش
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            در کلینیک دُرسا، تجهیزات دیجیتال پیشرفته جهان با فضایی آرام و هتلی گردهم آمده‌اند تا تجربه دندانپزشکی برای شما خوشایند و خاطره‌انگیز باشد.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`cursor-pointer px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === idx
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15 scale-102"
                  : "bg-stone-100 text-slate-600 hover:bg-stone-200"
              }`}
            >
              {idx === 0 && <Scan className="w-4 h-4 text-teal-400" />}
              {idx === 1 && <Coffee className="w-4 h-4 text-amber-400" />}
              {idx === 2 && <HeartPulse className="w-4 h-4 text-rose-400" />}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Content Card */}
        <div className="bg-gradient-to-br from-stone-50 via-white to-teal-50/20 rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-xl shadow-teal-950/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Real Photograph of Clinic Technology (7 cols on lg) */}
            <div className="lg:col-span-7 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 aspect-[16/10]">
                <img
                  src={currentTab.image}
                  alt={currentTab.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  width={1200}
                  height={750}
                  decoding="async"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                
                {/* Image overlay badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-slate-900 font-extrabold text-xs shadow-md border border-stone-200">
                  {currentTab.tag}
                </div>
              </div>
            </div>

            {/* Content & Details (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6 text-right">
              <div className="space-y-3">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  امکانات مدرن کلینیک دُرسا
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {currentTab.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentTab.desc}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2.5 pt-2">
                {currentTab.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={onOpenBooking}
                  className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>بازدید حضوری و رزرو وقت مشاوره</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Clinic Amenities Mini Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {CLINIC_AMENITIES.map((amenity, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:border-teal-300 hover:shadow-md transition-all text-right space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                {idx === 0 && <Scan className="w-5 h-5" />}
                {idx === 1 && <HeartPulse className="w-5 h-5" />}
                {idx === 2 && <Coffee className="w-5 h-5" />}
                {idx === 3 && <ShieldCheck className="w-5 h-5" />}
              </div>
              <h4 className="text-sm font-bold text-slate-900">{amenity.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{amenity.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
