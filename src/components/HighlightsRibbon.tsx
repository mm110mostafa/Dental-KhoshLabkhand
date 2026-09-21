import React from "react";
import { ShieldCheck, Zap, CreditCard, Scan } from "lucide-react";

/**
 * Luxury clinic pillars / highlights ribbon.
 * Sits right under the hero on the home page.
 */
export const HighlightsRibbon: React.FC = () => {
  const items = [
    {
      icon: Zap,
      title: "بیحسی دیجیتال The Wand",
      desc: "کاملاً بدون درد و سوزش سوزن"
    },
    {
      icon: Scan,
      title: "اسکن سه‌بعدی رنگی",
      desc: "بدون خمیر و تهوع در ۲ دقیقه"
    },
    {
      icon: ShieldCheck,
      title: "ضمانت کتبی تا ۱۰ سال",
      desc: "کارت طلایی گارانتی هولوگرام‌دار"
    },
    {
      icon: CreditCard,
      title: "اقساط ۱۲ ماهه بدون سود",
      desc: "پرداخت آسان با چک صیادی"
    }
  ];

  return (
    <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-8 border-y border-teal-800/50 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 border border-teal-400/30">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-stone-300">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
