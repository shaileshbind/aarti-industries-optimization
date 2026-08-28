"use client";
import { useEffect, useState, useRef } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fetchNews } from "@/_lib/fetchNews";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type TickerItem = {
  heading?: string;
  link?: string | null;
  date?: string | null;
  file?: string | null;
};

function flattenPressReleases(
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

function getLatestYearTop3(flat: TickerItem[]): {
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

type StockData = {
  id: number;
  symbol: string;
  ltp: number;
  change: number;
  changePercent: number;
  changeDirection: "up" | "down" | "neutral";
};

export default function StockTicker() {
  const [pressReleases, setPressReleases] = useState<TickerItem[]>([]);
  const [nseStock, setNseStock] = useState<StockData | null>(null);
  // const [bseStock, setBseStock] = useState<StockData | null>(null);
  const isProductionEnv = process.env.NEXT_PUBLIC_IS_PRODUCTION === "true";

  const signalRef = useRef<AbortController>(new AbortController());
  const firstRequest = useRef(true);
  const promiseStateRef = useRef<"pending" | "fulfilled" | "rejected">(
    "pending",
  );

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews("/api/press");
      const flat = flattenPressReleases(data);
      const { entries } = getLatestYearTop3(flat);
      setPressReleases(entries);
    };
    // fetch() defaults to High priority, so firing this on mount put a ~128KB
    // response straight into the LCP window. The ticker is not first paint,
    // so wait for an idle slot instead.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => loadNews(), { timeout: 3000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(loadNews, 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isProductionEnv) return;

    const loadStockData = async () => {
      promiseStateRef.current = "pending";
      try {
        // ===== NSE DATA =====
        const stockDataResponse = await fetch("/api/stock-data", {
          cache: "no-store",
          signal: signalRef.current.signal,
        });

        // Check if response is ok before parsing JSON
        if (!stockDataResponse.ok) {
          const errorData = await stockDataResponse.json().catch(() => ({}));
          console.error("Stock data API error:", {
            status: stockDataResponse.status,
            statusText: stockDataResponse.statusText,
            error: errorData,
          });
          promiseStateRef.current = "rejected";
          return; // Silently fail - don't show error to users
        }

        const nseData = await stockDataResponse.json();
        promiseStateRef.current = "fulfilled";

        // Handle API response structure: { success: true, data: [...] }
        if (
          nseData?.success &&
          nseData?.data &&
          Array.isArray(nseData.data) &&
          nseData.data.length > 0
        ) {
          const stock = nseData.data[0];

          // Determine the previous day's closing price for change calculation
          // Always use the latest data from the API response
          let previousClose: number | null = null;

          // Strategy 1: Check rawData first - it often contains the actual previous close
          if (stock.rawData) {
            const rawClose = stock.rawData.closePrice;
            if (
              rawClose &&
              typeof rawClose === "number" &&
              rawClose !== stock.ltp
            ) {
              previousClose = rawClose;
            } else if (
              stock.rawData.indicativeClosePrice &&
              typeof stock.rawData.indicativeClosePrice === "number" &&
              stock.rawData.indicativeClosePrice !== stock.ltp
            ) {
              previousClose = stock.rawData.indicativeClosePrice;
            }
          }

          // Strategy 2: Use top-level closePrice if it's different from ltp
          if (
            previousClose === null &&
            stock.closePrice &&
            stock.closePrice !== stock.ltp
          ) {
            previousClose = stock.closePrice;
          }

          // Strategy 3: Use openPrice as fallback
          if (
            previousClose === null &&
            stock.openPrice &&
            stock.openPrice !== stock.ltp &&
            Math.abs(stock.openPrice - stock.ltp) > 0.01
          ) {
            previousClose = stock.openPrice;
          }

          // Calculate change and changePercent from previous close using latest ltp
          const change = previousClose !== null ? stock.ltp - previousClose : 0;
          const changePercent =
            previousClose !== null && previousClose !== 0
              ? (change / previousClose) * 100
              : 0;

          // Determine direction
          const changeDirection: "up" | "down" | "neutral" =
            change > 0.01 ? "up" : change < -0.01 ? "down" : "neutral";

          const stockData: StockData = {
            id: stock.id,
            symbol: stock.symbol,
            ltp: stock.ltp,
            change: change,
            changePercent: changePercent,
            changeDirection: changeDirection,
          };

          setNseStock(stockData);
        }

        // ===== BSE DATA =====
        // TODO: Replace with actual API call when BSE endpoint is available
        // const bseResponse = await fetch('/api/bse-stock');
        // const bseData: ApiResponse = await bseResponse.json();
        // if (bseData.success && bseData.data.length > 0) {
        //   setBseStock(bseData.data[0]);
        // }
      } catch (error) {
        console.error("Error loading stock data:", error);
        promiseStateRef.current = "rejected";
      }
    };

    if (firstRequest.current) {
      firstRequest.current = false;
      promiseStateRef.current = "pending";
      loadStockData();
    }

    const interval = setInterval(() => {
      const state = promiseStateRef.current;
      if (state === "fulfilled" || state === "rejected") {
        promiseStateRef.current = "pending";
        loadStockData();
      } else if (state === "pending") {
        signalRef.current.abort();
        signalRef.current = new AbortController();
        loadStockData();
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      signalRef.current.abort();
    };
  }, []);

  const hasPressItems = pressReleases.some(
    (item) => item?.heading && item?.link,
  );
  const hasMarqueeContent = Boolean(nseStock) || hasPressItems;
  const marqueeRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rowEl = rowRef.current;
    const marqueeEl = marqueeRef.current;
    const windowWidth = window.innerWidth;
    if (!hasMarqueeContent || !rowEl || !marqueeEl) {
      marqueeEl?.style.setProperty("--marquee-width", "0px");
      marqueeEl?.style.setProperty("--window-width", "0px");
      return;
    }
    const updateWidth = () => {
      const width = rowEl.scrollWidth;
      marqueeEl.style.setProperty("--marquee-width", `${width}px`);
      marqueeEl.style.setProperty("--window-width", `${windowWidth}px`);
    };
    const rafId = requestAnimationFrame(() => {
      updateWidth();
    });
    const observer = new ResizeObserver(updateWidth);
    observer.observe(rowEl);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [hasMarqueeContent, nseStock, pressReleases]);

  const MarqueeRow = ({
    nseStock,
    pressReleases,
    renderStock,
    isDuplicate = false,
  }: {
    nseStock: StockData | null;
    pressReleases: TickerItem[];
    renderStock: (s: StockData, exchange: string) => React.ReactNode;
    isDuplicate?: boolean;
  }) => (
    <div className="flex items-center gap-[110px] shrink-0 w-max">
      {nseStock && (
        <div className="flex gap-[60px] shrink-0">
          {renderStock(nseStock, "NSE")}
        </div>
      )}
      {pressReleases.some((item) => item?.heading && item?.link) && (
        <div className="flex gap-[110px] items-center shrink-0 flex-nowrap">
          {pressReleases.slice(0, 3).map((item) => {
            if (!item?.heading) return null;
            return (
              <a
                href={
                  item.link ? `/press-releases/${item.link}` : item.file || "#"
                }
                className="text-sm text-[#FFF] shrink-0 whitespace-nowrap inline-flex items-center"
                key={
                  isDuplicate
                    ? `dup-${item.link + (item.date ?? "")}`
                    : item.link + (item.date ?? "")
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.heading}
                <ArrowForwardIcon
                  className="rotate-325 ml-1 shrink-0"
                  fontSize="small"
                />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderStock = (stock: StockData, exchange: string) => {
    const changeColor =
      stock?.changeDirection === "up"
        ? "#06FF2E"
        : stock?.changeDirection === "down"
          ? "#FF2A2D"
          : "#FFFFFF";

    const arrowRotation =
      stock?.changeDirection === "up"
        ? "-rotate-90"
        : stock?.changeDirection === "down"
          ? "rotate-90"
          : "rotate-0";

    const changeSign = stock?.change > 0 ? "+" : "";
    const percentSign = stock?.changePercent > 0 ? "+" : "";

    return (
      <div className="flex gap-4 shrink-0 whitespace-nowrap">
        <p className="text-[#FFFFFF] text-sm font-roboto">
          {exchange}: {stock?.symbol}
        </p>

        <p style={{ color: changeColor }} className="text-sm font-roboto">
          {stock?.ltp?.toFixed(2)}
          <PlayArrowIcon className={arrowRotation} />
          {changeSign}
          {stock?.change?.toFixed(2)} ({percentSign}
          {stock?.changePercent.toFixed(2)}%)
        </p>
      </div>
    );
  };

  return (
    <div className="bg-[#10456A] h-[45px] py-[6px] lg:py-[10px] overflow-hidden absolute w-full bottom-full flex items-center left-0 z-50">
      <div
        ref={marqueeRef}
        className={`marquee  ${hasMarqueeContent ? "marquee--active" : "marquee--idle"}`}
      >
        <div
          ref={rowRef}
          className="stock-ticker-row flex items-center gap-[110px] shrink-0 w-max pr-[110px] min-h-[45px]  pt-[4px] lg:pt-0"
        >
          <MarqueeRow
            nseStock={nseStock}
            pressReleases={pressReleases}
            renderStock={renderStock}
          />
        </div>
        {/* Second copy */}
        <div className="stock-ticker-row flex items-center gap-[110px] shrink-0 w-max pr-[110px] min-h-[45px] pt-[4px] lg:pt-0">
          <MarqueeRow
            nseStock={nseStock}
            pressReleases={pressReleases}
            renderStock={renderStock}
            isDuplicate
          />
        </div>
      </div>
    </div>
  );
}
