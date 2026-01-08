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
import { isMobile } from "react-device-detect";
import {useMediaQuery} from "@mui/material";

const HomeHero: React.FC<HomeHeroProps> = ({ data }) => {
  const isTablet = useMediaQuery("(max-width:768px)");
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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
    // gsap.set(star, {
    //   opacity: 1,
    //   scale: 200,
    // });
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
      // .to(star, {
      //   opacity: 1,
      //   scale: 1,
      //   duration: 0.6,
      //   ease: "sine.out",
      //   stagger: 0.2,
      // })
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
      controlVideos(index);

      // Update autoplay delay based on target slide
      const delay = index === 0 && data?.banner?.[0]?.card?.[0]?.bannerVideo?.url && !isMobile ? 30000 : 5000;
      if (swiperRef.current.params.autoplay && typeof swiperRef.current.params.autoplay === 'object') {
        swiperRef.current.params.autoplay.delay = delay;
      }

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

    const delay = activeIndexRef.current === 0 && data?.banner?.[0]?.card?.[0]?.bannerVideo?.url && !isMobile ? 30000 : 5000;
    bar.style.transition = `transform ${delay}ms linear`;
    bar.style.transform = "scaleX(1)";
  };

  // Control video playback based on active slide
  const controlVideos = (activeIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => {
            // Handle play promise rejection silently
          });
        } else {
          video.pause();
          video.currentTime = 0; // Reset to start
        }
      }
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="h-[calc(100dvh-64px)] md:h-[80vh] lg:min-h-screen w-full relative overflow-hidden"
    >
      
      {/* Conditional overlay - lighter for video slides on desktop */}
      {(() => {
        const currentSlide = data?.banner?.[active];
        const hasVideo = currentSlide?.card?.[0]?.bannerVideo?.url && !isMobile;
        return (
          <div 
            className={`absolute inset-0 z-[1] transition-opacity duration-500 ${
              hasVideo ? 'bg-black/5' : 'bg-black/20'
            }`} 
          />
        );
      })()}
      {data?.banner?.length > 0 && (
        <Swiper
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
            setTimeout(() => {
              startProgressBar();
              controlVideos(activeIndexRef.current);
            }, 100);
          }}
          onSlideChangeTransitionStart={(swiper) => {
            const realIndex =
              swiper.realIndex !== undefined
                ? swiper.realIndex
                : swiper.activeIndex % data?.banner?.length;
            activeIndexRef.current = realIndex;
            setActive(realIndex);
            resetProgressBar();
            controlVideos(realIndex);
            
            // Update autoplay delay based on current slide
            const delay = realIndex === 0 && data?.banner?.[0]?.card?.[0]?.bannerVideo?.url && !isMobile ? 30000 : 5000;
            if (swiperRef.current && swiperRef.current.autoplay) {
              swiperRef.current.autoplay.stop();
              if (swiperRef.current.params.autoplay && typeof swiperRef.current.params.autoplay === 'object') {
                swiperRef.current.params.autoplay.delay = delay;
              }
            }
          }}
          onSlideChangeTransitionEnd={() => {
            startProgressBar();
            // Restart autoplay with updated delay
            if (swiperRef.current && swiperRef.current.autoplay) {
              swiperRef.current.autoplay.start();
            }
          }}
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
            delay: data?.banner?.[0]?.card?.[0]?.bannerVideo?.url && !isMobile ? 30000 : 5000,
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
            <SwiperSlide key={index} className="h-full">
              <div className="w-full min-h-screen md:min-h-[80vh] lg:min-h-screen relative overflow-hidden">
                {items?.card?.[0]?.image?.url && !isTablet && (
                  <Image
                    src={items?.card?.[0]?.image?.url}
                    alt={items?.card?.[0]?.image?.alternativeText || "banner"}
                    fill
                    priority
                    className="hidden md:block object-cover"
                  />
                )}
                {items?.card?.[0]?.mobImage?.url && isTablet && (
                  <Image
                    src={items?.card?.[0]?.mobImage?.url}
                    alt={items?.card?.[0]?.mobImage?.alternativeText || "banner"}
                    fill
                    priority
                    className="block md:hidden object-cover"
                  />
                )}
                {items?.card?.[0]?.bannerVideo?.url && !isMobile && (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    playsInline
                    width={1000}
                    height={1000}
                    src={items?.card?.[0]?.bannerVideo?.url}
                    muted
                    loop
                    className="object-cover w-full h-full absolute top-0 left-0"
                  />
                )}
                {/* Lighter gradient overlay for video slides on desktop */}
                {items?.card?.[0]?.bannerVideo?.url && !isMobile ? (
                  <></>
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0)_80%)] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.90)_0%,rgba(0,0,0,0)_80%)]" />
                )}
                {/* Content box */}
                { items?.card?.[0]?.bannerVideo?.url && !isMobile ? (
                  <></>
                ) : (
                
                  <div className="absolute top-[45%] md:top-1/2 -translate-y-1/2 w-full z-10">
                    <FadeInReveal delay={0.5}> 
                    <div className="fluid-container">
                      {items?.card?.[0]?.title &&
                        (index === 0 ? (
                          <H1 className="text-white max-w-[276px] md:max-w-[550px] lg:max-w-[750px]">
                            {items.card[0].title}
                          </H1>
                        ) : (
                          <h2 className="font-normal text-[36px] md:text-[44px] xl:text-[54px] leading-[120%] font-alte-hans text-white max-w-[276px] md:max-w-[550px] lg:max-w-[750px]">
                            {items.card[0].title}
                          </h2>
                        ))}
                      {items?.card?.[0]?.description && (
                        <BodyText2 className="mb-[38px] text-grey-200 mt-[18px] lg:mt-[10px] max-w-[230px] md:max-w-[450px]">
                          {items?.card?.[0]?.description}
                        </BodyText2>
                      )}
                      {items?.card?.[0]?.ctaButton?.title && (
                        <Button
                          href={items?.card?.[0]?.ctaButton?.hasExternalLink == "true" ? items?.card?.[0]?.ctaButton?.externalLink : items?.card?.[0]?.ctaButton?.link?.link}
                          title={items?.card?.[0]?.ctaButton?.title}
                        />
                      )}
                    </div>
                    </FadeInReveal>
                  </div>
                
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* stars + lines */}
      <div
        ref={lineVertical}
        className="absolute min-h-screen h-screen bg-white/40 w-[1px] top-0 right-[88px] lg:right-[212.5px] z-5"
      />
      <div
        ref={lineHorizontal}
        className="absolute w-full bg-white/40 bottom-[105px] lg:bottom-[119px] h-[1px] z-5"
      />
      <div
        ref={starRef}
        className="absolute bottom-[84px] right-[68px] lg:right-[177px] w-[42px] lg:w-[72px] z-60 scale-[200] "
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
        className="absolute z-10 bottom-[40px] md:bottom-[60px] lg:bottom-[80px] w-full "
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
            0{activeIndexRef.current + 1}/
            <span className="text-white opacity-40 font-alte-hans font-normal">
              0{data?.banner?.length}
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
