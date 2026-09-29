import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Send,
  MessageCircle,
  User,
  AlertCircle,
  CheckCircle,
  Camera
} from "lucide-react";
import { CLINIC_INFO } from "../data/dentistryData";

interface ContactSectionProps {
  onOpenBooking: () => void;
}

interface FormState {
  name: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "لطفاً نام و نام خانوادگی خود را وارد کنید";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "نام باید حداقل ۳ کاراکتر باشد";
    }

    const phoneDigits = form.phone.replace(/[^0-9]/g, "");
    if (!form.phone.trim()) {
      newErrors.phone = "لطفاً شماره تماس خود را وارد کنید";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      newErrors.phone = "شماره تماس معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)";
    }

    if (!form.message.trim()) {
      newErrors.message = "لطفاً پیام خود را وارد کنید";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "پیام باید حداقل ۱۰ کاراکتر باشد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setForm({ name: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const contactCards = [
    { icon: Phone, label: "تلفن تماس مستقیم", value: CLINIC_INFO.phone, href: `tel:${CLINIC_INFO.phone.replace(/[^0-9]/g, "")}`, color: "teal" },
    { icon: MessageCircle, label: "پشتیبانی اورژانسی ۲۴ ساعته", value: CLINIC_INFO.emergencyPhone, href: `tel:${CLINIC_INFO.emergencyPhone.replace(/[^0-9]/g, "")}`, color: "emerald" },
    { icon: Mail, label: "ایمیل پشتیبانی", value: CLINIC_INFO.email, href: `mailto:${CLINIC_INFO.email}`, color: "amber" },
    { icon: Clock, label: "ساعات کاری", value: CLINIC_INFO.workingHours, color: "slate" }
  ];

  const colorClasses: Record<string, string> = {
    teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    slate: "bg-slate-100 text-slate-600 group-hover:bg-slate-700 group-hover:text-white"
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-stone-50 relative overflow-hidden">
      <div className="absolute top-10 -right-24 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-32 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span>ارتباط با کلینیک دُرسا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">تماس با ما</h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            کارشناسان ما آماده پاسخ‌گویی به سوالات شما هستند. همین حالا با ما در ارتباط باشید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Right Column: Info Cards + Map */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card, idx) => {
                const Icon = card.icon;
                const content = (
                  <div className="group bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300 text-right h-full">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${colorClasses[card.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mb-1">{card.label}</div>
                    <div className="text-sm font-bold text-slate-800 leading-snug">{card.value}</div>
                  </div>
                );
                return card.href ? (
                  <a key={idx} href={card.href} className="block h-full">{content}</a>
                ) : (
                  <div key={idx} className="h-full">{content}</div>
                );
              })}
            </div>
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-stone-100">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 mb-1">نشانی کلینیک</div>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{CLINIC_INFO.address}</p>
                  </div>
                </div>
              </div>

              {/* Stylized map placeholder */}
              <div className="relative h-44 bg-gradient-to-br from-teal-50 via-stone-100 to-emerald-50 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(13,148,136,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,148,136,0.12) 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                  }}
                />
                <div className="absolute top-1/3 right-0 left-0 h-5 bg-white/70 -rotate-3 shadow-sm" />
                <div className="absolute top-0 bottom-0 right-1/3 w-5 bg-white/70 rotate-6 shadow-sm" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping bg-teal-400/40 rounded-full" />
                    <div className="relative w-12 h-12 rounded-full bg-teal-600 border-4 border-white shadow-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md text-[11px] font-bold text-slate-800 border border-stone-200 whitespace-nowrap">
                    کلینیک دُرسا - برج پزشکی نگین
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-row gap-2.5">
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                >
                  <Send className="w-4 h-4" />
                  گفتگو در واتس‌اپ
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-200 text-slate-700 text-xs font-bold hover:bg-stone-50 transition-all"
                >
                  <Camera className="w-4 h-4 text-rose-500" />
                  پیج اینستاگرام
                </a>
              </div>
            </div>
          </div>

          {/* Left Column: Contact Form */}
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-8 self-start">
            <div className="space-y-5">
              <div className="space-y-1.5 text-right">
                <h3 className="text-xl font-extrabold text-slate-900">فرم درخواست تماس</h3>
                <p className="text-xs text-slate-500">
                  فرم زیر را تکمیل کنید؛ کارشناسان ما در کوتاه‌ترین زمان با شما تماس می‌گیرند.
                </p>
              </div>

              {/* Success message */}
              {submitted && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-right animate-in fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-emerald-800">پیام شما با موفقیت ارسال شد</div>
                    <div className="text-xs text-emerald-700 mt-0.5">
                      کارشناسان کلینیک دُرسا به‌زودی با شما تماس خواهند گرفت.
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name field */}
                <div className="space-y-1.5 text-right">
                  <label htmlFor="contact-name" className="text-xs font-bold text-slate-700">
                    نام و نام خانوادگی <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="مثال: نگار محمدی"
                      className={`w-full pr-10 pl-4 py-3 rounded-xl border bg-stone-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? "border-rose-300 focus:ring-rose-200 bg-rose-50/30"
                          : "border-stone-200 focus:border-teal-400 focus:ring-teal-100 focus:bg-white"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <div className="flex items-center gap-1.5 text-[11px] text-rose-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Phone field */}
                <div className="space-y-1.5 text-right">
                  <label htmlFor="contact-phone" className="text-xs font-bold text-slate-700">
                    شماره تماس <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                      inputMode="tel"
                      className={`w-full pr-10 pl-4 py-3 rounded-xl border bg-stone-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? "border-rose-300 focus:ring-rose-200 bg-rose-50/30"
                          : "border-stone-200 focus:border-teal-400 focus:ring-teal-100 focus:bg-white"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <div className="flex items-center gap-1.5 text-[11px] text-rose-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
                {/* Message field */}
                <div className="space-y-1.5 text-right">
                  <label htmlFor="contact-message" className="text-xs font-bold text-slate-700">
                    متن پیام شما <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="مثال: برای مشاوره طراحی لبخند قصد مراجعه دارم..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border bg-stone-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message
                        ? "border-rose-300 focus:ring-rose-200 bg-rose-50/30"
                        : "border-stone-200 focus:border-teal-400 focus:ring-teal-100 focus:bg-white"
                    }`}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1.5 text-[11px] text-rose-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-l from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>ارسال پیام</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
                  با ارسال این فرم، شما با{" "}
                  <span className="text-teal-600 font-medium">قوانین و حریم خصوصی</span>{" "}
                  کلینیک دُرسا موافقت می‌کنید.
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-stone-100" />
                  <span className="text-[11px] text-slate-400 font-medium">یا</span>
                  <div className="flex-1 h-px bg-stone-100" />
                </div>

                {/* Direct booking shortcut */}
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-teal-100 bg-teal-50/50 hover:bg-teal-50 hover:border-teal-200 text-teal-800 font-bold text-sm transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>رزرو مستقیم نوبت آنلاین</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};