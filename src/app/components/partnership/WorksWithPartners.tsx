"use client";
import React, { useEffect, useState, useRef } from "react";
import { H2, SubH2 } from "../Typography2";
import Image from "next/image";
import { WorksWithPartnersProps } from "@/app/types/partnership.type";

export default function WorksWithPartners({ data }: WorksWithPartnersProps) {
  const { sectionTitle, card } = data;

  const [activeCard, setActiveCard] = useState<number>(0);
  const [mobileProgress, setMobileProgress] = useState<number[]>([0, 0, 0, 0]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Desktop auto-rotation only
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % card?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [card?.length]);

  // Mobile scroll-based progress - SEQUENTIAL
  useEffect(() => {
    const handleScroll = () => {
      const newProgress = [...mobileProgress];
      const windowHeight = window.innerHeight;

      cardRefs.current.forEach((item, index) => {
        if (item && index < card?.length - 1) {
          const rect = item.getBoundingClientRect();
          const cardTop = rect.top;

          // Define trigger zone for this card
          const startTrigger = windowHeight * 0.7; // Start when card is 70% down viewport
          const endTrigger = windowHeight * 0.3; // Complete when card is 30% down viewport

          // Check if previous card's progress is complete (or this is the first card)
          const isPreviousComplete =
            index === 0 || newProgress[index - 1] >= 100;

          if (isPreviousComplete) {
            if (cardTop < startTrigger && cardTop > endTrigger) {
              // Card is in active zone - calculate progress
              const range = startTrigger - endTrigger;
              const scrolled = startTrigger - cardTop;
              const progress = (scrolled / range) * 100;
              newProgress[index] = Math.min(Math.max(progress, 0), 100);
            } else if (cardTop <= endTrigger) {
              // Card has scrolled past - mark as complete
              newProgress[index] = 100;
            } else {
              // Card hasn't reached trigger yet
              newProgress[index] = 0;
            }
          } else {
            // Previous card isn't complete yet - keep at 0
            newProgress[index] = 0;
          }
        }
      });

      setMobileProgress(newProgress);
    };

    // Only add scroll listener on mobile
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileProgress, card?.length]);

  return (
    <div className="fluid-container">
      {sectionTitle && <H2>{sectionTitle}</H2>}

      {/* Desktop */}
      {card?.length > 0 && (
        <div className="mt-[50px] hidden grid-cols-4 lg:grid">
          {card?.map((item, index) => (
            <div key={"card_" + index} className="relative pr-[50px]">
              {index !== card?.length - 1 && (
                <>
                  {/* Background progress line */}
                  <div className="top-progress absolute left-0 top-[10px] h-[1px] w-full bg-[#E1E1E1]" />

                  {/* Animated progress bar */}
                  {activeCard === index && (
                    <div
                      key={`progress-${activeCard}`}
                      className="absolute left-4 top-[10px] h-[2px] bg-[#DC4C03]"
                      style={{
                        animation: "fillProgress 5s linear forwards",
                      }}
                    />
                  )}

                  {/* Completed progress bar for previous card */}
                  {activeCard > index && (
                    <div className="absolute left-4 top-[10px] h-[2px] w-full bg-[#DC4C03]" />
                  )}
                </>
              )}

              <Image
                src={"/images/star-orange.svg"}
                alt="banner"
                width={20}
                height={20}
                className="relative z-[1]"
              />

              <div
                className={`transition-all duration-500 ${
                  activeCard >= index ? "opacity-100" : "opacity-40"
                }`}
              >
                {item?.title && (
                  <SubH2 className="pb-2 pt-7">{item?.title}</SubH2>
                )}

                {item?.description && (
                  <p className="text-base text-[#4C5861]">
                    {item?.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile */}
      {card?.length > 0 && (
        <div className="mt-9 lg:hidden">
          {card?.map((item, index) => (
            <div
              key={"card_" + index}
              ref={(el) => {
                if (el) {
                  cardRefs.current[index] = el;
                }
              }}
              className={`relative flex items-start gap-7  ${
                index === card?.length - 1 ? "pb-0" : "pb-10"
              }`}
            >
              {/* Vertical line container */}
              {index !== card?.length - 1 && (
                <div className="absolute left-[10px] top-4 h-full w-[2px]">
                  {/* Background line */}
                  <div className="absolute h-full w-full bg-[#E1E1E1]" />

                  {/* Scroll-based progress line */}
                  <div
                    className="absolute w-full bg-[#DC4C03] transition-all duration-150 ease-out"
                    style={{
                      height: `${mobileProgress[index]}%`,
                    }}
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
                style={{
                  opacity:
                    index === 0 || mobileProgress[index - 1] >= 100 ? 1 : 0.4,
                }}
              >
                {item?.title && <SubH2 className="pb-2">{item?.title}</SubH2>}

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
