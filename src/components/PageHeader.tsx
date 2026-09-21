import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
}

/**
 * Themed banner used at the top of inner pages.
 * Matches the site's teal/emerald design language and shows a Persian RTL breadcrumb.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumb }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 pt-16 pb-14 lg:pt-20 lg:pb-16">
      {/* Ambient decorative glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Breadcrumb (RTL: خانه / صفحه جاری) */}
        <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-300 mb-5">
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-teal-300 transition-colors font-medium"
          >
            <span>خانه</span>
            <Home className="w-3.5 h-3.5" />
          </Link>
          <ChevronLeft className="w-4 h-4 text-teal-500" />
          <span className="text-teal-300 font-bold">{breadcrumb}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Decorative underline */}
        <div className="flex items-center justify-center gap-2 mt-7">
          <span className="h-1 w-16 rounded-full bg-gradient-to-l from-teal-500 to-transparent" />
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span className="h-1 w-16 rounded-full bg-gradient-to-r from-teal-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};
