import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BodyText2, H2, SubH1 } from "../Typography2";
import Button from "../Button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

const FrameworkForged = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const frameworkData = [
    {
      id: 1,
      title: "Fostering Inclusion",
      desc: "We create an environment where everyone feels valued, respected, and empowered to contribute their best.",
      img: "/images/home/framework-forged-1.png",
      alt: "Inclusive workplace illustration",
    },
    {
      id: 2,
      title: "Holistic Well-being",
      desc: "Our well-being programs cover physical, social, career, financial, and community dimensions.",
      img: "/images/home/hero-banner1.png",
      alt: "Well-being program visual",
    },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetAfter, setOffsetAfter] = useState(0);

  const slidesPerView = 1.5;
  const spaceBetween = 80;

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

  return (
    <div>
      <H2 className="container block lg:hidden mb-[24px] text-blue-200">
        Framework Forged in Science, Strategy, and Scale
      </H2>
      <div className="relative w-full grid grid-cols-1 lg:grid-cols-[55%_45%] px-[20px] lg:px-[unset]">
        <div className="lg:ml-[60px] order-2 lg:order-1">
          <H2 className="hidden lg:block text-blue-200 max-w-[460px]">
            Framework Forged in Science, Strategy, and Scale
          </H2>
          <div className="mt-[65px] mb-[27px] flex justify-between max-w-[100%] lg:max-w-[440px]">
            <BodyText2 className="text-orange-200">
              0{activeIndex + 1}-<span>0{frameworkData?.length}</span>
            </BodyText2>
            <div className="hidden lg:block">
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
                    activeIndex < frameworkData.length - 1
                      ? "cursor-pointer opacity-100"
                      : "pointer-events-none opacity-30"
                  }`}
                />
              </div>
            </div>
          </div>

          <div ref={containerRef} className="w-full">
            <Swiper
              modules={[Navigation, Scrollbar]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              slidesOffsetAfter={offsetAfter}
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
              className="framework-forged-swiper"
            >
              {frameworkData?.map((items, index) => {
                return (
                  <SwiperSlide
                    key={items?.id}
                    className={`transition-all duration-500  ${
                      index === activeIndex ? "" : "lg:blur-xs lg:opacity-50"
                    }`}
                  >
                    <SubH1 className={`text-blue-200`}>{items?.title}</SubH1>
                    <BodyText2 className="mt-[12px] text-[#585858]">
                      {items?.desc}
                    </BodyText2>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="mt-[40px]">
            <Button href="#" title="Partner With Us" />
          </div>
          {/* <div className="framework-forged-swiper">d</div> */}
        </div>
        <div className="order-1 lg:order-2 relative h-[317px] lg:h-[640px] w-full overflow-hidden ">
          <div
            className={`absolute right-0 top-0 min-h-[317px] lg:min-h-[640px] w-[100%] lg:w-full rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] `}
          >
            <Image
              src={frameworkData?.[activeIndex]?.img}
              alt={frameworkData?.[activeIndex]?.alt}
              fill
              className="absolute object-cover opacity-40 rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] "
            />
            <Image
              src={frameworkData?.[activeIndex]?.img}
              alt={frameworkData?.[activeIndex]?.alt}
              width={500}
              height={548}
              className="absolute object-cover rounded-tl-[20px] lg:rounded-tl-[30px]  h-[calc(100%-71px)] lg:h-[calc(100%-93px)] w-[calc(100%-71px)] lg:w-[calc(100%-210px)]"
            />
            <Image
              src="/images/home/star-white.svg"
              alt="img"
              width={72}
              height={72}
              className="absolute top-[-36px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
            />
            <Image
              src="/images/home/star-white.svg"
              alt="img"
              width={72}
              height={72}
              className="absolute bottom-[50px] lg:bottom-[57px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
            />
            <div className="absolute min-h-screen bg-white w-[1px] right-[71px] lg:right-[209.5px]" />
            <div className="absolute w-full bg-white bottom-[71px] lg:bottom-[92.5px] h-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkForged;
