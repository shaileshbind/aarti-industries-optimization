"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { BodyText2, H3 } from "./Typography2";
import { ImageProps } from "../types/global.type";
import clsx from "clsx";
import { gsap, Linear } from "gsap";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const MARQUEE_SPEED_PX_PER_SEC = 50;

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement || !itemsData?.length) return;
    const calculateLoop = () => {
      const totalContentWidth = contentElement.scrollWidth;
      const singleSetWidth = totalContentWidth / 2;
      const duration = Math.max(singleSetWidth / MARQUEE_SPEED_PX_PER_SEC, 5);
      return { singleSetWidth, duration };
    };
    const setupAnimation = () => {
      const { singleSetWidth, duration } = calculateLoop();
      if (animationRef.current) {
        animationRef.current.kill();
      }
      animationRef.current = gsap.timeline({
        repeat: -1,
        paused: true,
        defaults: { ease: Linear.easeNone },
        onUpdate: () => {
          if (animationRef.current && animationRef.current.progress() === 0) {
            animationRef.current.play();
          }
        },
      });
      animationRef.current.fromTo(
        contentElement,
        { x: 0 },
        {
          x: -singleSetWidth,
          duration: duration,
        },
      );
      animationRef.current.play();
    };
    const timeoutId = setTimeout(setupAnimation, 100);
    window.addEventListener("resize", setupAnimation);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", setupAnimation);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [itemsData]);

  if (!itemsData?.length) return null;

  return (
    <div className={clsx(`w-full pb-[50px] lg:pb-[100px]`, className)}>
      <div>
        <H3 className="text-[#002F50] mx-auto w-fit">
          {title || "Globally Certified"}
        </H3>
      </div>
      <div
        className="overflow-hidden relative mt-[24px] lg:mt-[35px]"
        ref={containerRef}
      >
        <div
          ref={contentRef}
          className="flex gap-x-[24px] whitespace-nowrap flex-grow-0"
        >
          {/* First set of items */}
          {itemsData.map((item, index) => (
            <div
              key={`first-${item.id ?? index}`}
              className="marquee-item inline-block flex-shrink-0 w-[132px] md:w-[200px] group transition-all duration-700"
            >
              {item?.image?.url && (
                <div className="relative bg-grey-100 rounded-[10px] md:rounded-[12px] grid place-items-center h-[88px] md:h-[120px]">
                  <Image
                    src={item?.image?.url}
                    alt={item?.heading || "global certified"}
                    height={80}
                    width={160}
                    className="object-contain h-[68px] md:h-[80px] w-[112px] md:w-[160px] group-hover:scale-120 transition-all duration-300"
                  />
                </div>
              )}
              {item?.heading && (
                <BodyText2 className="mt-4 text-center whitespace-pre-wrap">
                  {item?.heading}
                </BodyText2>
              )}
            </div>
          ))}
          {/* Second set of items (Duplicate) */}
          {itemsData.map((item, index) => (
            <div
              key={`second-${item.id ?? index}`}
              className="marquee-item inline-block flex-shrink-0 w-[132px] md:w-[200px] group transition-all duration-300"
            >
              {item?.image?.url && (
                <div className="relative bg-grey-100 rounded-[10px] md:rounded-[12px] grid place-items-center h-[88px] md:h-[120px]">
                  <Image
                    src={item?.image?.url}
                    alt={item?.heading || "global certified"}
                    height={80}
                    width={160}
                    className="object-contain h-[68px] md:h-[80px] w-[112px] md:w-[160px] group-hover:scale-120 transition-all duration-700"
                  />
                </div>
              )}
              {item?.heading && (
                <BodyText2 className="mt-4 text-center whitespace-pre-wrap">
                  {item?.heading}
                </BodyText2>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GloballyCertified;
