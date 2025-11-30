import React from "react";
import DownloadCard from "./DownloadCard";

export default function BrandGuidelines() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-6">
      {[1, 2, 16, 16]?.map((_, index) => (
        <div key={"bbrand" + index}>
          <DownloadCard src={"/images/our-story/old1.png"} />
          <p className="text-base md:text-lg text-[#002F50] pt-2 md:pt-[18px]">
            Brand Guidelines
          </p>
        </div>
      ))}
    </div>
  );
}
