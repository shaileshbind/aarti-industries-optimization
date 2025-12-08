"use client";
import React from "react";
import Image from "next/image";
import { BodyText1, SubH1 } from "../Typography2";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

type EventPopupProps = {
  event: {
    title: string;
    date?: string;
    location?: string;
    description?: string;
    image: {
      url: string;
      alternativeText: string;
    };
    mobImage: {
      url: string;
      alternativeText: string;
    };
    gallery?: {
      url: string;
      alternativeText: string;
    }[];
  };
};

const EventPopup = ({ event }: EventPopupProps) => {
  const { title, description, image, mobImage, gallery } = event;

  // Combine gallery images if available, otherwise use main images
  const imagesToShow = gallery && gallery.length > 0 
    ? gallery 
    : [
        { url: image.url, alternativeText: image.alternativeText },
        { url: mobImage.url, alternativeText: mobImage.alternativeText },
      ].filter(img => img.url);
  return (
    <div className="w-full" data-lenis-prevent>
      {/* Title */}
      {title && (
        <SubH1 className="text-blue-200 mb-[16px] pr-8">
          {title}
        </SubH1>
      )}

      {/* Description */}
      {description && (
        <BodyText1 className="text-grey-400 mb-[24px]">
          {description}
        </BodyText1>
      )}

      {/* Image Gallery */}
      {imagesToShow && imagesToShow.length > 0 && (
        <div className="mt-[40px] w-[calc(100%+40px)] mx-[-20px] md:w-[calc(100%+60px)] md:mx-[-30px]">
          <Swiper
            modules={[FreeMode]}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumBounce: false,
              momentumRatio: 1,
              momentumVelocityRatio: 1,
              sticky: false,
            }}
            slidesPerView="auto"
            spaceBetween={12}
            loop={true}
            loopAdditionalSlides={10}
            loopPreventsSliding={false}
            breakpoints={{
              600: {
                spaceBetween: 16,
              },
              1024: {
                spaceBetween: 20,
              },
            }}
            className="event-gallery-swiper"
          >
            {imagesToShow.map((image, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <div className="relative w-[280px] h-[200px] md:w-[320px] md:h-[240px]   rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alternativeText || `Event image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 600px) 280px, (max-width: 1024px) 320px, 400px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default EventPopup;
