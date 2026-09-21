import React from "react";
import { Link } from "react-router-dom";
import { Calendar, PhoneCall, ChevronLeft, Sparkles } from "lucide-react";
import { HeroSection } from "../components/HeroSection";
import { HighlightsRibbon } from "../components/HighlightsRibbon";
import { SmileSlider } from "../components/SmileSlider";
import { ServicesSection } from "../components/ServicesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { FaqSection } from "../components/FaqSection";
import { CLINIC_INFO, ServiceItem } from "../data/dentistryData";

interface HomePageProps {
  onOpenBooking: () => void;
  onOpenBookingWithService: (serviceName: string) => void;
  onOpenServiceDetail: (service: ServiceItem) => void;
  onOpenCalculator: () => void;
  scrollY: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onOpenBookingWithService,
  onOpenServiceDetail,
  onOpenCalculator,
  scrollY
}) => {
  return (
    <>
      {/* 1. Hero with quick appointment form */}
      <HeroSection
        onOpenBooking={onOpenBooking}
        onOpenCalculator={onOpenCalculator}
        scrollY={scrollY}
      />

      {/* 2. Luxury clinic pillars ribbon */}
      <HighlightsRibbon />

      {/* 3. Before & After smile slider */}
      <SmileSlider onOpenBooking={onOpenBooking} />

      {/* 4. Services preview grid */}
      <ServicesSection
        onOpenBookingWithService={onOpenBookingWithService}
        onOpenDetailModal={onOpenServiceDetail}
      />

      {/* 5. Patient reviews */}
      <TestimonialsSection />

      {/* 6. FAQ */}
      <FaqSection />

      {/* 7. Final CTA band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-800 py-16 lg:py-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-teal-100 text-xs font-bold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            مشاوره و ویزیت اولیه رایگان
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
            همین حالا اولین قدم به سوی لبخند رویایی‌تان را بردارید
          </h2>
          <p className="text-sm sm:text-base text-teal-50/90 leading-relaxed max-w-2xl mx-auto mb-8">
            تیم تخصصی کلینیک دُرسا با تجهیزات دیجیتال روز دنیا، طرح درمان منحصر‌به‌فرد شما را
            طراحی می‌کند. کافیست یک تماس داشته باشید.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenBooking}
              className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-teal-800 font-black text-sm shadow-xl shadow-teal-950/30 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>رزرو نوبت آنلاین</span>
            </button>

            <a
              href={`tel:${CLINIC_INFO.phone.replace(/[^0-9]/g, "")}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/25 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{CLINIC_INFO.phone}</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-bold text-sm group transition-colors"
            >
              <span>صفحه تماس با ما</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
