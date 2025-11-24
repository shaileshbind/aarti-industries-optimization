"use client";
import React, { useState, useRef, useEffect } from "react";
import { H2 } from "../Typography2";
import { IndependentDirectorsProps } from "@/app/types/corporate-governance.type";
import MeetMinds from "../who-we-are/MeetMinds";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DirectorsNcommittees: React.FC<IndependentDirectorsProps> = ({ data }) => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);

  const handleTabClick = (index: number) => {
    if (index === active || isTransitioning) return;

    setIsTransitioning(true);

    // If no content container yet, switch immediately
    if (!contentRef.current) {
      setActive(index);
      setIsTransitioning(false);
      return;
    }

    const content = contentRef.current;

    // Kill previous switch animation if running
    if (switchAnimRef.current) {
      switchAnimRef.current.kill();
      switchAnimRef.current = null;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => {
        // After old content fades out, change data
        setActive(index);
      },
    });

    // Fade out content
    if (content) {
      tl.to(content, { opacity: 0, duration: 0.2 }, 0);
    }

    switchAnimRef.current = tl;
  };

  // Animate tabs on mount
  useEffect(() => {
    let tabsAnim: gsap.core.Tween | undefined;
    if (tabsRef.current) {
      tabsAnim = gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 87%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    return () => {
      if (tabsAnim && tabsAnim.scrollTrigger) tabsAnim.scrollTrigger.kill();
      if (tabsAnim) tabsAnim.kill();
    };
  }, []);

  // Animate content fade in when active changes
  useEffect(() => {
    const content = contentRef.current;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Fade in content
    if (content) {
      gsap.set(content, { opacity: 0 });
      tl.to(content, { opacity: 1, duration: 0.3 }, 0);
    }

    tl.eventCallback("onComplete", () => {
      setIsTransitioning(false);
    });

    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="w-full mx-auto py-30 px-20 md:pb-[70px]">
      <div ref={tabsRef} className="flex gap-6 md:flex-row items-center">
        {data?.map((item, index) => (
          <button
            key={item?.id}
            onClick={() => handleTabClick(index)}
            className={`text-grey-300 font-alte-hans leading-[136%] text-[24px] lg:text-[44px] cursor-pointer transition-all duration-600 ease-out hover:text-orange-200/70 ${
              active === index ? "text-orange-200" : ""
            } ${isTransitioning ? "pointer-events-none" : ""}`}
          >
            <H2>{item?.category}</H2>
          </button>
        ))}
      </div>
      <div ref={contentRef}>
        {data?.[active] && (
          <MeetMinds
            data={{
              sectionTitle: data[active]?.category || "",
              management_boards: data[active]?.management_boards || [],
            }}
            hideTitle={true}
          />
        )}
      </div>
    </div>
  );
};

export default DirectorsNcommittees; 
