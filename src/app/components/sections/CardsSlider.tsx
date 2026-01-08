"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { CDMOSplchemProps } from "@/app/types/cdmo.type";
import { FadeInGroup, FadeInRevealBlur } from "../ScrollReveal";
import { H2, SubH2 } from "../Typography2";
import clsx from "clsx";
import Link from "next/link";

const CardsSlider: React.FC<CDMOSplchemProps> = ({
  data,
  className,
  headingClassName,
  useLink = false,
}) => {
  const { sectionTitle, cards } = data;
  const [, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) updateNavState(swiper);
  }, []);

  // Intersection Observer for viewport detection
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
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
  }, []);

  // Control autoplay based on viewport and hover state
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !swiper.autoplay) return;

    // Stop autoplay if section is out of viewport or hovered
    if (!isInViewport || isHovered) {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
      }
    } else {
      // Start autoplay if section is in viewport and not hovered
      if (!swiper.autoplay.running) {
        swiper.autoplay.start();
      }
    }
  }, [isInViewport, isHovered]);

  return (
    <div 
      ref={sectionRef} 
      className="pt-[50px] pb-[25px] lg:pt-[140px] lg:pb-[110px] overflow-hidden"
    >
      {/* Content Section */}
      <div className={clsx(`mt-[0px] lg:mt-[62px]`, className)}>
        <div className="flex flex-col w-full">
          {/* Left Content */}
          {sectionTitle && (
            <FadeInRevealBlur
              className={clsx(
                `px-5 lg:pl-[60px] lg:pr-8 lg:w-[60%] w-full flex-shrink-0 mb-0 lg:mb-4`
              )}
            >
              <H2 className={clsx(`text-blue-200`, headingClassName)}>
                {sectionTitle}
              </H2>
            </FadeInRevealBlur>
          )}

          {/* Right Swiper */}
          <div className="flex-1 min-w-0 mt-[22px] lg:mt-[40px]">
            <FadeInGroup delay={0.2} className="relative">
              <Swiper
                spaceBetween={14}
                slidesPerView={1.2}
                breakpoints={{
                  768: {
                    slidesPerView: 2.5,
                    spaceBetween: 24,
                    slidesOffsetBefore: 0,
                  },

                  1024: {
                    slidesPerView: 4.2,
                    spaceBetween: 24,
                    slidesOffsetBefore: 40,
                  },
                }}
                modules={[Pagination, Navigation, Mousewheel, Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: ".swiper-button-prev-simplified",
                  nextEl: ".swiper-button-next-simplified",
                }}
                pagination={{
                  el: ".simplified-swiper-pagination",
                  type: "progressbar",
                }}
                className="w-full !px-5 lg:!px-5 "
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  updateNavState(swiper);
                  // Don't start autoplay immediately - wait for viewport intersection
                  if (swiper.autoplay) {
                    swiper.autoplay.stop();
                  }
                }}
                onSlideChange={(swiper) => updateNavState(swiper)}
                observer={true}
                observeParents={true}
                direction="horizontal"
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true,
                }}
              >
                {cards?.length > 0 &&
                  cards?.map((item, index) => (
                    <SwiperSlide 
                      key={index}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {useLink ? (
                        <Link href={item?.link || "#"}>
                          <Card
                            title={item?.title}
                            src={item?.image?.url}
                            alt={item?.image?.alternativeText}
                          />
                        </Link>
                      ) : (
                        <Card
                          title={item?.title}
                          src={item?.image?.url}
                          alt={item?.image?.alternativeText}
                        />
                      )}
                    </SwiperSlide>
                  ))}
              </Swiper>

              <div className="relative py-[30px] mt-0 md:mt-[40px] mb-[20px] lg:mx-[unset]">
                {cards?.length > 4 && (
                  <div className="hidden lg:flex w-fit gap-3 mt-8 px-5 lg:px-0 absolute bottom-[15px] right-[100px]">
                    <button
                      className={`swiper-button-prev-simplified transition-opacity ${
                        isBeginning
                          ? "pointer-events-none opacity-30"
                          : "cursor-pointer opacity-100"
                      }`}
                      aria-label="Previous slide"
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
                      className={`swiper-button-next-simplified transition-opacity ${
                        isEnd
                          ? "pointer-events-none opacity-30"
                          : "cursor-pointer opacity-100"
                      }`}
                      aria-label="Next slide"
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
                <div className="simplified-swiper-pagination lg:!ml-10 ml-0 mt-4 bottom-6 h-[2px] mx-[20px] lg:mx-[unset] max-w-[100%] lg:max-w-[calc(100%-250px)]" />
              </div>
            </FadeInGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSlider;

const Card = ({
  title,
  src,
  alt,
}: {
  title: string;
  src: string;
  alt: string;
}) => {
  return (
    <div
      className="relative rounded-[20px] w-full h-[300px] sm:h-[320px] lg:h-[390px] bg-[#EFF3F5] mr-5 lg:mr-0"
      data-scroll
    >
      {title && (
        <SubH2 className="text-blue-200 py-[24px] px-[26px]">{title}</SubH2>
      )}

      {src && (
        <div className="absolute bottom-0 w-full h-[200px] sm:h-[240px] md:h-[220px] xl:h-[272px] rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
          <Image
            src={src}
            alt={alt || title}
            fill
            className="rounded-b-[20px] object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
    </div>
  );
};
