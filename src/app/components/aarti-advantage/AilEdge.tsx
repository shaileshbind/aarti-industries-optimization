import React from "react";
import { H2, SubH2 } from "../Typography2";
import Image from "next/image";
import { AilEdgeProps } from "@/app/types/aarti-advantage.type";

export default function AilEdge({ data }: AilEdgeProps) {
  const { heading, cards } = data;

  return (
    <div className="relative fluid-container xl:flex items-start">
      {heading && (
        <H2 className="xl:absolute xl:top-0 xl:max-w-[412px] pb-6 xl:pb-0">
          {heading}
        </H2>
      )}
      <div className="xl:w-[412px] hidden xl:block" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <div className="hidden lg:block" />
        {cards?.map(
          (item, index) =>
            item?.image?.url && (
              <div
                className="h-auto md:h-[226px] flex flex-col gap-8 md:gap-4 justify-between bg-[#EFF3F5] p-5 md:p-8 rounded-[20px]"
                key={"tab_" + index}
              >
                <Image
                  src={item?.image?.url}
                  alt={item?.image?.alternativeText || "icon"}
                  width={48}
                  height={48}
                  className="w-9 h-9 md:w-12 md:h-12"
                />

                <SubH2>{item?.title}</SubH2>
              </div>
            )
        )}
        <div className="hidden lg:block" />
      </div>
    </div>
  );
}
