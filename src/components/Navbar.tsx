import React, { useState, useEffect } from "react";
import {
  Calendar,
  Phone,
  Menu,
  X,
  Calculator,
  ChevronDown,
  BookOpen,
  type LucideIcon,
  Sparkles,
  Crown,
  Palette,
  ShieldCheck,
  Smile,
  Sun
} from "lucide-react";
import { CLINIC_INFO, SERVICES, ServiceItem } from "../data/dentistryData";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
  onOpenServiceDetail?: (service: ServiceItem) => void;
  scrollProgress: number;
}

interface SubmenuItem {
  label: string;
  href?: string;
  service?: ServiceItem;
  icon?: LucideIcon;
}

interface NavLink {
  label: string;
  href?: string;
  guideHref?: string;
  megaMenu?: MegaColumn[];
}

interface MegaColumn {
  title: string;
  icon: LucideIcon;
  items: SubmenuItem[];
}

// Map service iconName -> lucide icon component
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Crown,
  Palette,
  ShieldCheck,
  Smile,
  Sun
};

// Services grouped into mega-menu columns by treatment category.
// Each id references a service from SERVICES (data/dentistryData.ts).
const SERVICE_CATEGORY_IDS: { title: string; icon: LucideIcon; ids: string[] }[] = [
  { title: "دندانپزشکی زیبایی", icon: Sparkles, ids: ["smile-design", "veneers", "composite", "bleaching"] },
  { title: "ایمپلنت و جراحی", icon: ShieldCheck, ids: ["implants"] },
  { title: "درمان و ارتودنسی", icon: Smile, ids: ["aligners"] }
];

const SERVICE_BY_ID: Record<string, ServiceItem> = {};
SERVICES.forEach((service) => {
  SERVICE_BY_ID[service.id] = service;
});

// Pre-computed 3-column mega menu for the "خدمات تخصصی" dropdown.
const SERVICE_MEGA_MENU: MegaColumn[] = SERVICE_CATEGORY_IDS.map((category) => ({
  title: category.title,
  icon: category.icon,
  items: category.ids.map((id) => {
    const service = SERVICE_BY_ID[id];
    return {
      label: service.title,
      service,
      icon: SERVICE_ICONS[service.iconName] ?? Sparkles
    };
  })
}));

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenCalculator,
  onOpenServiceDetail,
  scrollProgress
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open; reset submenu state on close.
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setMobileOpenSubmenu(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks: NavLink[] = [
    { label: "صفحه اصلی", href: "/" },
    {
      label: "خدمات تخصصی",
      guideHref: "/services",
      megaMenu: SERVICE_MEGA_MENU
    },
    { label: "پزشکان", href: "/doctors" },
    { label: "مقاله", href: "/articles" },
    { label: "درباره ما", href: "/about" },
    { label: "تماس با ما", href: "/contact" }
  ];

  const handleNavClick = (href?: string) => {
    if (!href) return;
    setMobileMenuOpen(false);
    setOpenDropdown(null);

    // href is always a route path, optionally with a hash (e.g. "/services#calculator").
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const path = href.substring(0, hashIndex);
      const hash = href.substring(hashIndex);
      // Already on the target page → scroll to the section directly.
      if (path === location.pathname) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
    }
    navigate(href);
  };

  const handleSubmenuClick = (item: SubmenuItem) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    if (item.service && onOpenServiceDetail) {
      onOpenServiceDetail(item.service);
    } else if (item.href) {
      handleNavClick(item.href);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-stone-200/50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400 transition-all duration-150 ease-out shadow-sm shadow-teal-500/50"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
        />
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-stone-200/80 shadow-sm shadow-stone-200/50 py-3"
            : "bg-white/70 backdrop-blur-md border-b border-stone-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Toggle Button (rightmost, before the logo in RTL) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="cursor-pointer lg:hidden shrink-0 p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-stone-100 transition-colors border border-stone-200"
              aria-label="باز کردن منو"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo and Brand */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-teal-600/30 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                <svg
                  className="w-6 h-6 fill-current text-white drop-shadow-sm"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C9.5 2 7 3.5 6 6C4.5 9.5 5 13.5 6 17.5C6.5 19.5 7.5 22 9.5 22C11 22 11.5 20 12 18C12.5 20 13 22 14.5 22C16.5 22 17.5 19.5 18 17.5C19 13.5 19.5 9.5 18 6C17 3.5 14.5 2 12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                    کلینیک دُرسا
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200/60 hidden xl:inline-block">
                    DSD Certified
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  مرکز تخصصی طراحی لبخند و ایمپلنت دیجیتال
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.megaMenu && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (item.href) handleNavClick(item.href);
                      if (item.megaMenu) {
                        setOpenDropdown(item.label);
                      }
                    }}
                    aria-expanded={item.megaMenu ? openDropdown === item.label : undefined}
                    className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                      location.pathname === item.href
                        ? "text-teal-700 bg-teal-50/80 border border-teal-200/50"
                        : item.label === "خدمات تخصصی"
                        ? "text-teal-700 bg-teal-50/80 hover:bg-teal-100/70 border border-teal-200/50"
                        : "text-slate-600 hover:text-slate-950 hover:bg-stone-100/70"
                    }`}
                  >
                    {item.label}
                    {item.megaMenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Desktop Mega Menu Panel */}
                  {item.megaMenu && openDropdown === item.label && (
                    <div className="absolute top-full right-0 mt-2 w-[660px] max-w-[calc(100vw-1.5rem)]">
                      <div className="rounded-2xl border border-stone-200/80 bg-white/95 backdrop-blur-xl shadow-2xl shadow-stone-400/30 overflow-hidden">
                        {/* زیرمنوی اول: راهنمای خدمات */}
                        {item.guideHref && (
                          <button
                            onClick={() => handleNavClick(item.guideHref)}
                            className="cursor-pointer w-full text-right px-4 py-3 flex items-center gap-3 bg-gradient-to-l from-teal-50/90 via-teal-50/40 to-transparent border-b border-stone-100 hover:from-teal-100/80 transition-colors group/guide"
                          >
                            <span className="w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br from-teal-600 to-emerald-600 text-white flex items-center justify-center shadow-sm shadow-teal-600/30">
                              <BookOpen className="w-4 h-4" />
                            </span>
                            <span className="flex-1">
                              <span className="block text-sm font-bold text-slate-900">راهنمای خدمات</span>
                              <span className="block text-[11px] text-slate-500">
                                مشاهده‌ی کامل خدمات تخصصی، قیمت و توضیحات هر درمان
                              </span>
                            </span>
                            <ChevronDown className="w-4 h-4 -rotate-90 text-teal-600 group-hover/guide:-translate-x-0.5 transition-transform" />
                          </button>
                        )}

                        {/* زیرمنوی دوم: خدمات کلینیک — مگامنوی ۳ ستونی */}
                        <div className="p-3">
                          <div className="flex items-center gap-2 px-2 pb-2">
                            <span className="text-[11px] font-bold text-slate-400">خدمات کلینیک</span>
                            <span className="h-px flex-1 bg-stone-100" />
                          </div>
                          <div className="grid grid-cols-3 gap-2.5">
                            {item.megaMenu.map((column) => {
                              const ColIcon = column.icon;
                              return (
                                <div key={column.title}>
                                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-stone-50/80 mb-1">
                                    <ColIcon className="w-4 h-4 text-teal-600 shrink-0" />
                                    <span className="text-xs font-bold text-slate-800 leading-tight">
                                      {column.title}
                                    </span>
                                  </div>
                                  {column.items.map((sub) => {
                                    const SubIcon = sub.icon ?? Sparkles;
                                    return (
                                      <button
                                        key={sub.label}
                                        onClick={() => handleSubmenuClick(sub)}
                                        className="cursor-pointer w-full text-right px-2.5 py-2 rounded-lg text-[13px] font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50/60 transition-colors flex items-center gap-2 group/sub"
                                      >
                                        <span className="w-6 h-6 shrink-0 rounded-md bg-stone-100 group-hover/sub:bg-teal-100 text-slate-500 group-hover/sub:text-teal-600 flex items-center justify-center transition-colors">
                                          <SubIcon className="w-3.5 h-3.5" />
                                        </span>
                                        <span className="leading-snug line-clamp-2">{sub.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions & Online Booking Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Call button — only on xl+ to keep the navbar un-crowded between
                  1024px and 1279px (phone is always reachable in the mobile
                  bottom bar and drawer, so hiding it here prevents overflow). */}
              <a
                href={`tel:${CLINIC_INFO.phone.replace(/[^0-9]/g, "")}`}
                className="hidden xl:inline-flex items-center gap-2 text-sm text-slate-700 hover:text-teal-700 px-3 py-2 rounded-xl border border-stone-200/80 hover:border-teal-300 hover:bg-teal-50/30 transition-all font-medium"
                title="تماس مستقیم با کلینیک"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span className="text-xs lg:text-sm">{CLINIC_INFO.phone}</span>
              </a>

              {/* Main CTA: Appointment Booking */}
              <button
                onClick={onOpenBooking}
                className="cursor-pointer relative inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md shadow-teal-600/25 hover:shadow-lg hover:shadow-teal-600/35 active:scale-95 transition-all duration-200 group"
              >
                <Calendar className="w-4 h-4 text-teal-100 group-hover:rotate-12 transition-transform duration-200" />
                <span className="sm:hidden whitespace-nowrap">رزرو نوبت</span>
                <span className="hidden sm:inline whitespace-nowrap">رزرو نوبت آنلاین</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
                </span>
              </button>

            </div>
          </div>
        </div>

      </header>

      {/*
        Mobile Drawer — must live OUTSIDE <header>:
        header has backdrop-blur which creates a containing block for
        position:fixed children, so the drawer would be clipped to the
        header's height instead of the viewport.
      */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
          {/* Dimmed, blurred backdrop — clicking anywhere on it closes the drawer */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden="true"
          />

          {/* Slide-in drawer panel (from the right side, RTL start) */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl shadow-slate-900/30 flex flex-col transition-transform duration-300 ease-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Drawer header with close button */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-stone-100">
              <span className="text-sm font-extrabold text-slate-900">منوی کلینیک دُرسا</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-stone-100 transition-colors border border-stone-200"
                aria-label="بستن منو"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable menu area so every item is reachable */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              <div className="grid grid-cols-1 gap-1">
              {navLinks.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      if (item.href) handleNavClick(item.href);
                      if (item.megaMenu) {
                        setMobileOpenSubmenu(mobileOpenSubmenu === item.label ? null : item.label);
                      }
                    }}
                    className={`cursor-pointer w-full text-right px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                      item.label === "خدمات تخصصی"
                        ? "bg-teal-50 text-teal-800 border border-teal-200"
                        : "text-slate-700 hover:bg-stone-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.megaMenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileOpenSubmenu === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </span>
                    {!item.megaMenu && <span className="text-xs text-stone-400">←</span>}
                  </button>

                  {/* Mobile Mega Menu (accordion) */}
                  {item.megaMenu && mobileOpenSubmenu === item.label && (
                    <div className="mt-1.5 mr-3 pr-3 border-r-2 border-teal-100 space-y-2">
                      {item.guideHref && (
                        <button
                          onClick={() => handleNavClick(item.guideHref)}
                          className="cursor-pointer w-full text-right px-3 py-2.5 rounded-xl text-sm font-bold text-teal-800 bg-teal-50/80 border border-teal-100 flex items-center gap-2.5"
                        >
                          <span className="w-7 h-7 shrink-0 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                            <BookOpen className="w-3.5 h-3.5" />
                          </span>
                          راهنمای خدمات
                        </button>
                      )}

                      {item.megaMenu.map((column) => {
                        const ColIcon = column.icon;
                        return (
                          <div key={column.title}>
                            <div className="flex items-center gap-2 px-2 py-1.5">
                              <ColIcon className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              <span className="text-xs font-bold text-slate-800">{column.title}</span>
                            </div>
                            {column.items.map((sub) => {
                              const SubIcon = sub.icon ?? Sparkles;
                              return (
                                <button
                                  key={sub.label}
                                  onClick={() => handleSubmenuClick(sub)}
                                  className="cursor-pointer w-full text-right px-3 py-2 rounded-xl text-[13px] font-medium text-slate-600 hover:text-slate-950 hover:bg-stone-50 transition-colors flex items-center gap-2.5"
                                >
                                  <span className="w-7 h-7 shrink-0 rounded-lg bg-stone-100 text-slate-500 flex items-center justify-center">
                                    <SubIcon className="w-3.5 h-3.5" />
                                  </span>
                                  <span className="leading-snug">{sub.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="cursor-pointer w-full py-2.5 px-4 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 text-sm font-bold flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-amber-600" />
                محاسبه‌گر آنلاین هزینه درمان
              </button>

              <a
                href={`tel:${CLINIC_INFO.phone.replace(/[^0-9]/g, "")}`}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-200 text-slate-800 text-sm font-bold flex items-center justify-center gap-2 bg-stone-50"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                تماس فوری: {CLINIC_INFO.phone}
              </a>

              <div className="text-[11px] text-slate-500 text-center pt-2">
                <p>📍 {CLINIC_INFO.address}</p>
                <p>⏰ {CLINIC_INFO.workingHours}</p>
              </div>
                </div>
            </div>
          </div>
        </div>
    </>
  );
};
