"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTriggerModule from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Image from "next/image";
import { BodyText2, H2, SubH1 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Mousewheel, Autoplay, Scrollbar } from "swiper/modules";
import { RDAnalyticalExcProps } from "@/app/types/r-and-d.type";
import GeneralPopup from "../Popups/GeneralPopup";
import clsx from "clsx";
import { useMargin } from "@/app/contexts/MarginContext";

const ScrollTrigger = ScrollTriggerModule;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ScrollTriggerInstance {
  start: number | { value: number };
  end: number | { value: number };
  progress: number;
}

const RDAnalyticalExc: React.FC<RDAnalyticalExcProps> = ({
  data,
  sliderData,
  className,
  showButton = true,
}) => {
  const { leftText, rightText } = data;
  const { details } = sliderData;
  const [showGeneralPopup, setshowGeneralPopup] = useState<boolean>(false);
  const [active, setActive] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const headinLeft = useRef<HTMLSpanElement>(null);
  const headinRight = useRef<HTMLSpanElement>(null);
  const sustainbleLogo = useRef<HTMLDivElement>(null);
  const sustainInner = useRef<HTMLSpanElement>(null);
  const envSlider = useRef<HTMLDivElement>(null);
  const titleSection = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTriggerInstance | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const isScrollingProgrammatically = useRef<boolean>(false);
  const { setMarginBottom } = useMargin();
  const triggerIdRef = useRef<string>("aartiAdvantageTrigger");

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const triggerId = triggerIdRef.current;
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

      // Kill any existing ScrollTrigger with this ID before creating a new one
      const existingTrigger = ScrollTrigger.getById(triggerId);
      if (existingTrigger) {
        existingTrigger.kill();
      }

      const mainTl = gsap.timeline({
        scrollTrigger: {
          id: triggerId,
          trigger: triggerRef.current,
          start: "top 50%",
          end: "+=1200",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            scrollTriggerRef.current = ScrollTrigger.getById(
              triggerId
            ) as ScrollTriggerInstance | null;
          },
          onRefresh: () => {
            scrollTriggerRef.current = ScrollTrigger.getById(
              triggerId
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
            { height: "203px", duration: 0.5 },
             "<"
          )
          .fromTo(
            sustainInner.current,
            { width: '200px', height: '200px', opacity: 0,  },
            { width: window.innerWidth - 40 + "px",opacity: 1,  
              height: window.innerWidth - 40 + "px", ease:"power4.inOut", duration: 0.5},
            "<"
          )
          .fromTo(
            headinLeft.current,
            { y: -150, opacity: 1 },
            { y: -180, opacity: 0, duration: 0.5 },  
          )
          .fromTo(
            headinRight.current,
            { y: 150, opacity: 1 },
            { y: 180, opacity: 0, duration: 0.5 },
            "<"
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
              height: "90vh",
              left: "50%",
              top: "50%",
              y: "-50%",
              x: "-50%",
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
            { opacity: 1, duration: 5 },
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
            sustainInner.current ,
            { opacity: 0, scale: 0.5, transformOrigin: "center center" },
            { opacity: 1, scale: 1, transformOrigin: "center center", duration: 0.3, ease:"power4.inOut",  
            },
            "<0.4"
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
              width: window.innerWidth > 1280 ? "600px" : window.innerWidth > 1024 && window.innerWidth < 1280 ? "400px" : "100%",
              height: window.innerWidth > 1280 ? "600px" : window.innerWidth > 1024 && window.innerWidth < 1280 ? "400px" : "100vh",
              left: "0%",
              top: "50%",
              y: "-50%",
              x: "0%",
              duration: 1,
            },
             
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
          .to(titleSection.current, {
            opacity: 0,
            duration: 1,
             
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
      // Explicitly kill the ScrollTrigger instance
      const triggerId = triggerIdRef.current;
      const existingTrigger = ScrollTrigger.getById(triggerId);
      if (existingTrigger) {
        existingTrigger.kill();
      }
      ctx.revert();
      isScrollingProgrammatically.current = false;
    };
  }, []);
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
        const margin = totalHeight - screenHeight + 70;
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
  }, [active, details?.length, setMarginBottom]);

  return (
    <>
      <div
        ref={triggerRef}
        className="w-full relative  min-h-[40vh] mt-[100px] lg:mt-[unset]"
      >
        <div
          ref={titleSection}
          className="absolute top-0 w-full flex justify-center items-center z-20 bg-white  "
        >
          <div className=" flex-col lg:flex-row flex items-center gap-2 w-[100%] lg:w-[unset]  lg:pt-[unset] ">
            {leftText && (
              <span
                className={clsx(`lg:min-w-[366px] lg:text-right`, className)}
                ref={headinLeft}
              >
                <H2>{leftText}</H2>
              </span>
            )}
            {details[active]?.image?.url && (
              <div
                ref={sustainbleLogo}
                className="flex w-[200px] lg:w-[0px] h-0 lg:h-[200px] overflow-hidden absolute rounded-2xl "
              >
                <span
                  ref={sustainInner}
                  className="flex flex-wrap  w-full h-full min-w-[200px] min-h-[200px] rounded-[20px] overflow-hidden absolute top-0 left-[50%] translate-x-[-50%] "
                >
                  <Image
                    src={details[active]?.image?.url}
                    alt={
                      details[active]?.title ? details[active]?.title : "img"
                    }
                    fill
                    className="object-cover"
                  />
                </span>
              </div>
            )}

            {rightText && (
              <span className="lg:min-w-[366px]" ref={headinRight}>
                <H2>{rightText}</H2>
              </span>
            )}
          </div>
        </div>
        <div
          ref={envSlider}
          className="w-full opacity-0 absolute top-50% translate-y-[-47%] left-0 "
        >
          <div ref={sliderContainerRef} className="flex w-full h-screen relative flex-col lg:justify-center pt-[80px] lg:pt-[unset]">
            <div ref={contentContainerRef} className=" mx-[20px] lg:mx-[unset] mb-[70px] md:mb-0 lg:mb-[unset] grid lg:grid-cols-[400px_1fr] xl:grid-cols-[600px_1fr] lg:gap-x-[80px] xl:gap-x-[100px]  md:items-center">
              <div className="relative w-full randdImageHeight pt-[100%] overflow-hidden rounded-[1rem] flex items-center justify-center">
                {details[active]?.image?.url && (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={details[active]?.image?.url}
                      alt={details[active]?.title}
                      fill
                      className="object-cover scale-110"
                    />
                    <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md bg-white/30"></i>
                    <span className="absolute bottom-0 left-0 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[100%] h-[100%]">
                      <Image
                        src={details[active]?.image?.url}
                        alt={details[active]?.image?.url}
                        fill
                        className="object-cover scale-110"
                      />
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full overflow-hidden">
                <div className="mb-[10px] items-center lg:mb-[17px] flex justify-between max-w-[100%] lg:max-w-[464px] xl:max-w-[664px] ">
                  <BodyText2 className="text-orange-200">
                    0{active + 1}-<span>0{details?.length}</span>
                  </BodyText2>
                  <div className="hidden lg:block">
                    <div className="flex gap-3">
                      <Image
                        src="/images/home/chevron-right-orange.svg"
                        alt="prev"
                        width={34}
                        height={34}
                        className={`-rotate-180 swiper-button-prev-analytical transition-opacity ${
                          active > 0
                            ? "cursor-pointer opacity-100"
                            : "pointer-events-none opacity-30"
                        }`}
                      />
                      <Image
                        src="/images/home/chevron-right-orange.svg"
                        alt="next"
                        width={34}
                        height={34}
                        className={`swiper-button-next-analytical transition-opacity ${
                          active < details?.length - 1
                            ? "cursor-pointer opacity-100"
                            : "pointer-events-none opacity-30"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                {/* Swiper section */}
                {details?.length > 0 && (
                  <Swiper
                  modules={[Navigation, Scrollbar, Mousewheel, Autoplay]}
                  autoplay={{
                    delay: 15000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                      nextEl: ".swiper-button-next-analytical",
                      prevEl: ".swiper-button-prev-analytical",
                    }}
                  // slidesOffsetAfter={offsetAfter}
                  onSlideChange={(swiper) => setActive(swiper.activeIndex)}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                      allowTouchMove: true,
                    },
                    768: {
                      
                      spaceBetween: 80,
                      allowTouchMove: false,
                    },
                  }}
                  scrollbar={{ draggable: true }}
                  direction="horizontal"
                  mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                  }}
                  className="framework-forged-swiper"
                    // slidesPerView={
                    //   typeof window !== "undefined" && window.innerWidth < 1024
                    //     ? 1
                    //     : 1.2
                    // }
                    // spaceBetween={80}
                    // loop={false}
                    // onSlideChange={(swiper) => setActive(swiper.activeIndex)}
                    // speed={800}
                    // modules={[Navigation, Mousewheel, Autoplay]}
                    // autoplay={{
                    //   delay: 15000,
                    //   disableOnInteraction: false,
                    // }}
                    // className="w-full relative"
                    // navigation={{
                    //   nextEl: ".swiper-button-next-analytical",
                    //   prevEl: ".swiper-button-prev-analytical",
                    // }}
                    // mousewheel={{
                    //   forceToAxis: true,
                    //   sensitivity: 1,
                    //   releaseOnEdges: true,
                    // }}
                  >
                    {details?.map((slide, index) => (
                      <SwiperSlide key={slide?.id}>
                        <div
                          className={`grid gap-12 pr-10 items-center flex-shrink-0 rounded-lg transition-all duration-500 ${
                            active !== index
                              ? "lg:blur-sm lg:opacity-70"
                              : "lg:blur-0 lg:opacity-100"
                          }`}
                        >
                          <div>
                            {slide?.title && (
                              <SubH1 className="mt-[unset] lg:mt-[30px]">
                                {slide?.title}
                              </SubH1>
                            )}
                            {slide?.description && (
                              <BodyText2 className="mt-[8px]">
                                {slide?.description}
                              </BodyText2>
                            )}
                            {slide?.BulletPoints?.length > 0 && (
                              <div className="mt-[20px]">
                                {slide?.BulletPoints?.map((items) => (
                                  <div
                                    key={items?.id}
                                    className="flex lg:gap-4 lg:mb-4 mb-2 gap-2 items-center"
                                  >
                                    <Image
                                      src="/images/home/star.svg"
                                      alt="star"
                                      width={16}
                                      height={16}
                                    />
                                    {items?.title && (
                                      <BodyText2 className="text-grey-400">
                                        {items?.title}
                                      </BodyText2>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                            {showButton && (
                              <div className="mt-[20px] lg:mt-[40px]">
                                <button
                                  onClick={() => {
                                    setshowGeneralPopup(true);
                                  }}
                                  className={`animated-underline w-fit cursor-pointer text-orange-200 text-[16px] font-normal leading-[100% font-alte-hans underline underline-offset-[4px] [text-underline-position:under]`}
                                >
                                  Read More
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                {/* Mobile progress bar */}
                <div className="block lg:hidden mt-9 w-full h-[2px] bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-200 transition-all duration-500"
                    style={{
                      width: `${((active + 1) / details?.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GeneralPopup
        isOpen={showGeneralPopup}
        setshowGeneralPopup={setshowGeneralPopup}
        // document={document}
        prefillCategory="Business Products / Services"
        prefillSubCategory="LAB Testing (Analytical/ Safety)"
      />
    </>
  );
};

export default RDAnalyticalExc;
