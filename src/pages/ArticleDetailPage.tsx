import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Search,
  X,
  Clock,
  CalendarDays,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  Newspaper,
  Phone,
  Sparkles
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ArticleComments } from "../components/ArticleComments";
import { ARTICLES } from "../data/dentistryData";

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = useMemo(() => ARTICLES.find((a) => a.slug === slug), [slug]);

  // Sidebar local search box → forwards to the filtered articles list
  const [sidebarQuery, setSidebarQuery] = useState("");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    ARTICLES.forEach((a) => counts.set(a.category, (counts.get(a.category) ?? 0) + 1));
    return [...counts.entries()].map(([name, count]) => ({ name, count }));
  }, []);

  // Recent articles = everything except the current one
  const recentArticles = useMemo(
    () => ARTICLES.filter((a) => a.slug !== slug).slice(0, 4),
    [slug]
  );

  const handleSidebarSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = sidebarQuery.trim();
    navigate(q ? `/articles?q=${encodeURIComponent(q)}` : "/articles");
  };

  // Invalid slug → friendly fallback with a link back to the list
  if (!article) {
    return (
      <>
        <PageHeader
          title="مقاله پیدا نشد"
          subtitle="مقاله مورد نظر شما در دسترس نیست"
          breadcrumb="مقالات تخصصی"
        />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
          <p className="text-slate-600">
            متأسفانه مقاله‌ای با این آدرس پیدا نشد. ممکن است حذف شده یا آدرس اشتباه باشد.
          </p>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white text-sm font-bold hover:bg-teal-700 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به فهرست مقالات
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={article.title}
        subtitle={article.excerpt}
        breadcrumb="مقاله تخصصی"
      />

      <section className="py-14 bg-stone-50/60 relative overflow-hidden">
        <div className="absolute top-0 -left-32 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium">
            <Link to="/" className="hover:text-teal-700 transition-colors">خانه</Link>
            <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
            <Link to="/articles" className="hover:text-teal-700 transition-colors">مقالات</Link>
            <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-teal-700 line-clamp-1">{article.category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-8 lg:gap-10">
            {/* ============ Article body ============ */}
            <article className="space-y-6 min-w-0">
              {/* Cover image */}
              <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-sm bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-56 sm:h-72 lg:h-80 object-cover object-center"
                  width={1200}
                  height={800}
                  decoding="async"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-bold shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  {article.category}
                </span>
              </div>

              {/* Title + meta */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 space-y-5 shadow-sm">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-relaxed">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pb-5 border-b border-stone-100">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-teal-600" />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-600" />
                    زمان مطالعه: {article.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Newspaper className="w-4 h-4 text-teal-600" />
                    {article.category}
                  </span>
                </div>

                {/* Paragraphs */}
                <div className="space-y-5">
                  {article.content.map((para, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-base text-slate-700 leading-loose"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Key points */}
                {article.bullets.length > 0 && (
                  <div className="rounded-2xl bg-teal-50/60 border border-teal-100 p-5 sm:p-6 space-y-4">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      نکات کلیدی
                    </h3>
                    <div className="space-y-2.5">
                      {article.bullets.map((bullet, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-slate-700 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                          <span className="leading-relaxed">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-700 p-6 sm:p-7 text-white space-y-3">
                  <h3 className="text-lg font-extrabold">برای مشاوره تخصصی وقت بگیرید</h3>
                  <p className="text-sm text-teal-50/90 leading-relaxed">
                    مطالب این مقاله را می‌توانید در یک ویزیت اولیه با متخصصین ما بررسی کنید و بهترین طرح درمان را دریافت نمایید.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => navigate("/contact")}
                      className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-teal-700 text-sm font-bold hover:bg-stone-100 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      رزرو نوبت مشاوره
                    </button>
                    <Link
                      to="/articles"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/25 text-white text-sm font-bold hover:bg-white/20 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      سایر مقالات
                    </Link>
                  </div>
                </div>
              </div>

              {/* Reader comments — the last block inside the article body */}
              <ArticleComments slug={article.slug} articleTitle={article.title} />
            </article>



            {/* ============ Sidebar ============ */}
            <aside className="space-y-6 lg:sticky lg:top-24 self-start min-w-0">
              {/* Search */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4 text-teal-600" />
                  جستجو در مقالات
                </h3>
                <form onSubmit={handleSidebarSearch} className="relative">
                  <input
                    type="search"
                    value={sidebarQuery}
                    onChange={(e) => setSidebarQuery(e.target.value)}
                    placeholder="عبارت مورد نظر…"
                    className="w-full pr-4 pl-9 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition"
                  />
                  {sidebarQuery ? (
                    <button
                      type="button"
                      onClick={() => setSidebarQuery("")}
                      className="cursor-pointer absolute left-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-200 transition-colors"
                      aria-label="پاک کردن"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  )}
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-teal-600" />
                  دسته‌بندی مقالات
                </h3>
                <div className="space-y-1.5">
                  {categories.map((cat) => {
                    const active = cat.name === article.category;
                    return (
                      <Link
                        key={cat.name}
                        to={`/articles?cat=${encodeURIComponent(cat.name)}`}
                        className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          active
                            ? "bg-teal-50 text-teal-700 border border-teal-200"
                            : "text-slate-600 hover:bg-stone-50 border border-transparent"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <ArrowLeft className="w-3.5 h-3.5 text-slate-300" />
                          {cat.name}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-slate-500 font-bold">
                          {cat.count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Recent articles */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  مقالات اخیر
                </h3>
                <div className="space-y-3">
                  {recentArticles.map((item) => (
                    <Link
                      key={item.id}
                      to={`/articles/${item.slug}`}
                      className="group flex items-start gap-3 p-2 rounded-2xl hover:bg-stone-50 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] text-teal-600 font-bold mb-1">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 leading-relaxed line-clamp-2 group-hover:text-teal-700 transition-colors">
                          {item.title}
                        </h4>
                        <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-1">
                          <Clock className="w-3 h-3" />
                          {item.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
