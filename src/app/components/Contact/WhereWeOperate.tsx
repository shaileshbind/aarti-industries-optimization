"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { H2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Mousewheel, Pagination, Grid, Navigation, Autoplay } from "swiper/modules";
import Tabs from "../Tabs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AddressCard from "../cards/AddressCard";
import {
  WhereWeOperateProps,
  WhereWeOperateDataItem,
  AddressCardItem,
  WhereWeOperateTab,
} from "@/app/types/contact.type";

gsap.registerPlugin(ScrollTrigger);

const WhereWeOperate: React.FC<WhereWeOperateProps> = ({ data }) => {
  // Transform API data to group by regionName and map to AddressCard format
  const apiData = data || [];

  // Group data by regionName
  const indiaData: AddressCardItem[] = apiData
    .filter((item: WhereWeOperateDataItem) => item.regionName === "India")
    .map((item: WhereWeOperateDataItem) => ({
      location: item.locationName || "",
      company: item.companyName || "",
      address: item.address || "",
      phone: item.mobileNo || "",
      url: item.googleMapLink || "",
      registeredOffice: item.officeLabel === "REGISTERED OFFICE",
      type: item.officeLabel || "",
    }));

  const internationalData: AddressCardItem[] = apiData
    .filter(
      (item: WhereWeOperateDataItem) => item.regionName === "International"
    )
    .map((item: WhereWeOperateDataItem) => ({
      location: item.locationName || "",
      company: item.companyName || "",
      address: item.address || "",
      phone: item.mobileNo || "",
      url: item.googleMapLink || "",
      registeredOffice: item.officeLabel === "REGISTERED OFFICE",
      type: item.officeLabel || "",
    }));

  const card: WhereWeOperateTab[] = [
    {
      id: 1,
      category: "India",
      post_category: {
        id: 1,
        name: "India",
        slug: "india",
        address: indiaData,
      },
    },
    {
      id: 2,
      category: "International",
      post_category: {
        id: 2,
        name: "International",
        slug: "international",
        address: internationalData,
      },
    },
  ];
  const [active, setActive] = useState<string>(
    card?.[0]?.post_category?.slug || "india"
  );
  const [activeIndex, setactiveIndex] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);
  const latestAtAartiRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let tabsAnim: gsap.core.Tween | undefined;
    if (latestAtAartiRef.current) {
      tabsAnim = gsap.fromTo(
        latestAtAartiRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: latestAtAartiRef.current,
            start: "top 87%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    return () => {
      if (tabsAnim && tabsAnim.scrollTrigger) tabsAnim.scrollTrigger.kill();
      if (tabsAnim) tabsAnim.kill();
    };
  }, []);

  const handleTabChange = (slug: string, index: number) => {
    if (!cardsWrapRef.current) {
      setActive(String(slug));
      setactiveIndex(index);
      setShowAll(false);
      return;
    }

    const cards = cardsWrapRef.current.querySelectorAll(".address-card-anim");
    if (!cards || cards.length === 0) {
      setActive(String(slug));
      setactiveIndex(index);
      setShowAll(false);
      return;
    }

    if (switchAnimRef.current) {
      switchAnimRef.current.kill();
      switchAnimRef.current = null;
    }

    gsap.set(cards, { transformOrigin: "50% 50%" });
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => {
        setActive(String(slug));
        setactiveIndex(index);
        setShowAll(false);
      },
    });
    tl.to(cards, { translateY: "200%", duration: 0.2, stagger: 0.05 });
    switchAnimRef.current = tl;
  };

  useEffect(() => {
    if (!cardsWrapRef.current) return;
    const cards = cardsWrapRef.current.querySelectorAll(".address-card-anim");
    if (!cards || cards.length === 0) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    gsap.set(cards, { transformOrigin: "50% 50%", translateY: "200%" });
    tl.to(cards, { translateY: "0%", duration: 0.3, stagger: 0.05 });

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  const postsCount = card[activeIndex]?.post_category?.address?.length || 0;
  // Determine if progress bar should be shown
  const showProgressBar = isMobile ? postsCount > 1 : postsCount > 4;
  return (
    <div className="w-full my-[50px] lg:my-[100px]" ref={latestAtAartiRef}>
      <H2 className="text-blue-200 text-center">Where We Operate</H2>
      <div className="mt-[18px] md:mt-[30px] w-full ">
        <div className="max-w-[100%]  fluid-container ">
          <Tabs
            tabs={card as unknown as Parameters<typeof Tabs>[0]["tabs"]}
            activeId={active}
            buttonClassName="py-2 px-4 md:px-[24px] md:py-[12px] rounded-full transition-colors duration-200 relative z-10"
            indicatorColor="var(--gradient-orange-1)"
            onChange={(slug, index) => {
              handleTabChange(slug, index);
            }}
            className="justify-center"
          />
        </div>

        {postsCount > 0 && (
          <>
            <div className="w-full hidden lg:block">
              <div className="mt-[unset] lg:mt-[52px]" ref={cardsWrapRef}>
                <Swiper
                  key={active}
                  spaceBetween={24}
                  slidesPerView={2}
                  grid={{
                    rows: 1,
                    fill: "row",
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      grid: {
                        rows: 3,
                        fill: "row",
                      },
                    },
                    786: {
                      slidesPerView: 2,
                      grid: {
                        rows: 2,
                        fill: "row",
                      },
                    },
                    1024: {
                      slidesPerView: 3,
                      grid: {
                        rows: 2,
                        fill: "row",
                      },
                    },
                  }}
                  navigation={{
                    prevEl: ".swiper-button-prev-where-we-operate",
                    nextEl: ".swiper-button-next-where-we-operate",
                  }}
                  modules={[Pagination, Mousewheel, Grid, Navigation, Autoplay]}
                    autoplay={{
                  delay: 15000,
                  disableOnInteraction: false,
                  }}
                  direction="horizontal"
                  pagination={
                    showProgressBar
                      ? {
                          el: ".home-latest-at-swiper",
                          type: "progressbar",
                        }
                      : undefined
                  }
                  mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                  }}
                  className="w-full !px-[20px] lg:!px-[60px] where-we-operate-swiper"
                >
                  {card[activeIndex]?.post_category?.address?.map(
                    (item: AddressCardItem, index: number) => (
                      <SwiperSlide key={`${activeIndex}-${index}`}>
                        <div className="address-card-anim h-full">
                          <AddressCard
                            location={item?.location}
                            name={item?.company}
                            fullAddress={item?.address}
                            researchCentre={item?.type === "R&D OFFICE"}
                            phone={item?.phone}
                            type={item?.type}
                            url={item?.url}
                            registeredOffice={item?.registeredOffice}
                            corporateOffice={item?.address?.includes(
                              "Vikhroli"
                            )}
                          />
                        </div>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </div>
              {showProgressBar && (
                <div className="flex justify-between items-center px-[20px] lg:px-[60px] mt-[30px]">
                  <div className="relative h-[1px] mx-[20px] lg:mr-[60px]  flex w-full">
                    <div className="home-latest-at-swiper !pb-0 absolute inset-0 !h-[1.5px]" />
                  </div>
                  <div className="flex gap-3">
                    <Image
                      src="/images/home/chevron-right-orange.svg"
                      alt="prev"
                      width={34}
                      height={34}
                      className={`-rotate-180 swiper-button-prev-where-we-operate transition-opacity cursor-pointer`}
                    />

                    <Image
                      src="/images/home/chevron-right-orange.svg"
                      alt="next"
                      width={34}
                      height={34}
                      className={`swiper-button-next-where-we-operate transition-opacity cursor-pointer`}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="w-full lg:hidden px-[20px]">
              {(showAll
                ? card[activeIndex]?.post_category?.address
                : card[activeIndex]?.post_category?.address?.slice(0, 2)
              )?.map((item: AddressCardItem, index: number) => (
                <div key={`${activeIndex}-${index}`}>
                  <AddressCard
                    location={item?.location}
                    name={item?.company}
                    fullAddress={item?.address}
                    phone={item?.phone}
                    type={item?.type}
                    url={item?.url}
                    registeredOffice={item?.registeredOffice}
                  />
                </div>
              ))}
              {card[activeIndex]?.post_category?.address?.length > 2 && (
                <div className="p-5 mt-[20px] flex justify-center">
                  <div className="w-fit group relative inline-block">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="relative w-fit py-[14px] px-[22px] rounded-[6px] cursor-pointer bg-gradient-orange-1 text-white text-[16px] font-normal leading-[100%] font-alte-hans overflow-hidden transition-all duration-300"
                    >
                      <span className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                      <span className="relative z-10 text-white">
                        {showAll ? "Show Less" : "View All"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <style jsx global>{`
        .where-we-operate-swiper .swiper-slide {
          height: auto !important;
          display: flex;
        }
        .where-we-operate-swiper .swiper-slide > div {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default WhereWeOperate;
