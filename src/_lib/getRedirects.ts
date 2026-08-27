/**
 * Fetches redirect mappings from the backend
 * Supports Strapi-like response shapes:
 * - Array of items
 * - { data: [...] }
 * - { redirects: [...] }
 *
 * Items may be flattened or nested under `attributes`.
 */
export interface RedirectMapping {
  oldUrl: string;
  newUrl: string;
  redirectionType?: number;
}

type RedirectItem = {
  oldUrl?: unknown;
  newUrl?: unknown;
  isActive?: unknown;
  redirectionType?: unknown;
  attributes?: {
    oldUrl?: unknown;
    newUrl?: unknown;
    isActive?: unknown;
    redirectionType?: unknown;
  };
};

function parseRedirectionType(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number.parseInt(value, 10);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function isActiveValue(value: unknown): boolean {
  return value === "true" || value === true;
}

function normalizeRedirectItem(item: RedirectItem): RedirectMapping | null {
  const source = item?.attributes ?? item;
  const oldUrl = source?.oldUrl;
  const newUrl = source?.newUrl;
  const isActive = source?.isActive;

  if (!isActiveValue(isActive)) return null;
  if (typeof oldUrl !== "string" || typeof newUrl !== "string") return null;

  const redirectionType = parseRedirectionType(source?.redirectionType);
  return { oldUrl, newUrl, redirectionType };
}

// In-memory cache to avoid fetching redirects from the CMS on every request
let cachedRedirects: RedirectMapping[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getRedirects(): Promise<RedirectMapping[]> {
  const now = Date.now();
  if (cachedRedirects && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedRedirects;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiToken = process.env.API_TOKEN;
    if (!baseUrl) {
      return [];
    }
    if (!apiToken) {
      return [];
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    };

    const fetchPage = async (
      page: number,
    ): Promise<{ items: RedirectItem[]; meta?: any }> => {
      const endpoint =
        `${baseUrl}/redirects?populate=*` +
        `&pagination[withCount]=true` +
        `&pagination[page]=${page}` +
        `&pagination[pageSize]=100` +
        `&sort=id:asc`;
      const response = await fetch(endpoint, {
        next: { revalidate: 600 }, // increasing revalidate 300 to 600 (10mins)
        headers,
      });
      if (!response.ok) return { items: [] };
      const data = await response.json();

      const items: RedirectItem[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.redirects)
            ? data.redirects
            : [];

      return { items, meta: data?.meta };
    };

    const allItems: RedirectItem[] = [];
    let page = 1;
    let pageCount = 1;
    const MAX_PAGES = 100; // safety cap
    do {
      const { items, meta } = await fetchPage(page);
      allItems.push(...items);
      const pagination = meta?.pagination;
      if (pagination?.pageCount && Number.isFinite(pagination.pageCount)) {
        pageCount = pagination.pageCount;
      } else {
        pageCount = 1;
      }
      page += 1;
    } while (page <= pageCount && page <= MAX_PAGES);

    const normalized = allItems
      .map(normalizeRedirectItem)
      .filter((x): x is RedirectMapping => x !== null);

    cachedRedirects = normalized;
    cacheTimestamp = Date.now();
    return normalized;
  } catch {
    return [];
  }
}
