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
import Button from "../Button";
import { Navigation, Mousewheel } from "swiper/modules";

const ScrollTrigger = ScrollTriggerModule;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ScrollTriggerInstance {
  start: number | { value: number };
  end: number | { value: number };
  progress: number;
}

const RDAnalyticalExc = () => {
  const [active, setActive] = useState(0);
  const slidesData = [
    {
      id: 0,
      title: "Analytical Testing",
      image: "/images/home/forest.png",
      description:
        "Our 8000 sq.ft state-of-the-art analytical laboratory, enables our speciality chemical R&D and custom manufacturing solutions with:",
      stats: [
        {
          id: 0,
          label: "Analytical method development, calibration & validation",
        },
        { id: 1, label: "Structural identification & elucidation" },
        { id: 2, label: "Impurity, byproduct & metabolite isolation" },
        { id: 3, label: "Analytical technology transfer & documentation" },
      ],
      ctaTitle: "Our Environmental Initiatives",
      ctaLink: "#",
    },
    {
      id: 1,
      title: "Analytical Testing",
      image: "/images/rd/analytical-1.png",
      description:
        "Our 8000 sq.ft state-of-the-art analytical laboratory, enables our speciality chemical R&D and custom manufacturing solutions with:",
      stats: [
        {
          id: 0,
          label: "Analytical method development, calibration & validation",
        },
        { id: 1, label: "Structural identification & elucidation" },
        { id: 2, label: "Impurity, byproduct & metabolite isolation" },
        { id: 3, label: "Analytical technology transfer & documentation" },
      ],
      ctaTitle: "Our Environmental Initiatives",
      ctaLink: "#",
    },
    {
      id: 2,
      title: "Analytical Testing",
      image: "/images/rd/inno-banner1.png",
      description:
        "Our 8000 sq.ft state-of-the-art analytical laboratory, enables our speciality chemical R&D and custom manufacturing solutions with:",
      stats: [
        {
          id: 0,
          label: "Analytical method development, calibration & validation",
        },
        { id: 1, label: "Structural identification & elucidation" },
        { id: 2, label: "Impurity, byproduct & metabolite isolation" },
        { id: 3, label: "Analytical technology transfer & documentation" },
      ],
      ctaTitle: "Our Environmental Initiatives",
      ctaLink: "#",
    },
  ];
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
  const scrollTriggerRef = useRef<ScrollTriggerInstance | null>(null);

  const isScrollingProgrammatically = useRef<boolean>(false);

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
          end: "+=1200",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
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
            // { x: 100, y: 0 },
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
  }, []);

  return (
    <div ref={triggerRef} className="w-full relative  min-h-[40vh]">
      <div
        ref={titleSection}
        className="absolute top-0 w-full flex justify-center items-center z-20 bg-white  "
      >
        <div className="flex-col lg:flex-row flex items-center gap-2 w-[100%] lg:w-[unset]  pt-[100px] lg:pt-[unset] ">
          <span ref={headinLeft}>
            <H2>Analytical and Process </H2>
          </span>
          <div
            ref={sustainbleLogo}
            className="flex w-[200px] lg:w-[0px] h-0 lg:h-[200px] overflow-hidden absolute "
          >
            <span
              ref={sustainInner}
              className="flex flex-wrap w-full h-full min-w-[200px] absolute top-0 left-[50%] translate-x-[-50%] "
            >
              <Image
                src="/images/rd/ana-2.png"
                alt="img"
                fill
                className="object-cover"
              />
            </span>
          </div>
          <span ref={headinRight}>
            <H2>Safety Excellence</H2>
          </span>
        </div>
      </div>
      <div
        ref={envSlider}
        className="w-full opacity-0 absolute top-50% translate-y-[-50%] left-0"
      >
        <div className="flex w-full h-screen relative flex-col justify-center">
          <div className="mx-[20px] lg:mx-[unset] mb-[70px] lg:mb-[unset] grid lg:grid-cols-[600px_1fr] lg:gap-x-[100px]">
            <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-[1rem] flex items-center justify-center">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={slidesData[active]?.image}
                  alt={slidesData[active]?.title}
                  fill
                  className="object-cover scale-110"
                />
                <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[94%] h-[97%]">
                  <Image
                    src={slidesData[active]?.image}
                    alt={slidesData[active]?.image}
                    fill
                    className="object-cover scale-110"
                  />
                </span>
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <div className="mt-[18px] mb-[18px] lg:mt-[65px] lg:mb-[27px] flex justify-between max-w-[100%] lg:max-w-[440px] ">
                <BodyText2 className="text-orange-200">
                  0{active + 1}-<span>0{slidesData?.length}</span>
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
                        active < slidesData.length - 1
                          ? "cursor-pointer opacity-100"
                          : "pointer-events-none opacity-30"
                      }`}
                    />
                  </div>
                </div>
              </div>
              <Swiper
                slidesPerView={1.2}
                loop={false}
                onSlideChange={(swiper) => setActive(swiper.activeIndex)}
                speed={800}
                modules={[Navigation, Mousewheel]}
                className="w-full "
                navigation={{
                  nextEl: ".swiper-button-next-analytical",
                  prevEl: ".swiper-button-prev-analytical",
                }}
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true,
                }}
              >
                {slidesData?.map((slide) => (
                  <SwiperSlide key={slide?.id}>
                    <div className="grid gap-12 items-center flex-shrink-0 rounded-lg">
                      <div>
                        <SubH1 className="mt-[40px]">{slide?.title}</SubH1>
                        <BodyText2 className="mt-[8px]">
                          {slide?.description}
                        </BodyText2>
                        <div className="mt-[20px]">
                          {slide?.stats?.map((items) => (
                            <div
                              key={items?.id}
                              className="flex gap-4 mb-4 items-center"
                            >
                              <Image
                                src="/images/home/star.svg"
                                alt="star"
                                width={16}
                                height={16}
                              />
                              <BodyText2 className="text-grey-400">
                                {items?.label}
                              </BodyText2>
                            </div>
                          ))}
                        </div>
                        <div className="mt-[40px]">
                          <Button
                            title={slide?.ctaTitle}
                            href={slide?.ctaLink}
                            secondary
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RDAnalyticalExc;
