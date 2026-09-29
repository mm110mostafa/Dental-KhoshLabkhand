import React from "react";
import { X, Sparkles, Check, Clock, Shield, Calendar } from "lucide-react";
import { ServiceItem } from "../data/dentistryData";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBook
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-right max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30 mb-2">
            {service.badge}
          </span>
          <h3 className="text-2xl font-extrabold text-white">{service.title}</h3>
          <p className="text-xs text-stone-300 tracking-wider font-sans mt-0.5">
            {service.enTitle}
          </p>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-800">شرح کامل درمان و تکنولوژی:</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{service.fullDesc}</p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>طول درمان</span>
              </div>
              <div className="text-sm font-bold text-slate-800">{service.duration}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Shield className="w-3.5 h-3.5 text-teal-600" />
                <span>ضمانت کتبی</span>
              </div>
              <div className="text-sm font-bold text-slate-800">{service.warranty}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>هزینه پایه</span>
              </div>
              <div className="text-sm font-bold text-teal-700">{service.priceStart}</div>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800">مزایای اختصاصی در کلینیک دُرسا:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50/50 border border-teal-100 text-xs font-semibold text-slate-700"
                >
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-row gap-2.5">
          <button
            onClick={() => {
              onClose();
              onBook(service.title);
            }}
            className="cursor-pointer flex-1 py-2.5 px-3 sm:px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>رزرو نوبت برای این درمان</span>
          </button>

          <button
            onClick={onClose}
            className="cursor-pointer shrink-0 py-2.5 px-4 sm:px-6 rounded-xl border border-stone-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-stone-100 transition-colors"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </div>
  );
};
