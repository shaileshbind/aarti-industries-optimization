"use client";
import React, { useState, useRef } from "react";
import { BodyText1, BodyText2, H2, SubH3 } from "../Typography2";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Mousewheel, Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import {
  ManagementBoardProps,
  MeetMindsProps,
} from "@/app/types/who-we-are.type";
import CustomCursorTrigger from "@/app/CustomCursorTrigger";
import Popup from "../Popup";
import clsx from "clsx";
import Button from "../Button";

const MeetMinds: React.FC<MeetMindsProps> = ({
  data,
  hideTitle = false,
  progressClassName,
  navigationNextClass,
  navigationPrevClass,
}) => {
  const { sectionTitle, management_boards } = data;

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [showPopup, setshowPopup] = useState<boolean>(false);
  const [popupDetails, setpopupDetails] = useState<ManagementBoardProps | null>(
    null
  );

  return (
    <div className="pb-[72px] lg:pb-[100px] lg:pt-0">
      {!hideTitle && sectionTitle && (
        <H2 className="mx-5 lg:mx-[60px]">{sectionTitle}</H2>
      )}

      <div className="mt-[44px]">
        {/* Swiper */}
        {management_boards?.length > 0 && (
          <div className="mt-[36px] lg:mt-[40px] ml-[20px] lg:ml-[60px]">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={1.2}
              spaceBetween={24}
              breakpoints={{
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 3 },
                1280: {
                  slidesPerView: 4,
                },
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
              modules={[Pagination, Mousewheel, Navigation, Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: `.${progressClassName || "leader-section-swiper"}`,
                type: "progressbar",
              }}
              navigation={{
                nextEl: `.${
                  navigationNextClass || "swiper-button-next-leaderSection"
                }`,
                prevEl: `.${
                  navigationPrevClass || "swiper-button-prev-leaderSection"
                }`,
              }}
              className="!pr-[20px] !lg:pr-[unset]"
            >
              {management_boards?.map((item) => (
                <SwiperSlide key={item?.id}>
                  <CustomCursorTrigger title="Read Bio">
                    <div
                      onClick={() => {
                        setshowPopup(true);
                        setpopupDetails(item);
                      }}
                    >
                      {item?.image?.url && (
                        <div className="relative rounded-[20px] overflow-hidden w-full h-[328px] lg:h-[400px] bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#f6f7f8_50%,_#e9ebec_100%)] border-[1px] border-grey-200">
                          <Image
                            src={item?.image?.url}
                            alt={item?.image?.alternativeText || "leader"}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      )}
                      {item?.name && (
                        <BodyText1 className="mt-[18px] text-blue-200">
                          {item?.name}
                        </BodyText1>
                      )}
                      {item?.designation && (
                        <BodyText2 className="mt-[4px] text-grey-300">
                          {item?.designation}
                        </BodyText2>
                      )}

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setshowPopup(true);
                          setpopupDetails(item);
                        }}
                        className="block lg:hidden mt-3"
                      >
                        <Button title="Read Bio" useTargetBlank={false} />
                      </div>
                    </div>
                  </CustomCursorTrigger>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Navigation */}
        <div
          className={clsx(
            `w-full`,
            management_boards?.length > 4 ? "mt-[40px]" : "mt-[40px] lg:mt-0"
          )}
        >
          <div className="mx-[20px] lg:mx-[60px] flex items-center lg:gap-x-[32px]">
            <div className="w-[100%] lg:w-[95%] relative">
              <div className={progressClassName || "leader-section-swiper"} />
            </div>
            {management_boards?.length > 4 && (
              <div className="w-fit gap-x-[12px] hidden lg:flex">
                <button
                  className={`${
                    navigationPrevClass || "swiper-button-prev-leaderSection"
                  } transition-opacity 
                        ${
                          activeIndex === 0
                            ? "pointer-events-none opacity-30"
                            : "cursor-pointer opacity-100"
                        }
                      `}
                  aria-label="Previous slide"
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
                  className={`${
                    navigationNextClass || "swiper-button-next-leaderSection"
                  } transition-opacity ${
                    activeIndex >=
                    (management_boards?.length || 0) -
                      Math.floor(
                        typeof swiperRef.current?.params.slidesPerView ===
                          "number"
                          ? swiperRef.current.params.slidesPerView
                          : 1
                      )
                      ? "pointer-events-none opacity-30"
                      : "cursor-pointer opacity-100"
                  }`}
                  aria-label="Next slide"
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
        </div>
      </div>

      <Popup
        className="!w-[90%] lg:!w-[60%] !p-4 md:!p-10"
        isOpen={showPopup}
        onOverlayClick={() => setshowPopup(false)}
      >
        <div className="max-h-[80vh] overflow-y-auto lg:flex gap-10 pr-2 md:pr-0">
          <div className="md:w-[60%] lg:w-[40%] h-[350px] md:h-[500px] rounded-[20px] overflow-hidden">
            <Image
              src={popupDetails?.image?.url || ""}
              alt={popupDetails?.image?.alternativeText || "leader"}
              className="object-cover object-top w-full h-full"
              width={400}
              height={800}
            />
          </div>
          <div className="lg:w-1/2 mt-2 md:mt-8 lg:mt-0">
            <SubH3 className="text-[#17191E] font-semibold">
              {popupDetails?.name}
            </SubH3>
            <BodyText2>{popupDetails?.designation} </BodyText2>

            <p className="mt-2 md:mt-10 lg:mt-[66px] text-base md:text-lg text-[#17191E] lg:max-h-[50vh] lg:overflow-y-auto scrollbar">
              {`"${popupDetails?.bio}"`}
            </p>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default MeetMinds;
