'use client';
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BodyText2, H2, SubH2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import gsap from "gsap";
import SwipeImage from "./SwipeImage";
import { WordReveal } from "../ScrollReveal";

const CDMOE2E = () => {
  const [active, setActive] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImg, setActiveImg] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  const sliderData = [
    {
      id: 0,
      title: "By End Use",
      heading: "Chemistry That Powers Industries",
      desc: "lorem ipsum",
      btn: "Check Industries",
      link: "#",
      content: [
        {
          img: "/images/home/blog1.png",
          title: "Pigments",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
        {
          img: "/images/home/blog2.png",
          title: "Dyes",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
        {
          img: "/images/home/blog3.png",
          title: "Dyes & Pigments",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
        {
          img: "/images/home/blog4.png",
          title: "Lorem ipsum",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
      ],
    },
    {
      id: 1,
      title: "By Chemistry",
      heading: "Chemistry That Powers",
      desc: "lorem ipsum",
      btn: "Check Chemicals",
      link: "#",
      content: [
        {
          img: "/images/home/blog4.png",
          title: "Driving",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
        {
          img: "/images/home/blog3.png",
          title: "Leadership",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
        {
          img: "/images/home/blog2.png",
          title: "The role",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
        {
          img: "/images/home/blog1.png",
          title: "Sustainability",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
      ],
    },
    {
      id: 2,
      title: "By Value Chain",
      heading: "Chemistry That Values",
      desc: "lorem ipsum",
      btn: "Discover our Industry Solutions",
      link: "#",
      content: [
        {
          img: "/images/home/blog2.png",
          title: "Company",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
        {
          img: "/images/home/blog1.png",
          title: "Expansion",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
        {
          img: "/images/home/blog4.png",
          title: "Featured",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
        {
          img: "/images/home/blog3.png",
          title: "Community",
          features: [
            "Route design and molecule scouting",
            "Freedom-to-operate (FTO) studies",
            "Early-stage molecule development",
          ],
        },
      ],
    },
  ];

  // 🧠 Update active image when slide or tab changes
  useEffect(() => {
    const currentImg = sliderData?.[active]?.content?.[activeIndex]?.img;
    if (currentImg) setActiveImg(currentImg);
  }, [active, activeIndex]);

  const handleTabClick = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);

    if (contentRef.current) {
      const tl = gsap.timeline();
      tl.to(contentRef.current, {
        duration: 0.3,
        opacity: 0,
        ease: "power2.in",
      })
        .call(() => {
          setActive(index);
          setActiveIndex(0);
        })
        .to(contentRef.current, {
          duration: 0.3,
          opacity: 1,
          ease: "power2.out",
          onComplete: () => setIsTransitioning(false),
        });
    }
  };

  return (
    <div className="pt-[50px] lg:pt-[100px] overflow-hidden fluid-container">
      <div className="flex flex-col-reverse lg:flex-row items-start gap-10">
        {/* LEFT SIDE – TEXT + SWIPER */}
        <div
          className="w-full lg:w-1/2 lg:gap-18 gap-7 h-full mt-[unset] lg:mt-[40px] flex flex-col justify-between align-center"
          ref={contentRef}
        >
          <div>
            <WordReveal stagger={0.1} fromY={10} duration={3}>
              <H2>
                End-to-End solutions from Discovery to Commercialisation
              </H2>
            </WordReveal>
            <BodyText2 className="mt-4">
              Whether it's a complex new molecule or optimising an existing
              process, our Contract Manufacturing and Research services
              (CDMO/CRAM) deliver speed, reliability and global compliance at
              every stage.
            </BodyText2>
          </div>

          {/* RIGHT SIDE – DYNAMIC IMAGE SECTION */}
          <div className="relative w-full h-[300px] overflow-hidden rounded-[1rem] items-center justify-center flex lg:hidden">
            {activeImg && <div className="absolute inset-0 overflow-hidden">
              <Image
                src={activeImg}
                alt="active-img"
                fill
                className="object-cover scale-110"
              />
              <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
              <span className="absolute rounded-full rounded-br-[28px] overflow-hidden w-[100%] h-[100%]">
                <Image
                  src={activeImg}
                  alt="active-img"
                  fill
                  className="object-cover scale-110"
                />
              </span>
            </div>}

          </div>

          <div className="relative">

            <BodyText2 className="text-orange-200 pb-4">
              0{activeIndex + 1}-<span>0{sliderData[active]?.content?.length}</span>
            </BodyText2>
            <Swiper
              key={`swiper-${active}`}
              ref={swiperRef}
              spaceBetween={16}
              slidesPerView={0.9}
              breakpoints={{
                1024: { slidesPerView: 1, spaceBetween: 24 },
              }}
              modules={[Pagination, Navigation, Mousewheel]}
              navigation={{
                prevEl: ".swiper-button-prev-useBySection",
                nextEl: ".swiper-button-next-useBySection",
              }}
              pagination={{
                el: ".home-by-use-section-swiper",
                type: "progressbar",
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              observer={true}
              observeParents={true}
              direction="horizontal"
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              className="!pr-5 lg:!pr-0"
            >
              {sliderData[active]?.content?.map((item, index) => (
                <SwiperSlide key={`${active}-${index}`}>
                  <div className="relative w-full h-max overflow-hidden">
                    <SubH2 className="text-blue-200 pb-2">{item?.title}</SubH2>
                    <ul className="mt-2 space-y-1">
                      {item.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-300 flex items-center gap-2"
                        >
                          <Image
                            src="/images/star-orange.svg"
                            alt="star"
                            height={15}
                            width={15}
                          />
                          <BodyText2>{feature}</BodyText2>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Swiper Navigation */}
            <div className="absolute top-0 right-0 py-2 z-10 hidden lg:block">
              <div className="flex justify-end gap-3 px-5 lg:px-0">
                <button
                  className={`swiper-button-prev-useBySection transition-opacity ${activeIndex > 0
                    ? "cursor-pointer opacity-100"
                    : "pointer-events-none opacity-30"
                    }`}
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
                  className={`swiper-button-next-useBySection transition-opacity ${activeIndex <
                    sliderData[active]?.content?.length - 1
                    ? "cursor-pointer opacity-100"
                    : "pointer-events-none opacity-30"
                    }`}
                >
                  <Image
                    src="/images/home/chevron-right-orange.svg"
                    alt="Next"
                    width={34}
                    height={34}
                  />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="home-by-use-section-swiper mt-10 h-[2px] w-[90%] mx-auto" />

            {/* Tabs */}
            <div className="overflow-x-auto pt-[40px] px-5 lg:px-0 mt-6">
              <div className="gap-x-6 lg:gap-x-[72px] w-fit hidden lg:flex">
                {sliderData.map((items, index) => (
                  <div key={items.id} onClick={() => handleTabClick(index)}>
                    <BodyText2
                      className={`cursor-pointer flex-shrink-0 transition-all duration-300 ${active === index
                        ? "text-orange-200"
                        : "text-gray-600 hover:text-orange-100"
                        } ${isTransitioning ? "pointer-events-none" : ""
                        }`}
                    >
                      {items.title}
                    </BodyText2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – DYNAMIC IMAGE SECTION */}
        {/* <div className="relative w-full h-[566px] lg:h-[566px] overflow-hidden rounded-[1rem] items-center justify-center hidden lg:flex">
          {activeImg && <div className="absolute inset-0 overflow-hidden">
            <Image
              src={activeImg}
              alt="active-img"
              fill
              className="object-cover scale-110"
            />
            <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
            <span className="absolute rounded-full rounded-br-[28px] overflow-hidden w-[100%] h-[100%]">
              <Image
                src={activeImg}
                alt="active-img"
                fill
                className="object-cover scale-110"
              />
            </span>
          </div>
          }
        </div> */}
        <SwipeImage activeImg={activeImg} />
      </div>
    </div>
  );
};

export default CDMOE2E;

