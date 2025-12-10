"use client";
import { useRef, useState } from "react";
import { H2 } from "../Typography2";
import DateCard from "../cards/DateCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel, Pagination } from "swiper/modules";
import { ChemCreatesProps } from "@/app/types/who-we-are.type";
import Image from "next/image";

const ChemCreates: React.FC<ChemCreatesProps> = ({ data }) => {
  const { sectionTitle, blog_case_studies } = data;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getSlidesPerView = (): number => {
    const slidesPerView = swiperRef.current?.params.slidesPerView;
    return typeof slidesPerView === "number" ? Math.floor(slidesPerView) : 1;
  };
  const totalSlides = blog_case_studies?.length ?? 0;
  const isAtEnd = activeIndex >= totalSlides - getSlidesPerView();

  return (
    <div className="mt-[0] mb-[72px] lg:mb-[100px] lg:mt-0">
      {sectionTitle && (
        <H2 className="mx-[20px] lg:mx-[60px]">{sectionTitle}</H2>
      )}

      {blog_case_studies && blog_case_studies.length > 0 && (
        <>
          <div className="mt-[36px] lg:mt-[40px]">
            <Swiper
              slidesPerView={1.2}
              spaceBetween={24}
              breakpoints={{
                500: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              modules={[Pagination, Mousewheel]}
              direction="horizontal"
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              pagination={{
                el: ".whoweare-chem-creates-swiper",
                type: "progressbar",
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="w-full !px-[20px] lg:!px-[60px] "
            >
              {blog_case_studies?.map((item) => {
                return (
                  <SwiperSlide key={item?.id}>
                    <DateCard
                      imageSrc={item?.thumbnailImageDesktop?.url}
                      date={item?.date}
                      desc={item?.title}
                      link={`/blogs/${item?.slug}`}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          {/* Progress + Navigation Flex Below Swiper */}
          <div className="mt-[16px] flex items-center gap-x-[12px] mx-[20px] lg:mx-[60px]">
            {/* Progress Bar */}
            <div className="flex-1 relative h-[1px]">
              <div className="whoweare-chem-creates-swiper !pb-0 absolute inset-0 !h-[1.5px]" />
            </div>
            {/* Navigation Buttons */}
            {blog_case_studies?.length > 4 && (
              <div className="hidden lg:flex gap-x-[12px] flex-shrink-0">
                <button
                  className={`transition-opacity ${
                    activeIndex === 0
                      ? "pointer-events-none opacity-30"
                      : "cursor-pointer opacity-100"
                  }`}
                  aria-label="Previous slide"
                  aria-disabled={activeIndex === 0}
                  onClick={() => swiperRef.current?.slidePrev()}
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
                  className={`transition-opacity ${
                    isAtEnd
                      ? "pointer-events-none opacity-30"
                      : "cursor-pointer opacity-100"
                  }`}
                  aria-label="Next slide"
                  aria-disabled={isAtEnd}
                  onClick={() => swiperRef.current?.slideNext()}
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
          </div>
        </>
      )}
    </div>
  );
};

export default ChemCreates;
