import React from "react";
import {
  Phone,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Award,
  ChevronLeft
} from "lucide-react";
import { CLINIC_INFO, SERVICES } from "../data/dentistryData";
import { Link } from "react-router-dom";

interface FooterProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenCalculator }) => {
  return (
    <footer id="site-footer" className="bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10 text-center md:text-right">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C9.5 2 7 3.5 6 6C4.5 9.5 5 13.5 6 17.5C6.5 19.5 7.5 22 9.5 22C11 22 11.5 20 12 18C12.5 20 13 22 14.5 22C16.5 22 17.5 19.5 18 17.5C19 13.5 19.5 9.5 18 6C17 3.5 14.5 2 12 2Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-white">کلینیک دندانپزشکی دُرسا</h3>
                <span className="text-xs text-teal-400 font-mono tracking-wider">
                  DORSA DENTAL & AESTHETIC CLINIC
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md">
              مرکز فوق‌تخصصی طراحی لبخند هالیوودی، لمینت سرامیکی E-Max، ایمپلنت دیجیتال بدون جراحی و ارتودنسی نامرئی با گواهی رسمی آکادمی دندانپزشکی سوئیس.
            </p>

            {/* Badges / Certifications */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-300">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>مجوز رسمی وزارت بهداشت</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>DSD Certified Switzerland</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center transition-all"
                title="واتس‌اپ دُرسا"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-all"
                title="اینستاگرام دُرسا"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={`tel:${CLINIC_INFO.phone.replace(/[^0-9]/g, "")}`}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-teal-600 text-white flex items-center justify-center transition-all"
                title="تماس مستقیم"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-teal-300 border-b border-white/10 pb-2">
              خدمات اصلی کلینیک
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="hover:text-teal-400 transition-colors flex items-center gap-1.5 justify-start"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-teal-500" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fast Access Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-teal-300 border-b border-white/10 pb-2">
              دسترسی سریع
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              {[
                { label: "درباره کلینیک دُرسا", href: "/about" },
                { label: "نمونه کارها", href: "/portfolio" },
                { label: "مقالات تخصصی", href: "/articles" },
                { label: "تماس با ما", href: "/contact" },
                { label: "پزشکان متخصص", href: "/doctors" },
                { label: "محاسبه‌گر هزینه", href: "/services#calculator" },
                { label: "سوالات متداول", href: "/about#faq" }
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="hover:text-teal-400 transition-colors flex items-center gap-1.5 justify-start"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-teal-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Contact & Hours (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-teal-300 border-b border-white/10 pb-2">
              اطلاعات تماس و نشانی
            </h4>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5 justify-start">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CLINIC_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5 justify-start">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>تلفن تماس: {CLINIC_INFO.phone}</span>
              </div>

              <div className="flex items-center gap-2.5 justify-start">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>پشتیبانی اورژانسی ۲۴ ساعته: {CLINIC_INFO.emergencyPhone}</span>
              </div>

              <div className="flex items-center gap-2.5 justify-start">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>ساعات کاری: {CLINIC_INFO.workingHours}</span>
              </div>
            </div>

            {/* Quick Action in Footer — always side-by-side in one row */}
            <div className="pt-2 flex flex-row gap-2">
              <button
                onClick={onOpenBooking}
                className="cursor-pointer w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-md text-center"
              >
                رزرو نوبت آنلاین
              </button>
              <button
                onClick={onOpenCalculator}
                className="cursor-pointer w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/10 text-center"
              >
                محاسبه‌گر هزینه
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© تمامی حقوق برای کلینیک تخصصی دندانپزشکی دُرسا محفوظ است.</p>
          <div className="flex items-center gap-3">
            <span>طراحی با استانداردهای نوین بین‌المللی و الهام از پلتفرم شونر</span>
            <span>•</span>
            <span className="text-teal-400 font-bold">زیبایی لبخند، تخصص ماست</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
