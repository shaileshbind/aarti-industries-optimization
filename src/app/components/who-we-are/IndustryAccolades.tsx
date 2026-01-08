"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { BodyText1, BodyText2, H2 } from "../Typography2";
import Image from "next/image";
import "swiper/css/effect-fade";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Mousewheel, Pagination, Navigation, Autoplay } from "swiper/modules";
import { IndustryAccoladesProps } from "@/app/types/who-we-are.type";
import gsap from "gsap";
import { FadeInReveal } from "../ScrollReveal";
const IndustryAccolades: React.FC<IndustryAccoladesProps> = ({ data }) => {
  const { title, awards } = data;

  const [active, setActive] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const progressRefs = useRef<HTMLDivElement[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const progressAnimationRef = useRef<gsap.core.Tween | null>(null);
  const savedProgressRef = useRef<{ [key: number]: number }>({});

  // Scroll active tab into view
  const scrollActiveTabIntoView = useCallback((index: number) => {
    const container = tabsContainerRef.current;
    const activeTab = tabRefs.current[index];
    if (!container || !activeTab) return;
    // Check if container is scrollable
    const isScrollable = container.scrollWidth > container.clientWidth;
    if (isScrollable) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      // Calculate if tab is outside visible area
      const isOutOfView =
        tabRect.left < containerRect.left ||
        tabRect.right > containerRect.right;

      if (isOutOfView) {
        // Calculate scroll position to center the tab
        const scrollLeft =
          activeTab.offsetLeft -
          container.offsetLeft -
          container.clientWidth / 2 +
          activeTab.clientWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, []);

  // Handle tab click (manual click or programmatic)
  const handleTabClick = useCallback((index: number) => {
    setActive((currentActive) => {
      if (index === currentActive) return currentActive;
      setIsTransitioning(true);
      // Kill the current progress animation when manually switching
      progressRefs.current.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
      // Clear saved progress for the new tab (start fresh)
      delete savedProgressRef.current[index];
      if (progressAnimationRef.current) {
        progressAnimationRef.current.kill();
        progressAnimationRef.current = null;
      }

      const cards = cardsWrapRef.current?.querySelectorAll(".award-card-anim");
      if (switchAnimRef.current) {
        switchAnimRef.current.kill();
        switchAnimRef.current = null;
      }
      if (!cards || cards.length === 0) {
        setIsTransitioning(false);
        return index;
      }
      const tl = gsap.timeline({
        defaults: { ease: "power2.in" },
        onComplete: () => {
          // Animation complete, allow next transition
        },
      });
      gsap.set(cards, { transformOrigin: "50% 50%", translateY: "0%" });
      tl.to(cards, { translateY: "100%", duration: 0.2, stagger: 0.05 }, 0);

      switchAnimRef.current = tl;
      return index;
    });
  }, []);
  // Scroll active tab into view when active changes
  useEffect(() => {
    scrollActiveTabIntoView(active);
  }, [active, scrollActiveTabIntoView]);

  // Animate only the active tab's progress bar (only when in viewport)
  useEffect(() => {
    if (!awards || awards.length === 0) return;
    
    const activeProgress = progressRefs.current[active];
    if (!activeProgress) return;
    
    // Kill all existing progress animations
    progressRefs.current.forEach((el) => {
      if (el) gsap.killTweensOf(el);
    });
    if (progressAnimationRef.current) {
      // Save current progress before killing
      const currentProgress = progressAnimationRef.current.progress();
      if (currentProgress > 0 && currentProgress < 1) {
        savedProgressRef.current[active] = currentProgress;
      }
      progressAnimationRef.current.kill();
      progressAnimationRef.current = null;
    }
    
    // Reset other bars
    progressRefs.current.forEach((el, idx) => {
      if (el && idx !== active) gsap.set(el, { width: "0%" });
    });
    
    // Get saved progress or start from 0%
    const savedProgress = savedProgressRef.current[active] || 0;
    const startWidth = `${savedProgress * 100}%`;
    const remainingDuration = 20 * (1 - savedProgress);
    
    // Set initial width
    gsap.set(activeProgress, { width: startWidth });
    
    // Only start animation if section is in viewport
    if (isInViewport && remainingDuration > 0) {
      // Animate the active tab's progress from saved position
      progressAnimationRef.current = gsap.to(activeProgress, {
        width: "100%",
        duration: remainingDuration,
        ease: "linear",
        onComplete: () => {
          // Clear saved progress when complete
          delete savedProgressRef.current[active];
          const nextIndex = (active + 1) % awards.length;
          handleTabClick(nextIndex);
        },
      });
    } else if (!isInViewport) {
      // Clear saved progress when tab changes while out of viewport
      delete savedProgressRef.current[active];
      gsap.set(activeProgress, { width: "0%" });
    }

    // Cleanup on unmount or when active changes
    return () => {
      if (activeProgress) gsap.killTweensOf(activeProgress);
      if (progressAnimationRef.current) {
        progressAnimationRef.current.kill();
        progressAnimationRef.current = null;
      }
    };
  }, [active, awards, handleTabClick, isInViewport]);

  // Animate cards on tab change
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0);
      setActiveIndex(0);
      if (swiperRef.current.pagination && swiperRef.current.pagination.el) {
        swiperRef.current.pagination.render();
        swiperRef.current.pagination.update();
      }
    }
    const cards = cardsWrapRef.current?.querySelectorAll(".award-card-anim");
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    if (cards && cards.length > 0) {
      gsap.set(cards, { translateY: "100%", transformOrigin: "50% 50%" });
      tl.to(cards, { translateY: "0%", duration: 0.3, stagger: 0.05 }, 0);
    }
    tl.eventCallback("onComplete", () => {
      setIsTransitioning(false);
    });
    return () => {
      tl.kill();
    };
  }, [active]);

  // Intersection Observer for autoplay and progress bar control
  useEffect(() => {
    const section = sectionRef.current;
    const swiper = swiperRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
            // Start autoplay when section enters viewport
            if (swiper?.autoplay && !swiper.autoplay.running) {
              swiper.autoplay.start();
            }
          } else {
            // Save progress before pausing
            if (progressAnimationRef.current) {
              const currentProgress = progressAnimationRef.current.progress();
              if (currentProgress > 0 && currentProgress < 1) {
                savedProgressRef.current[active] = currentProgress;
              }
              progressAnimationRef.current.pause();
            }
            setIsInViewport(false);
            // Stop autoplay when section leaves viewport
            if (swiper?.autoplay && swiper.autoplay.running) {
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
  }, [active]); // Re-run when active tab changes to observe new swiper instance

  return (
    <div ref={sectionRef} className="py-[72px] lg:pt-[140px] lg:pb-[100px]">
      {title && (
        <FadeInReveal delay={0.6}>
          <H2 className="text-left lg:text-center container">{title}</H2>
        </FadeInReveal>
      )}
      {/* Tabs */}
      {awards?.[0]?.card?.length > 0 && (
        <div
          ref={tabsContainerRef}
          className="mt-[27px] lg:mt-[36px] w-full lg:w-fit flex gap-x-[20px] lg:gap-x-[46px] overflow-x-auto lg:overflow-hidden px-[20px] lg:px-auto mx-[unset] lg:mx-auto md:justify-center"
        >
          {awards?.map((items, index) => (
            <div
              key={items.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => !isTransitioning && handleTabClick(index)}
              className={`relative border-b px-[13px] pb-[4px] cursor-pointer transition-all duration-300 ${
                active === index ? "border-transparent" : "border-grey-200"
              } ${isTransitioning ? "pointer-events-none" : ""}`}
            >
              <BodyText2
                className={`transition-all duration-300 whitespace-nowrap  ${
                  active === index ? "text-orange-200" : "text-[#9997A2]"
                }`}
              >
                {items?.year}
              </BodyText2>
              {/* Grey underline */}
              <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-grey-200"></div>
              {/* Orange progress underline */}
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-orange-200"
                style={{ width: "0%" }}
                ref={(el) => {
                  if (el) progressRefs.current[index] = el;
                }}
              ></div>
            </div>
          ))}
        </div>
      )}
      {/* Swiper */}
      {awards?.[active]?.card?.length > 0 && (
        <div ref={cardsWrapRef} className="mt-[36px] lg:mt-[40px]">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              // Don't start autoplay immediately - wait for viewport intersection
              if (swiper.autoplay) {
                swiper.autoplay.stop();
              }
            }}
            slidesPerView={1.5}
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4 },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            observer={true}
            observeParents={true}
            direction="horizontal"
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }}
            modules={[Pagination, Mousewheel, Navigation, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: ".awards-section-swiper",
              type: "progressbar",
            }}
            navigation={{
              nextEl: ".swiper-button-next-awardsSection",
              prevEl: ".swiper-button-prev-awardsSection",
            }}
            className="w-full !px-[20px] lg:!px-[60px]"
          >
            {awards?.[active]?.card?.map((item, idx) => (
              <SwiperSlide key={`${active}-${idx}`}>
                <div className="award-card-anim">
                  {item?.image?.url && (
                    <div className="bg-[#EFF3F5] rounded-[20px] p-6 xl:p-10 grid place-items-center h-[230px] overflow-hidden lg:h-[320px] 2xl:h-[360px] ">
                      <Image
                        src={item?.image?.url}
                        alt={item?.image?.alternativeText || "award"}
                        width={70}
                        height={190}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  {item?.title && (
                    <BodyText1 className="mt-[14px] text-blue-200">
                      {item?.title}
                    </BodyText1>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {/* Navigation */}
      <div className="w-full mt-[40px]">
        <div className="mx-[20px] lg:mx-[60px] flex items-center lg:gap-x-[32px]">
          <div className="w-[100%] lg:w-[95%] relative">
            <div className="awards-section-swiper" />
          </div>
          {(awards?.[active]?.card?.length || 0) > 4 && (
            <div className="w-fit gap-x-[12px] hidden lg:flex">
              <button
                className={`swiper-button-prev-awardsSection transition-opacity ${
                  activeIndex === 0
                    ? "pointer-events-none opacity-30"
                    : "cursor-pointer opacity-100"
                }`}
                aria-label="Previous slide"
                onClick={() => swiperRef.current?.slidePrev()}
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
                className={`swiper-button-next-awardsSection transition-opacity ${
                  activeIndex >=
                  (awards?.[active]?.card?.length || 0) -
                    Math.floor(
                      typeof swiperRef.current?.params.slidesPerView ===
                        "number"
                        ? swiperRef.current.params.slidesPerView
                        : 1
                    )
                    ? "pointer-events-none opacity-30"
                    : "cursor-pointer opacity-100"
                }`}
                aria-label="Next slide"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <Image
                  src="/images/home/chevron-right-orange.svg"
                  alt="Next"
                  width={34}
                  height={34}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndustryAccolades;
