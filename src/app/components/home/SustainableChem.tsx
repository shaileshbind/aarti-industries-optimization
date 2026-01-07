"use client";
import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTriggerModule, { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import Image from "next/image";
import { H2 } from "../Typography2";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { SustainableChemProps } from "@/app/types/home.type";
import SliderCard from "../cards/SliderCard";
import { useMargin } from "@/app/contexts/MarginContext";
import {useMediaQuery} from "@mui/material";

const ScrollTrigger = ScrollTriggerModule;
gsap.registerPlugin(ScrollTrigger);

const ANIMATION_END_PROGRESS = 0.55;

const SustainableChem: React.FC<SustainableChemProps> = ({ data }) => {
  // const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:1023px)");
  const { leftText, rightText, mainSection } = data;
  const triggerRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const tabBarContainerRef = useRef<HTMLDivElement>(null);
  const headinLeft = useRef<HTMLSpanElement>(null);
  const headinRight = useRef<HTMLSpanElement>(null);
  const sustainbleLogo = useRef<HTMLDivElement>(null);
  const susLogotl = useRef<HTMLElement>(null);
  const susLogotr = useRef<HTMLElement>(null);
  const susLogobl = useRef<HTMLElement>(null);
  const susLogobr = useRef<HTMLElement>(null);
  const sustainInner = useRef<HTMLSpanElement>(null);
  const envSlider = useRef<HTMLDivElement>(null);
  const titleSection = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollTriggerRef = useRef<ScrollTriggerType | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabMob, setActiveTabMob] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const leafBigImg = useRef<HTMLSpanElement>(null);
  const mobileSliderContainerRef = useRef<HTMLDivElement>(null);
  const susLogoinnerblurtr = useRef<HTMLSpanElement>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  
  // Calculate slideWidth after component mounts (client-side only)
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      // Detect if running on Mac
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      console.log("isMac", isMac);
      
      if (isMac) {
        // Mac calculation
        setSlideWidth((window.innerWidth / 1.28) * 40 / 100);
      } else {
        // Windows calculation
        setSlideWidth(((window.innerWidth - 22) / 1.28) * 40 / 100);
        
      }
    }
  }, []);
  
 // console.log("slideWidth", slideWidth );  
  const { setMarginBottom } = useMargin();
  const indicatorColor =
    "linear-gradient(142deg, #FA8129 22.06%, #DC4C03 147.93%)";
  const indicatorTransition =
    "left 280ms cubic-bezier(0.4,0,0.2,1), width 280ms cubic-bezier(0.4,0,0.2,1)";

  const measureIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeButton = tabRefs.current[activeTab] ?? null;

    if (!activeButton) {
      setIndicator((prev) =>
        prev.visible ? { ...prev, visible: false } : prev
      );
      return;
    }

    const left = activeButton.offsetLeft - (container.scrollLeft || 0);
    const width = activeButton.offsetWidth;
    setIndicator((prev) => {
      if (prev.left === left && prev.width === width && prev.visible)
        return prev;
      return { left, width, visible: true };
    });
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st || !mainSection.length) return;

    const total = mainSection.length;
    const clampedIndex = Math.max(0, Math.min(index, total - 1));

    // Map tab index (0 → last) into ScrollTrigger progress space
    const slideProgress = total > 1 ? clampedIndex / (total - 1) : 0;
    const progress =
      ANIMATION_END_PROGRESS +
      slideProgress * (1 - ANIMATION_END_PROGRESS);

    const start =
      typeof st.start === "number" ? st.start : (st.start as number) || 0;
    const end = typeof st.end === "number" ? st.end : (st.end as number) || 0;
    const distance = end - start;
    const targetY = start + distance * progress;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.set(sustainbleLogo.current, {
          left: "50%",
          top: "50%",
          y: "-50%",
          x: "-50%",
          width: "206px",
          height: "0px",
        });
      } else {
        gsap.set(sustainbleLogo.current, {
          left: "52%",
          top: "50%",
          y: "-50%",
          x: "-50%",
        });
      }
      gsap.set(envSlider.current, { opacity: 0 });
      gsap.set(".leafStag", { opacity: 0, scale: 0.5, transformOrigin: "center center" });

      // Animation timeline - handles the initial animations and slide sync
      const animationEndProgress = ANIMATION_END_PROGRESS;
      const animationScrollDistance = isMobile
        ? window.innerHeight * 1.5
        : window.innerHeight * 4;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          id: "mainTrigger",
          trigger: triggerRef.current,
          start: isMobile ? "top top" : "top 50%",
          end: `+=${animationScrollDistance}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Sync slides after animation phase (55% progress) - similar to test slider logic
            if(!isMobile) {
            if (
              self.progress >= animationEndProgress &&
              swiperRef.current &&
              mainSection.length > 0
            ) {
              const slides = mainSection.length;
              // Map progress from 0.55 to 1.0 to slide indices 0 to slides-1
              const slideProgress =
                (self.progress - animationEndProgress) /
                (1 - animationEndProgress);
              const progress = slideProgress * (slides - 1);
              const index = Math.round(progress);

              if (
                swiperRef.current &&
                !swiperRef.current.destroyed &&
                index !== swiperRef.current.activeIndex
              ) {
                swiperRef.current.slideTo(index);
                setActiveTab(index);
              }
            }
          }
          },
          onLeave: () => {
            if (!isMobile && tabsRef.current) {
              gsap.to(tabsRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.2,
              });
            }
          },
          onEnterBack: () => {
            if (!isMobile && tabsRef.current) {
              gsap.to(tabsRef.current, {
                opacity: 1,
                duration: 0.6,
                ease: "power2.in",
              });
            }
          },
        },
      });

      // Store ScrollTrigger instance for tab click handling
      if (mainTl.scrollTrigger) {
        scrollTriggerRef.current = mainTl.scrollTrigger;
      }

      if (isTablet) {
        mainTl
          .fromTo(headinLeft.current, { x: 0, y: 0 }, { y: -150, duration: 6 })
          .fromTo(
            headinRight.current,
            { x: 0, y: 0 },
            { y: 150, duration: 6 },
            "<"
          )
          .fromTo(
            sustainbleLogo.current,
            { height: "0px" },
            { height: "203px", duration: 6 },
            "<"
          )
          .fromTo(
            ".leafStag" ,
            { opacity: 0, scale: 0.5, transformOrigin: "center center" },
            { opacity: 1, scale: 1, transformOrigin: "center center", duration: 1, stagger: 0.1, ease:"power4.inOut",  
            },
             "<4"
          )
          .fromTo(
            susLogotl.current,
            { opacity: 1 },
            { opacity: 0, duration: 1 }
          )
          .fromTo(
            susLogobl.current,
            { opacity: 1 },
            { opacity: 0, duration: 1 },
            "<"
          )
          .fromTo(
            susLogobr.current,
            { opacity: 1 },
            { opacity: 0, duration: 1 },
            "<"
          )
          .fromTo(
            headinLeft.current,
            { y: -150, opacity: 1 },
            { y: -180, opacity: 0, duration: 1 },
            "<"
          )
          .fromTo(
            headinRight.current,
            { y: 150, opacity: 1 },
            { y: 180, opacity: 0, duration: 1 },
            "<"
          )
          .fromTo(
            susLogotr.current,
            { width: "100px", height: "100px", right: 0, top: 0 },
            { width: window.innerWidth - 40, height: '250px', right: 20, top: '170px',  duration: 1 }
          )
          .fromTo(
            '.leafBigImg',
            { scale: '2' },
            { scale: '1', duration: 1 },
            "<"
          )
          .fromTo(
            sustainbleLogo.current,
            {
              width: "206px",
              height: "206px",
              left: "50%",
              top: "50%",
              // y: "-50%",
              // x: "-50%",
            },
            {
              width: "100%",
              height: "100vh",
              left: "0%",
              top: "50%",
              // y: "-50%",
              x: "0%",
              duration: 1,
            },
            "<"
          )
          .fromTo(
            susLogoinnerblurtr.current,
            { borderRadius: '50% 50% 50% 50%', opacity: 1 },
            { borderRadius: '0% 0% 0% 0%', opacity: 1, duration: 0.5 }
          )
          .to(titleSection.current, { opacity: 0, duration: 0.5 })
          .fromTo(
            mobileSliderContainerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, zIndex: 22 },
            "<"
          )
          .fromTo(
            '.sliderStagger',
            { opacity: 0, x : 100 },
            { opacity: 1, x : 0, duration: 0.7, stagger: 0.1, ease:"power4.inOut",   },
            "<"
          )
          .fromTo(
            ".sectionSpacing",
            { opacity: 0 },
            { opacity: 1, duration: 5 },
            "<"
          );
      } else {
        mainTl
          .fromTo(
            headinLeft.current,
            { x: 0, y: "unset" },
            { x: -150, duration: 0.5 }
          )
          .fromTo(
            headinRight.current,
            { x: 0, y: "unset" },
            { x: 150, duration: 0.5 },
            "<"
          )
          .fromTo(
            sustainbleLogo.current,
            { width: "0px" },
            { width: "206px", duration: 0.5 },
            "<"
          )
          .fromTo(
            ".leafStag" ,
            { opacity: 0, scale: 0.5, transformOrigin: "center center" },
            { opacity: 1, scale: 1, transformOrigin: "center center", duration: 0.3, stagger: 0.1, ease:"power4.inOut",  
            },
             "<0.2"
          )
          .fromTo(
            susLogotl.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 }
          )
          .fromTo(
            susLogobl.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 },
            "<"
          )
          .fromTo(
            susLogobr.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 },
            "<"
          )
          .fromTo(
            headinLeft.current,
            { x: -150, opacity: 1 },
            { x: -180, opacity: 0, duration: 0.5 },
            "<"
          )
          .fromTo(
            headinRight.current,
            { x: 150, opacity: 1 },
            { x: 180, opacity: 0, duration: 0.5 },
            "<"
          )
          .fromTo(
            susLogotr.current,
            { width: "100px", height: "100px" },
            { width:  () => `${slideWidth}px`, height:  () => `${slideWidth}px`, duration: 1 }
          )
          .fromTo(
            leafBigImg.current,
            { x: '0px' },
            { x: '-20px', duration: 1 },
            "<"
          )
         
          .fromTo(
            sustainbleLogo.current,
            {
              width: "206px",
              height: "206px",
              left: "52%",
              top: "50%",
              // y: "50%",
              // x: "-50%",
            },
            {
              width:  () => `${slideWidth}px`,
              height:  () => `${slideWidth}px`,

              left: "0%",
              top: "50%",
              // y: "50%",
              x: "0%",
              duration: 1,
            },
            "<"
          )
          .fromTo(
            susLogoinnerblurtr.current,
            { borderRadius: '50% 50% 50% 50%', opacity: 1 },
            { borderRadius: '0% 0% 0% 0%', opacity: 1, duration: 0.5 }
             
          )
          .fromTo(
            envSlider.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, zIndex: 22 },
            "<0.3"
          )
          .fromTo(
            '.sliderStagger',
            { opacity: 0, x : 100 },
            { opacity: 1, x : 0, duration: 0.7, stagger: 0.1, ease:"power4.inOut",   },
            "<"
          )
          .fromTo(
            ".sectionSpacing",
            { opacity: 0 },
            { opacity: 1, duration: 5 },
            "<"
          );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [mainSection.length, slideWidth]);

  useLayoutEffect(() => {
    measureIndicator();

    const resizeObserver = new ResizeObserver(measureIndicator);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      tabRefs.current.forEach((button) => {
        if (button) resizeObserver.observe(button);
      });
    }

    const handleResize = () => measureIndicator();
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab, mainSection.length, measureIndicator]);

  useLayoutEffect(() => {
    const calculateMarginBottom = () => {
      const sliderContainer = sliderContainerRef.current;
      const tabBarContainer = tabBarContainerRef.current;
      if (!sliderContainer || !tabBarContainer) {
        setMarginBottom(0);
        return;
      }
      const sliderHeight = sliderContainer.offsetHeight;
      const tabBarHeight = tabBarContainer.offsetHeight;
      const screenHeight = window.innerHeight;
      const totalHeight = sliderHeight + tabBarHeight;

      if (totalHeight > screenHeight) {
        const margin = totalHeight - screenHeight;
        setMarginBottom(margin + 50);
      } else {
        setMarginBottom(0);
      }
    };

    calculateMarginBottom();

    const resizeObserver = new ResizeObserver(calculateMarginBottom);
    if (sliderContainerRef.current) {
      resizeObserver.observe(sliderContainerRef.current);
    }
    if (tabBarContainerRef.current) {
      resizeObserver.observe(tabBarContainerRef.current);
    }

    const handleResize = () => calculateMarginBottom();
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTabMob, mainSection.length, setMarginBottom]);

    const handlMobileTabClick = (index: number) => {
        if(index === activeTabMob) return;
        const swiper = swiperRef.current;
        if(swiper && !swiper.destroyed) {
            swiper.slideTo(index);
            setActiveTabMob(index);
        }
    };

  return (
    <div
      ref={triggerRef}
      className="w-full relative  lg:min-h-[40vh] min-h-[100vh] mt-[0px] lg:mt-[unset]"
    >
      <div
        ref={titleSection}
        className="absolute top-1/2 -translate-y-1/2 lg:top-0 w-full flex justify-center items-center z-20 bg-white"
      >
        <div className="flex-col lg:flex-row flex items-center gap-2 w-[100%] lg:w-[unset]">
          {leftText && (
            <span ref={headinLeft}>
              <H2>{leftText}</H2>
            </span>
          )}

          {mainSection?.[0]?.image?.url && (
            <div
              ref={sustainbleLogo}
              className="flex w-[206px] lg:w-[0px] h-0 lg:h-[206px] overflow-hidden absolute"
            >
              <span
                ref={sustainInner}
                className="flex flex-wrap w-full h-full min-w-[206px] min-h-[206px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
              >
                {mainSection?.[0]?.image?.url && (
                  <i ref={susLogotl} className="leafStag absolute top-0 left-1 w-[99px] h-[101px] rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[20px] overflow-hidden">
                    <Image
                      src={mainSection?.[0]?.image?.url}
                      alt={"icon"}
                      fill
                      priority
                      className=" scale-110 object-cover"
                    />
                  </i>
                )}

                {mainSection?.[0]?.image?.url && (
                  <i ref={susLogotr} className="leafStag absolute top-0 right-[2px] w-[99px] h-[101px] rounded-[1rem] overflow-hidden z-[1]">
                    <span ref={susLogoinnerblurtr}  className="susLogotrBlurSpan rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[10%] rounded-br-[50%] overflow-hidden w-full h-full absolute top-0 left-0">
                      <Image
                        src={mainSection?.[0]?.image?.url}
                        alt={"icon"}
                        fill
                        priority
                        className=" object-cover blur scale-110"
                      />
                    </span>
                    <span ref={leafBigImg} className="w-full h-full absolute top-0 left-0 rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[10%] rounded-br-[50%] overflow-hidden">
                      <Image
                        src={mainSection?.[0]?.image?.url}
                        alt={"icon"}
                        fill
                        priority
                        className="leafBigImg scale-110 object-cover "
                      />
                    </span>
                </i>
                )}
                {mainSection?.[0]?.image?.url && (
                  <i ref={susLogobr} className="leafStag absolute bottom-[3px] right-[2px] w-[99px] h-[101px] rounded-tl-[10%] rounded-tr-[50%] rounded-bl-[50%] rounded-br-[50%] overflow-hidden">
                    <Image
                      src={mainSection?.[0]?.image?.url}
                      alt={"icon"}
                      fill
                      priority
                      className="scale-110 object-cover"
                    />
                  </i>
                )}
                {mainSection?.[0]?.image?.url && (
                  <i ref={susLogobl} className="leafStag absolute bottom-[3px] left-1 w-[99px] h-[101px] rounded-tl-[50%] rounded-tr-[10%] rounded-bl-[50%] rounded-br-[50%] overflow-hidden">
                    <Image
                      src={mainSection?.[0]?.image?.url}
                      alt={"icon"}
                      fill
                      priority
                      className="scale-110 object-cover"
                    />
                  </i>
                )}
              </span>
            </div>
          )}
          {rightText && (
            <span ref={headinRight}>
              <H2>{rightText}</H2>
            </span>
          )}
        </div>
        <div
        ref={envSlider}
        className="w-full max-h-[100vh] bg-white opacity-0 absolute top-0%  left-0">
        <div className="hidden lg:flex w-full h-screen relative flex-col justify-center ">
          {/* {mainSection?.length > 0 && !isMobile && ( */}
          {mainSection?.length > 0 && !isTablet && (
            <div>
              <Swiper
                slidesPerView={1.2}
                spaceBetween={32}
                loop={false}
                allowTouchMove={false}
                speed={600}
                watchSlidesProgress={true}
                updateOnWindowResize={true}
                className="w-full h-auto"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  swiper.on("resize", () => {
                    swiper.updateSize();
                    swiper.updateSlides();
                    swiper.updateProgress();
                    swiper.updateSlidesClasses();
                  });
                }}
                onSlideChange={(swiper) => {
                  setActiveTab(swiper.activeIndex);
                }}
              >
                {mainSection.map((slide, index) => (
                  <SwiperSlide key={slide.id}>
                    <SliderCard
                      imgSrc={slide?.image?.url}
                      imgAlt={slide?.image?.alternativeText || "banner"}
                      title={slide?.category}
                      description={slide?.description}
                      values={slide?.values}
                      ctaButton={slide?.ctaButton}
                      imageWrapperRef={imageWrapperRef as React.RefObject<HTMLDivElement>}  
                      index={index}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <div ref={tabsRef} className="absolute py-4 w-full bottom-0">
            <div className="w-fit mx-auto">
              {mainSection?.length > 0 && !isTablet && (
                <div className="relative bg-grey-100 rounded-[40px] p-[4px] overflow-x-auto whitespace-nowrap w-fit">
                  <div
                    ref={containerRef}
                    className="relative flex gap-x-[unset] lg:gap-x-[14px] z-10 px-1 w-max"
                  >
                    {/* Animated Indicator */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: indicator.visible ? indicator.left : 0,
                        top: 0,
                        height: "100%",
                        borderRadius: 9999,
                        background: indicatorColor,
                        width: indicator.visible ? indicator.width : 0,
                        transition: indicatorTransition,
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Tab Buttons */}
                    {mainSection?.map(
                      (items, index) =>
                        items?.category && (
                          <div
                            key={index}
                            ref={(element) => {
                              tabRefs.current[index] = element;
                            }}
                            onClick={() => handleTabClick(index)}
                            className={`text-grey-400 font-alte-hans leading-[136%] cursor-pointer py-[10px] lg:py-[12px] px-[12px] lg:px-[24px] rounded-[40px] transition-all duration-300 relative z-10 text-sm ${
                              activeTab === index
                                ? "text-white"
                                : "hover:bg-grey-200"
                            }`}
                          >
                            {items?.category}
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
      <div ref={mobileSliderContainerRef} className="block lg:hidden container absolute top-1/2 -translate-y-1/2  left-0 w-full h-[100vh]">
          <div className="pt-[110px]" ref={tabBarContainerRef}>
            {mainSection?.length > 0 && isTablet && (
                <div className="relative bg-grey-100 rounded-[40px] p-[4px] overflow-x-auto whitespace-nowrap w-fit">
                  <div
                    ref={containerRef}
                    className="relative flex gap-x-[unset] lg:gap-x-[14px] z-10 px-1 w-max"
                  >
                    {/* Animated Indicator */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: indicator.visible ? indicator.left : 0,
                        top: 0,
                        height: "100%",
                        borderRadius: 9999,
                        background: indicatorColor,
                        width: indicator.visible ? indicator.width : 0,
                        transition: indicatorTransition,
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Tab Buttons */}
                    {mainSection?.map(
                      (items, index) =>
                        items?.category && (
                          <div
                            key={index}
                            ref={(element) => {
                              tabRefs.current[index] = element;
                            }}
                            onClick={() => handlMobileTabClick(index)}
                            className={`text-grey-400 text-[12px] md:text-base z-10 lg:text-[12px] font-alte-hans leading-[136%] cursor-pointer py-[10px] px-[8px] md:px-4 lg:px-[12px] rounded-[40px] transition-all duration-300 ${
                              activeTab === index
                                ? "text-white"
                                : "hover:bg-grey-200"
                            }`}
                          >
                            {items?.category}
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
          </div>
          <div className="mt-[16px] lg:mt-[32px]" ref={sliderContainerRef}>
            <div className="grid items-center">
                {isTablet && (
                  <Swiper
                slidesPerView={1}
                loop={false}
                allowTouchMove={true}
                speed={600}
                watchSlidesProgress={true}
                updateOnWindowResize={true}
                className="w-full h-auto"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  swiper.on("resize", () => {
                    swiper.updateSize();
                    swiper.updateSlides();
                    swiper.updateProgress();
                    swiper.updateSlidesClasses();
                     
                  });
                }}
                onSlideChange={(swiper) => {
                  setActiveTab(swiper.activeIndex);
                }}
              >
                {mainSection.map((slide, index) => (
                  <SwiperSlide key={slide.id}>
                    <SliderCard
                      imgSrc={slide?.image?.url}
                      imgAlt={slide?.image?.alternativeText || "banner"}
                      title={slide?.category}
                      description={slide?.description}
                      values={slide?.values}
                      ctaButton={slide?.ctaButton}
                      imageWrapperRef={imageWrapperRef as React.RefObject<HTMLDivElement>}  
                      index={index}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
                )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default SustainableChem;
