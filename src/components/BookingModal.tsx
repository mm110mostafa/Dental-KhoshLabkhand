import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  X,
  User,
  Phone,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  MapPin
} from "lucide-react";
import { CLINIC_INFO, SERVICES, DOCTORS } from "../data/dentistryData";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDoctor?: string;
  initialEstimatedCost?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = "",
  initialDoctor = "",
  initialEstimatedCost = ""
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(initialService || SERVICES[0].title);
  const [selectedDoctor, setSelectedDoctor] = useState<string>(initialDoctor || "اولین پزشک در دسترس (سریع‌ترین نوبت)");
  const [selectedDay, setSelectedDay] = useState<string>("شنبه - ۲۳ فروردین");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("۱۶:۳۰ الی ۱۸:۰۰");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [trackingCode, setTrackingCode] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Sync initial props
  React.useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialDoctor) setSelectedDoctor(initialDoctor);
  }, [initialService, initialDoctor]);

  if (!isOpen) return null;

  const availableDays = [
    { label: "شنبه - ۲۳ فروردین", sub: "۳ نوبت خالی" },
    { label: "یکشنبه - ۲۴ فروردین", sub: "۵ نوبت خالی" },
    { label: "دوشنبه - ۲۵ فروردین", sub: "۲ نوبت خالی" },
    { label: "سه‌شنبه - ۲۶ فروردین", sub: "۴ نوبت خالی" },
    { label: "چهارشنبه - ۲۷ فروردین", sub: "۱ نوبت خالی" },
    { label: "پنجشنبه - ۲۸ فروردین", sub: "۶ نوبت خالی" }
  ];

  const timeSlots = [
    "۱۰:۰۰ الی ۱۱:۳۰ (صبح)",
    "۱۱:۳۰ الی ۱۳:۰۰ (ظهر)",
    "۱۴:۳۰ الی ۱۶:۰۰ (عصر)",
    "۱۶:۳۰ الی ۱۸:۰۰ (غروب)",
    "۱۸:۳۰ الی ۲۰:۰۰ (شب)",
    "۲۰:۰۰ الی ۲۱:۳۰ (آخرین پذیرش)"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || phone.length < 10) {
      alert("لطفاً نام و شماره همراه معتبر (حداقل ۱۰ رقم) را وارد فرمایید.");
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const code = `DRS-${randomNum}`;
    setTrackingCode(code);
    setIsSubmitted(true);

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if unavailable
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    setFullName("");
    setPhone("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-right my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-teal-300">سامانه نوبت‌دهی آنلاین کلینیک دُرسا</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            رزرو وقت ویزیت و اسکن ۳ بعدی لبخند
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            بدون نیاز به پرداخت هزینه بیعانه؛ ویزیت اولیه و طراحی دیجیتال کاملاً رایگان است.
          </p>

          {/* Stepper (Only when not submitted) */}
          {!isSubmitted && (
            <div className="flex items-center justify-between pt-5 max-w-md mx-auto text-xs">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? "text-teal-300 font-bold" : "text-stone-400"}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-teal-500 text-slate-950 font-bold" : "bg-white/10"}`}>۱</span>
                <span>درمان و پزشک</span>
              </div>
              <div className="h-0.5 w-8 bg-white/20" />
              <div className={`flex items-center gap-1.5 ${step >= 2 ? "text-teal-300 font-bold" : "text-stone-400"}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-teal-500 text-slate-950 font-bold" : "bg-white/10"}`}>۲</span>
                <span>زمان نوبت</span>
              </div>
              <div className="h-0.5 w-8 bg-white/20" />
              <div className={`flex items-center gap-1.5 ${step >= 3 ? "text-teal-300 font-bold" : "text-stone-400"}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-teal-500 text-slate-950 font-bold" : "bg-white/10"}`}>۳</span>
                <span>مشخصات بیمار</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7">
          {isSubmitted ? (
            /* Step 4 / Confirmation Card */
            <div className="space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-black text-slate-900">نوبت شما با موفقیت رزرو شد!</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  پیامک تایید حاوی آدرس و لینک لوکیشن برای شماره همراه شما ارسال شد.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-gradient-to-br from-stone-50 to-teal-50/40 p-5 rounded-3xl border-2 border-dashed border-teal-300 text-right space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between items-center border-b border-teal-100 pb-3">
                  <span className="text-xs text-slate-500">کد رهگیری پذیرش:</span>
                  <span className="font-mono font-black text-base text-teal-800 bg-white px-3 py-1 rounded-xl border border-teal-200">
                    {trackingCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">نام بیمار:</span>
                    <strong className="text-slate-800 text-sm">{fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">پزشک معالج:</span>
                    <strong className="text-teal-800 text-sm">{selectedDoctor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">روز مراجعه:</span>
                    <strong className="text-slate-800">{selectedDay}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ساعت پذیرش:</span>
                    <strong className="text-slate-800">{selectedTimeSlot}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">درمان انتخابی:</span>
                    <strong className="text-slate-800">{selectedService}</strong>
                  </div>
                  {initialEstimatedCost && (
                    <div className="col-span-2 bg-white p-2 rounded-xl border border-teal-100">
                      <span className="text-slate-500 block text-[11px]">برآورد هزینه محاسبه‌شده:</span>
                      <strong className="text-teal-700 text-xs">{initialEstimatedCost}</strong>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-teal-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{CLINIC_INFO.address}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="cursor-pointer px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all"
                >
                  تایید و بازگشت به سایت
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Treatment & Doctor */}
              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">
                      ۱. خدمت مورد نظر خود را انتخاب نمایید:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SERVICES.map((s) => (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => setSelectedService(s.title)}
                          className={`cursor-pointer p-3 rounded-xl border text-xs font-semibold text-right transition-all flex items-center justify-between ${
                            selectedService === s.title
                              ? "bg-teal-50 border-teal-600 text-teal-900 shadow-sm"
                              : "bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100"
                          }`}
                        >
                          <span>{s.title}</span>
                          {selectedService === s.title && (
                            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                          )}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setSelectedService("ویزیت و معاینه کلی (چکاپ دوره‌ای)")}
                        className={`cursor-pointer p-3 rounded-xl border text-xs font-semibold text-right transition-all flex items-center justify-between ${
                          selectedService === "ویزیت و معاینه کلی (چکاپ دوره‌ای)"
                            ? "bg-teal-50 border-teal-600 text-teal-900 shadow-sm"
                            : "bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100"
                        }`}
                      >
                        <span>ویزیت و معاینه کلی (چکاپ دوره‌ای)</span>
                        {selectedService === "ویزیت و معاینه کلی (چکاپ دوره‌ای)" && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">
                      ۲. انتخاب دندانپزشک متخصص:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedDoctor("اولین پزشک در دسترس (سریع‌ترین نوبت)")}
                        className={`cursor-pointer p-3 rounded-xl border text-xs font-semibold text-right transition-all ${
                          selectedDoctor.includes("اولین پزشک")
                            ? "bg-teal-50 border-teal-600 text-teal-900 shadow-sm"
                            : "bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100"
                        }`}
                      >
                        <div className="font-bold">اولین نوبت خالی</div>
                        <div className="text-[10px] text-teal-700 mt-0.5">پیشنهادی برای فوریت</div>
                      </button>

                      {DOCTORS.map((d) => (
                        <button
                          type="button"
                          key={d.id}
                          onClick={() => setSelectedDoctor(d.name)}
                          className={`cursor-pointer p-3 rounded-xl border text-xs font-semibold text-right transition-all ${
                            selectedDoctor === d.name
                              ? "bg-teal-50 border-teal-600 text-teal-900 shadow-sm"
                              : "bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100"
                          }`}
                        >
                          <div className="font-bold">{d.name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{d.title.split(" ")[0]} {d.title.split(" ")[1]}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="cursor-pointer px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <span>مرحله بعد: انتخاب زمان</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Day & Time slot */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">
                      روز مراجعه به کلینیک را مشخص نمایید:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableDays.map((d, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setSelectedDay(d.label)}
                          className={`cursor-pointer p-3 rounded-xl border text-right transition-all ${
                            selectedDay === d.label
                              ? "bg-teal-50 border-teal-600 text-teal-900 shadow-sm"
                              : "bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100"
                          }`}
                        >
                          <div className="text-xs font-bold">{d.label}</div>
                          <div className="text-[10px] text-teal-600 mt-0.5">{d.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">
                      بازه ساعتی مناسب برای ویزیت:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.map((ts, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setSelectedTimeSlot(ts)}
                          className={`cursor-pointer p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                            selectedTimeSlot === ts
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : "bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100"
                          }`}
                        >
                          {ts}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="cursor-pointer px-4 py-2.5 rounded-xl border border-stone-300 text-slate-700 text-xs font-bold hover:bg-stone-100 transition-colors"
                    >
                      مرحله قبل
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="cursor-pointer px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <span>مرحله بعد: ثبت مشخصات</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Patient Information Form */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs text-slate-600 space-y-1">
                    <div>درمان: <strong className="text-slate-800">{selectedService}</strong></div>
                    <div>پزشک: <strong className="text-slate-800">{selectedDoctor}</strong></div>
                    <div>زمان: <strong className="text-teal-700">{selectedDay} ({selectedTimeSlot})</strong></div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">
                      نام و نام‌خانوادگی مراجعه‌کننده: *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثال: سارا محمدی"
                        className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">
                      شماره تماس همراه (جهت پیامک نوبت): *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-right font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">
                      توضیحات تکمیلی یا سابقه دندانپزشکی (اختیاری):
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="اگر حساسیت دارویی، بارداری، یا ترجیح خاصی دارید قید فرمایید..."
                      className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="cursor-pointer px-4 py-2.5 rounded-xl border border-stone-300 text-slate-700 text-xs font-bold hover:bg-stone-100 transition-colors"
                    >
                      مرحله قبل
                    </button>

                    <button
                      type="submit"
                      className="cursor-pointer px-7 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-sm shadow-lg shadow-teal-600/30 transition-all active:scale-95 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>ثبت نهایی و دریافت کد رهگیری</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
