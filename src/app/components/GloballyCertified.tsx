"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BodyText2, H3 } from "./Typography2";
import { ImageProps } from "../types/global.type";
import clsx from "clsx";

const MARQUEE_PX_PER_SEC = 50;

type GloballyCertifiedProps = {
  title?: string;
  itemsData: {
    id?: number;
    heading?: string;
    image?: ImageProps;
  }[];
  className?: string;
};

const GloballyCertified = ({
  title,
  itemsData,
  className,
}: GloballyCertifiedProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [durationSec, setDurationSec] = useState<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const updateDuration = () => {
      const width = el.scrollWidth;
      // We translate -50% per cycle (one copy width)
      const distancePerCycle = width / 2;
      const sec = distancePerCycle / MARQUEE_PX_PER_SEC;
      setDurationSec(Math.max(20, sec));
    };

    updateDuration();
    const observer = new ResizeObserver(updateDuration);
    observer.observe(el);
    return () => observer.disconnect();
  }, [itemsData?.length]);

  if (!itemsData?.length) return null;

  return (
    <div className={clsx("w-full pb-[50px] lg:pb-[100px]", className)}>
      <div>
        <H3 className="text-[#002F50] mx-auto w-fit">
          {title || "Globally Certified"}
        </H3>
      </div>
      <div className="overflow-hidden relative mt-[24px] lg:mt-[35px]">
        <div
          ref={trackRef}
          className="flex gap-x-[24px] whitespace-nowrap w-max animate-marquee hover:[animation-play-state:paused]"
          style={{
            willChange: "transform",
            ...(durationSec != null && {
              animationDuration: `${durationSec}s`,
            }),
          }}
        >
          {/* First set */}
          {itemsData.map((item, index) => (
            <MarqueeItem key={`first-${item.id ?? index}`} item={item} />
          ))}
          {/* Duplicate for seamless loop */}
          {itemsData.map((item, index) => (
            <MarqueeItem key={`second-${item.id ?? index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MarqueeItem = ({
  item,
}: {
  item: GloballyCertifiedProps["itemsData"][number];
}) => (
  <div className="inline-block flex-shrink-0 w-[132px] md:w-[200px] group">
    {item?.image?.url && (
      <div className="relative bg-grey-100 rounded-[10px] md:rounded-[12px] grid place-items-center h-[88px] md:h-[120px]">
        <Image
          src={item.image.url}
          alt={item?.heading || "global certified"}
          height={80}
          width={160}
          sizes="(max-width: 767px) 112px, 160px"
          loading="lazy"
          className="object-contain h-[68px] md:h-[80px] w-[112px] md:w-[160px] group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    )}
    {item?.heading && (
      <BodyText2 className="mt-4 text-center whitespace-pre-wrap">
        {item.heading}
      </BodyText2>
    )}
  </div>
);

export default GloballyCertified;