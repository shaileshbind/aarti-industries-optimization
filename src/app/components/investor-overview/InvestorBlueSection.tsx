"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BodyText2, Cta, H2, SubH3 } from "../Typography2";
import Image from "next/image";
import { InvestorsBlueProps } from "@/app/types/investor-overview.type";
import { FadeInReveal } from "../ScrollReveal";

type StockData = {
  id: number;
  symbol: string;
  ltp: number;
  change: number;
  changePercent: number;
};

const InvestorBlueSection = ({ data }: InvestorsBlueProps) => {
  const { reports } = data;
  const nseRef = useRef<HTMLDivElement>(null);
  const [nseStock, setNseStock] = useState<StockData | null>(null);

  useEffect(() => {
    const loadStockData = async () => {
      try {
        const nseResponse = await fetch("/api/nse-stock", {
          cache: "no-store",
        });
        const nseData = await nseResponse.json();

        // Handle API response structure: { success: true, data: [...] }
        if (nseData?.success && nseData?.data && Array.isArray(nseData.data) && nseData.data.length > 0) {
          const stock = nseData.data[0];

          // Determine the previous day's closing price for change calculation
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

          const stockData: StockData = {
            id: stock.id,
            symbol: stock.symbol,
            ltp: stock.ltp,
            change: change,
            changePercent: changePercent,
          };

          setNseStock(stockData);
        }
      } catch (error) {
        console.error("Error loading stock data:", error);
      }
    };

    loadStockData();

    // Set up polling for real-time updates (every 60 seconds)
    const interval = setInterval(loadStockData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Format change display
  const formatChange = (change: number, changePercent: number) => {
    const changeSign = change > 0 ? "+" : "";
    const percentSign = changePercent > 0 ? "+" : "";
    return `${changeSign}${change.toFixed(2)} (${percentSign}${changePercent.toFixed(2)}%)`;
  };

  return (
    <div className="bg-blue-200">
      <div className="container">
        <FadeInReveal className={`py-[24px] lg:py-[40px] grid ${nseStock ? 'xl:grid-cols-[70%_30%]' : ''} gap-y-[40px] gap-x-[100px]`}>
          <div className="grid lg:grid-cols-2 gap-x-[10px] lg:gap-x-[50px] gap-y-[16px] lg:gap-y-[10px] xl:justify-between ">
          {reports?.map((items) => {
            const url = items?.file?.url ?? items?.link;
            return (
              <div
                key={items?.id}
                className="flex gap-x-[12px] xl:gap-x-[30px] justify-between pb-4 border-b border-b-white/10"
              >
                <Cta className="bg-transparent text-white text-[14px] lg:text-[16px] ">
                  {items?.heading}
                </Cta>
                {url && (
                  <Link
                    href={url}
                    target="_blank"
                    className="flex gap-x-[12px] items-center cursor-pointer "
                  >
                    <Image
                      src="/images/arrow-white-top-r.svg"
                      alt="icon"
                      width={30}
                      height={30}
                      className="hidden lg:block"
                    />
                    <Image
                      src="/images/arrow-white-top-r.svg"
                      alt="icon"
                      width={24}
                      height={24}
                      className="block lg:hidden"
                    />
                  </Link>
                )}
              </div>
            );
          })}
          </div>
          {nseStock && (
            <div className="flex gap-x-[40px] lg:gap-x-[50px] justify-between ">
              <div ref={nseRef}>
                <BodyText2 className="text-white">NSE</BodyText2>
                <div className="flex gap-x-[10px] items-end">
                  <H2 className="text-white">
                    {nseStock.ltp.toFixed(2)}
                  </H2>
                  <SubH3 className="text-white !text-[16px] lg:!text-[18px] mb-[5px]">
                    INR
                  </SubH3>
                </div>
                <BodyText2 className="text-white ">
                  {formatChange(nseStock.change, nseStock.changePercent)}
                </BodyText2>
              </div>
              {/* <div className="w-[1px] h-full bg-blue-100 hidden lg:block" /> */}
              {/* <div>
                <BodyText2 className="text-white">BSE</BodyText2>
                <div className="flex gap-x-[10px] items-end">
                  <H2 className="text-white">3425.00</H2>
                  <SubH3 className="text-white !text-[16px] lg:!text-[18px] mb-[5px]">
                    INR
                  </SubH3>
                </div>
                <BodyText2 className="text-white ">-11.50 (-0.34%)</BodyText2>
              </div> */}
            </div>
          )}
        </FadeInReveal>
      </div>
    </div>
  );
};

export default InvestorBlueSection;
