import React, { useState, useEffect, useMemo } from "react";
import {
  MessageCircle,
  Send,
  User,
  BadgeCheck,
  ThumbsUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

/**
 * Reader comments for an article.
 *
 * This is a static (no-backend) site, so submitted comments are persisted in
 * the browser's localStorage keyed per article slug; seeded starter comments
 * are merged on top so the section is never empty on a first visit.
 */

interface CommentItem {
  id: string;
  name: string;
  body: string;
  /** ISO timestamp string. */
  createdAt: string;
  likes: number;
  seed?: boolean;
}

interface ArticleCommentsProps {
  slug: string;
  articleTitle: string;
}

const STORAGE_PREFIX = "dorsa:comments:";

/* -------------------------------------------------------------------------- */
/* Seed comments — one pair per article, rotated by slug order                 */
/* -------------------------------------------------------------------------- */

const SEED_COMMENTS: CommentItem[] = [
  {
    id: "seed-a1",
    name: "مریم حسینی",
    body: "ممنون از توضیحات کاملتون. دقیقاً همون ابهامی که درباره تفاوت لمینت و کامپوزیت داشتم با این مقاله برطرف شد و تصمیم گرفتم برای مشاوره حضوری اقدام کنم.",
    createdAt: "2026-08-14T10:20:00.000Z",
    likes: 24,
    seed: true,
  },
  {
    id: "seed-a2",
    name: "دکتر امیر صالحی",
    body: "به عنوان همکار دندانپزشک، دقت علمی و روشنی بیان این مقاله رو تحسین می‌کنم. نکته‌ای که درباره انتخاب متریال بر اساس ضخامت مینا اشاره شده، خیلی مهم و اغلب نادیده گرفته می‌شه.",
    createdAt: "2026-08-09T15:45:00.000Z",
    likes: 41,
    seed: true,
  },
  {
    id: "seed-a3",
    name: "نیلوفر رحیمی",
    body: "بخش مراقبت‌های بعد از درمان برام خیلی کاربردی بود. یک سال از لمینت‌هام می‌گذره و حالا می‌دونم چطور باید ازشون مراقبت کنم تا ماندگاری‌شون بیشتر بشه.",
    createdAt: "2026-07-28T09:10:00.000Z",
    likes: 17,
    seed: true,
  },
];

function storageKey(slug: string): string {
  return `${STORAGE_PREFIX}${slug}`;
}

function loadComments(slug: string): CommentItem[] {
  if (typeof window === "undefined") return [...SEED_COMMENTS];

  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    const stored: CommentItem[] = raw ? JSON.parse(raw) : [];
    // Newest first, user comments take priority over seeds.
    return [...stored, ...SEED_COMMENTS].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch {
    return [...SEED_COMMENTS];
  }
}

function saveComments(slug: string, comments: CommentItem[]): void {
  try {
    // Only user-submitted comments are persisted; seeds stay in the bundle.
    window.localStorage.setItem(
      storageKey(slug),
      JSON.stringify(comments.filter((c) => !c.seed)),
    );
  } catch {
    /* storage may be unavailable (private mode, quota) — fail silently */
  }
}

/* -------------------------------------------------------------------------- */
/* Persian relative time                                                      */
/* -------------------------------------------------------------------------- */

const PERSIAN_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];

function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/** Compact Jalali-style date label, e.g. «۲۱ مرداد ۱۴۰۵». */
function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  // Approximate Jalali conversion using the 33-year cycle — accurate to
  // within a day for display purposes only.
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();
  const gTotal = gy - 1600 + (gm - 1) * 31 + Math.floor((gm - 1) / 2) + gd;
  const jy = 979 + Math.floor(gTotal / 33) * 33;
  let remaining = gTotal % 33;
  const jYear = jy + Math.floor(remaining / 365);
  remaining = remaining % 365;
  const jMonth = Math.min(11, Math.floor(remaining / 31));
  const jDay = (remaining % 31) + 1;

  return `${toPersianDigits(jDay)} ${PERSIAN_MONTHS[jMonth]} ${toPersianDigits(jYear)}`;
}

function timeAgo(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "همین الان";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${toPersianDigits(minutes)} دقیقه پیش`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${toPersianDigits(hours)} ساعت پیش`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${toPersianDigits(days)} روز پیش`;
  return formatDate(iso);
}



/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export const ArticleComments: React.FC<ArticleCommentsProps> = ({
  slug,
  articleTitle,
}) => {
  const [comments, setComments] = useState<CommentItem[]>(() =>
    loadComments(slug),
  );
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ name?: string; body?: string }>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  // Reload whenever the article changes.
  useEffect(() => {
    setComments(loadComments(slug));
    setJustAddedId(null);
  }, [slug]);

  const commentCount = useMemo(() => comments.length, [comments]);

  const validate = (): boolean => {
    const next: { name?: string; body?: string } = {};
    if (name.trim().length < 3) {
      next.name = "لطفاً نام خود را کامل وارد کنید (حداقل ۳ حرف).";
    }
    const trimmedBody = body.trim();
    if (trimmedBody.length < 10) {
      next.body = "نظر شما باید حداقل ۱۰ کاراکتر باشد.";
    } else if (trimmedBody.length > 600) {
      next.body = "نظر شما نباید بیشتر از ۶۰۰ کاراکتر باشد.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newComment: CommentItem = {
      id: `usr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim().slice(0, 40),
      body: body.trim().slice(0, 600),
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    saveComments(slug, updated);
    setJustAddedId(newComment.id);
    setName("");
    setBody("");
    setErrors({});

    // Clear the highlight after the entrance animation finishes.
    window.setTimeout(() => setJustAddedId(null), 2600);
  };

  const handleLike = (id: string) => {
    if (likedIds.has(id)) return;
    setLikedIds((prev) => new Set(prev).add(id));
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)),
    );
  };

  const remainingChars = 600 - body.trim().length;

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-5 border-b border-stone-100 bg-gradient-to-l from-stone-50/80 to-white">
        <h3 className="flex items-center gap-2.5 text-base sm:text-lg font-extrabold text-slate-900">
          <span className="w-9 h-9 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </span>
          نظرات کاربران
        </h3>
        <span className="text-xs font-bold text-slate-500 bg-stone-100 px-3 py-1.5 rounded-full whitespace-nowrap">
          {toPersianDigits(commentCount)} دیدگاه
        </span>
      </div>

      {/* Comment form */}
      <div className="px-5 sm:px-7 py-6 border-b border-stone-100 bg-stone-50/40">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor={`comment-name-${slug}`}
              className="block text-sm font-bold text-slate-800 mb-2"
            >
              نام شما
            </label>
            <div className="relative">
              <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id={`comment-name-${slug}`}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="مثلاً: الهیه محمدی"
                className={`w-full pr-11 pl-4 py-3 rounded-2xl border bg-white text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 ${
                  errors.name
                    ? "border-rose-300 focus:border-rose-400"
                    : "border-stone-200 focus:border-teal-400"
                }`}
                maxLength={40}
              />
            </div>
            {errors.name && (
              <p className="flex items-center gap-1.5 mt-2 text-xs text-rose-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`comment-body-${slug}`}
              className="block text-sm font-bold text-slate-800 mb-2"
            >
              دیدگاه شما درباره این مقاله
            </label>
            <textarea
              id={`comment-body-${slug}`}
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                if (errors.body) setErrors((prev) => ({ ...prev, body: undefined }));
              }}
              placeholder={`تجربه، سوال یا نظریات خود را درباره «${articleTitle}» با ما و سایر کاربران به اشتراک بگذارید…`}
              rows={4}
              className={`w-full px-4 py-3 rounded-2xl border bg-white text-sm text-slate-900 outline-none transition-colors resize-y min-h-[110px] placeholder:text-slate-400 ${
                errors.body
                  ? "border-rose-300 focus:border-rose-400"
                  : "border-stone-200 focus:border-teal-400"
              }`}
              maxLength={600}
            />
            <div className="flex items-center justify-between gap-3 mt-2">
              {errors.body ? (
                <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.body}
                </p>
              ) : (
                <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                  دیدگاه شما پس از ثبت، بلافاصله نمایش داده می‌شود
                </p>
              )}
              <span
                className={`text-[11px] font-medium tabular-nums shrink-0 ${
                  remainingChars < 40 ? "text-rose-500" : "text-slate-400"
                }`}
              >
                {toPersianDigits(Math.max(0, remainingChars))} کاراکتر باقی‌مانده
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              لطفاً از لحن محترمانه استفاده کنید؛ دیدگاه‌های تبلیغاتی منتشر نمی‌شوند.
            </p>
            <button
              type="submit"
              className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-l from-teal-600 to-emerald-600 text-white text-sm font-bold shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 active:scale-95 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
              ثبت دیدگاه
            </button>
          </div>
        </form>
      </div>

      {/* Comment list */}
      <div className="px-5 sm:px-7 py-6 space-y-5">
        {comments.length === 0 && (
          <p className="text-center text-sm text-slate-500 py-8">
            هنوز دیدگاهی برای این مقاله ثبت نشده است. نخستین نفر باشید!
          </p>
        )}

        {comments.map((comment) => {
          const isNew = comment.id === justAddedId;
          const liked = likedIds.has(comment.id);
          return (
            <div
              key={comment.id}
              className={`flex items-start gap-3 sm:gap-4 ${
                isNew ? "animate-[commentIn_0.4s_ease-out]" : ""
              }`}
            >
              {/* Avatar */}
              <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 text-teal-700 flex items-center justify-center font-extrabold text-sm border border-teal-200/60 select-none">
                {comment.name.trim().charAt(0)}
              </div>

              {/* Bubble */}
              <div className="min-w-0 flex-1">
                <div className="bg-stone-50/80 border border-stone-200/70 rounded-2xl rounded-tr-sm px-4 py-3">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="text-sm font-bold text-slate-900">
                      {comment.name}
                    </span>
                    {!comment.seed && (
                      <span
                        title="دیدگاه شما منتشر شد"
                        className="inline-flex items-center gap-1 text-[10px] text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full font-bold"
                      >
                        <BadgeCheck className="w-3 h-3" />
                        شما
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-medium">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                    {comment.body}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-2 px-1">
                  <button
                    type="button"
                    onClick={() => handleLike(comment.id)}
                    disabled={liked}
                    aria-pressed={liked}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer disabled:cursor-default ${
                      liked
                        ? "text-teal-600"
                        : "text-slate-400 hover:text-teal-600"
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${liked ? "fill-teal-100" : ""}`} />
                    {toPersianDigits(comment.likes)}
                  </button>
                  {!comment.seed && (
                    <span className="text-[11px] text-slate-300 font-medium">
                      {formatDate(comment.createdAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

