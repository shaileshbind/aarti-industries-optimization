import React from "react";
import { H3 } from "../Typography2";
import DownloadCard from "./DownloadCard";

export default function Photos() {
  return (
    <div>
      {/* Leaders */}
      <div>
        <H3 className="pb-[30px]">Leadership</H3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-6">
          {[1, 2]?.map((_, index) => (
            <div key={"photos" + index}>
              <DownloadCard src={"/images/our-story/old1.png"} />
              <p className="text-base md:text-lg text-[#002F50] pt-[10px] md:pt-[18px]">
                Shri Rajendra V. Gogri
              </p>
              <p className="text-base md:text-base text-[#9997A2] pt-1">
                Chairman & Managing Director
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Plants */}
      <div className="mt-[72px] lg:mt-[80px]">
        <H3 className="pb-[30px]">Plant Pictures</H3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-6">
          {[1, 2, 3, 4, 5, 6]?.map((_, index) => (
            <div key={"plant" + index}>
              <DownloadCard
                src={"/images/our-story/old1.png"}
                className={`!h-[298px]`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
