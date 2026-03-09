"use client";
import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTriggerModule from "gsap/ScrollTrigger";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SliderCard from "../cards/SliderCard";
import { H2 } from "../Typography2";
import { LAAVisionProps } from "@/app/types/life-at-aarti.type";
import { useMargin } from "@/app/contexts/MarginContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FadeInReveal } from "../ScrollReveal";

const ScrollTrigger = ScrollTriggerModule;

type ContentSection = NonNullable<
  NonNullable<LAAVisionProps["data"]>["content"]
>[number];
type ContentCard = NonNullable<
  NonNullable<ContentSection["card"]>[number]
>;

const PeopleVision = ({ data }: LAAVisionProps) => {
  const isTablet = useMediaQuery("(max-width:1023px)");
  const { title, content } = data;
  const isMobile = useMediaQuery("(max-width:600px)");
  const triggerRef = useRef<HTMLDivElement>(null);
  const tabBarContainerRef = useRef<HTMLDivElement>(null);
  const sustainbleLogo = useRef<HTMLDivElement>(null);
  const susLogotl = useRef<HTMLElement>(null);
  const susLogotr = useRef<HTMLElement>(null);
  const susLogobl = useRef<HTMLElement>(null);
  const susLogobr = useRef<HTMLElement>(null);
  const sustainInner = useRef<HTMLSpanElement>(null);
  const leafBigImg = useRef<HTMLSpanElement>(null);
  const envSlider = useRef<HTMLDivElement>(null);
  const titleSection = useRef<HTMLDivElement>(null);

  const tabsRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabMob, setActiveTabMob] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const susLogoinnerblurtr = useRef<HTMLSpanElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const measureSlideWidth = () => {
      if (imageWrapperRef.current) {
        const width = imageWrapperRef.current.offsetWidth;
        if (width > 0) {
          setSlideWidth(width);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      measureSlideWidth();
    }, 0);

    window.addEventListener("resize", measureSlideWidth);

    const resizeObserver = new ResizeObserver(() => {
      measureSlideWidth();
    });

    if (imageWrapperRef.current) {
      resizeObserver.observe(imageWrapperRef.current);
    } else {
      const checkRef = setInterval(() => {
        if (imageWrapperRef.current) {
          resizeObserver.observe(imageWrapperRef.current);
          clearInterval(checkRef);
        }
      }, 50);

      setTimeout(() => clearInterval(checkRef), 1000);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measureSlideWidth);
      resizeObserver.disconnect();
    };
  }, [content?.length]);

  const { setMarginBottom } = useMargin();

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const indicatorColor = "#F97316";
  const indicatorTransition =
    "left 280ms cubic-bezier(0.4,0,0.2,1), width 280ms cubic-bezier(0.4,0,0.2,1)";

  const measureIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeButton = tabRefs.current[activeTab] ?? null;

    if (!activeButton) {
      setIndicator((prev) =>
        prev.visible ? { ...prev, visible: false } : prev,
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

  const handleTabClick = useCallback(
    (index: number, e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (index === activeTab) return;

      const swiper = swiperRef.current;
      if (swiper && !swiper.destroyed) {
        swiper.slideTo(index);
        setActiveTab(index);
      }
    },
    [activeTab],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isTablet) {
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
      gsap.set(".leafStag", {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "center center",
      });
      const animationEndProgress = 0.55;
      const animationScrollDistance = isTablet
        ? window.innerHeight * 1.5
        : window.innerHeight * 4;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          id: "respGrowthTrigger11",
          trigger: triggerRef.current,
          start: "top 50%",
          end: `+=${animationScrollDistance}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 0,
          onUpdate: (self) => {
            if (!isTablet) {
              if (
                self.progress >= animationEndProgress &&
                swiperRef.current &&
                content &&
                content.length > 0
              ) {
                const slides = content.length;

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
            if (!isTablet && tabsRef.current) {
              gsap.to(tabsRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.2,
              });
            }
          },
          onEnterBack: () => {
            if (!isTablet && tabsRef.current) {
              gsap.to(tabsRef.current, {
                opacity: 1,
                duration: 0.6,
                ease: "power2.in",
              });
            }
          },
        },
      });

      if (isTablet) {
        mainTl
          .fromTo(
            sustainbleLogo.current,
            { height: "203px" },
            { height: "203px", duration: 0.1 },
          )
          .fromTo(
            ".leafStag",
            { opacity: 0, scale: 0.5, transformOrigin: "center center" },
            {
              opacity: 1,
              scale: 1,
              transformOrigin: "center center",
              duration: 1,
              stagger: 0.1,
              ease: "power4.inOut",
            },
          )
          .fromTo(
            susLogotl.current,
            { opacity: 1 },
            { opacity: 0, duration: 1 },
          )
          .fromTo(
            susLogobl.current,
            { opacity: 1 },
            { opacity: 0, duration: 1 },
            "<",
          )
          .fromTo(
            susLogobr.current,
            { opacity: 1 },
            { opacity: 0, duration: 1 },
            "<",
          )
          .fromTo(
            susLogotr.current,
            { width: "100px", height: "100px", right: 0, top: 0 },
            {
              width: window.innerWidth - 40,
              height: "250px",
              right: 20,
              top: "140px",
              duration: 1,
            },
          )
          .fromTo(
            sustainbleLogo.current,
            {
              width: "206px",
              height: "206px",
              left: "50%",
              top: "50%",
            },
            {
              width: "100%",
              height: "100vh",
              left: "0%",
              top: "50%",
              x: "0%",
              duration: 1,
            },
            "<",
          )
          .fromTo(
            susLogoinnerblurtr.current,
            { borderRadius: "50% 50% 50% 50%", opacity: 1 },
            { borderRadius: "0% 0% 0% 0%", opacity: 1, duration: 0.5 },
          )
          .fromTo(
            envSlider.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, zIndex: 22 },
            "<",
          )
          .fromTo(
            ".sectionSpacing",
            { opacity: 0 },
            { opacity: 1, duration: 2 },
            "<",
          );
      } else {
        mainTl
          .fromTo(
            ".leafStag",
            { opacity: 0, scale: 0.5, transformOrigin: "center center" },
            {
              opacity: 1,
              scale: 1,
              transformOrigin: "center center",
              duration: 0.3,
              stagger: 0.1,
              ease: "power4.inOut",
            },
            "<0.2",
          )
          .fromTo(
            susLogotl.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 },
          )
          .fromTo(
            susLogobl.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 },
            "<",
          )
          .fromTo(
            susLogobr.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 },
            "<",
          )

          .fromTo(
            susLogotr.current,
            { width: "100px", height: "100px" },
            {
              width: () => `${slideWidth}px`,
              height: () => `${slideWidth}px`,
              duration: 1,
            },
          )

          .fromTo(
            sustainbleLogo.current,
            {
              width: "206px",
              height: "206px",
              left: "52%",
              top: "50%",
            },
            {
              width: () => `${slideWidth}px`,
              height: () => `${slideWidth}px`,
              left: "0%",
              top: "50%",
              x: "0%",
              duration: 1,
            },
            "<",
          )
          .fromTo(
            susLogoinnerblurtr.current,
            { borderRadius: "50% 50% 50% 50%", opacity: 1 },
            { borderRadius: "0% 0% 0% 0%", opacity: 1, duration: 0.5 },
          )
          .fromTo(
            leafBigImg.current,
            { width: "100%" },
            { width: "calc(100% - 14px)" },
            "<",
          )
          .fromTo(
            envSlider.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, zIndex: 22 },
          )
          .fromTo(
            ".sliderStagger",
            { opacity: 0, x: 100 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power4.inOut",
            },
            "<",
          )
          .fromTo(
            ".sectionSpacing",
            { opacity: 0 },
            { opacity: 1, duration: 5 },
            "<",
          );
      }
    });

    return () => {
      ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }, [content?.length, slideWidth, isTablet]);

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
  }, [activeTab, content, measureIndicator]);

  useLayoutEffect(() => {
    const calculateMarginBottom = () => {
      const sliderContainer = envSlider.current;
      const contentContainer = contentContainerRef.current;
      if (!sliderContainer || !contentContainer) {
        setMarginBottom(0);
        return;
      }
      const contentHeight =
        contentContainer.scrollHeight || contentContainer.offsetHeight;
      const screenHeight = window.innerHeight;
      const totalHeight = contentHeight + 100;

      if (totalHeight > screenHeight) {
        const margin = totalHeight - screenHeight;
        setMarginBottom(margin);
      } else {
        setMarginBottom(0);
      }
    };

    calculateMarginBottom();

    const resizeObserver = new ResizeObserver(calculateMarginBottom);
    if (envSlider.current) {
      resizeObserver.observe(envSlider.current);
    }
    if (contentContainerRef.current) {
      resizeObserver.observe(contentContainerRef.current);
    }

    const handleResize = () => calculateMarginBottom();
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab, content?.length, setMarginBottom]);

  const handlMobileTabClick = (index: number) => {
    if (index === activeTabMob) return;
    const swiper = swiperRef.current;
    if (swiper && !swiper.destroyed) {
      swiper.slideTo(index);
      setActiveTabMob(index);
    }
  };
  return (
    <>
      {title && (
        <FadeInReveal delay={0.6}>
          <H2 className="text-center max-w-[780px] mx-[20px] lg:mx-auto ">
            {title}
          </H2>
        </FadeInReveal>
      )}
      <div
        ref={triggerRef}
        className="w-full relative min-h-[40vh] mt-[200px] lg:mt-[100px] "
      >
        {/* Title Section */}
        <div
          ref={titleSection}
          className="absolute top-0 w-full flex justify-center items-center z-20 bg-white"
        >
          <div className="flex-col lg:flex-row flex items-center gap-2 w-[100%] lg:w-[unset]">
            {content?.[0]?.card?.[0]?.image?.url && (
              <div
                ref={sustainbleLogo}
                className="flex w-[206px] lg:w-[0px] h-0 lg:h-[206px] overflow-hidden absolute"
              >
                <span
                  ref={sustainInner}
                  className="flex flex-wrap w-full h-full min-w-[206px] min-h-[206px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
                >
                  {content?.[0]?.card?.[0]?.image?.url && (
                    <i
                      ref={susLogotl}
                      className="leafStag absolute top-0 left-1 w-[99px] h-[101px] rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[20px] overflow-hidden"
                    >
                      <Image
                        src={content?.[0]?.card?.[0]?.image?.url}
                        alt={"icon"}
                        fill
                        priority
                        className="scale-110 object-cover"
                      />
                    </i>
                  )}

                  {content?.[0]?.card?.[0]?.image?.url && (
                    <i
                      ref={susLogotr}
                      className="leafStag absolute top-0 right-[2px] w-[99px] h-[101px] rounded-[1rem] overflow-hidden z-[1]"
                    >
                      <span
                        ref={susLogoinnerblurtr}
                        className="susLogotrBlurSpan rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[10%] rounded-br-[50%] overflow-hidden w-full h-full absolute top-0 left-0"
                      >
                        <Image
                          src={content?.[0]?.card?.[0]?.image?.url}
                          alt={"icon"}
                          fill
                          priority
                          className="leafBigImg object-cover blur"
                        />
                      </span>
                      <span
                        ref={leafBigImg}
                        className="w-full h-full absolute top-0 left-0 rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[10%] rounded-br-[50%] overflow-hidden"
                      >
                        <Image
                          src={content?.[0]?.card?.[0]?.image?.url}
                          alt={"icon"}
                          fill
                          priority
                          className="leafBigImg scale-110 object-cover "
                        />
                      </span>
                    </i>
                  )}
                  {content?.[0]?.card?.[0]?.image?.url && (
                    <i
                      ref={susLogobr}
                      className="leafStag absolute bottom-[3px] right-[2px] w-[99px] h-[101px] rounded-tl-[10%] rounded-tr-[50%] rounded-bl-[50%] rounded-br-[50%] overflow-hidden"
                    >
                      <Image
                        src={content?.[0]?.card?.[0]?.image?.url}
                        alt={"icon"}
                        fill
                        priority
                        className="scale-110 object-cover"
                      />
                    </i>
                  )}
                  {content?.[0]?.card?.[0]?.image?.url && (
                    <i
                      ref={susLogobl}
                      className="leafStag absolute bottom-[3px] left-1 w-[99px] h-[101px] rounded-tl-[50%] rounded-tr-[10%] rounded-bl-[50%] rounded-br-[50%] overflow-hidden"
                    >
                      <Image
                        src={content?.[0]?.card?.[0]?.image?.url}
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
          </div>

          {/* Slider Section */}
          <div
            ref={envSlider}
            className="w-full max-h-[100vh] bg-white opacity-0 absolute top-0%  left-0 z-20 xxx"
          >
            {/* Desktop Slider */}
            <div className="hidden lg:flex w-full h-screen relative flex-col justify-center">
              <div data-lenis-prevent-touch>
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
                  {content?.map((section: ContentSection) =>
                    section?.card?.map((slide: ContentCard, index: number) => (
                      <SwiperSlide key={slide?.id}>
                        <SliderCard
                          imgSrc={slide?.image?.url}
                          imgAlt={slide?.image?.alternativeText || "banner"}
                          title={section?.category} // parent category
                          description={slide?.description}
                          values={slide?.values}
                          ctaButton={slide?.ctaButton}
                          heading={slide?.title}
                          bullets={slide?.BulletPoints}
                          imageWrapperRef={
                            imageWrapperRef as React.RefObject<HTMLDivElement>
                          }
                          index={index}
                        />
                      </SwiperSlide>
                    )),
                  )}
                </Swiper>
              </div>

              {/* Tabs */}
              <div ref={tabsRef} className="absolute py-4 w-full bottom-0">
                <div className="w-fit mx-auto">
                  <div className="relative bg-grey-100 rounded-[40px] p-[4px] overflow-x-auto whitespace-nowrap w-fit">
                    <div
                      ref={containerRef}
                      className="relative flex gap-x-[unset] lg:gap-x-[14px] z-10 px-1 w-max"
                    >
                      {/* Indicator */}
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
                      {/* Buttons */}
                      {content?.map(
                        (items: ContentSection, index: number) =>
                          items?.category && (
                            <div
                              key={index}
                              ref={(element) => {
                                tabRefs.current[index] = element;
                              }}
                              onClick={(e) => handleTabClick(index, e)}
                              className={`text-grey-400 font-alte-hans leading-[136%] cursor-pointer py-[10px] lg:py-[12px] px-[12px] lg:px-[24px] rounded-[40px] transition-all duration-300 relative z-10 ${
                                activeTab === index
                                  ? "text-white"
                                  : "hover:bg-grey-200"
                              }`}
                            >
                              {items?.category}
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile */}
            <div className="block lg:hidden container absolute top-1/2 -translate-y-1/2 left-0 w-full !h-[100%] min-h-[100vh] ">
              <div className="relative" ref={contentContainerRef}>
                <div className="w-full absolute mt-[70px]">
                  <div className="pt-[10px]" ref={tabBarContainerRef}>
                    {content && content.length > 0 && isMobile && (
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
                          {content?.map(
                            (items: ContentSection, index: number) =>
                              items?.category && (
                                <div
                                  key={index}
                                  ref={(element) => {
                                    tabRefs.current[index] = element;
                                  }}
                                  onClick={() => handlMobileTabClick(index)}
                                  className={`text-grey-400 text-[11px] md:text-base z-10 lg:text-[12px] font-alte-hans leading-[136%] cursor-pointer py-[10px] px-[8px] md:px-4 lg:px-[12px] rounded-[40px] transition-all duration-300 ${
                                    activeTab === index
                                      ? "text-white"
                                      : "hover:bg-grey-200"
                                  }`}
                                >
                                  {items?.category}
                                </div>
                              ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid items-center gap-6 mt-4" data-lenis-prevent-touch>
                    {isMobile && (
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
                        {content?.map((section: ContentSection) =>
                          section?.card?.map((slide: ContentCard, index: number) => (
                            <SwiperSlide key={slide?.id}>
                              <SliderCard
                                imgSrc={slide?.image?.url}
                                imgAlt={
                                  slide?.image?.alternativeText || "banner"
                                }
                                title={section?.category}
                                description={slide?.description}
                                values={slide?.values}
                                ctaButton={slide?.ctaButton}
                                heading={slide?.title}
                                bullets={slide?.BulletPoints}
                                index={index}
                              />
                            </SwiperSlide>
                          )),
                        )}
                      </Swiper>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleVision;
