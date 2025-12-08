"use client";
import React, { useState, useRef, useEffect } from "react";
import SimpleTabs from "../SimpleTabs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CorporateVideo from "./CorporateVideo";
import Photos from "./Photos";
import Logos from "./Logos";
import BrandGuidelines from "./BrandGuidelines";
import Brochures from "./Brochures";
import { MediaContainerProps, TabProps } from "@/app/types/media-kit.type";
import { FadeInReveal } from "../ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function MediaContainer({ data }: MediaContainerProps) {
  // Transform data into tabs format
  const tabs =
    (data as TabProps[])?.map((item) => ({
      title: item.title,
      slug: item.title.toLowerCase().replace(/\s+/g, "-"),
      id: item.id,
    })) || [];

  const [active, setActive] = useState(tabs?.[0]?.slug || "");
  const [activeIndex, setactiveIndex] = useState(0);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get active data based on activeIndex
  const activeData = data?.[activeIndex];

  // Initial animation for the container
  useEffect(() => {
    let containerAnim: gsap.core.Tween | undefined;
    if (containerRef.current) {
      containerAnim = gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 87%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    return () => {
      if (containerAnim && containerAnim.scrollTrigger)
        containerAnim.scrollTrigger.kill();
      if (containerAnim) containerAnim.kill();
    };
  }, []);

  // Handle tab change with animation
  const handleTabChange = (slug: string, index: number) => {
    if (!cardsWrapRef.current) {
      setActive(String(slug));
      setactiveIndex(index);
      return;
    }

    const cards = cardsWrapRef.current.querySelectorAll(".date-card-anim");
    if (!cards || cards.length === 0) {
      setActive(String(slug));
      setactiveIndex(index);
      return;
    }

    // Kill any existing animation
    if (switchAnimRef.current) {
      switchAnimRef.current.kill();
      switchAnimRef.current = null;
    }

    // Animate out, then change state
    gsap.set(cards, { transformOrigin: "50% 50%" });
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => {
        setActive(String(slug));
        setactiveIndex(index);
      },
    });
    tl.to(cards, { scale: 0, duration: 0.2, stagger: 0.05 });
    switchAnimRef.current = tl;
  };

  // Animate in new cards when activeIndex changes
  useEffect(() => {
    if (!cardsWrapRef.current) return;
    const cards = cardsWrapRef.current.querySelectorAll(".date-card-anim");
    if (!cards || cards.length === 0) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    gsap.set(cards, { transformOrigin: "50% 50%", scale: 0 });
    tl.to(cards, { scale: 1, duration: 0.3, stagger: 0.05 });

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  // Render component based on activeIndex
  const renderContent = () => {
    if (!activeData) return <div>No content available</div>;

    switch (activeIndex) {
      case 0:
        return <CorporateVideo data={activeData} />;
      case 1:
        return <Photos data={activeData} />;
      case 2:
        return <Logos data={activeData} />;
      case 3:
        return <BrandGuidelines data={activeData} />;
      case 4:
        return <Brochures data={activeData} />;
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <div className="pt-[60px] pb-[50px] lg:pb-[100px]" ref={containerRef}>
      <div className="fluid-container">
        <SimpleTabs
          tabs={tabs}
          activeId={active}
          onChange={(slug, index) => {
            handleTabChange(slug, index);
          }}
          indicatorColor="var(--gradient-orange-1)"
          innerClassName="rounded-[40px]"
          leftAlign
        />

        {/* Cards container */}
        <FadeInReveal>
          <div className="mt-[30px] lg:mt-[12px]" ref={cardsWrapRef}>
            {renderContent()}
          </div>
        </FadeInReveal>
      </div>
    </div>
  );
}
