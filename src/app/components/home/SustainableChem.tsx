"use client";
import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTriggerModule from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Image from "next/image";
import { BodyText1, BodyText2, H2 } from "../Typography2";
import Button from "../Button";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { SustainableChemProps } from "@/app/types/home.type";

const ScrollTrigger = ScrollTriggerModule;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ScrollTriggerInstance {
  start: number | { value: number };
  end: number | { value: number };
  progress: number;
}

const SustainableChem: React.FC<SustainableChemProps> = ({ data }) => {
  const { leftText, rightText, images, mainSection } = data;

  const triggerRef = useRef<HTMLDivElement>(null);
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

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabMob, setActiveTabMob] = useState<number>(0);
  const [isUserInteracting] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const scrollTriggerRef = useRef<ScrollTriggerInstance | null>(null);

  const isScrollingProgrammatically = useRef<boolean>(false);

  const getScrollPositionForSlide = useCallback(
    (slideIndex: number) => {
      const st = scrollTriggerRef.current;
      if (!st) return 0;
      const start =
        typeof st.start === "number"
          ? st.start
          : (st.start as { value: number })?.value ?? window.scrollY;
      const end =
        typeof st.end === "number"
          ? st.end
          : (st.end as { value: number })?.value ?? window.scrollY;
      const totalScrollDistance = Number(end) - Number(start);
      const slideStartProgress = 0.55;
      const slideEndProgress = 1.0;
      const slideRange = slideEndProgress - slideStartProgress;
      const slideProgress = slideIndex / (mainSection?.length - 1);
      const targetProgress = slideStartProgress + slideProgress * slideRange;
      return Number(start) + targetProgress * totalScrollDistance;
    },
    [mainSection?.length]
  );

  const handleTabClick = useCallback(
    (index: number) => {
      if (index === activeTab || isScrollingProgrammatically.current) return;

      const targetScroll = getScrollPositionForSlide(index);
      if (typeof targetScroll !== "number" || Number.isNaN(targetScroll))
        return;

      isScrollingProgrammatically.current = true;
      gsap.to(window, {
        scrollTo: {
          y: targetScroll,
          autoKill: false,
        },
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveTab((prev) => (prev === index ? prev : index));
          const swiper = swiperRef.current;
          if (swiper && !swiper.destroyed) {
            const slideWidth =
              swiper.slides?.[0]?.offsetWidth ?? swiper.width ?? 0;
            const spaceBetween = Number(swiper.params?.spaceBetween) || 0;
            const totalTranslate = -index * (slideWidth + spaceBetween);
            try {
              swiper.setTranslate(totalTranslate);
              swiper.updateProgress();
              swiper.updateSlidesClasses();
            } catch (e) {
              console.error(e);
            }
          }

          requestAnimationFrame(() => {
            isScrollingProgrammatically.current = false;
          });
        },
      });
    },
    [activeTab, getScrollPositionForSlide]
  );

  const handleScrollUpdate = useCallback(
    (self: ScrollTriggerInstance) => {
      const animationPhaseEnd = 0.55;
      const isAnimationDone = self.progress >= animationPhaseEnd;

      if (isAnimationDone !== animationComplete) {
        setAnimationComplete(isAnimationDone);
      }
      if (
        !isAnimationDone ||
        isUserInteracting ||
        isScrollingProgrammatically.current
      ) {
        return;
      }

      const slidesProgress = Math.max(
        0,
        (self.progress - animationPhaseEnd) / (1 - animationPhaseEnd)
      );
      const exactSlideIndex = slidesProgress * (mainSection.length - 1);
      const newActiveIndex = Math.round(exactSlideIndex);

      if (
        swiperRef.current &&
        !swiperRef.current.destroyed &&
        !isScrollingProgrammatically.current
      ) {
        const swiper = swiperRef.current;
        const slideWidth = swiper.slides?.[0]?.offsetWidth ?? swiper.width ?? 0;
        const spaceBetween = Number(swiper.params?.spaceBetween) || 0;
        const totalTranslate = -exactSlideIndex * (slideWidth + spaceBetween);

        try {
          swiper.setTranslate(totalTranslate);
          swiper.updateProgress();
          swiper.updateSlidesClasses();
        } catch (e) {
          console.error(e);
        }
      }

      setActiveTab((prev) => (newActiveIndex !== prev ? newActiveIndex : prev));
    },
    [animationComplete, isUserInteracting, mainSection?.length]
  );

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.set(sustainbleLogo.current, {
          left: "50%",
          top: "50%",
          y: "-50%",
          x: "-50%",
          width: "200px",
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

      const mainTl = gsap.timeline({
        scrollTrigger: {
          id: "mainTrigger",
          trigger: triggerRef.current,
          start: "top 50%",
          end: isMobile ? "+=1400" : `+=${window.innerHeight * 4}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: handleScrollUpdate,
          onEnter: () => {
            scrollTriggerRef.current = ScrollTrigger.getById(
              "mainTrigger"
            ) as ScrollTriggerInstance | null;
          },
          onRefresh: () => {
            scrollTriggerRef.current = ScrollTrigger.getById(
              "mainTrigger"
            ) as ScrollTriggerInstance | null;
          },
        },
      });

      if (isMobile) {
        mainTl
          .fromTo(headinLeft.current, { x: 0, y: 0 }, { y: -150, duration: 1 })
          .fromTo(
            headinRight.current,
            { x: 0, y: 0 },
            { y: 150, duration: 1 },
            "<"
          )
          .fromTo(
            sustainbleLogo.current,
            { height: "0px" },
            { height: "203px", duration: 1 },
            "<"
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
            { y: -150, opacity: 1 },
            { y: -180, opacity: 0, duration: 0.5 },
            "<"
          )
          .fromTo(
            headinRight.current,
            { y: 150, opacity: 1 },
            { y: 180, opacity: 0, duration: 0.5 },
            "<"
          )
          .fromTo(
            susLogotr.current,
            { width: "100px" },
            { width: "500px", duration: 1 }
          )
          .fromTo(
            sustainbleLogo.current,
            {
              width: "200px",
              height: "200px",
              left: "50%",
              top: "50%",
              y: "-50%",
              x: "-50%",
            },
            {
              width: "100%",
              height: "500px",
              left: "0%",
              top: "50%",
              y: "-50%",
              x: "0%",
              duration: 1,
            },
            "<"
          )
          .to(titleSection.current, { opacity: 0, duration: 0.5 })
          .fromTo(
            envSlider.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, zIndex: 22 },
            "<"
          )
          .fromTo(
            ".sectionSpacing",
            { opacity: 0 },
            { opacity: 1, duration: 15 },
            "<"
          );
      } else {
        mainTl
          .fromTo(
            headinLeft.current,
            { x: 0, y: "unset" },
            { x: -150, duration: 1 }
          )
          .fromTo(
            headinRight.current,
            { x: 0, y: "unset" },
            { x: 150, duration: 1 },
            "<"
          )
          .fromTo(
            sustainbleLogo.current,
            { width: "0px" },
            { width: "200px", duration: 1 },
            "<"
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
            { width: "100px" },
            { width: "500px", duration: 1 }
          )
          .fromTo(
            sustainbleLogo.current,
            {
              width: "200px",
              height: "205px",
              left: "52%",
              top: "50%",
              y: "-50%",
              x: "-50%",
            },
            {
              width: "500px",
              height: "500px",
              left: "0%",
              top: "50%",
              y: "-50%",
              x: "0%",
              duration: 1,
            },
            "<"
          )
          .to(titleSection.current, {
            opacity: 0,
            duration: 1,
            filter: "blur(50px)",
          })
          .fromTo(
            envSlider.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, zIndex: 22 },
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
      isScrollingProgrammatically.current = false;
    };
  }, [handleScrollUpdate]);

  return (
    <div ref={triggerRef} className="w-full relative  min-h-[40vh]">
      <div
        ref={titleSection}
        className="absolute top-0 w-full flex justify-center items-center z-20 bg-white"
      >
        <div className="flex-col lg:flex-row flex items-center gap-2 w-[100%] lg:w-[unset]">
          {leftText && (
            <span ref={headinLeft}>
              <H2>{leftText}</H2>
            </span>
          )}

          {images?.length > 0 && (
            <div
              ref={sustainbleLogo}
              className="flex w-[200px] lg:w-[0px] h-0 lg:h-[200px] overflow-hidden absolute"
            >
              <span
                ref={sustainInner}
                className="flex flex-wrap w-full h-full min-w-[200px] absolute top-0 left-[50%] translate-x-[-50%]"
              >
                {images?.[2]?.url && (
                  <i ref={susLogotl} className="absolute top-0 left-0">
                    <Image
                      src={images?.[2]?.url}
                      alt={images?.[2]?.alternativeText || "icon"}
                      width={99}
                      height={101}
                      priority
                    />
                  </i>
                )}

                {images?.[1]?.url && (
                  <i ref={susLogotr} className="absolute top-0 right-0">
                    <Image
                      src={images?.[1]?.url}
                      alt={images?.[1]?.alternativeText || "icon"}
                      width={99}
                      height={101}
                      priority
                      className="w-full h-full"
                    />
                  </i>
                )}

                {images?.[0]?.url && (
                  <i ref={susLogobl} className="absolute bottom-0 left-0">
                    <Image
                      src={images?.[0]?.url}
                      alt={images?.[0]?.alternativeText || "icon"}
                      width={99}
                      height={101}
                      priority
                    />
                  </i>
                )}

                {images?.[3]?.url && (
                  <i ref={susLogobr} className="absolute bottom-0 right-0">
                    <Image
                      src={images?.[3]?.url}
                      alt={images?.[3]?.alternativeText || "icon"}
                      width={99}
                      height={101}
                      priority
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
      </div>

      <div
        ref={envSlider}
        className="w-full   bg-white opacity-0 absolute top-50% translate-y-[-50%] left-0"
      >
        <div className="hidden lg:flex w-full h-screen relative flex-col justify-center ">
          {mainSection?.length > 0 && (
            <div className="">
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
              >
                {mainSection.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="grid lg:grid-cols-2 gap-12 items-center flex-shrink-0 rounded-lg">
                      <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-[1rem] flex items-center justify-center">
                        <div className="absolute inset-0 overflow-hidden">
                          <Image
                            src={slide?.image?.url}
                            alt={slide?.image?.alternativeText || "banner"}
                            fill
                            className="object-cover scale-110"
                          />
                          <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                          <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[90%] h-[90%]">
                            <Image
                              src={slide?.image?.url}
                              alt={slide?.image?.alternativeText || "banner"}
                              fill
                              className="object-cover scale-110"
                            />
                          </span>
                        </div>
                        {slide?.category && (
                          <h2 className="absolute text-3xl lg:text-4xl font-medium text-white z-10">
                            {slide?.category}
                          </h2>
                        )}
                      </div>

                      <div>
                        {slide?.description && (
                          <BodyText1>{slide.description}</BodyText1>
                        )}

                        {slide?.values?.length > 0 && (
                          <div className="flex gap-12 my-8">
                            {slide?.values?.map((stat, idx) => (
                              <div key={idx}>
                                {stat?.value && (
                                  <H2 className="text-orange-200">
                                    {stat.value}
                                  </H2>
                                )}

                                {stat?.description && (
                                  <BodyText2 className="text-grey-400 mt-[5px]">
                                    {stat?.description}
                                  </BodyText2>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {slide?.ctaButton?.title && (
                          <Button
                            title={slide?.ctaButton?.title}
                            href={slide?.ctaButton?.link || "#"}
                            secondary
                          />
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div className="absolute py-4 w-full bottom-0">
            <div className="w-fit mx-auto">
              {mainSection?.length > 0 && (
                <div className="bg-grey-100 rounded-[40px] p-[4px] flex overflow-x-auto whitespace-nowrap gap-x-[unset] lg:gap-x-[14px] w-fit">
                  {mainSection?.map(
                    (items, index) =>
                      items?.category && (
                        <div
                          key={index}
                          onClick={() => handleTabClick(index)}
                          className={`text-grey-400 font-alte-hans leading-[136%] cursor-pointer py-[10px] lg:py-[12px] px-[12px] lg:px-[24px] rounded-[40px] transition-all duration-300 ${
                            activeTab === index
                              ? "text-white bg-gradient-orange-3"
                              : "hover:bg-grey-200"
                          }`}
                        >
                          {items?.category}
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="block lg:hidden container relative w-full h-auto">
          <div className="pt-[100px]">
            {mainSection?.length > 0 && (
              <div className="bg-grey-100 rounded-[40px] p-[4px] flex justify-between w-full">
                {mainSection?.map(
                  (item, index) =>
                    item?.category && (
                      <div
                        key={index}
                        onClick={() => setActiveTabMob(index)}
                        className={`text-grey-400 text-[12px] font-alte-hans leading-[136%] cursor-pointer py-[10px] px-[12px] rounded-[40px] transition-all duration-300 ${
                          activeTabMob === index
                            ? "text-white bg-gradient-orange-3"
                            : "hover:bg-grey-200"
                        }`}
                      >
                        {item?.category}
                      </div>
                    )
                )}
              </div>
            )}
          </div>
          <div className="mt-[32px]">
            <div className="grid items-center">
              {mainSection
                .filter((_, index) => index === activeTabMob)
                .map((slide, index) => (
                  <div key={index}>
                    <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-[1rem] flex items-center justify-center">
                      <div className="absolute inset-0 overflow-hidden">
                        <Image
                          src={slide?.image?.url}
                          alt={slide?.image?.alternativeText || "banner"}
                          fill
                          className="object-cover scale-110"
                        />
                        <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                        <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[90%] h-[90%]">
                          <Image
                            src={slide?.image?.url}
                            alt={slide?.image?.alternativeText || "banner"}
                            fill
                            className="object-cover scale-110"
                          />
                        </span>
                      </div>

                      {slide?.category && (
                        <h2 className="absolute text-3xl lg:text-4xl font-medium text-white z-10">
                          {slide?.category}
                        </h2>
                      )}
                    </div>

                    {slide?.description && (
                      <BodyText1 className="mt-[20px]">
                        {slide?.description}
                      </BodyText1>
                    )}

                    <div className="flex gap-12 mt-6 mb-[36px]">
                      {slide.values?.length > 0 &&
                        slide.values?.map((stat, idx) => (
                          <div key={idx}>
                            {stat?.value && (
                              <H2 className="text-orange-200">{stat?.value}</H2>
                            )}

                            {stat?.description && (
                              <BodyText2 className="text-grey-400 mt-[4px]">
                                {stat?.description}
                              </BodyText2>
                            )}
                          </div>
                        ))}
                    </div>

                    {slide?.ctaButton?.title && (
                      <Button
                        title={slide?.ctaButton?.title}
                        href={slide?.ctaButton?.link || "#"}
                        secondary
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainableChem;
