import {
  SERVICES,
  DOCTORS,
  ARTICLES,
} from "../data/dentistryData";

/**
 * Unified site-wide search engine.
 *
 * It builds a normalized index over every meaningful piece of content
 * (services, doctors and articles) once and then
 * answers free-text queries against it in real time — which is what powers
 * the "as-you-type" AJAX search in the header overlay.
 */

export type SearchResultKind = "service" | "doctor" | "article";

export interface SearchResult {
  id: string;
  kind: SearchResultKind;
  title: string;
  snippet: string;
  /** Router link the result navigates to. */
  href: string;
  /** Small label shown next to the result, e.g. "خدمات" or the article category. */
  badge: string;
}

interface IndexedItem extends SearchResult {
  /** Normalized title — matched with a higher weight. */
  titleNorm: string;
  /** Normalized full text — used for body matches. */
  haystack: string;
}

/* -------------------------------------------------------------------------- */
/* Persian text normalization                                                 */
/* -------------------------------------------------------------------------- */

const CHAR_MAP: Record<string, string> = {
  "ك": "ک",
  "ي": "ی",
  "أ": "ا",
  "إ": "ا",
  "آ": "ا",
  "ة": "ه",
  "٬": "ه",
  "ؤ": "و",
  "ئ": "ی",
};

/**
 * Levels the playing field between user input and content:
 * Arabic/Yeh variants → Persian, ZWNJ → space, punctuation stripped,
 * repeated whitespace collapsed, lower-cased.
 */
export function normalizeFa(input: string): string {
  let text = input.replace(/[كيأإآة٬ؤئ]/g, (m) => CHAR_MAP[m] ?? m);
  text = text.replace(/\u200c/g, " ");
  text = text.replace(/[^\u0600-\u06FF\uFB50-\uFDFF0-9A-Za-z\s]/g, " ");
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

/** Common Persian filler words — never used as scoring terms. */
const STOPWORDS = new Set<string>([
  "در", "و", "از", "با", "به", "است", "که", "را", "این", "برای", "تا", "یا",
  "هم", "ولی", "اما", "چون", "اگر", "ما", "شما", "آن", "های", "هر", "یک",
  "دو", "سه", "باید", "تواند", "شود", "شده", "کرد", "کردن", "نه", "بلکه",
  "وقتی", "هست", "هستند", "جز", "چه", "چگونه", "چقدر", "می", "بر", "پس",
  "بی", "باشد", "بود", "بودن", "ای", "اون", "اونا", "من", "تو", "ایشان",
]);



/* -------------------------------------------------------------------------- */
/* Index construction (memoized)                                              */
/* -------------------------------------------------------------------------- */

let cachedIndex: IndexedItem[] | null = null;

function buildIndex(): IndexedItem[] {
  const items: IndexedItem[] = [];

  SERVICES.forEach((service) => {
    const body = [
      service.enTitle,
      service.shortDesc,
      service.fullDesc,
      service.features.join(" "),
      service.badge,
    ].join(" ");
    items.push({
      id: `svc-${service.id}`,
      kind: "service",
      title: service.title,
      snippet: service.shortDesc,
      href: "/services",
      badge: "خدمات کلینیک",
      titleNorm: normalizeFa(service.title),
      haystack: normalizeFa(`${service.title} ${body}`),
    });
  });

  DOCTORS.forEach((doctor) => {
    items.push({
      id: `doc-${doctor.id}`,
      kind: "doctor",
      title: doctor.name,
      snippet: `${doctor.title} • ${doctor.specialty}`,
      href: "/doctors",
      badge: "پزشکان",
      titleNorm: normalizeFa(doctor.name),
      haystack: normalizeFa(
        `${doctor.name} ${doctor.title} ${doctor.specialty} ${doctor.education.join(" ")}`,
      ),
    });
  });

  ARTICLES.forEach((article) => {
    items.push({
      id: `art-${article.id}`,
      kind: "article",
      title: article.title,
      snippet: article.excerpt,
      href: `/articles/${article.slug}`,
      badge: article.category,
      titleNorm: normalizeFa(article.title),
      haystack: normalizeFa(
        `${article.title} ${article.category} ${article.excerpt} ${article.content.join(" ")} ${article.bullets.join(" ")}`,
      ),
    });
  });

  return items;
}

export function getIndex(): IndexedItem[] {
  if (!cachedIndex) {
    cachedIndex = buildIndex();
  }
  return cachedIndex;
}

/* -------------------------------------------------------------------------- */
/* Scoring & querying                                                         */
/* -------------------------------------------------------------------------- */

const TITLE_WEIGHT = 6;
const BODY_WEIGHT = 1;

/**
 * AJAX query — takes the raw text the user has typed so far and returns
 * matching content sorted by relevance. Empty / stopword-only queries
 * return an empty list (the overlay shows suggestions instead).
 */
export function searchSite(rawQuery: string, limit = 14): SearchResult[] {
  const query = normalizeFa(rawQuery);
  const terms = query
    .split(" ")
    .filter((term) => term.length > 1 && !STOPWORDS.has(term));

  if (terms.length === 0) return [];

  const index = getIndex();
  const scored: { item: IndexedItem; score: number }[] = [];

  for (const item of index) {
    let score = 0;

    for (const term of terms) {
      // Exact title match is worth the most, then a title "contains".
      if (item.titleNorm === term) {
        score += TITLE_WEIGHT * 3;
      } else if (item.titleNorm.includes(term)) {
        score += TITLE_WEIGHT;
      }

      if (item.haystack.includes(term)) {
        score += BODY_WEIGHT;
      }
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.title.localeCompare(b.item.title, "fa");
    })
    .slice(0, limit)
    .map((entry) => {
      // Strip the internal indexing fields before handing to the UI.
      const { titleNorm, haystack, ...publicFields } = entry.item;
      void titleNorm;
      void haystack;
      return publicFields;
    });
}

/**
 * Short list of trending terms used to fill the overlay before the user
 * starts typing, so the search box never feels empty.
 */
export const TRENDING_SEARCHES = [
  "لمینت سرامیکی",
  "ایمپلنت دیجیتال",
  "طراحی لبخند",
  "کامپوزیت ونیر",
  "سفیدکردن دندان",
  "الاینر شفاف",
];
