"use client";
import React, { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Mousewheel } from "swiper/modules";
import { BodyText2, H1 } from "../Typography2";
import Button from "../Button";
import gsap from "gsap";
import { FadeInReveal } from "../ScrollReveal";
import { HomeHeroProps } from "@/app/types/home.type";

const HomeHero: React.FC<HomeHeroProps> = ({ data }) => {
  const [, setActive] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const starRef2 = useRef<HTMLDivElement>(null);
  const starRef3 = useRef<HTMLDivElement>(null);
  const lineVertical = useRef<HTMLDivElement>(null);
  const lineHorizontal = useRef<HTMLDivElement>(null);
  const orangeScroll = useRef<HTMLDivElement>(null);
  const navTitles = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !wrapperRef.current ||
      !starRef.current ||
      !starRef2.current ||
      !starRef3.current ||
      !lineVertical.current ||
      !lineHorizontal.current ||
      !orangeScroll.current ||
      !navTitles.current
    )
      return;

    const star = starRef.current;
    const star2 = starRef2.current;
    const star3 = starRef3.current;
    const stars = [star, star2, star3];
    const vLine = lineVertical.current;
    const hLine = lineHorizontal.current;
    const orangeBar = orangeScroll.current;
    const navTitle = navTitles.current;

    // Set initial state - all stars are completely hidden
    gsap.set(stars, {
      opacity: 0,
      scale: 0,
    });
    // Set initial state for lines - hidden by scaling
    gsap.set(vLine, {
      scaleY: 0,
      transformOrigin: "top center",
    });
    gsap.set(hLine, {
      scaleX: 0,
      transformOrigin: "left center",
    });
    // Set initial state for orange progress bar - hidden
    gsap.set(orangeBar, {
      opacity: 0,
    });
    gsap.set(navTitle, {
      opacity: 0,
      y: 20,
    });
    // Set initial state for background
    gsap.set(wrapperRef.current, {
      opacity: 0,
      scale: 0.95,
    });
    const tl = gsap.timeline();
    // Step 1: Background fades in
    tl.to(wrapperRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    })
      // Step 2: Lines draw in
      .to(
        vLine,
        {
          scaleY: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        hLine,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        orangeBar,
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        stars,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "sine.out",
          stagger: 0.2,
        },
        "<"
      )
      .to(
        navTitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
      );
  }, []);

  // Handle manual tab click
  const handleTabClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();

      // Update both ref and state immediately
      activeIndexRef.current = index;
      setActive(index);
      resetProgressBar();

      swiperRef.current.slideToLoop(index);

      setTimeout(() => {
        if (swiperRef.current) {
          swiperRef.current.autoplay.start();
          startProgressBar();
        }
      }, 100);
    }
  };
  // Reset progress bar
  const resetProgressBar = () => {
    const bar = progressBarRef.current;
    if (!bar) return;

    bar.style.transition = "none";
    bar.style.transform = "scaleX(0)";
    void bar.offsetWidth;
  };
  // Start progress bar
  const startProgressBar = () => {
    const bar = progressBarRef.current;
    if (!bar) return;

    bar.style.transition = "transform 5s linear";
    bar.style.transform = "scaleX(1)";
  };

  return (
    <div
      ref={wrapperRef}
      className="min-h-screen w-full relative overflow-hidden"
    >
      {data?.banner?.length > 0 && (
        <Swiper
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
            setTimeout(() => startProgressBar(), 100);
          }}
          onSlideChangeTransitionStart={(swiper) => {
            const realIndex =
              swiper.realIndex !== undefined
                ? swiper.realIndex
                : swiper.activeIndex % data?.banner?.length;
            activeIndexRef.current = realIndex;
            setActive(realIndex);
            resetProgressBar();
          }}
          // onSlideChangeTransitionEnd={(swiper) => {
          //   startProgressBar();
          // }}
          onSlideChangeTransitionEnd={() => {
            startProgressBar();
          }}
          // onTransitionStart={(swiper: SwiperType) => {
          //   const realIndex =
          //     swiper.realIndex !== undefined
          //       ? swiper.realIndex
          //       : swiper.activeIndex % sliderData.length;

          //   activeIndexRef.current = realIndex;
          //   setActive(realIndex);
          // }}
          on={{
            transitionStart: (swiper: SwiperType) => {
              const realIndex =
                swiper.realIndex !== undefined
                  ? swiper.realIndex
                  : swiper.activeIndex % data?.banner?.length;

              activeIndexRef.current = realIndex;
              setActive(realIndex);
            },
          }}
          slidesPerView={1}
          modules={[Autoplay, EffectFade, Mousewheel]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: true,
          }}
          direction="horizontal"
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
          }}
        >
          {data?.banner?.map((items, index) => (
            <SwiperSlide key={index}>
              <div className="w-full min-h-screen relative overflow-hidden">
                {items?.card?.[0]?.image?.url && (
                  <Image
                    src={items?.card?.[0]?.image?.url}
                    alt={items?.card?.[0]?.image?.alternativeText || "banner"}
                    fill
                    priority
                    className="hidden lg:block object-cover"
                  />
                )}

                {items?.card?.[0]?.image?.url && (
                  <Image
                    src={items?.card?.[0]?.image?.url}
                    alt={items?.card?.[0]?.image?.alternativeText || "banner"}
                    fill
                    priority
                    className="block lg:hidden object-cover"
                  />
                )}
                {/* Content box */}
                <FadeInReveal delay={0.2}>
                  <div className="absolute mt-[200px] w-full z-10">
                    <div className="fluid-container">
                      {items?.card?.[0]?.title && (
                        <H1 className="text-white max-w-[276px] md:max-w-[650px]">
                          {items?.card?.[0]?.title}
                        </H1>
                      )}

                      {items?.card?.[0]?.description && (
                        <BodyText2 className="mb-[38px] text-grey-200 mt-[18px] lg:mt-[10px] max-w-[230px] md:max-w-[450px]">
                          {items?.card?.[0]?.description}
                        </BodyText2>
                      )}

                      {items?.card?.[0]?.ctaButton?.title && (
                        <Button
                          href={items?.card?.[0]?.ctaButton?.link || "#"}
                          title={items?.card?.[0]?.ctaButton?.title}
                        />
                      )}
                    </div>
                  </div>
                </FadeInReveal>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* stars + lines */}
      <div
        ref={lineVertical}
        className="absolute min-h-screen h-screen bg-white w-[1px] top-0 right-[88px] lg:right-[212.5px] z-5"
      />
      <div
        ref={lineHorizontal}
        className="absolute w-full bg-white bottom-[105px] lg:bottom-[119px] h-[1px] z-5"
      />
      <div
        ref={starRef}
        className="absolute bottom-[84px] right-[68px] lg:right-[177px] w-[42px] lg:w-[72px] z-5 "
      >
        <Image
          src="/images/home/star-white.svg"
          alt="star"
          width={72}
          height={72}
        />
      </div>
      <div
        ref={starRef2}
        className="absolute bottom-[-22px] lg:bottom-[-36px] right-[68px] lg:right-[177px] w-[42px] lg:w-[72px] z-5 "
      >
        <Image
          src="/images/home/star-white.svg"
          alt="img"
          width={72}
          height={72}
        />
      </div>
      <div
        ref={starRef3}
        className="absolute bottom-[-22px] lg:bottom-[-36px] right-[-21px] lg:right-[-36px] w-[42px] lg:w-[72px] z-5"
      >
        <Image
          src="/images/home/star-white.svg"
          alt="img"
          width={72}
          height={72}
        />
      </div>

      {/* Single Global Progress Bar */}
      <div
        ref={orangeScroll}
        className="absolute z-8 bottom-[105px] lg:bottom-[119px] w-[calc(100%-106px)] md:w-[calc(100%-240px)] h-[2px]"
      >
        <div className="relative h-[2px]">
          <div
            ref={progressBarRef}
            className="hero-progress-bar absolute left-0 top-0 h-[2px] bg-[#F36633] origin-left"
            style={{
              width: "100%",
              transform: "scaleX(0)",
              // transition: "transform 5s linear",
            }}
          />
        </div>
      </div>
      {/* Bottom nav titles */}
      <div
        ref={navTitles}
        className="absolute z-10 bottom-[40px] md:bottom-[80px] w-full "
      >
        {/* desktop */}
        {data?.banner?.length > 0 && (
          <div className="hidden md:flex fluid-container w-full mx-auto  gap-x-[36px] ">
            {data?.banner?.map((items, index: number) => (
              <div
                key={index}
                onClick={() => handleTabClick(index)}
                className={`cursor-pointer text-white  transition-opacity duration-200 font-alte-hans font-normal  ${
                  activeIndexRef.current === index
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                {items?.category}
              </div>
            ))}
          </div>
        )}

        {/* mobile */}
        <div className="block md:hidden fluid-container w-full mx-auto">
          <p className="text-white font-alte-hans font-normal">
            {activeIndexRef.current + 1}/
            <span className="text-white opacity-40 font-alte-hans font-normal">
              {data?.banner?.length}
            </span>
          </p>

          {data?.banner[activeIndexRef.current]?.category && (
            <p className="text-white font-alte-hans font-normal">
              {data?.banner[activeIndexRef.current]?.category}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
