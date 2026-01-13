"use client";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { fetchNews } from "@/_lib/fetchNews";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type ItemProps = {
  id?: string;
  heading?: string;
  slug?: string;
};

type StockData = {
  id: number;
  symbol: string;
  ltp: number;
  change: number;
  changePercent: number;
  changeDirection: "up" | "down" | "neutral";
};

export default function StockTicker() {
  const [pressReleases, setPressReleases] = useState<ItemProps[][]>([]);
  const [nseStock, setNseStock] = useState<StockData | null>(null);
  // const [bseStock, setBseStock] = useState<StockData | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews("/api/press");
      setPressReleases(Object.values(data));
    };
    loadNews();
  }, []);

  useEffect(() => {
    const loadStockData = async () => {
      try {
        // ===== NSE DATA =====
        const nseResponse = await fetch("/api/nse-stock", {
          cache: "no-store",
        });
        const nseData = await nseResponse.json();
        // console.log("nseData", nseData)

        // Handle API response structure: { success: true, data: [...] }
        if (nseData?.success && nseData?.data && Array.isArray(nseData.data) && nseData.data.length > 0) {
          const stock = nseData.data[0];

          // Determine the previous day's closing price for change calculation
          // Always use the latest data from the API response
          let previousClose: number | null = null;

          // Strategy 1: Check rawData first - it often contains the actual previous close
          if (stock.rawData) {
            const rawClose = stock.rawData.closePrice;
            if (rawClose && typeof rawClose === 'number' && rawClose !== stock.ltp) {
              previousClose = rawClose;
            } else if (stock.rawData.indicativeClosePrice &&
              typeof stock.rawData.indicativeClosePrice === 'number' &&
              stock.rawData.indicativeClosePrice !== stock.ltp) {
              previousClose = stock.rawData.indicativeClosePrice;
            }
          }

          // Strategy 2: Use top-level closePrice if it's different from ltp
          if (previousClose === null && stock.closePrice && stock.closePrice !== stock.ltp) {
            previousClose = stock.closePrice;
          }

          // Strategy 3: Use openPrice as fallback
          if (previousClose === null && stock.openPrice &&
            stock.openPrice !== stock.ltp &&
            Math.abs(stock.openPrice - stock.ltp) > 0.01) {
            previousClose = stock.openPrice;
          }

          // Calculate change and changePercent from previous close using latest ltp
          const change = previousClose !== null ? stock.ltp - previousClose : 0;
          const changePercent = previousClose !== null && previousClose !== 0
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
      }
    };

    loadStockData();

    // Optional: Set up polling for real-time updates
    const interval = setInterval(loadStockData, 60000);
    return () => clearInterval(interval);
  }, []);

  const tickerData = pressReleases?.[0];

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
      <div className="flex gap-4">
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
    <div className="bg-[#10456A] min-h-[45px] py-[6px] lg:py-[10px] overflow-hidden fixed w-full top-0 left-0 z-50">
      <div className="marquee">
        <div className="container lg:mx-auto flex items-center gap-[110px]">
          <div className="flex gap-[60px]">
            {nseStock && renderStock(nseStock, "NSE")}
            {/* {bseStock && renderStock(bseStock, "BSE")} */}
          </div>

          {/* News */}
          <div className="flex gap-[110px] items-center">
            {tickerData?.slice(0, 3)?.map((item: ItemProps) => {
              if (!item?.slug) return null;
              return (
                <Link
                  href={`/press-releases/${item?.slug}`}
                  className="text-sm text-[#FFF]"
                  key={item.id}
                  target="_blank"
                >
                  {item?.heading}
                  <ArrowForwardIcon
                    className="rotate-325 ml-1"
                    fontSize="small"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}