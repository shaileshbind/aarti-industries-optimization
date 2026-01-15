"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { H2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import DateCard from "../cards/DateCard";
import { LatestAtAartiProps } from "@/app/types/home.type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatDate } from "../../../../utils/formatDate";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const LatestAtAarti: React.FC<LatestAtAartiProps> = ({ data }) => {
  const { sectionTitle, card } = data;
  const [activeTab, setActiveTab] = useState<number>(0);
  const latestAtAartiRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [, setIsMobile] = useState<boolean>(false);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const measureIndicator = useCallback(() => {
    const activeButton = tabRefs.current[activeTab];
    if (!activeButton || !containerRef.current) {
      setIndicator((prev) =>
        prev.visible ? { ...prev, visible: false } : prev,
      );
      return;
    }
    const left =
      activeButton.offsetLeft - (containerRef.current.scrollLeft || 0);
    const width = activeButton.offsetWidth;
    setIndicator({ left, width, visible: true });
  }, [activeTab]);

  useEffect(() => {
    measureIndicator();
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        },
      );
    }
    return () => {
      if (tabsAnim && tabsAnim.scrollTrigger) tabsAnim.scrollTrigger.kill();
      if (tabsAnim) tabsAnim.kill();
    };
  }, []);

  const handleTabClick = (index: number) => {
    if (!cardsWrapRef.current) {
      setActiveTab(index);
      return;
    }

    const cards = cardsWrapRef.current.querySelectorAll(".date-card-anim");
    if (!cards || cards.length === 0) {
      setActiveTab(index);
      return;
    }

    if (switchAnimRef.current) {
      switchAnimRef.current.kill();
      switchAnimRef.current = null;
    }

    gsap.set(cards, { transformOrigin: "50% 50%" });
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => {
        setActiveTab(index);
      },
    });
    tl.to(cards, { translateY: "100%", duration: 0.2, stagger: 0.05 });
    switchAnimRef.current = tl;
  };

  useEffect(() => {
    if (!cardsWrapRef.current) return;
    const cards = cardsWrapRef.current.querySelectorAll(".date-card-anim");
    if (!cards || cards.length === 0) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    gsap.set(cards, { transformOrigin: "50% 50%", translateY: "100%" });
    tl.to(cards, { translateY: "0%", duration: 0.3, stagger: 0.05 });

    return () => {
      tl.kill();
    };
  }, [activeTab]);

  const currentCard = card[activeTab];
  const postsContent = Array.isArray(currentCard?.postContent)
    ? currentCard.postContent
    : currentCard?.postContent
      ? [currentCard.postContent]
      : [];
  const postsCount = postsContent.length;

  return (
    <div className="w-full my-24 lg:my-[100px]" ref={latestAtAartiRef}>
      <FadeInReveal delay={0.6}>
        <div className="flex justify-between gap-6 items-center px-[20px] lg:px-[60px]">
          {sectionTitle && (
            <div className="max-w-[100%] md:max-w-fit">
              <H2 className="text-blue-200">{sectionTitle}</H2>
            </div>
          )}

          {currentCard?.ctaButton?.title &&
            (currentCard?.ctaButton?.externalLink ||
              currentCard?.ctaButton?.link?.link) && (
            <div className="hidden lg:block">
              <Button
                title={currentCard?.ctaButton?.title}
                href={
                  currentCard?.ctaButton?.hasExternalLink == "true"
                    ? currentCard?.ctaButton?.externalLink
                    : currentCard?.ctaButton?.link?.link
                }
                useTargetBlank={
                  currentCard?.ctaButton?.hasExternalLink === "true"
                }
              />
            </div>
          )}
        </div>
      </FadeInReveal>

      <div className="mt-[18px] md:mt-[30px] w-full ">
        <FadeInReveal delay={0.6}>
          <div className="max-w-[100%] md:max-w-fit px-[20px] lg:px-[60px] overflow-x-auto">
            <div className=" w-full ">
              <div className="relative bg-grey-100 rounded-[40px] p-[4px]  whitespace-nowrap w-fit">
                <div
                  ref={containerRef}
                  className="relative flex gap-x-[5px] md:gap-x-[10px] z-10 px-1 w-max"
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: indicator.visible ? indicator.left : 0,
                      top: 0,
                      height: "100%",
                      borderRadius: 9999,
                      background: "#F97316",
                      width: indicator.visible ? indicator.width : 0,
                      transition:
                        "left 280ms cubic-bezier(0.4,0,0.2,1), width 280ms cubic-bezier(0.4,0,0.2,1)",
                      zIndex: 0,
                    }}
                  />
                  {card.map((item, index) => (
                    <div
                      key={item.id || index}
                      ref={(el) => {
                        if (el) {
                          tabRefs.current[index] = el;
                        }
                      }}
                      onClick={() => handleTabClick(index)}
                      className={`text-grey-400 cursor-pointer  md:text-[14px] text-[12px] font-alte-hans py-[10px]  md:px-[24px] px-[12px] rounded-[40px] relative z-10 transition-all ${
                        activeTab === index ? "text-white" : "hover:bg-grey-200"
                      }`}
                    >
                      {item.category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInReveal>
        {postsCount > 0 && (
          <FadeInReveal delay={0.6}>
            <div className="mt-[52px]" ref={cardsWrapRef}>
              <Swiper
                key={activeTab}
                spaceBetween={24}
                slidesPerView={1.5}
                breakpoints={{
                  1024: { slidesPerView: 4 },
                  600: { slidesPerView: 2.2 },
                }}
                modules={[Pagination, Mousewheel]}
                direction="horizontal"
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true,
                }}
                pagination={{
                  el: ".home-latest-at-swiper",
                  type: "progressbar",
                }}
                className=" w-full !px-[20px] lg:!px-[60px]"
              >
                {postsContent.map((item, index) => (
                  <SwiperSlide key={item?.id || index}>
                    <div className="date-card-anim">
                      <DateCard
                        imageSrc={item?.image?.url}
                        date={formatDate(item?.date)}
                        desc={item?.description}
                        link={item?.link}
                        animate
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="relative h-[1px] mx-[20px] lg:mx-[60px] mt-[30px]">
              <div className="home-latest-at-swiper !pb-0 absolute inset-0 !h-[1.5px]" />
            </div>
          </FadeInReveal>
        )}

        {currentCard?.ctaButton?.title &&
          (currentCard?.ctaButton?.externalLink ||
            currentCard?.ctaButton?.link?.link) && (
          <div className="flex lg:hidden justify-center mt-10">
            <Button
              title={currentCard?.ctaButton?.title}
              href={
                currentCard?.ctaButton?.hasExternalLink == "true"
                  ? currentCard?.ctaButton?.externalLink
                  : currentCard?.ctaButton?.link?.link
              }
              useTargetBlank={currentCard?.ctaButton?.hasExternalLink === "true"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestAtAarti;
