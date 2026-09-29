import React, { useState } from "react";
import {
  Sparkles,
  Crown,
  Palette,
  ShieldCheck,
  Smile,
  Sun,
  Clock,
  Shield,
  ChevronLeft,
  Info
} from "lucide-react";
import { SERVICES, ServiceItem } from "../data/dentistryData";

interface ServicesSectionProps {
  onOpenBookingWithService: (serviceName: string) => void;
  onOpenDetailModal: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBookingWithService,
  onOpenDetailModal
}) => {
  const [filter, setFilter] = useState<string>("all");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Crown":
        return <Crown className="w-6 h-6 text-amber-500" />;
      case "Palette":
        return <Palette className="w-6 h-6 text-teal-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case "Smile":
        return <Smile className="w-6 h-6 text-cyan-600" />;
      case "Sun":
        return <Sun className="w-6 h-6 text-amber-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-teal-600" />;
    }
  };

  const filteredServices = SERVICES.filter((s) => {
    if (filter === "cosmetic") {
      return s.id === "smile-design" || s.id === "veneers" || s.id === "composite" || s.id === "bleaching";
    }
    if (filter === "surgery") {
      return s.id === "implants";
    }
    if (filter === "ortho") {
      return s.id === "aligners";
    }
    return true;
  });

  return (
    <section id="services" className="py-20 bg-stone-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-10">
          <div className="space-y-3 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-900 text-xs font-bold border border-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              <span>دپارتمان‌های فوق‌تخصصی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
              خدمات کلینیک دندانپزشکی دُرسا
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              تلفیق پیشرفته‌ترین تجهیزات تشخیصی آلمان و سوئیس با تبحر برترین دندانپزشکان زیبایی کشور.
            </p>
          </div>

          {/* Filter Pills — 2-column centered grid on mobile, flex row on md+ */}
          <div className="grid grid-cols-2 gap-1.5 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm self-stretch md:self-auto md:flex md:flex-wrap md:items-center">
            <button
              onClick={() => setFilter("all")}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all w-full md:w-auto text-center whitespace-nowrap ${
                filter === "all"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-stone-50"
              }`}
            >
              همه خدمات ({SERVICES.length})
            </button>
            <button
              onClick={() => setFilter("cosmetic")}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all w-full md:w-auto text-center whitespace-nowrap ${
                filter === "cosmetic"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-stone-50"
              }`}
            >
              زیبایی و طراحی لبخند
            </button>
            <button
              onClick={() => setFilter("surgery")}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all w-full md:w-auto text-center whitespace-nowrap ${
                filter === "surgery"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-stone-50"
              }`}
            >
              ایمپلنت و جراحی دیجیتال
            </button>
            <button
              onClick={() => setFilter("ortho")}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all w-full md:w-auto text-center whitespace-nowrap ${
                filter === "ortho"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-stone-50"
              }`}
            >
              ارتودنسی نامرئی
            </button>
          </div>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-right relative overflow-hidden"
            >
              {/* Subtle top-edge accent line on hover */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                
                {/* Header row: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-teal-50/80 border border-teal-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-100/70 transition-all duration-300 shadow-sm">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-slate-700 border border-stone-200">
                    {service.badge}
                  </span>
                </div>

                {/* Title & short desc */}
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans tracking-wide">
                    {service.enTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Features tags */}
                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Duration & Warranty Row */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-amber-500" />
                    <span>{service.warranty}</span>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="pt-6 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenBookingWithService(service.title)}
                  className="cursor-pointer flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>رزرو نوبت</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenDetailModal(service)}
                  className="cursor-pointer p-2.5 rounded-xl border border-stone-200 text-slate-600 hover:text-teal-700 hover:bg-teal-50/50 transition-colors"
                  title="مشاهده اطلاعات کامل و ویدیو"
                  aria-label="مشاهده اطلاعات کامل"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
