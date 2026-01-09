"use client";
import { useState } from "react";
import { BodyText3, H2, SubH3 } from "../Typography2";
import Image from "next/image";
import clsx from "clsx";
import { ScaleInReveal } from "../ScrollReveal";
import Button from "../Button";
import { useMediaQuery } from "@mui/material";
import {
  VideoScrollBarContainerProps,
  WebinarApiItem,
} from "@/app/types/manufacturing-capabilities.type";
import { ImageProps } from "@/app/types/global.type";
import { formatDate } from "../../../../utils/formatDate";

export default function VideoScrollBarContainer({
  data,
  webinarsData,
}: VideoScrollBarContainerProps) {
  // Transform pressData to match the expected card structure
  // getData returns the array directly, so check if it's already an array first
  let webinarsArray: WebinarApiItem[] = [];

  if (Array.isArray(webinarsData)) {
    // getData returns array directly
    webinarsArray = webinarsData;
  } else if (webinarsData && "pressData" in webinarsData) {
    // Wrapped in pressData (from getPageData)
    webinarsArray = webinarsData.pressData?.data || [];
  }

  const transformedPressData = webinarsArray.map((item: WebinarApiItem) => ({
    title: item?.title || "",
    date: item?.date,
    image: item?.image || { url: "", alternativeText: "" },
    media: {
      url: item?.media?.url || "",
      mime: item?.media?.mime,
    },
  }));

  // Use pressData if available, otherwise use the original card data
  const { title, card: originalCard } = data;
  const card =
    transformedPressData.length > 0 ? transformedPressData : originalCard;

  const [activeCard, setactiveCard] = useState<number>(0);
  const isMobile = useMediaQuery("(max-width:820px)");
  const [showAll, setshowAll] = useState<boolean>(false);

  return (
    <div className="container">
      {title && <H2 className="lg:max-w-[560px]">{title}</H2>}

      {card?.length > 0 && (
        <div className="mt-6 lg:mt-12 flex justify-between">
          <div className=" relative lg:w-[40%] xl:w-[35%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:shadow-[0px_0px_21px_20px_rgba(255,255,255,1)] after:bg-white ">
            <div
              className="relative lg:max-h-[470px] lg:overflow-y-auto scrollbar w-full flex flex-col gap-4 lg:gap-6 "
              data-lenis-prevent
            >
              {(isMobile ? (showAll ? card : card?.slice(0, 5)) : card)?.map(
                (
                  item: {
                    title: string;
                    date?: string;
                    image: ImageProps;
                    media: { url: string; mime?: string };
                  },
                  index: number,
                ) => (
                  <div
                    key={"item_" + index}
                    className={clsx(
                      `flex gap-4 items-center cursor-pointer transition-all duration-200`,
                      activeCard === index
                        ? "opacity-100"
                        : "lg:opacity-40 hover:opacity-70",
                    )}
                    onClick={() => setactiveCard(index)}
                  >
                    <div
                      className={clsx(
                        `w-[180px] h-[100px] p-1 lg:border-2 rounded-[17px] overflow-hidden `,
                        activeCard === index
                          ? "lg:border-[#DC4C03]"
                          : "border-[#FFF]",
                      )}
                    >
                      <Image
                        src={item?.image?.url}
                        alt={"banner"}
                        width={180}
                        height={100}
                        className="w-full h-full rounded-[14px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {item?.date && (
                        <BodyText3 className="text-orange-200">
                          {formatDate(item?.date)}
                        </BodyText3>
                      )}
                      {item?.title && item?.date && (
                        <SubH3
                          className={clsx(
                            `line-clamp-2 lg:max-w-[80%] xl:max-w-[200px] text-[#4C5861]`,
                          )}
                        >
                          {item?.title}
                        </SubH3>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {card?.[activeCard]?.media?.url && (
            <ScaleInReveal className="w-1/2 xl:w-[60%] h-[470px] rounded-[20px] overflow-hidden hidden lg:block">
              {card?.[activeCard]?.media?.mime?.startsWith("image/") ? (
                <Image
                  src={card?.[activeCard]?.media?.url}
                  alt={card?.[activeCard]?.title || "media"}
                  width={600}
                  height={470}
                  className="w-full h-full rounded-[20px] object-cover"
                />
              ) : (
                <video
                  width="600"
                  height="470"
                  className="w-full h-full rounded-[20px] object-cover "
                  key={activeCard}
                  controls
                >
                  <source
                    src={card?.[activeCard]?.media?.url}
                    type="video/mp4"
                  />
                  <source
                    src={card?.[activeCard]?.media?.url}
                    type="video/ogg"
                  />
                </video>
              )}
            </ScaleInReveal>
          )}
        </div>
      )}

      <div
        className="block lg:hidden mt-9"
        onClick={(e) => {
          e.preventDefault();
          setshowAll(!showAll);
        }}
      >
        {showAll ? <Button title="View less" /> : <Button title="View more" />}
      </div>
    </div>
  );
}
