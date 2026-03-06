"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BodyText2, H2, SubH1 } from "../Typography2";
import Button from "../Button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Mousewheel, Navigation, Scrollbar } from "swiper/modules";
import gsap from "gsap";
import clsx from "clsx";
import { CampusFlagshipProps } from "@/app/types/campus.type";
import type { Swiper as SwiperType } from "swiper";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

interface LayoutProps {
  layout?: "imgLeftContentRight" | "imgRightContentLeft";
}

const CampusFlagship: React.FC<CampusFlagshipProps & LayoutProps> = ({
  data,
  layout,
}) => {
  const { card, partnerWithUsCta, sectionTitle } = data;
  const isDesktopPointer = useMatchMedia("(pointer: fine)");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetAfter, setOffsetAfter] = useState(0);
  const [isImageAnimating, setIsImageAnimating] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slidesPerView = 1.5;
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
    "absolute object-cover rounded-tl-[20px] lg:rounded-tl-[30px] h-[calc(100%-71px)] lg:h-[calc(100%-93px)] w-[calc(100%-71px)] lg:w-[calc(100%-210px)]";
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
      {sectionTitle && (
        <H2 className="container block lg:hidden mb-[24px] text-blue-200">
          {sectionTitle}
        </H2>
      )}

      <div
        className={clsx(
          `relative w-full flex flex-col md:flex-row  px-[20px] lg:px-[unset] `,
        )}
      >
        <div
          className={clsx(
            `w-full md:w-[55%] lg:w-[65%]  ${
              layout === "imgLeftContentRight"
                ? " order-2 lg:order-2 md:pl-10 lg:pl-20"
                : "lg:ml-[60px] order-2 lg:order-1"
            }`,
          )}
        >
          {sectionTitle && (
            <H2 className="hidden lg:block text-blue-200 max-w-[460px] font-normal">
              {sectionTitle}
            </H2>
          )}

          <div className="mt-[20px] lg:mt-[65px] mb-[27px] flex justify-between max-w-[100%] lg:max-w-[calc((100%-80px)/1.5)]">
            <BodyText2 className="text-orange-200">
              0{activeIndex + 1}-<span>0{card?.length}</span>
            </BodyText2>

            <div className="hidden lg:block">
              <div className="flex gap-3">
                <Image
                  src="/images/home/chevron-right-orange.svg"
                  alt="prev"
                  width={34}
                  height={34}
                  className={`-rotate-180 swiper-button-prev-campus-flagship transition-opacity ${
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
                  className={`swiper-button-next-campus-flagship transition-opacity ${
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
                key={`campus-flagship-${isDesktopPointer}`}
                modules={[
                  Navigation,
                  Scrollbar,
                  ...(isDesktopPointer ? [Mousewheel] : []),
                  Autoplay,
                ]}
                autoplay={{
                  delay: 15000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".swiper-button-next-campus-flagship",
                  prevEl: ".swiper-button-prev-campus-flagship",
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
                  1024: {
                    slidesPerView: slidesPerView,
                    spaceBetween: 80,
                    allowTouchMove: false,
                  },
                }}
                scrollbar={{ draggable: true }}
                direction="horizontal"
                {...(isDesktopPointer && {
                  mousewheel: {
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                  },
                })}
                className="framework-forged-swiper"
              >
                {card?.map((items, index) => {
                  return (
                    <SwiperSlide
                      key={items?.id}
                      className={`transition-all duration-500  ${
                        index === activeIndex ? "" : "lg:blur-xs lg:opacity-50"
                      }`}
                    >
                      <SubH1 className={`text-blue-200`}>{items?.title}</SubH1>
                      <BodyText2 className="mt-[12px] text-[#585858]">
                        {items?.description}
                      </BodyText2>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}

          {partnerWithUsCta?.title &&
            (partnerWithUsCta?.hasExternalLink == "true"
              ? partnerWithUsCta?.externalLink
              : partnerWithUsCta?.link?.link) && (
              <div className="mt-[40px]">
                <Button
                  href={`${
                    partnerWithUsCta?.hasExternalLink == "true"
                      ? partnerWithUsCta?.externalLink
                      : partnerWithUsCta?.link?.link
                  }`}
                  title={partnerWithUsCta?.title}
                  useTargetBlank={partnerWithUsCta?.hasExternalLink == "true"}
                />
              </div>
            )}
        </div>
        <div
          className={clsx(
            ` relative md:w-[45%] lg:w-[35%] w-full overflow-hidden ${
              layout === "imgLeftContentRight"
                ? " order-1 lg:order-1"
                : "lg:mr-[60px] order-1 lg:order-2 h-[317px] lg:h-[640px] "
            }`,
          )}
        >
          {layout === "imgLeftContentRight" ? (
            <div className="relative w-full pt-[100%] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  key={`bg-${currentImageIndex}`}
                  src={card?.[currentImageIndex]?.image?.url}
                  alt={
                    card?.[currentImageIndex]?.image?.alternativeText ||
                    "banner"
                  }
                  fill
                  className={`object-cover scale-110 transition-opacity duration-700 ease-out ${
                    isImageAnimating ? "opacity-40" : "opacity-0"
                  }`}
                />
                <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                <span className="absolute bottom-0 -left-4 rounded-br-[400px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-full h-full">
                  <Image
                    key={`main-${currentImageIndex}`}
                    src={card?.[currentImageIndex]?.image?.url}
                    alt={
                      card?.[currentImageIndex]?.image?.alternativeText ||
                      "banner"
                    }
                    fill
                    className={`object-cover scale-110 transition-opacity duration-700 ease-out ${
                      isImageAnimating ? "opacity-100" : "opacity-0"
                    }`}
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
                  className={`${baseImageClasses} ${backgroundAnimationClasses} blur-lg`} // Applied background classes
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
                className="absolute bottom-[50px] lg:bottom-[56px] z-10 right-[48px] lg:right-[171px] w-[42px] lg:w-[72px]"
              />
              <div className="absolute min-h-screen bg-white w-[1px] right-[68.5px] lg:right-[206.5px]" />
              <div className="absolute w-full bg-white bottom-[70px] lg:bottom-[90.5px] h-[1px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusFlagship;
