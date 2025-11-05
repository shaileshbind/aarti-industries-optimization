"use client";
import React, { useEffect, useRef, useState } from "react";
import { H2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import Tabs from "../Tabs";
import DateCard from "../cards/DateCard";
import { LatestAtAartiProps } from "@/app/types/home.type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LatestAtAarti: React.FC<LatestAtAartiProps> = ({ data }) => {
  const { sectionTitle, card } = data;
  const [active, setActive] = useState<string>(card?.[0]?.post_category?.slug);
  const [activeIndex, setactiveIndex] = useState<number>(0);
  const latestAtAartiRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    let tabsAnim: gsap.core.Tween | undefined;
    if (latestAtAartiRef.current) {
      tabsAnim = gsap.fromTo(
        latestAtAartiRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: latestAtAartiRef.current,
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

  // Handle tab change: animate current cards 1 -> 0, then switch data
  const handleTabChange = (slug: string, index: number) => {
    // If no cards container yet, switch immediately
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

    // Kill previous switch animation if running
    if (switchAnimRef.current) {
      switchAnimRef.current.kill();
      switchAnimRef.current = null;
    }

    gsap.set(cards, { transformOrigin: "50% 50%" });
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => {
        // After old cards collapse, change data
        setActive(String(slug));
        setactiveIndex(index);
      },
    });
    tl.to(cards, { scale: 0, duration: 0.2, stagger: 0.05 });
    switchAnimRef.current = tl;
  };

  // Animate new DateCards 0 -> 1 when activeIndex changes
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
  return (
    <div className="w-full my-[50px] lg:my-[100px]" ref={latestAtAartiRef}>
      {sectionTitle && (
        <div className="container mx-auto">
          <H2 className="text-blue-200">{sectionTitle}</H2>
        </div>
      )}

      <div className="mt-[18px] md:mt-[30px] w-full container overflow-hidden">
        <div className="max-w-[100%] md:max-w-fit">
          <Tabs
            tabs={card}
            activeId={active}
            onChange={(slug, index) => {
              handleTabChange(slug, index);
            }}
          />
        </div>

        {card[activeIndex]?.post_category?.posts?.length > 0 && (
          <div className="mt-[52px]" ref={cardsWrapRef}>
            <Swiper
              key={active}
              spaceBetween={24}
              slidesPerView={1.5}
              breakpoints={{
                1024: { slidesPerView: 4 },
                600: { slidesPerView: 2.2 },
              }}
              modules={[Pagination, Mousewheel]}
              pagination={{
                type: "progressbar",
              }}
              direction="horizontal"
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              className="home-latest-at-swiper !overflow-visible"
            >
              {card?.[activeIndex]?.post_category?.posts?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="date-card-anim">
                    <DateCard
                      imageSrc={item?.image?.url}
                      date={item?.title}
                      desc={item?.description}
                      link={item?.slug}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestAtAarti;
