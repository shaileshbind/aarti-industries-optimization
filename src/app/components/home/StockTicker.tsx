"use client";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

export default function StockTicker() {
  return (
    <div className="bg-[#10456A] py-[10px] overflow-hidden">
      <div className="marquee">
        <div className="container lg:mx-auto flex items-center gap-[110px] ">
          <div className="flex gap-[60px]">
            <div className="flex gap-4">
              <p className="text-[#FFFFFF] text-base">NSE: BREIT</p>

              <p className="text-[#06FF2E]">
                271.50 <PlayArrowIcon className="rotate-270" /> +2.22 (+0.87 %)
              </p>
            </div>

            <div className="flex gap-4">
              <p className="text-[#FFFFFF] text-base">BSE: BOM</p>

              <p className="text-[#FF2A2D]">
                271.50 <PlayArrowIcon className="rotate-270" /> +2.22 (+0.87 %)
              </p>
            </div>
          </div>

          {/* News */}
          <div className="flex gap-[110px]">
            {[...Array(4)]?.map((_, index) => (
              <Link href={"#"} className="text-sm text-[#FFF]" key={index}>
                Lorem ipsum dolor sit amet consectetur{" "}
                <ArrowForwardIcon
                  className="rotate-325 ml-1"
                  fontSize="small"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
