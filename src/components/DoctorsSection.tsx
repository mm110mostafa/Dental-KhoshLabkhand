import React from "react";
import {
  Award,
  Calendar,
  GraduationCap,
  CheckCircle2,
  Clock
} from "lucide-react";
import { DOCTORS } from "../data/dentistryData";

interface DoctorsSectionProps {
  onOpenBookingWithDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onOpenBookingWithDoctor
}) => {
  return (
    <section id="doctors" className="py-20 bg-stone-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/70 text-teal-900 text-xs font-bold border border-teal-200">
            <Award className="w-3.5 h-3.5 text-teal-700" />
            <span>کادر درمان و پزشکان متخصص</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            استادان هنر و طب دندانپزشکی در دُرسا
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            تلفیق دانش آکادمیک بین‌المللی، فلوشیپ‌های سوئیس و آمریکا با بیش از ۱۵ سال تجربه عملی در طراحی لبخند‌های ماندگار.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:shadow-teal-950/5 transition-all duration-300 text-right flex flex-col justify-between space-y-6"
            >
              <div className="space-y-6">
                
                {/* Doctor Head Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Doctor Real Portrait */}
                  <div className="relative shrink-0">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg border-2 border-stone-100 bg-stone-100">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        width={600}
                        height={600}
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -bottom-2 -left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      آماده پذیرش
                    </div>
                  </div>

                  {/* Doctor Text */}
                  <div className="space-y-2 text-center sm:text-right">
                    <span className="text-xs font-bold text-teal-700 block">
                      {doc.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {doc.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-600">
                      {doc.specialty}
                    </p>
                    <div className="inline-block text-xs font-mono font-semibold bg-stone-100 text-slate-600 px-2.5 py-0.5 rounded-lg border border-stone-200">
                      {doc.medicalCode}
                    </div>
                  </div>
                </div>

                {/* Experience & Case Metrics */}
                <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200/70">
                  <div className="text-center p-2">
                    <span className="text-xs text-slate-500 block">سابقه طبابت</span>
                    <span className="text-base sm:text-lg font-black text-slate-900">
                      {doc.experienceYears} سال تجربه
                    </span>
                  </div>
                  <div className="text-center p-2 border-r border-stone-200">
                    <span className="text-xs text-slate-500 block">درمان‌های موفق</span>
                    <span className="text-base sm:text-lg font-black text-teal-700">
                      {doc.completedCases}
                    </span>
                  </div>
                </div>

                {/* Education & Badges */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <GraduationCap className="w-4 h-4 text-teal-600" />
                    <span>سوابق علمی و افتخارات بین‌المللی:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {doc.education.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Available Days */}
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100">
                  <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>روزهای حضور در کلینیک:</span>
                  <div className="flex gap-1.5 font-bold text-teal-900">
                    {doc.availableDays.map((d, i) => (
                      <span key={i} className="bg-white px-2 py-0.5 rounded-md border border-teal-200 text-[11px]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenBookingWithDoctor(doc.name)}
                  className="cursor-pointer w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 text-teal-300 group-hover:rotate-12 transition-transform" />
                  <span>رزرو وقت ویزیت مستقیم با {doc.name}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
