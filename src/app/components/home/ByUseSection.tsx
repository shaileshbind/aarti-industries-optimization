"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BodyText2, H2, SubH1 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import Button from "../Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleCard from "../cards/TitleCard";
import type { Swiper as SwiperType } from "swiper";
import { ByUseSectionProps } from "@/app/types/home.type";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

const ByUseSection: React.FC<ByUseSectionProps> = ({ data, sectionFiveTitle }) => {
  const [active, setActive] = useState(0);
  const [, setIsTransitioning] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  }, [active]);

  const handleTabClick = (index: number) => {
    if (index === active) return;
    // Kill previous switch animation if running
    if (switchAnimRef.current) {
      switchAnimRef.current.kill();
      switchAnimRef.current = null;
    }

    setIsTransitioning(true);

    const cards = cardsWrapRef.current?.querySelectorAll(".title-card-anim");
    const leftContent = leftContentRef.current;
    // If no content yet, switch immediately
    if (!cards?.length && !leftContent) {
      setActive(index);
      setIsTransitioning(false);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setIsTransitioning(false);
      },
    });

    // Fade out left content and cards simultaneously
    if (leftContent) {
      tl.to(leftContent, { opacity: 0, y: -20, duration: 0.2 }, 0);
    }

    if (cards && cards.length > 0) {
      gsap.set(cards, { transformOrigin: "50% 50%" });
      tl.to(
        cards,
        {
          translateY: "100%",
          opacity: 0,
          duration: 0.2,
          stagger: 0.03,
        },
        0
      );
    }

    // Change content at midpoint
    tl.call(
      () => {
        setActive(index);
      },
      undefined,
      0.15
    );
    // Fade in new content (this will be picked up by the useEffect)
    tl.to({}, { duration: 0.05 }); // Small gap for data to update
  };
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

  // Tabs New
  useEffect(() => {
    const activeTab = tabRefs.current[active];
    const container = containerRef.current;
    if (activeTab && container) {
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicator({
        left:
          tabRect.left -
          containerRect.left +
          container.scrollLeft,
        width: tabRect.width,
        visible: true,
      });
    }
  }, [active, data]);

  useEffect(() => {
    const cards = cardsWrapRef.current?.querySelectorAll(".title-card-anim");
    const leftContent = leftContentRef.current;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Fade in left content
    if (leftContent) {
      gsap.set(leftContent, { opacity: 0, y: 20 });
      tl.to(leftContent, { opacity: 1, y: 0, duration: 0.25 }, 0);
    }

    // Fade in cards
    if (cards && cards.length > 0) {
      gsap.set(cards, {
        transformOrigin: "50% 50%",
        translateY: "100%",
        opacity: 0,
      });
      tl.to(
        cards,
        {
          translateY: "0%",
          opacity: 1,
          duration: 0.25,
          stagger: 0.04,
        },
        0.05
      );
    }

    return () => {
      tl.kill();
    };
  }, [active]);

  // Intersection Observer for autoplay control
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Always get the current swiper instance inside callback
          // This ensures we use the new swiper after tab changes
          const swiper = swiperRef.current;
          if (!swiper || !swiper.autoplay) return;

          if (entry.isIntersecting) {
            // Start autoplay when section enters viewport
            if (!swiper.autoplay.running) {
              swiper.autoplay.start();
            }
          } else {
            // Stop autoplay when section leaves viewport
            if (swiper.autoplay.running) {
              swiper.autoplay.stop();
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: "0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []); // Only set up observer once - it will check current swiper instance dynamically

  return (
    <div
      ref={(el) => {
        tabsRef.current = el;
        sectionRef.current = el;
      }}
      className="mt-[72px] md:mt-2 lg:mt-[50px] overflow-hidden "
    >
     {sectionFiveTitle && <H2 className="max-w-[970px] mx-[20px] lg:mx-[60px] mb-[26px]">
        {sectionFiveTitle}
      </H2>}
      {/* Tabs */}
      <div className="ml-[unset] lg:ml-[60px] w-full overflow-x-auto px-5 lg:px-0">
        {data?.length > 0 && (
          <div className="relative bg-grey-100 rounded-[40px] p-[4px] whitespace-nowrap w-fit">
            <div
              ref={containerRef}
              className="relative flex gap-x-[5px] md:gap-x-[10px] z-10 px-1 w-max"
            >
              {/* Animated Indicator */}
              <div
                aria-hidden
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
              {/* Tabs */}
              {data?.map(
                (item, index) =>
                  item?.category && (
                    <div
                      key={item?.id ?? index}
                      ref={(el) => {(tabRefs.current[index] = el)}}
                      onClick={() => handleTabClick(index)}
                      className={`relative z-10 cursor-pointer font-alte-hans leading-[136%]
                        py-[10px] px-[12px] md:px-[24px] text-[12px] md:text-[14px]
                        rounded-[40px] transition-all duration-300
                        ${
                          active === index
                            ? "text-white"
                            : "text-grey-400 hover:bg-grey-200"
                        }`}
                    >
                      {item?.category}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div ref={contentRef} className="mt-[40px] lg:mt-[62px]">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Content */}
          <div
            ref={leftContentRef}
            className="px-5 lg:pl-[60px] lg:pr-20 lg:w-[450px] xl:w-[500px] flex-shrink-0 mb-8 lg:mb-0"
          >
            {data?.[active]?.title && (
              <SubH1 className="text-blue-200">{data?.[active]?.title}</SubH1>
            )}

            {data?.[active]?.description && (
              <BodyText2 className="text-grey-400 mt-[10px] mb-[24px] lg:mb-[36px]">
                {data?.[active]?.description}
              </BodyText2>
            )}

            {data?.[active]?.ctaButton?.title &&
              (data?.[active]?.ctaButton?.hasExternalLink == "true"
                ? data?.[active]?.ctaButton?.externalLink
                : data?.[active]?.ctaButton?.link?.link) && (
              <Button
                secondary
                href={
                  data?.[active]?.ctaButton?.hasExternalLink == "true"
                    ? data?.[active]?.ctaButton?.externalLink
                    : data?.[active]?.ctaButton?.link?.link
                }
                title={data?.[active]?.ctaButton?.title}
                useTargetBlank={data?.[active]?.ctaButton?.hasExternalLink == "true"}
              />
            )}
          </div>
          {/* Right Swiper */}
          <div className="flex-1 min-w-0 mt-[8px] lg:mt-[0px]">
            <div className="relative">
              {data?.[active]?.card?.length > 0 && (
                <div ref={cardsWrapRef}>
                  <Swiper
                    key={`swiper-${active}`}
                    spaceBetween={14}
                    slidesPerView={1.2}
                    breakpoints={{
                      600: {
                        slidesPerView: 2.5,
                        spaceBetween: 24,
                      },
                      1024: {
                        slidesPerView: 2.2,
                        spaceBetween: 24,
                      },
                      1440: {
                        slidesPerView: 2.6,
                        spaceBetween: 24,
                      },
                      1740: {
                        slidesPerView: 3.2,
                        spaceBetween: 24,
                      },
                    }}
                    modules={[Pagination, Navigation, Mousewheel, Autoplay]}
                    navigation={{
                      prevEl: ".swiper-button-prev-useBySection",
                      nextEl: ".swiper-button-next-useBySection",
                    }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    pagination={{
                      el: ".home-by-use-section-swiper",
                      type: "progressbar",
                    }}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                      setIsBeginning(swiper.isBeginning);
                      setIsEnd(swiper.isEnd);
                      // Don't start autoplay immediately - wait for viewport intersection
                      if (swiper.autoplay) {
                        swiper.autoplay.stop();
                      }
                      // Check if section is already in viewport and start autoplay if so
                      if (sectionRef.current && swiper.autoplay) {
                        const rect = sectionRef.current.getBoundingClientRect();
                        const isInViewport = 
                          rect.top < window.innerHeight * 0.8 && 
                          rect.bottom > window.innerHeight * 0.2;
                        if (isInViewport && !swiper.autoplay.running) {
                          swiper.autoplay.start();
                        }
                      }
                    }}
                    onSlideChange={(swiper) => {
                      setIsBeginning(swiper.isBeginning);
                      setIsEnd(swiper.isEnd);
                    }}
                    onReachBeginning={() => {
                      setIsBeginning(true);
                    }}
                    onReachEnd={() => {
                      setIsEnd(true);
                    }}
                    onFromEdge={(swiper) => {
                      setIsBeginning(swiper.isBeginning);
                      setIsEnd(swiper.isEnd);
                    }}
                    direction="horizontal"
                    mousewheel={{
                      forceToAxis: true,
                      sensitivity: 1,
                      releaseOnEdges: true,
                    }}
                    className="w-full !pr-5 lg:!pr-5 !pl-5 lg:!pl-0"
                  >
                    {data?.[active]?.card?.map((item, index) => (
                      <SwiperSlide key={`${active}-${index}`}>
                        <div className="title-card-anim">
                          <Link href={item?.link || "#"}>
                            <TitleCard
                              imageSrc={item?.image?.url}
                              title={item?.title}
                            />
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="relative py-[30px] mx-[20px] lg:mx-[unset] mt-[12px] flex justify-between items-center lg:pr-[50px]">
                
                <div className="home-by-use-section-swiper  h-[2px] w-[100%] lg:w-[calc(100%-150px)] !relative" />
                <div className="hidden lg:flex w-fit gap-3 px-5 lg:px-0 ml-5">
                  <button
                    className={`swiper-button-prev-useBySection transition-opacity ${
                      isBeginning
                        ? "pointer-events-none opacity-30"
                        : "cursor-pointer opacity-100"
                    }`}
                    aria-label="Previous slide"
                    aria-disabled={isBeginning}
                  >
                    <Image
                      src="/images/home/chevron-right-orange.svg"
                      alt="Previous"
                      width={34}
                      height={34}
                      className="rotate-180"
                    />
                  </button>
                  <button
                    className={`swiper-button-next-useBySection transition-opacity ${
                      isEnd
                        ? "pointer-events-none opacity-30"
                        : "cursor-pointer opacity-100"
                    }`}
                    aria-label="Next slide"
                    aria-disabled={isEnd}
                  >
                    <Image
                      src="/images/home/chevron-right-orange.svg"
                      alt="Next"
                      width={34}
                      height={34}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByUseSection;