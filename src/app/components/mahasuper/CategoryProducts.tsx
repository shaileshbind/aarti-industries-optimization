"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { BodyText1, BodyText2, H2, H3, SubH2, SubH3, SubH1 } from "../Typography2";
import ParallaxImage from "../ParallaxImage";
import { CategoryProductsProps } from "@/app/types/mahasuper.type";
import Button from "../Button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Mousewheel } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import CategoryCard from "../cards/CategoryCard";

const CategoryProducts: React.FC<CategoryProductsProps> = ({ data }) => {
    const { title, card } = data;
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
console.log('category products data', data);
    return (
        <section className=" md:py-20 py-[30px] overflow-hidden ">
            <div className="md:mt-[40px] mt-[0px] lg:mt-[62px]">
                <div className="flex flex-col lg:flex-row w-full">
                    {/* Left Content */}
                    <div className="px-5 lg:pl-[60px] lg:pr-8 lg:w-[380px] xl:w-[420px] flex-shrink-0 mb-8 lg:mb-0">
                        {/* {sectionTitle && ( */}
                            <SubH1 className="text-blue-200">{title}</SubH1>
                        {/* )} */}
                    </div>
                    {/* Right Swiper */}
                    <div className="flex-1 min-w-0 mt-[8px] lg:mt-[0px]">
                        <div className="relative">
                            {card?.length > 0 && (
                                <div >
                                    <Swiper
                                        spaceBetween={14}
                                        slidesPerView={1.2}
                                        breakpoints={{
                                            600: {
                                                slidesPerView: 2.5,
                                                spaceBetween: 24,
                                            },
                                            1024: {
                                                slidesPerView: 2.2,
                                                spaceBetween: 24,
                                            },
                                            1440: {
                                                slidesPerView: 2.6,
                                                spaceBetween: 24,
                                            },
                                            1740: {
                                                slidesPerView: 3.6,
                                                spaceBetween: 24,
                                            },
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
                                        onSwiper={(swiper) => {
                                            swiperRef.current = swiper;
                                            setIsBeginning(swiper.isBeginning);
                                            setIsEnd(swiper.isEnd);
                                        }}
                                        onSlideChange={(swiper) => {
                                            setIsBeginning(swiper.isBeginning);
                                            setIsEnd(swiper.isEnd);
                                        }}
                                        onReachBeginning={() => {
                                            setIsBeginning(true);
                                        }}
                                        onReachEnd={() => {
                                            setIsEnd(true);
                                        }}
                                        onFromEdge={(swiper) => {
                                            setIsBeginning(swiper.isBeginning);
                                            setIsEnd(swiper.isEnd);
                                        }}
                                        direction="horizontal"
                                        mousewheel={{
                                            forceToAxis: true,
                                            sensitivity: 1,
                                            releaseOnEdges: true,
                                        }}
                                        className="w-full !pr-5 lg:!pr-5 !pl-5 lg:!pl-0"
                                    >
                                        {card?.map((item, index) => (
                                            <SwiperSlide key={`${index}`}>
                                                <div className="title-card-anim">
                                                    <CategoryCard
                                                        imageSrc={item?.image?.url}
                                                        imageAlt={item?.image?.alternativeText}
                                                        title={item?.title}
                                                        description={item?.description}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="relative py-[30px] mx-[20px] lg:mx-[unset]">
                                <div className="hidden lg:flex w-fit gap-3 mt-8 px-5 lg:px-0 absolute bottom-2 right-[100px]">
                                    <button
                                        className={`swiper-button-prev-useBySection transition-opacity ${isBeginning
                                                ? "pointer-events-none opacity-30"
                                                : "cursor-pointer opacity-100"
                                            }`}
                                        aria-label="Previous slide"
                                        aria-disabled={isBeginning}
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
                                        className={`swiper-button-next-useBySection transition-opacity ${isEnd
                                                ? "pointer-events-none opacity-30"
                                                : "cursor-pointer opacity-100"
                                            }`}
                                        aria-label="Next slide"
                                        aria-disabled={isEnd}
                                    >
                                        <Image
                                            src="/images/home/chevron-right-orange.svg"
                                            alt="Next"
                                            width={34}
                                            height={34}
                                        />
                                    </button>
                                </div>
                                <div className="home-by-use-section-swiper mt-4 bottom-6 h-[2px] max-w-[100%] lg:max-w-[78%] relative" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryProducts;
