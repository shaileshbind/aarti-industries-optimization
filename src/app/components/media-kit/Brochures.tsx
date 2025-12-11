import React from "react";
import DownloadCard from "./DownloadCard";
import { BrochuresProps } from "@/app/types/media-kit.type";
import { FadeInReveal } from "../ScrollReveal";

export default function Brochures({ data }: BrochuresProps) {
  const { sectionImages } = data;

  return (
    <div>
      {sectionImages?.[0]?.imageCards?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectionImages?.[0]?.imageCards?.map((item, index) => (
            <FadeInReveal delay={index*0.2} key={"brand_" + index}>
              <DownloadCard
                src={item?.image?.url}
                downloadUrl={item?.file?.url || item?.image?.url}
                filename={item?.title || "brochure"}
              />

              {item?.title && (
                <p className="text-base md:text-lg text-[#002F50] pt-2 md:pt-[18px]">
                  {item?.title}
                </p>
              )}
            </FadeInReveal>
          ))}
        </div>
      )}
    </div>
  );
}
