"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BodyText2, SubH1 } from "../Typography2";
import Button from "../Button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Navigation, Scrollbar } from "swiper/modules";
import { EducationDevelopmentProps } from "@/app/types/social-health-and-safety.type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import type { Swiper as SwiperType } from "swiper";

gsap.registerPlugin(ScrollTrigger);

const EducationDevelopment: React.FC<EducationDevelopmentProps> = ({
  data,
}) => {
  const { cards } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetAfter, setOffsetAfter] = useState(0);
  const [isImageAnimating, setIsImageAnimating] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slidesPerView = 1.2;
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

  useEffect(() => {
    setIsImageAnimating(false);
    setCurrentImageIndex(activeIndex);
    const timer = setTimeout(() => {
      setIsImageAnimating(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const baseImageClasses =
    "absolute object-cover rounded-[20px] xl:rounded-l-[30px] xl:rounded-r-[unset]";
  const secondaryImageClasses =
    "absolute top-0 right-0 object-cover rounded-tl-[20px] xl:rounded-tl-[30px] h-[calc(100%-71px)] xl:h-[calc(100%-93px)] w-[calc(100%-71px)] xl:w-[calc(100%-210px)]";
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
      <div
        className={clsx(
          `lg:!pl-[60px] relative w-full grid grid-cols-1  px-[20px] lg:px-[unset]  ${"lg:grid-cols-[45%_55%]"}`,
        )}
      >
        <div
          className={clsx(
            ` relative w-full overflow-hidden pt-[80%]
            `,
          )}
        >
          <div
            className={`absolute right-0 top-0 h-full w-[100%] xl:w-full rounded-[20px] overflow-hidden `}
          >
            {cards?.[currentImageIndex]?.image?.url && (
              <Image
                key={`outer-${currentImageIndex}`}
                src={cards?.[currentImageIndex]?.image?.url}
                alt={
                  cards?.[currentImageIndex]?.image?.alternativeText || "banner"
                }
                fill
                sizes="(max-width: 768px) 768px, 
                (max-width: 1200px) 1200px, 
                1000px"
                className={`${baseImageClasses} ${backgroundAnimationClasses} blur-lg`} // Applied background classes
              />
            )}
            {cards?.[currentImageIndex]?.image?.url && (
              <Image
                key={`main-${currentImageIndex}`}
                src={cards?.[currentImageIndex]?.image?.url}
                alt={
                  cards?.[currentImageIndex]?.image?.alternativeText || "banner"
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
              className="absolute top-[-21px] xl:top-[-36px] z-10 left-[48px] xl:left-[171px] w-[42px] xl:w-[72px]"
            />
            <Image
              src="/images/home/star-white.svg"
              alt="img"
              width={72}
              height={72}
              className="absolute bottom-[48px] xl:bottom-[56px] z-10 left-[47.5px] xl:left-[171px] w-[42px] xl:w-[72px]"
            />
            <div className="absolute min-h-screen bg-white w-[1px] left-[67.5px] xl:left-[206.5px]" />
            <div className="absolute w-full bg-white bottom-[68px] xl:bottom-[90.5px] h-[1px]" />
          </div>
        </div>
        <div className={clsx(`${"lg:pl-20"}`)}>
          <div className="mt-6 md:mt-[65px] mb-[27px] flex justify-between items-center max-w-[100%] lg:max-w-[80%]">
            <BodyText2 className="text-orange-200">
              0{activeIndex + 1}-<span>0{cards?.length}</span>
            </BodyText2>

            <div className="hidden md:block">
              <div className="flex gap-3">
                <Image
                  src="/images/home/chevron-right-orange.svg"
                  alt="prev"
                  width={34}
                  height={34}
                  className={`-rotate-180 swiper-button-prev-education-development transition-opacity ${
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
                  className={`swiper-button-next-education-development transition-opacity ${
                    activeIndex < cards?.length - 1
                      ? "cursor-pointer opacity-100"
                      : "pointer-events-none opacity-30"
                  }`}
                />
              </div>
            </div>
          </div>

          {cards?.length > 0 && (
            <div ref={containerRef} className="w-full">
              <Swiper
                modules={[Navigation, Scrollbar, Mousewheel, Autoplay]}
                autoplay={{
                  delay: 15000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".swiper-button-next-education-development",
                  prevEl: ".swiper-button-prev-education-development",
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
              >
                {cards?.map((item, index) => {
                  return (
                    <SwiperSlide
                      key={item?.id}
                      className={`transition-all duration-500  ${
                        index === activeIndex ? "" : "lg:blur-xs lg:opacity-50"
                      }`}
                    >
                      <SubH1 className={`text-blue-200`}>{item?.title}</SubH1>
                      <BodyText2 className="mt-[12px] text-[#585858]">
                        {item?.description}
                      </BodyText2>
                      {item?.bulletPointsTitle && (
                        <BodyText2 className="mt-[20px] mb-[5px] text-blue-200">
                          {item?.bulletPointsTitle}
                        </BodyText2>
                      )}
                      <ul className="mt-2 space-y-2">
                        {((item?.bulletPoints?.length ?? 0) > 0 ||
                          (item?.BulletPoints?.length ?? 0) > 0) &&
                          (item?.bulletPoints || item?.BulletPoints)?.map(
                            (bulletPoint, idx) => (
                              <li
                                key={`${idx}-${bulletPoint?.title}`}
                                className="text-sm text-gray-300 flex items-center gap-2"
                              >
                                <Image
                                  src="/images/star-orange.svg"
                                  alt="star"
                                  height={15}
                                  width={15}
                                />

                                <BodyText2>{bulletPoint?.title}</BodyText2>
                              </li>
                            ),
                          )}
                      </ul>
                      {item?.repeatableCta && item.repeatableCta.length > 0 && (
                        <div className="mt-[10px]">
                          {item.repeatableCta.map((cta, ctaIndex) => {
                            const hasValidLink =
                              (cta?.link?.link && cta.link.link.trim() !== "") ||
                              (cta?.externalLink && cta.externalLink.trim() !== "");
                            
                            if (!cta?.title || !hasValidLink) {
                              return null;
                            }
                            const href =
                              cta?.hasExternalLink === "true"
                                ? cta?.externalLink || ""
                                : cta?.link?.link || "";                      
                            const useTargetBlank = cta?.hasExternalLink === "true";
                            return (
                              <Button
                                key={ctaIndex}
                                title={cta?.title}
                                href={href}
                                secondary
                                useTargetBlank={useTargetBlank}
                              />
                            );
                          })}
                        </div>
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationDevelopment;
