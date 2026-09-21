import React, { useState, useEffect } from "react";
import {
  Calendar,
  Phone,
  ArrowUp,
  MessageCircle,
  Calculator,
  X
} from "lucide-react";
import { CLINIC_INFO } from "../data/dentistryData";

interface FloatingActionsProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
  scrollY: number;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenBooking,
  onOpenCalculator,
  scrollY
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);

  useEffect(() => {
    setShowScrollTop(scrollY > 300);

    // Show friendly chat popup after 4 seconds once
    const timer = setTimeout(() => {
      setShowChatPopup(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: Chat + WhatsApp pinned to the BOTTOM RIGHT */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">

        {/* Floating WhatsApp / Chat Proactive Bubble */}
        {showChatPopup && (
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-3.5 max-w-xs text-right animate-bounce-slow relative flex items-start gap-3">
            <button
              onClick={() => setShowChatPopup(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-stone-100 hover:bg-stone-200 rounded-full text-slate-500 flex items-center justify-center text-xs"
              aria-label="بستن پیام"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <span>مشاور دندانپزشکی دُرسا</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                سلام! سوالی درباره هزینه کامپوزیت یا ایمپلنت دارید؟ هم‌اکنون آنلاینیم.
              </p>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] font-bold text-emerald-700 hover:text-emerald-800 underline pt-0.5"
              >
                شروع گفتگو در واتس‌اپ ←
              </a>
            </div>
          </div>
        )}

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
          title="مشاوره رایگان در واتس‌اپ"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-1">
            مشاوره آنلاین واتس‌اپ
          </span>
        </a>
      </div>

      {/* Desktop: Scroll-to-top pinned to the BOTTOM LEFT, 20px from the edge */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-6 left-5 z-40 hidden sm:block bg-white hover:bg-stone-50 text-slate-700 p-3 rounded-full shadow-md border border-stone-200 transition-all hover:scale-105 active:scale-95"
          title="بازگشت به ابتدای صفحه"
          aria-label="بازگشت به بالای صفحه"
        >
          <ArrowUp className="w-5 h-5 text-teal-700" />
        </button>
      )}

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div
        id="mobile-action-bar"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-stone-200/90 py-2.5 px-3 shadow-2xl flex items-center justify-around gap-2"
      >
        <a
          href={`tel:${CLINIC_INFO.phone.replace(/[^0-9]/g, "")}`}
          className="flex-1 py-2 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-bold flex flex-col items-center justify-center gap-1"
        >
          <Phone className="w-4 h-4 text-teal-600" />
          <span>تماس فوری</span>
        </a>

        <button
          onClick={onOpenCalculator}
          className="cursor-pointer flex-1 py-2 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex flex-col items-center justify-center gap-1"
        >
          <Calculator className="w-4 h-4 text-amber-600" />
          <span>محاسبه هزینه</span>
        </button>

        <button
          onClick={onOpenBooking}
          className="cursor-pointer flex-[1.4] py-2 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-black shadow-md shadow-teal-600/25 flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-4 h-4 text-teal-100" />
          <span>رزرو نوبت</span>
        </button>
      </div>
    </>
  );
};
