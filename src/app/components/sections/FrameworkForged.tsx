"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BodyText2, H2, SubH1 } from "../Typography2";
import Button from "../Button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Navigation, Scrollbar } from "swiper/modules";
import { FrameworkForgedProps } from "@/app/types/home.type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import { FadeInReveal } from "../ScrollReveal";
import type { Swiper as SwiperType } from "swiper";

gsap.registerPlugin(ScrollTrigger);
interface LayoutProps {
  layout?: "imgLeftContentRight" | "imgRightContentLeft";
}

const FrameworkForged: React.FC<FrameworkForgedProps & LayoutProps> = ({
  data,
  layout,
}) => {
  const { title, card } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetAfter, setOffsetAfter] = useState(0);
  const [isImageAnimating, setIsImageAnimating] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Holds the index of the image being displayed

  const slidesPerView = 1;
  const spaceBetween = 80;
  const frameworkForgedRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer for autoplay control
  useEffect(() => {
    const section = sectionRef.current;
    const swiper = swiperRef.current;

    if (!section || !swiper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start autoplay when section enters viewport
            if (swiper.autoplay && !swiper.autoplay.running) {
              swiper.autoplay.start();
            }
          } else {
            // Stop autoplay when section leaves viewport
            if (swiper.autoplay && swiper.autoplay.running) {
              swiper.autoplay.stop();
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: "0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    function computeOffset() {
      if (!containerRef.current) return;
      if (window.innerWidth <= 768) {
        setOffsetAfter(0);
        return;
      }

      const W = containerRef.current.clientWidth;

      const fraction = slidesPerView - Math.floor(slidesPerView);
      if (fraction <= 0) {
        setOffsetAfter(0);
        return;
      }

      const slideWidth = W / slidesPerView;
      const extraPx = Math.ceil(fraction * slideWidth + spaceBetween);

      setOffsetAfter(extraPx);
    }

    computeOffset();
    window.addEventListener("resize", computeOffset);
    return () => window.removeEventListener("resize", computeOffset);
  }, [slidesPerView, spaceBetween]);

  // EFFECT TO HANDLE IMAGE ANIMATION (Zoom/Fade)
  useEffect(() => {
    setIsImageAnimating(false);
    setCurrentImageIndex(activeIndex);
    const timer = setTimeout(() => {
      setIsImageAnimating(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const baseImageClasses =
    "absolute object-cover rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset]";
  const secondaryImageClasses =
    "absolute object-cover rounded-tl-[20px] lg:rounded-tl-[30px] !h-[calc(100%-42px)] lg:!h-[calc(100%-93px)] !w-[calc(100%-71px)] lg:!w-[calc(100%-210px)]";
  const imageTransitionClasses = "transition-all duration-700 ease-out";
  const imageInitialClasses = "transform scale-[0.99] opacity-0";
  const imageFinalScaleClasses = "transform scale-[1.01]";
  const backgroundFinalOpacityClass = "opacity-40";
  const mainFinalOpacityClass = "opacity-100";
  const backgroundAnimationClasses = isImageAnimating
    ? `${imageTransitionClasses} ${imageFinalScaleClasses} ${backgroundFinalOpacityClass}`
    : `${imageTransitionClasses} ${imageInitialClasses}`;
  const mainAnimationClasses = isImageAnimating
    ? `${imageTransitionClasses} ${imageFinalScaleClasses} ${mainFinalOpacityClass}`
    : `${imageTransitionClasses} ${imageInitialClasses}`;

  useEffect(() => {
    let tabsAnim: gsap.core.Tween | undefined;
    if (frameworkForgedRef.current) {
      tabsAnim = gsap.fromTo(
        frameworkForgedRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: frameworkForgedRef.current,
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

  return (
    <div
      ref={(el) => {
        frameworkForgedRef.current = el;
        sectionRef.current = el;
      }}
    >
      {title && (
        <FadeInReveal delay={0.6}>
          <H2 className="container block lg:hidden mb-[24px] text-blue-200">
            {title}
          </H2>
        </FadeInReveal>
      )}
      <FadeInReveal delay={0.6}>
        <div
          className={clsx(
            `relative w-full grid grid-cols-1  px-[20px] lg:px-[unset] gap-x-[40px]  ${
              layout === "imgLeftContentRight"
                ? "lg:grid-cols-[45%_55%]"
                : "lg:grid-cols-[45%_55%]"
            }`,
          )}
        >
          <div
            className={clsx(
              `${
                layout === "imgLeftContentRight"
                  ? " order-2 lg:order-2 lg:pl-20"
                  : "lg:ml-[60px] order-2 lg:order-1"
              }`,
            )}
          >
            {title && (
              <H2 className="hidden lg:block text-blue-200 max-w-[460px]">
                {title}
              </H2>
            )}

            <div className="mt-6 md:mt-[65px] mb-[27px] justify-between items-center max-w-full lg:flex hidden">
              <BodyText2 className="text-orange-200">
                0{activeIndex + 1}-<span>0{card?.length}</span>
              </BodyText2>

              <div className="hidden md:block">
                <div className="flex gap-3">
                  <Image
                    src="/images/home/chevron-right-orange.svg"
                    alt="prev"
                    width={34}
                    height={34}
                    className={`-rotate-180 swiper-button-prev transition-opacity ${
                      activeIndex > 0
                        ? "cursor-pointer opacity-100"
                        : "pointer-events-none opacity-30"
                    }`}
                  />

                  <Image
                    src="/images/home/chevron-right-orange.svg"
                    alt="next"
                    width={34}
                    height={34}
                    className={`swiper-button-next transition-opacity ${
                      activeIndex < card?.length - 1
                        ? "cursor-pointer opacity-100"
                        : "pointer-events-none opacity-30"
                    }`}
                  />
                </div>
              </div>
            </div>

            {card?.length > 0 && (
              <div ref={containerRef} className="w-full">
                <Swiper
                  modules={[Navigation, Scrollbar, Mousewheel, Autoplay]}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  autoplay={{
                    delay: 15000,
                    disableOnInteraction: false,
                  }}
                  slidesOffsetAfter={offsetAfter}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // Don't start autoplay immediately - wait for viewport intersection
                    if (swiper.autoplay) {
                      swiper.autoplay.stop();
                    }
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                      allowTouchMove: true,
                    },
                    768: {
                      slidesPerView: slidesPerView,
                      spaceBetween: 80,
                      allowTouchMove: true,
                    },
                  }}
                  scrollbar={{ draggable: true }}
                  direction="horizontal"
                  mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                  }}
                  className="framework-forged-swiper cursor-grab"
                >
                  {card?.map((items, index) => {
                    return (
                      <SwiperSlide
                        key={items?.id}
                        className={`transition-all duration-500  ${
                          index === activeIndex
                            ? ""
                            : "lg:blur-xs lg:opacity-50"
                        }`}
                      >
                        <div
                          className={clsx(
                            ` relative w-full overflow-hidden ${
                              layout === "imgLeftContentRight"
                                ? " order-1 lg:order-1"
                                : "lg:mr-[60px] order-1 lg:order-2 pt-[100%] md:pt-[unset]  md:h-[317px] lg:h-[640px]  lg:hidden block"
                            }`,
                          )}
                        >
                          {layout === "imgLeftContentRight" ? (
                            <div className="relative w-full pt-[100%] rounded-2xl overflow-hidden">
                              <div className="absolute inset-0 overflow-hidden">
                                <Image
                                  src={card?.[currentImageIndex]?.image?.url}
                                  alt={
                                    card?.[currentImageIndex]?.image
                                      ?.alternativeText || "banner"
                                  }
                                  fill
                                  className="object-cover scale-110"
                                />
                                <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                                <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[90%] h-[90%]">
                                  <Image
                                    src={card?.[currentImageIndex]?.image?.url}
                                    alt={
                                      card?.[currentImageIndex]?.image
                                        ?.alternativeText || "banner"
                                    }
                                    fill
                                    className="object-cover scale-110"
                                  />
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`absolute right-0 top-0 md:pt-[unset] pt-[100%]   md:min-h-[317px] lg:min-h-[640px] w-[100%] lg:w-full rounded-[20px] overflow-hidden lg:rounded-l-[30px] lg:rounded-r-[unset] `}
                            >
                              {items?.image?.url && (
                                <Image
                                  key={`outer-${currentImageIndex}`}
                                  src={items?.image?.url}
                                  alt={
                                    items?.image?.alternativeText || "banner"
                                  }
                                  fill
                                  sizes="(max-width: 768px) 768px, 
                (max-width: 1200px) 1200px, 
                1000px"
                                  className={`${baseImageClasses} ${backgroundAnimationClasses} blur-lg`}
                                />
                              )}
                              {items?.image?.url && (
                                <Image
                                  key={`main-${currentImageIndex}`}
                                  src={items?.image?.url}
                                  alt={
                                    items?.image?.alternativeText || "banner"
                                  }
                                  fill
                                  sizes="(max-width: 768px) 768px, 
                (max-width: 1200px) 1200px, 
                1000px"
                                  className={`${secondaryImageClasses} ${isMobile ? "scale-100" : mainAnimationClasses}`} // Applied main classes
                                />
                              )}
                              <Image
                                src="/images/home/star-white.svg"
                                alt="img"
                                width={72}
                                height={72}
                                className="absolute top-[-21px] lg:top-[-36px] z-10 right-[48px] lg:right-[171px] w-[42px] lg:w-[72px]"
                              />
                              <Image
                                src="/images/home/star-white.svg"
                                alt="img"
                                width={72}
                                height={72}
                                className="absolute bottom-[20px] lg:bottom-[55px] z-10 right-[48px] lg:right-[171px] w-[42px] lg:w-[72px]"
                              />
                              <div className="absolute min-h-screen bg-white w-[1px] right-[69px] lg:right-[206.5px] top-0" />
                              <div className="absolute w-full bg-white bottom-[40px] lg:bottom-[90.5px] h-[1px]" />
                            </div>
                          )}
                        </div>
                        <div className="lg:hidden block mt-5">
                          <BodyText2 className="text-orange-200">
                            0{index + 1}-<span>0{card?.length}</span>
                          </BodyText2>
                        </div>
                        <SubH1 className={`text-blue-200 my-3`}>
                          {items?.title}
                        </SubH1>
                        <BodyText2 className="mt-[12px] text-[#585858]">
                          {items?.description}
                        </BodyText2>
                        <div className="flex flex-col gap-2 mt-3">
                          {items?.BulletPoints?.length > 0 &&
                            items?.BulletPoints?.map(
                              (item, index2) =>
                                item?.title && (
                                  <div
                                    className="flex gap-2"
                                    key={"pointerss_" + index2}
                                  >
                                    <Image
                                      src={"/images/star-orange.svg"}
                                      alt={"star"}
                                      className="object-cover object-top w-[16px] h-[16px] mt-[3px]"
                                      width={16}
                                      height={16}
                                    />
                                    <p className="text-[#4C5861]">
                                      {item?.title}
                                    </p>
                                  </div>
                                ),
                            )}
                        </div>
                        {items?.ctaButton?.title &&
                          (items?.ctaButton?.hasExternalLink == "true"
                            ? items?.ctaButton?.externalLink
                            : items?.ctaButton?.link?.link) && (
                            <div className="mt-[40px]">
                              <Button
                                href={
                                  items?.ctaButton?.hasExternalLink == "true"
                                    ? items?.ctaButton?.externalLink
                                    : items?.ctaButton?.link?.link
                                }
                                title={items?.ctaButton?.title}
                                useTargetBlank={
                                  items?.ctaButton?.hasExternalLink == "true"
                                }
                              />
                            </div>
                          )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}
          </div>
          <div
            className={clsx(
              ` relative w-full overflow-hidden ${
                layout === "imgLeftContentRight"
                  ? " order-1 lg:order-1"
                  : "lg:mr-[60px] order-1 lg:order-2 h-[317px] lg:h-[640px]  lg:block hidden"
              }`,
            )}
          >
            {layout === "imgLeftContentRight" ? (
              <div className="relative w-full pt-[100%] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={card?.[currentImageIndex]?.image?.url}
                    alt={
                      card?.[currentImageIndex]?.image?.alternativeText ||
                      "banner"
                    }
                    fill
                    className="object-cover scale-110"
                  />
                  <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                  <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[90%] h-[90%]">
                    <Image
                      src={card?.[currentImageIndex]?.image?.url}
                      alt={
                        card?.[currentImageIndex]?.image?.alternativeText ||
                        "banner"
                      }
                      fill
                      className="object-cover scale-110"
                    />
                  </span>
                </div>
              </div>
            ) : (
              <div
                className={`absolute right-0 top-0 min-h-[317px] lg:min-h-[640px] w-[100%] lg:w-full rounded-[20px] overflow-hidden lg:rounded-l-[30px] lg:rounded-r-[unset] `}
              >
                {card?.[currentImageIndex]?.image?.url && (
                  <Image
                    key={`outer-${currentImageIndex}`}
                    src={card?.[currentImageIndex]?.image?.url}
                    alt={
                      card?.[currentImageIndex]?.image?.alternativeText ||
                      "banner"
                    }
                    fill
                    sizes="(max-width: 768px) 768px, 
                (max-width: 1200px) 1200px, 
                1000px"
                    className={`${baseImageClasses} ${backgroundAnimationClasses} blur-lg`}
                  />
                )}
                {card?.[currentImageIndex]?.image?.url && (
                  <Image
                    key={`main-${currentImageIndex}`}
                    src={card?.[currentImageIndex]?.image?.url}
                    alt={
                      card?.[currentImageIndex]?.image?.alternativeText ||
                      "banner"
                    }
                    width={500}
                    height={548}
                    sizes="(max-width: 768px) 768px, 
                (max-width: 1200px) 1200px, 
                1000px"
                    className={`${secondaryImageClasses} ${mainAnimationClasses}`} // Applied main classes
                  />
                )}
                <Image
                  src="/images/home/star-white.svg"
                  alt="img"
                  width={72}
                  height={72}
                  className="absolute top-[-21px] lg:top-[-36px] z-10 right-[48px] lg:right-[171px] w-[42px] lg:w-[72px]"
                />
                <Image
                  src="/images/home/star-white.svg"
                  alt="img"
                  width={72}
                  height={72}
                  className="absolute bottom-[20px] lg:bottom-[55px] z-10 right-[48px] lg:right-[171px] w-[42px] lg:w-[72px]"
                />
                <div className="absolute min-h-screen bg-white w-[1px] right-[68.5px] lg:right-[206.5px]" />
                <div className="absolute w-full bg-white bottom-[40px] lg:bottom-[90.5px] h-[1px]" />
              </div>
            )}
          </div>
        </div>
      </FadeInReveal>
    </div>
  );
};

export default FrameworkForged;
