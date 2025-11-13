"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { BodyText2, H3 } from "./Typography2";
import { FadeInRevealBlur } from "./ScrollReveal";
import { ImageProps } from "../types/global.type";
import clsx from "clsx";

type GloballyCertifiedProps = {
  title?: string;
  itemsData: {
    id?: number;
    heading?: string;
    image?: ImageProps;
  }[];
  className?: string
};

const GloballyCertified = ({ title, itemsData, className }: GloballyCertifiedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [marqueeItems, setMarqueeItems] = useState(itemsData);

  useEffect(() => {
    const calculateMarqueeItems = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const firstItem =
        containerRef.current.querySelector<HTMLElement>(".marquee-item");
      const itemWidth = firstItem?.getBoundingClientRect().width || 200;
      const gap = 24;
      const totalItemWidth = itemWidth + gap;

      const minItemsToFill = Math.ceil(containerWidth / totalItemWidth);
      const repeats = Math.ceil((minItemsToFill / itemsData?.length) * 2);

      const repeatedItems = Array(repeats)?.fill(itemsData)?.flat();
      setMarqueeItems(repeatedItems);
    };

    calculateMarqueeItems();
    window.addEventListener("resize", calculateMarqueeItems);

    return () => window.removeEventListener("resize", calculateMarqueeItems);
  }, [itemsData]);

  // Early return if no data
  if (!itemsData?.length) return null;

  return (
    <div className={clsx(`w-full pb-[72px] lg:pb-[100px]`, className)}>
      <FadeInRevealBlur delay={0.1}>
        <H3 className="text-blue-100 mx-auto w-fit">
          {title || "Globally Certified"}
        </H3>
      </FadeInRevealBlur>
      <div
        className="overflow-hidden relative mt-[24px] lg:mt-[35px]"
        ref={containerRef}
      >
        {marqueeItems?.length > 0 && (
          <div className="flex gap-x-[24px] whitespace-nowrap animate-marquee">
            {marqueeItems?.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="marquee-item inline-block flex-shrink-0 w-[132px] md:w-[200px] "
              >
                {item?.image?.url && (
                  <div className="relative bg-grey-100 rounded-[10px] md:rounded-[12px] grid place-items-center h-[88px] md:h-[120px]">
                    <Image
                      src={item?.image?.url}
                      alt={item?.heading || "global certified"}
                      height={80}
                      width={160}
                      className="object-contain h-[68px] md:h-[80px] w-[112px] md:w-[160px]"
                    />
                  </div>
                )}
                {item?.heading && (
                  <BodyText2 className="mt-4 text-center whitespace-pre-wrap">{item?.heading}</BodyText2>
                )}
              </div>
            ))}
          </div>
        )}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            display: flex;
            animation: marquee 15s linear infinite;
          }

          @media (max-width: 768px) {
            .animate-marquee {
              animation-duration: 8s;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default GloballyCertified;
