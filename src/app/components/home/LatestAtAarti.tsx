"use client";
import React, { useEffect, useState } from "react";
import { H2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import Tabs from "../Tabs";
import DateCard from "../cards/DateCard";
import { CategoryDataProps, LatestAtAartiProps } from "@/app/types/home.type";

const LatestAtAarti: React.FC<LatestAtAartiProps> = ({ data }) => {
  const { sectionTitle } = data;
  const [sliderData, setsliderData] = useState([]);
  const [categoryData, setcategoryData] = useState<CategoryDataProps>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/get-categories`
    );

    const data = await response.json();
    getCategoryData(data?.data?.[0]?.slug);
    setsliderData(data?.data);
    setActive(String(data?.data?.[0]?.slug));
  };

  const getCategoryData = async (slug: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post-categories/${slug}`
    );

    const data = await response.json();
    setcategoryData(data?.data?.posts);
  };

  return (
    <div className="w-full my-[50px] lg:my-[100px]">
      {sectionTitle && (
        <div className="container mx-auto">
          <H2 className="text-blue-200">{sectionTitle}</H2>
        </div>
      )}

      <div className="mt-[18px] md:mt-[30px] w-full container">
        <div className="max-w-[100%] md:max-w-fit">
          <Tabs
            tabs={sliderData}
            activeId={active}
            onChange={(slug) => {
              setActive(String(slug));
              getCategoryData(String(slug));
            }}
          />
        </div>

        <div className="mt-[52px]">
          <Swiper
            key={active}
            spaceBetween={24}
            slidesPerView={1.5}
            breakpoints={{
              1024: { slidesPerView: 4 },
            }}
            modules={[Pagination, Mousewheel]}
            pagination={{
              type: "progressbar",
            }}
            direction="horizontal"
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }}
            className="home-latest-at-swiper"
          >
            {categoryData?.map((item, index) => (
              <SwiperSlide key={index}>
                <DateCard
                  imageSrc={item?.image?.url}
                  date={item?.title}
                  desc={item?.description}
                  link={item?.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LatestAtAarti;
