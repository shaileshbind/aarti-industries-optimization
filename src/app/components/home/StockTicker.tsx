"use client";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { fetchNews } from "@/_lib/fetchNews";

type ItemProps = {
  id?: string;
  heading?: string;
  slug?:string;
};
export default function StockTicker() {
  const [pressReleases, setPressReleases] = useState<ItemProps[][]>([]);
  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews("/api/press");
      console.log(data);
      setPressReleases(Object.values(data));
    };
    loadNews();
  }, []);
  const tickerData = pressReleases?.[0];
  return (
    <div className="bg-[#10456A] py-[6px] lg:py-[10px] overflow-hidden fixed w-full top-0 left-0 z-50">
      <div className="marquee">
        <div className="container lg:mx-auto flex items-center gap-[110px]">
          <div className="flex gap-[60px]">
            <div className="flex gap-4">
              <p className="text-[#FFFFFF] text-sm lg:text-base">NSE: BREIT</p>
              <p className="text-[#06FF2E] text-sm lg:text-base">
                271.50 <PlayArrowIcon className="rotate-270" /> +2.22 (+0.87 %)
              </p>
            </div>

            <div className="flex gap-4">
              <p className="text-[#FFFFFF] text-sm lg:text-base">BSE: BOM</p>
              <p className="text-[#FF2A2D] text-sm lg:text-base">
                271.50 <PlayArrowIcon className="rotate-270" /> +2.22 (+0.87 %)
              </p>
            </div>
          </div>

          {/* News */}
          <div className="flex gap-[110px]">
            {tickerData?.map((item: ItemProps) => {
              if (!item?.slug) return null;
              return (
                <Link
                  href={`/press-releases/${item?.slug}`}
                  className="text-sm lg:text-base text-[#FFF]"
                  key={item.id}
                  target="_blank"
                >
                  {item.heading}
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