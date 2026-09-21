import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Sparkles,
  TrendingUp,
  FileText,
  Stethoscope,
  User,
  CornerDownLeft,
} from "lucide-react";
import { searchSite, TRENDING_SEARCHES, type SearchResult } from "../utils/searchEngine";

/**
 * Full-screen, RTL live-search overlay.
 *
 * Results are produced by the in-memory site index (`searchSite`) — the small
 * debounce + skeleton delay is what gives the overlay its AJAX feel without
 * any network dependency.
 */
interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

type KindIcon = React.ElementType;
const KIND_ICON: Record<SearchResult["kind"], KindIcon> = {
  service: Stethoscope,
  doctor: User,
  article: FileText,
};

const KIND_LABEL: Record<SearchResult["kind"], string> = {
  service: "خدمت",
  doctor: "پزشک",
  article: "مقاله",
};

/** Convert Western digits to Persian numerals for display. */
function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  /* ---------------------------- AJAX results ---------------------------- */
  // Live results re-computed on every keystroke against the site index.
  const results = useMemo<SearchResult[]>(() => searchSite(query), [query]);

  // Small debounce on the "searching" indicator for a genuine AJAX feel.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    debounceRef.current = setTimeout(() => setIsSearching(false), 220);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const hasResults = results.length > 0;

  /* ---------------------------- Open / close ---------------------------- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [isOpen]);

  // Fresh state every time the overlay is reopened.
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      setIsSearching(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const closeOverlay = () => {
    document.body.style.overflow = "";
    onClose();
  };

  /* ---------------------------- Navigation ---------------------------- */
  const goToResult = (result: SearchResult) => {
    closeOverlay();
    navigate(result.href);
  };

  /* ---------------------------- Keyboard ---------------------------- */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeOverlay();
      return;
    }

    if (!hasResults) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goToResult(results[activeIndex]);
    }
  };

  // Keep the active row visible while arrowing through results.
  useEffect(() => {
    if (!hasResults || !listRef.current) return;
    const active = listRef.current.querySelector<HTMLElement>(
      `[data-result-index="${activeIndex}"]`,
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, hasResults, results]);

  if (!isOpen) return null;

  /* ---------------------------- Highlight ---------------------------- */
  const renderHighlighted = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const terms = q
      .split(/\s+/)
      .map((t) => t.trim())
      .filter(Boolean);
    if (terms.length === 0) return text;

    const pattern = terms
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    if (!pattern) return text;

    const parts = text.split(new RegExp(`(${pattern})`, "gi"));
    return parts.map((part, i) => {
      if (!part) return null;
      const isMatch = terms.some((t) => t.toLowerCase() === part.toLowerCase());
      return isMatch ? (
        <mark
          key={i}
          className="bg-amber-200/70 text-slate-900 rounded px-0.5 font-bold"
        >
          {part}
        </mark>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      );
    });
  };

  /* ---------------------------- Render ---------------------------- */
  return (
    <div
      className="fixed inset-0 z-[200] flex justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="جستجو در سایت"
      dir="rtl"
    >
      {/* Dimmed backdrop */}
      <div
        onClick={closeOverlay}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-[fadeIn_.18s_ease-out]"
      />

      {/* Search panel */}
      <div className="relative w-full max-w-2xl mt-0 sm:mt-24 h-fit max-h-screen sm:max-h-[calc(100vh-12rem)] flex flex-col bg-white shadow-2xl sm:rounded-3xl overflow-hidden animate-[slideDown_.2s_ease-out]">
        {/* Header: input */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-stone-100">
          {isSearching ? (
            <div className="w-5 h-5 border-2 border-teal-200 border-t-teal-600 rounded-full animate-spin shrink-0" />
          ) : (
            <Search className="w-5 h-5 text-teal-600 shrink-0" />
          )}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="جستجو در خدمات، مقالات، پزشکان و سوالات متداول…"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm sm:text-base text-slate-900 placeholder:text-slate-400"
            autoComplete="off"
            spellCheck={false}
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="پاک کردن عبارت جستجو"
              className="shrink-0 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={closeOverlay}
            aria-label="بستن"
            className="shrink-0 px-2.5 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-stone-100 transition-colors text-xs font-bold hidden sm:block"
          >
            ESC
          </button>
        </div>


        {/* Body */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-2"
        >
          {/* Skeleton loaders while "fetching" */}
          {isSearching &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skel-${i}`}
                className="flex items-center gap-3 p-3 rounded-2xl animate-pulse"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-2/3 rounded-full bg-stone-100" />
                  <div className="h-3 w-1/2 rounded-full bg-stone-100" />
                </div>
              </div>
            ))}

          {/* Empty query → trending searches */}
          {!hasQuery && !isSearching && (
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                جستجوهای پرطرفدار
              </p>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-stone-50 border border-stone-200 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {term}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                می‌توانید در خدمات درمانی، مقالات علمی، پزشکان کلینیک، نمونه‌کارها و
                سوالات متداول جستجو کنید.
              </p>
            </div>
          )}


          {/* Results list */}
          {hasQuery && !isSearching && hasResults && (
            <>
              <p className="text-xs text-slate-400 font-medium px-1">
                {toFaDigits(results.length)} نتیجه برای «{query.trim()}»
              </p>
              {results.map((result, index) => {
                const Icon = KIND_ICON[result.kind];
                const isActive = index === activeIndex;
                return (
                  <button
                    key={`${result.kind}-${result.href}-${index}`}
                    type="button"
                    data-result-index={index}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => goToResult(result)}
                    className={`w-full flex items-start gap-3 p-3 rounded-2xl text-right transition-colors border ${
                      isActive
                        ? "bg-teal-50/70 border-teal-200"
                        : "bg-white border-transparent hover:bg-stone-50"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-teal-100 text-teal-700"
                          : "bg-stone-100 text-slate-500"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-slate-900 truncate">
                        {renderHighlighted(result.title)}
                      </span>
                      {result.snippet && (
                        <span className="block text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                          {renderHighlighted(result.snippet)}
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-stone-100 px-2 py-1 rounded-full shrink-0">
                      {KIND_LABEL[result.kind]}
                    </span>
                  </button>
                );
              })}
            </>
          )}

          {/* No results */}
          {hasQuery && !isSearching && !hasResults && (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-100 flex items-center justify-center">
                <Search className="w-7 h-7 text-slate-300" />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-bold text-slate-800">
                  نتیجه‌ای برای «{query.trim()}» پیدا نشد
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  املا را بررسی کنید یا با کلمات کلیدی دیگری مثل «لمینت»،
                  «ایمپلنت» یا «بلیچینگ» امتحان کنید.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center pt-1">
                {TRENDING_SEARCHES.slice(0, 3).map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="px-3.5 py-2 rounded-full bg-stone-50 border border-stone-200 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-stone-100 bg-stone-50/60">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <CornerDownLeft className="w-3.5 h-3.5" />
            برای باز کردن نتیجه Enter بزنید
          </span>
          <span className="text-[11px] text-slate-400">
            پیمایش با کلیدهای بالا و پایین
          </span>
        </div>
      </div>
    </div>
  );
};
