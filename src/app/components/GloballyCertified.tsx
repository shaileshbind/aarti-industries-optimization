"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { BodyText2, H3 } from "./Typography2";

const GloballyCertified = () => {
  const globalData = [
    { id: 0, title: "Ecovadis Gold Rating", src: "/images/award1.png" },
    { id: 1, title: "CDP A rating", src: "/images/award2.png" },
    { id: 2, title: "ISO 27001:2022", src: "/images/award3.png" },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const [marqueeItems, setMarqueeItems] = useState(globalData);

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
      const repeats = Math.ceil((minItemsToFill / globalData.length) * 2);

      const repeatedItems = Array(repeats).fill(globalData).flat();
      setMarqueeItems(repeatedItems);
    };

    calculateMarqueeItems();
    window.addEventListener("resize", calculateMarqueeItems);

    return () => window.removeEventListener("resize", calculateMarqueeItems);
  }, []);

  return (
    <div className="w-full pb-[100px]">
      <H3 className="text-blue-100 mx-auto w-fit">Globally Certified</H3>
      <div
        className="overflow-hidden relative mt-[24px] lg:mt-[35px]"
        ref={containerRef}
      >
        <div className="flex gap-x-[24px] whitespace-nowrap animate-marquee">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="marquee-item inline-block flex-shrink-0 w-[132px] md:w-[200px] "
            >
              <div className="relative bg-grey-100 rounded-[10px] md:rounded-[12px] grid place-items-center h-[88px] md:h-[120px]">
                <Image
                  src={item.src}
                  alt={item.title}
                  height={80}
                  width={160}
                  className="object-contain h-[68px] md:h-[80px] w-[112px] md:w-[160px]"
                />
              </div>
              <BodyText2 className="mt-4">{item?.title}</BodyText2>
            </div>
          ))}
        </div>
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
