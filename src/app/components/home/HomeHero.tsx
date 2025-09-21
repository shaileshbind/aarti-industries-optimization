"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { BodyText2, H1 } from "../Typography2";
import Button from "../Button";
const HomeHero = () => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef<any>(null);
  const [isManualClick, setIsManualClick] = useState(false);
  const progressIntervalRef = useRef<any>(null);

  const sliderData = [
    {
      id: 0,
      title: "Sustainability",
      src: "/images/home/hero-banner1.png",
      alt: "img",
      heading: "Sustainable, Responsible, Value Driven",
      desc: "For 40 years, AIL's people-first culture has shaped sustainable success",
      btnTitle: "Sustainability in Action",
      btnLink: "#",
    },
    {
      id: 1,
      title: "Products",
      src: "/images/home/hero-banner2.png",
      alt: "img",
      heading: "Sustainable, Responsible, Value Driven",
      desc: "For 40 years, AIL's people-first culture has shaped sustainable success",
      btnTitle: "Explore Products",
      btnLink: "#",
    },
    {
      id: 2,
      title: "Innovation",
      src: "/images/home/hero-banner1.png",
      alt: "img",
      heading: "Sustainable, Responsible, Value Driven",
      desc: "For 40 years, AIL's people-first culture has shaped sustainable success",
      btnTitle: "Discover Innovation",
      btnLink: "#",
    },
    {
      id: 3,
      title: "People",
      src: "/images/home/hero-banner2.png",
      alt: "img",
      heading: "Sustainable, Responsible, Value Driven",
      desc: "For 40 years, AIL's people-first culture has shaped sustainable success",
      btnTitle: "Meet Our People",
      btnLink: "#",
    },
    {
      id: 4,
      title: "Transformation",
      src: "/images/home/hero-banner1.png",
      alt: "img",
      heading: "Sustainable, Responsible, Value Driven",
      desc: "For 40 years, AIL's people-first culture has shaped sustainable success",
      btnTitle: "See Transformation",
      btnLink: "#",
    },
  ];

  // Clear progress interval
  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };
  // Start progress bar animation manually
  const startProgressBar = () => {
    clearProgressInterval();

    const bar = document.querySelector<HTMLElement>(".hero-progress-bar");
    if (bar) {
      // Reset the bar
      bar.style.transition = "none";
      bar.style.transform = "scaleX(0)";
      void bar.offsetWidth;

      // Start smooth animation
      let startTime = Date.now();
      const duration = 5000; // 5 seconds

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (bar) {
          bar.style.transition = "none";
          bar.style.transform = `scaleX(${progress})`;
        }

        if (progress < 1) {
          progressIntervalRef.current = requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  };
  // Handle manual slide navigation
  const handleSlideClick = (index: number) => {
    if (swiperRef.current) {
      setIsManualClick(true);
      setActive(index);
      clearProgressInterval();

      // Use slideToLoop for proper loop handling
      swiperRef.current.slideToLoop(index);
      swiperRef.current.autoplay.stop();

      setTimeout(() => {
        if (swiperRef.current) {
          swiperRef.current.autoplay.start();
          startProgressBar();
          setIsManualClick(false);
        }
      }, 100);
    }
  };
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearProgressInterval();
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          // Get the real index (accounts for loop duplicates)
          const realIndex = swiper.realIndex;
          setActive(realIndex);
          if (!isManualClick) {
            startProgressBar();
          }
        }}
        slidesPerView={1}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        onAutoplayStart={() => {
          if (!isManualClick) {
            startProgressBar();
          }
        }}
      >
        {sliderData.map((items, index) => (
          <SwiperSlide key={index}>
            <div className="w-full min-h-screen relative overflow-hidden">
              <Image src={items?.src} alt={items?.alt} fill priority />
              {/* Content box */}
              <div className="absolute mt-[200px] w-full z-10">
                <div className="container mx-auto">
                  <H1 className="text-white max-w-[276px] md:max-w-[650px]">
                    {items?.heading}
                  </H1>
                  <BodyText2 className="mb-[38px] text-grey-200 mt-[18px] lg:mt-[10px] max-w-[230px] md:max-w-[450px]">
                    {items?.desc}
                  </BodyText2>
                  <Button href={items?.btnLink} title={items?.btnTitle} />
                </div>
              </div>
              {/* White lines */}
              <div className="absolute min-h-screen bg-white w-[1px] right-[88px] lg:right-[212.5px]" />
              <div className="absolute w-full bg-white bottom-[105px] lg:bottom-[119px] h-[1px]" />
              {/* stars */}
              <Image
                src="/images/home/star-white.svg"
                alt="img"
                width={72}
                height={72}
                className="absolute bottom-[84px] z-10 right-[68px] lg:right-[177px] w-[42px] lg:w-[72px]"
              />
              <Image
                src="/images/home/star-white.svg"
                alt="img"
                width={72}
                height={72}
                className="absolute bottom-[-22px] lg:bottom-[-36px] right-[68px] lg:right-[177px] w-[42px] lg:w-[72px]"
              />
              <Image
                src="/images/home/star-white.svg"
                alt="img"
                width={72}
                height={72}
                className="absolute bottom-[-22px] lg:bottom-[-36px] right-[-21px] lg:right-[-36px] w-[42px] lg:w-[72px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Single Global Progress Bar */}
      <div className="absolute z-8 bottom-[105px] lg:bottom-[119px] w-[calc(100%-106px)] md:w-[calc(100%-240px)] h-[2px]">
        <div className="relative h-[2px]">
          <div
            className="hero-progress-bar absolute left-0 top-0 h-[2px] bg-[#F36633] origin-left"
            style={{
              width: "100%",
              transform: "scaleX(0)",
              transition: "transform 5s linear",
            }}
          />
        </div>
      </div>
      {/* Bottom nav titles */}
      <div className="absolute z-10 bottom-[40px] md:bottom-[80px] w-full">
        {/* desktop */}
        <div className="hidden md:flex container w-full mx-auto  gap-x-[36px]">
          {sliderData.map((items: any, index: number) => (
            <div
              key={index}
              onClick={() => handleSlideClick(index)}
              className={`cursor-pointer text-white transition-opacity duration-200 font-alte-hans font-normal ${
                active === index ? "opacity-100" : "opacity-40"
              }`}
            >
              {items?.title}
            </div>
          ))}
        </div>
        {/* mobile */}
        <div className="block lg:hidden">
          <p className="text-white font-alte-hans font-normal">
            {active + 1}/
            <span className="text-white opacity-40 font-alte-hans font-normal">
              {sliderData?.length}
            </span>
          </p>
          <p className="text-white font-alte-hans font-normal">
            {sliderData[active]?.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
