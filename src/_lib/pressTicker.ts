import { getDisclosureData } from "./getDisclosureData.fetch";

export type TickerItem = {
  heading?: string;
  link?: string | null;
  date?: string | null;
  file?: string | null;
};

export function flattenPressReleases(
  data: Record<string, { items?: unknown[] }> | null,
): TickerItem[] {
  if (!data || typeof data !== "object") return [];
  const flat: TickerItem[] = [];
  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a)); // newest first
  for (const year of years) {
    const yearData = data[year];
    const items = yearData?.items;
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      const report = (item as { report?: unknown[] })?.report;
      if (!Array.isArray(report)) continue;
      for (const quarter of report) {
        const entries = (quarter as { report?: unknown[] })?.report;
        if (!Array.isArray(entries)) continue;
        for (const entry of entries) {
          const e = entry as {
            heading?: string;
            link?: string | null;
            date?: string | null;
            file?: { url?: string };
          };
          const link = e?.link ?? null;
          if (e?.heading)
            flat.push({
              heading: e.heading,
              link: link ?? null,
              date: e?.date ?? null,
              file: e?.file?.url ?? null,
            });
        }
      }
    }
  }
  return flat;
}

export function getLatestYearTop3(flat: TickerItem[]): {
  latestYear: number | null;
  entries: TickerItem[];
} {
  const withDate = flat.filter((e) => e?.date);
  if (withDate.length === 0) return { latestYear: null, entries: [] };
  const latestYear = Math.max(
    ...withDate.map((e) => new Date(e.date!).getFullYear()),
  );
  const sortedByDate = [...withDate].sort((a, b) => {
    const tA = new Date(a.date!).getTime();
    const tB = new Date(b.date!).getTime();
    return tB - tA;
  });
  return { latestYear, entries: sortedByDate.slice(0, 3) };
}

/**
 * Server-side: the header ticker used to fetch /api/press (~128KB raw) after
 * hydration and reduce it to three headlines in the browser. Reducing it here
 * puts three tiny items in the RSC payload instead, and the ticker renders
 * with content on first paint (no layout shift when it arrives).
 */
export async function getPressTickerItems(): Promise<TickerItem[]> {
  const data = await getDisclosureData("/press-releases");
  return getLatestYearTop3(flattenPressReleases(data)).entries;
}
