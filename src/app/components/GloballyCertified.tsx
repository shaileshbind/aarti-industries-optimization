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
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const applyTransform = () => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  const normalizeOffset = () => {
    const width = singleSetWidthRef.current;
    if (!width) return;

    while (offsetRef.current <= -width) offsetRef.current += width;
    while (offsetRef.current > 0) offsetRef.current -= width;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !itemsData?.length) return;

    const updateSizes = () => {
      singleSetWidthRef.current = el.scrollWidth / 2;
      normalizeOffset();
      applyTransform();
    };

    updateSizes();
    const observer = new ResizeObserver(updateSizes);
    observer.observe(el);
    return () => observer.disconnect();
  }, [itemsData]);

  useEffect(() => {
    if (!itemsData?.length) return;

    const tick = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!isDragging && singleSetWidthRef.current > 0) {
        offsetRef.current -= MARQUEE_PX_PER_SEC * dt;
        normalizeOffset();
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = 0;
    };
  }, [isDragging, itemsData]);

  if (!itemsData?.length) return null;

  return (
    <div className={clsx("w-full pb-[50px] lg:pb-[100px]", className)}>
      <div>
        <H3 className="text-[#002F50] mx-auto w-fit">
          {title || "Globally Certified"}
        </H3>
      </div>
      <div
        ref={viewportRef}
        className="overflow-hidden relative mt-[24px] lg:mt-[35px] cursor-grab active:cursor-grabbing"
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          if (!trackRef.current) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          setIsDragging(true);
          lastPointerXRef.current = e.clientX;
        }}
        onPointerMove={(e) => {
          if (!isDragging || !trackRef.current) return;
          const delta = e.clientX - lastPointerXRef.current;
          lastPointerXRef.current = e.clientX;
          offsetRef.current += delta;
          normalizeOffset();
          applyTransform();
        }}
        onPointerUp={(e) => {
          if (!isDragging) return;
          e.currentTarget.releasePointerCapture(e.pointerId);
          setIsDragging(false);
          lastTsRef.current = performance.now();
        }}
        onPointerCancel={(e) => {
          if (!isDragging) return;
          e.currentTarget.releasePointerCapture(e.pointerId);
          setIsDragging(false);
          lastTsRef.current = performance.now();
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-x-[24px] whitespace-nowrap w-max touch-pan-y select-none"
          style={{
            willChange: "transform",
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
  <div className="inline-block shrink-0 w-[132px] md:w-[200px] group">
    {item?.image?.url && (
      <div className="relative bg-grey-100 rounded-[10px] md:rounded-[12px] grid place-items-center h-[88px] md:h-[120px]">
        <Image
          src={item.image.url}
          alt={item?.heading || "global certified"}
          height={80}
          width={160}
          sizes="(max-width: 767px) 112px, 160px"
          loading="lazy"
          draggable={false}
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