"use client";
import { useEffect, useState, useRef } from "react";
import { H2, SubH2 } from "../Typography2";
import Image from "next/image";
import { WorksWithPartnersProps } from "@/app/types/partnership.type";
import clsx from "clsx";
import Button from "../Button";

export default function WorksWithPartners({
  data,
  className,
}: WorksWithPartnersProps) {
  const { sectionTitle, card, ctaTitle, ctaLink } = data;

  const [activeCard, setActiveCard] = useState<number>(0);
  const [mobileProgress, setMobileProgress] = useState<number[]>(() => 
    card ? new Array(card.length).fill(0) : []
  );
  
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ticking = useRef(false);

  // Desktop auto-rotation only
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024 || !card?.length) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % card.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [card?.length]);

  // Mobile scroll-based progress - Optimized
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 1024 || !card?.length) return;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const newProgress = new Array(card.length).fill(0);
          
          // Trigger thresholds
          const startTrigger = windowHeight * 0.7;
          const endTrigger = windowHeight * 0.3;

          for (let i = 0; i < card.length; i++) {
            const item = cardRefs.current[i];
            if (!item) continue;

            const rect = item.getBoundingClientRect();
            const cardTop = rect.top;

            // Sequential Logic: Is previous card finished?
            const isPreviousComplete = i === 0 || newProgress[i - 1] >= 100;

            if (isPreviousComplete) {
              if (cardTop <= endTrigger) {
                newProgress[i] = 100;
              } else if (cardTop < startTrigger) {
                const range = startTrigger - endTrigger;
                const scrolled = startTrigger - cardTop;
                const progress = (scrolled / range) * 100;
                newProgress[i] = Math.min(Math.max(progress, 0), 100);
              } else {
                newProgress[i] = 0;
              }
            } else {
              newProgress[i] = 0;
            }
          }

          setMobileProgress(newProgress);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [card?.length]); // No longer depends on mobileProgress

  return (
    <div className="fluid-container">
      {/* Desktop Header */}
      <div className="lg:flex justify-between items-center hidden">
        {sectionTitle && (
          <div className="lg:w-1/2">
            <H2>{sectionTitle}</H2>
          </div>
        )}

        {ctaTitle && ctaLink && (
          <div>
            <Button title={ctaTitle} href={ctaLink} className="mt-6 lg:mt-0" />
          </div>
        )}
      </div>

      {/* Mobile Header */}
      <div className="md:flex justify-between items-center lg:hidden">
        {sectionTitle && <H2 className="md:w-[70%]">{sectionTitle}</H2>}
        {ctaTitle && ctaLink && (
          <Button title={ctaTitle} href={ctaLink} className="mt-6 lg:mt-0" />
        )}
      </div>

      {/* Desktop Content */}
      {card?.length > 0 && (
        <div className={clsx(`mt-[50px] hidden grid-cols-4 lg:grid`, className)}>
          {card.map((item, index) => (
            <div key={"desktop_card_" + index} className="relative pr-[50px]">
              {index !== card.length - 1 && (
                <>
                  <div className="absolute left-0 top-[10.5px] h-[1px] w-full bg-[#E1E1E1]" />
                  {activeCard === index && (
                    <div
                      className="absolute left-4 top-[10.5px] h-[2px] bg-[#DC4C03]"
                      style={{ animation: "fillProgress 5s linear forwards" }}
                    />
                  )}
                  {activeCard > index && (
                    <div className="absolute left-4 top-[10.5px] h-[2px] w-full bg-[#DC4C03]" />
                  )}
                </>
              )}

              <Image
                src={"/images/star-orange.svg"}
                alt="star icon"
                width={22}
                height={22}
                className="relative z-[1]"
              />

              <div className={`transition-all duration-500 ${activeCard >= index ? "opacity-100" : "opacity-40"}`}>
                {item?.title && <SubH2 className="pb-2 pt-7">{item.title}</SubH2>}
                {item?.description && (
                  <p className="text-base text-[#4C5861] !font-roboto">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Content */}
      {card?.length > 0 && (
        <div className="mt-10 lg:hidden">
          {card.map((item, index) => (
            <div
              key={"mobile_card_" + index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`relative flex items-start gap-7 ${index === card.length - 1 ? "pb-0" : "pb-10"}`}
            >
              {index !== card.length - 1 && (
                <div className="absolute left-[10px] top-4 h-full w-[2px]">
                  <div className="absolute h-full w-full bg-[#E1E1E1]" />
                  <div
                    className="absolute w-full bg-[#DC4C03] transition-all duration-150 ease-out"
                    style={{ height: `${mobileProgress[index] || 0}%` }}
                  />
                </div>
              )}

              <div className="relative z-[1] h-6 w-6">
                <Image
                  src={"/images/star-orange.svg"}
                  alt="banner"
                  width={30}
                  height={30}
                  className="h-full w-full"
                />
              </div>

              <div
                className="w-[90%] transition-opacity duration-300"
                style={{ opacity: index === 0 || (mobileProgress[index - 1] >= 100) ? 1 : 0.4 }}
              >
                {item?.title && <SubH2 className="pb-[6px]">{item?.title}</SubH2>}

                {item?.description && (
                  <p className="text-sm text-[#4C5861]">{item?.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fillProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}