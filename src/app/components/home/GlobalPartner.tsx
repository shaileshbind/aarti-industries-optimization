"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H3 } from "../Typography2";
import NumberCard from "../cards/NumberCard";
import { GlobalPartnerProps } from "@/app/types/home.type";
import { SlideInLeftReveal } from "../ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const GlobalPartner: React.FC<GlobalPartnerProps> = ({ data }) => {
  const { leftTitle, righSection } = data;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Clear any existing ScrollTrigger instances for this element
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === wrapper) {
        trigger.kill();
      }
    });

    // Small delay to ensure DOM is ready and scroll position is settled
    const timer = setTimeout(() => {
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      // Get all stat-box elements within this component
      const statBoxes = wrapper.querySelectorAll(".stat-box");

      // Reset elements to initial state
      gsap.set(statBoxes, {
        y: 80,
        opacity: 0,
      });

      // Create the animation
      animationRef.current = gsap.to(statBoxes, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.2,
          from: "random",
        },
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
          end: "top -50%",
          toggleActions: "play none none reset",
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill();
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <div className="container mx-auto lg:my-[100px] mt-[100px]">
      <div
        ref={wrapperRef}
        className="w-full min-h-[unset] lg:min-h-[350px] h-auto grid lg:grid-cols-[312px_1fr] gap-[6px]"
      >
        <SlideInLeftReveal
          delay={0.2}
          className="bg-gradient-orange-1 relative rounded-[14px] lg:rounded-[20px] py-[38px] px-[24px] min-h-[136px] lg:min-h-[350px] overflow-hidden"
        >
          {leftTitle && (
            <H3 className="text-white max-w-[230px] md:max-w-fit">
              {leftTitle}
            </H3>
          )}

          <Image
            src="/images/home/flower-t.svg"
            alt="img"
            width={295}
            height={295}
            className="absolute bottom-[30px] md:bottom-[-86px] right-[-40px] md:right-[-90px] w-[151px] h-[151px] md:w-[295px] md:h-[295px]"
          />
        </SlideInLeftReveal>
        <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-none lg:grid-rows-[1fr_1fr] gap-[6px]">
          {righSection?.length > 0 && (
            <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px] relative z-[1]">
              {righSection?.slice(0, 4)?.map((items) => {
                return (
                  <NumberCard
                    key={items?.id}
                    title={items?.value}
                    desc={items?.description}
                    imageSrc={items?.image?.url}
                    imageAlt={items?.image?.alternativeText}
                    className="stat-box"
                  />
                );
              })}
            </div>
          )}

          {righSection?.length > 0 && (
            <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px] relative z-[1]">
              {righSection?.slice(4, 8)?.map((items) => {
                return (
                  <NumberCard
                    key={items?.id}
                    title={items?.value}
                    desc={items?.description}
                    imageSrc={items?.image?.url}
                    imageAlt={items?.image?.alternativeText}
                    className="stat-box"
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalPartner;
