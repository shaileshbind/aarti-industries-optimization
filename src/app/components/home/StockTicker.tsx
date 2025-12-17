"use client";
import { useEffect, useState } from "react";
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
      setPressReleases(Object.values(data));
    };
    loadNews();
  }, []);
  const tickerData = pressReleases?.[0];
  return (
    <div className="bg-[#10456A] min-h-[45px] py-[6px] lg:py-[10px] overflow-hidden fixed w-full top-0 left-0 z-50">
      <div className="marquee">
        <div className="container lg:mx-auto flex items-center gap-[110px]">
          {/* News */}
          <div className="flex gap-[110px]">
            {tickerData?.slice(0,3)?.map((item: ItemProps) => {
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