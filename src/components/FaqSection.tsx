import React, { useState } from "react";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import { FAQ_LIST, CLINIC_INFO } from "../data/dentistryData";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-stone-50/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/70 text-teal-900 text-xs font-bold border border-teal-200">
            <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
            <span>پاسخ به ابهامات شما</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            پرسش‌های متداول دندانپزشکی زیبایی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            اگر سوال دیگری دارید، مشاورین دُرسا ۲۴ ساعته در واتس‌اپ و تلفن پاسخگوی شما هستند.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQ_LIST.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="cursor-pointer w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-teal-700 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-teal-600" : ""
                    }`}
                  />
                </button>

                {/* Smooth open/close accordion: content stays mounted and animates
                    between grid-rows 0fr ↔ 1fr so both opening and closing are eased. */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 pt-4 text-right">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions? Quick WhatsApp CTA */}
        <div className="mt-8 p-4 rounded-2xl bg-teal-50 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">سوال تخصصی دیگری دارید؟</h4>
              <p className="text-xs text-slate-600">عکس لبخند خود را در پیام‌رسان ارسال کنید تا پزشک رایگان بررسی نماید.</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm whitespace-nowrap"
          >
            ارسال پیام در واتس‌اپ
          </a>
        </div>

      </div>
    </section>
  );
};
