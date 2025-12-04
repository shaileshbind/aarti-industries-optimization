import React from "react";
import { H3 } from "../Typography2";
import DownloadCard from "./DownloadCard";
import { PhotosProps } from "@/app/types/media-kit.type";

export default function Photos({ data }: PhotosProps) {
  const { sectionImages } = data;

  return (
    <div>
      {/* Leaders */}
      <div>
        {sectionImages?.[0]?.title && (
          <H3 className="pb-[30px]">{sectionImages?.[0]?.title}</H3>
        )}

        {sectionImages?.[0]?.imageCards?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-6">
            {sectionImages?.[0]?.imageCards?.map((item, index) => (
              <div key={"photos" + index}>
                <DownloadCard
                  src={item?.image?.url}
                  downloadUrl={item?.file?.url || item?.image?.url}
                  filename={item?.title || "leader"}
                />

                {item?.title && (
                  <p className="text-base md:text-lg text-[#002F50] pt-[10px] md:pt-[18px]">
                    {item?.title}
                  </p>
                )}

                {item?.description && (
                  <p className="text-base md:text-base text-[#9997A2] pt-1">
                    {item?.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Plants */}
      <div className="mt-[72px] lg:mt-[80px]">
        {sectionImages?.[1]?.title && (
          <H3 className="pb-[30px]">{sectionImages?.[1]?.title}</H3>
        )}

        {sectionImages?.[1]?.imageCards?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-6">
            {sectionImages?.[1]?.imageCards?.map((item, index) => (
              <div key={"plant" + index}>
                <DownloadCard
                  src={item?.image?.url}
                  downloadUrl={item?.file?.url || item?.image?.url}
                  filename={item?.title || "plant"}
                  className={`!h-[298px]`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
