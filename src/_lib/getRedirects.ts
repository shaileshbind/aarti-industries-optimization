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

export async function getRedirects(): Promise<RedirectMapping[]> {
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

    const fetchPage = async (page: number): Promise<{ items: RedirectItem[]; meta?: any }> => {
      const endpoint =
        `${baseUrl}/redirects?populate=*` +
        `&pagination[withCount]=true` +
        `&pagination[page]=${page}` +
        `&pagination[pageSize]=100` +
        `&sort=id:asc`;
      const response = await fetch(endpoint, { cache: "no-store", headers });
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
        // If meta pagination is missing, assume single page.
        pageCount = 1;
      }
      page += 1;
    } while (page <= pageCount && page <= MAX_PAGES);

    const normalized = allItems
      .map(normalizeRedirectItem)
      .filter((x): x is RedirectMapping => x !== null);

    return normalized;
  } catch {
    return [];
  }
}
