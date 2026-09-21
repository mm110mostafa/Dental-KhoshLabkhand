import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Newspaper,
  Crown,
  ShieldCheck,
  Sparkles,
  Smile,
  Sun,
  Stethoscope,
  Clock,
  ArrowLeft,
  Search,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ARTICLES } from "../data/dentistryData";

const ARTICLE_ICONS: Record<string, LucideIcon> = {
  Crown,
  ShieldCheck,
  Sparkles,
  Smile,
  Sun,
  Stethoscope
};

export const ArticlesSection: React.FC = () => {
  // Search/filter state is kept in the URL (?q= & ?cat=) so it survives
  // navigation back-and-forth from the detail pages.
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const activeCat = searchParams.get("cat") ?? "all";

  const [searchInput, setSearchInput] = useState(query);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    ARTICLES.forEach((a) => counts.set(a.category, (counts.get(a.category) ?? 0) + 1));
    return [
      { name: "همه مقالات", value: "all", count: ARTICLES.length },
      ...[...counts.entries()].map(([name, count]) => ({ name, value: name, count }))
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim();
    return ARTICLES.filter((a) => {
      const matchesCat = activeCat === "all" || a.category === activeCat;
      const matchesQuery =
        q === "" || a.title.includes(q) || a.excerpt.includes(q) || a.category.includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCat]);

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (searchInput.trim()) next.set("q", searchInput.trim());
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const clearSearch = () => {
    setSearchInput("");
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const setCategory = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete("cat");
    else next.set("cat", value);
    setSearchParams(next, { replace: true });
  };

  return (
    <section id="articles" className="py-20 bg-stone-50/60 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
            <Newspaper className="w-3.5 h-3.5 text-amber-600" />
            <span>مجله تخصصی دندانپزشکی</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            مقالات تخصصی و راهنمای درمان
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            جدیدترین مطالب آموزشی درباره زیبایی لبخند، ایمپلنت دیجیتال و مراقبت از دندان‌ها را توسط متخصصین کلینیک دُرسا بخوانید.
          </p>
        </div>

        {/* Search + Category filters */}
        <div className="mb-10 space-y-5">
          <form onSubmit={handleSubmitSearch} className="max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="جستجو در مقالات… (مثلاً لمینت، ایمپلنت، سفیدی)"
                className="w-full pr-12 pl-11 py-3.5 rounded-2xl border border-stone-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="cursor-pointer absolute left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
                  aria-label="پاک کردن جستجو"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => {
              const active = activeCat === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
                    active
                      ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20"
                      : "bg-white text-slate-600 border-stone-200 hover:border-teal-300 hover:text-teal-700"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${active ? "bg-white/20" : "bg-stone-100 text-slate-500"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid (or empty state) */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => {
              const Icon = ARTICLE_ICONS[article.iconName] ?? Sparkles;
              return (
                <article
                  key={article.id}
                  className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden text-right"
                >
                  {/* Linked cover image with category badge */}
                  <Link to={`/articles/${article.slug}`} className="relative block h-44 overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-teal-700 text-[11px] font-bold shadow-sm">
                      <Icon className="w-3.5 h-3.5" />
                      {article.category}
                    </span>
                  </Link>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>{article.date}</span>
                    </div>

                    <Link
                      to={`/articles/${article.slug}`}
                      className="font-bold text-slate-900 text-base leading-relaxed line-clamp-2 group-hover:text-teal-700 transition-colors"
                    >
                      {article.title}
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="mt-auto pt-2">
                      <Link
                        to={`/articles/${article.slug}`}
                        className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 text-sm font-bold group/link"
                      >
                        <span>ادامه مطلب</span>
                        <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-stone-100 text-slate-400 mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">مقاله‌ای پیدا نشد</h3>
            <p className="text-sm text-slate-500 mb-6">
              برای عبارت «{query || activeCat}» نتیجه‌ای وجود ندارد.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setSearchParams({}, { replace: true });
              }}
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-bold hover:bg-teal-700 transition-colors"
            >
              <X className="w-4 h-4" />
              پاک کردن فیلترها
            </button>
          </div>
        )}
      </div>
    </section>
  );
};