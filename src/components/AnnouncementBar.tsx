import React from "react";
import { Sparkles, PhoneCall, Clock, Search } from "lucide-react";
import { CLINIC_INFO } from "../data/dentistryData";

interface AnnouncementBarProps {
  /** Opens the site-wide AJAX search overlay. */
  onOpenSearch: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenSearch }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white text-xs sm:text-sm py-2 px-3 border-b border-teal-800/40 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left / Persian start: Promotional badge & notice */}
        <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-bold text-xs shadow-sm shadow-teal-500/20 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            جشنواره بهاره
          </span>
          <p className="text-stone-200 text-xs sm:text-sm truncate font-medium">
            ویزیت و اسکن ۳ بعدی لبخند رایگان + ۲۰٪ تخفیف ویژه کامپوزیت و لمینت تا پایان هفته
          </p>
        </div>

        {/* Right / Persian end: Site search + working hours & direct call */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs text-stone-300 shrink-0">
          {/* Site-wide AJAX search — always visible (replaces the old quick-booking button) */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="جستجو در سایت"
            className="cursor-pointer group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-stone-100 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-teal-300 group-hover:text-teal-200 transition-colors" />
            <span className="text-[11px] font-bold">جستجو</span>
          </button>

          <div className="hidden md:flex items-center gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-1.5 hover:text-teal-300 transition-colors">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>پذیرش همه روزه ۹ الی ۲۱</span>
            </div>

            <div className="h-3 w-px bg-white/20" />

            <a
              href={`tel:${CLINIC_INFO.phone.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-1.5 font-bold text-teal-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>خط مشاوره مستقیم: {CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
