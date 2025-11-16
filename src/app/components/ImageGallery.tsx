"use client";
import React, { useState, useEffect } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { FosteringSafeProps } from "@/app/types/home.type";
import { FadeInRevealBlur } from "./ScrollReveal";
import { BodyText1, H2 } from "./Typography2";
import Button from "./Button";

const ImageGallery: React.FC<FosteringSafeProps> = ({ data, imgArr }) => {
  const { title, description, ctaButton } = data ?? {};
  const { images } = imgArr;

  interface ImageConfig {
    marginTop: string;
    height: string;
  }
  interface SlideConfig {
    images: ImageConfig[];
  }
  interface SlideImageData {
    src: string;
    alt: string;
    config: ImageConfig;
    index: number;
  }
  interface Slide {
    id: number;
    images: SlideImageData[];
    patternIndex: number;
  }

  // A custom hook to detect screen size for responsive rendering
  const useIsDesktop = (): { isDesktop: boolean | null; mounted: boolean } => {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
      setMounted(true);
      const handleResize = (): void => {
        setIsDesktop(window.innerWidth >= 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return { isDesktop, mounted };
  };
  const { isDesktop } = useIsDesktop();

  // if not enough images on mobile add one -
  const generateMobileSwiperSlides = (imageArray: typeof images): Slide[] => {
    const pattern = [2, 2, 2];
    const slides: Slide[] = [];
    let imageIndex = 0;
    let patternIndex = 0;

    const slideConfigs: SlideConfig[] = [
      {
        images: [
          { marginTop: "mt-0", height: "h-[154px]" },
          { marginTop: "mt-[4px]", height: "h-[135px]" },
        ],
      },
      {
        images: [
          { marginTop: "mt-[32px]", height: "h-[122px]" },
          { marginTop: "mt-[4px]", height: "h-[160px]" },
        ],
      },
      {
        images: [
          { marginTop: "mt-0", height: "h-[136px]" },
          { marginTop: "mt-[4px]", height: "h-[139px]" },
        ],
      },
    ];

    while (imageIndex < imageArray?.length) {
      const imagesInThisSlide = pattern[patternIndex];
      const slideConfig = slideConfigs[patternIndex];
      const slideImages: SlideImageData[] = [];

      for (let i = 0; i < imagesInThisSlide; i++) {
        // If we've reached the end of images, start repeating from the beginning
        const currentImageIndex = imageIndex % imageArray?.length;

        slideImages.push({
          src: imageArray?.[currentImageIndex]?.image?.url,
          alt: imageArray?.[currentImageIndex]?.image?.alternativeText,
          config: slideConfig.images[i],
          index: currentImageIndex,
        });

        // Only increment imageIndex if we haven't processed all original images yet
        if (imageIndex < imageArray?.length) {
          imageIndex++;
        }
      }

      slides.push({
        id: slides.length,
        images: slideImages,
        patternIndex: patternIndex,
      });

      patternIndex = (patternIndex + 1) % pattern.length;

      // Break if we've created enough slides to avoid infinite loop
      // This ensures we don't create too many slides when repeating
      if (slides.length >= Math.ceil(imageArray?.length * 1.5)) {
        break;
      }
    }

    return slides;
  };
  const generateSwiperSlides = (imageArray: typeof images): Slide[] => {
    const pattern = [1, 2, 2, 2];
    const slides: Slide[] = [];
    let imageIndex = 0;
    let patternIndex = 0;
    const slideConfigs: SlideConfig[] = [
      {
        images: [{ marginTop: "mt-[116px]", height: "h-[234px]" }],
      },
      {
        images: [
          { marginTop: "mt-0", height: "h-[270px]" },
          { marginTop: "mt-[6px]", height: "h-[203px]" },
        ],
      },
      {
        images: [
          { marginTop: "mt-[67px]", height: "h-[203px]" },
          { marginTop: "mt-[6px]", height: "h-[270px]" },
        ],
      },
      {
        images: [
          { marginTop: "mt-[9px]", height: "h-[262px]" },
          { marginTop: "mt-[6px]", height: "h-[193px]" },
        ],
      },
    ];
    while (imageIndex < imageArray?.length) {
      const imagesInThisSlide = pattern[patternIndex];
      const slideConfig = slideConfigs[patternIndex];
      const slideImages: SlideImageData[] = [];

      for (
        let i = 0;
        i < imagesInThisSlide && imageIndex < imageArray?.length;
        i++
      ) {
        slideImages.push({
          src: imageArray?.[imageIndex]?.image?.url,
          alt: imageArray?.[imageIndex]?.image?.alternativeText,
          config: slideConfig.images[i],
          index: imageIndex,
        });
        imageIndex++;
      }

      if (slideImages.length > 0) {
        slides.push({
          id: slides.length,
          images: slideImages,
          patternIndex: patternIndex,
        });
      }

      patternIndex = (patternIndex + 1) % pattern.length;
    }
    return slides;
  };
  const slidesToRender = isDesktop
    ? generateSwiperSlides(imgArr?.images)
    : generateMobileSwiperSlides(imgArr?.images);

  const renderSwiperSlide = (slide: Slide): React.ReactElement => {
    return (
      <SwiperSlide key={slide.id}>
        {slide?.images?.length > 0 &&
          slide?.images?.map((imageData, index) => (
            <div
              key={index}
              className={`w-full rounded-[14px] overflow-hidden ${imageData.config.marginTop} ${imageData.config.height}`}
            >
              <img
                src={imageData?.src}
                alt={imageData?.alt || ""}
                className="swiper-lazy w-full h-full object-cover"
              />
            </div>
          ))}
      </SwiperSlide>
    );
  };

  return (
    <div className="w-full my-[72px] lg:my-[100px] pointer-events-none">
      <div className="w-full container mx-auto">
        {title && (
          <FadeInRevealBlur>
            <H2 className="text-blue-200 max-w-[unset] lg:max-w-[560px] mx-auto text-center">
              {title}
            </H2>
          </FadeInRevealBlur>
        )}

        {description && (
          <FadeInRevealBlur delay={0.3}>
            <BodyText1 className="mt-[20px] text-grey-400  max-w-[unset] lg:max-w-[640px] mx-auto text-center font-roboto">
              {description}
            </BodyText1>
          </FadeInRevealBlur>
        )}

        {ctaButton?.title && (
          <FadeInRevealBlur delay={0.3}>
            <div className="mt-[36px] w-fit mx-auto">
              <Button href={ctaButton?.link || "#"} title={ctaButton?.title} />
            </div>
          </FadeInRevealBlur>
        )}
      </div>
      <div className="mt-[100px] relative !pointer-events-none">
        <Swiper
          key={isDesktop ? "desktop" : "mobile"}
          slidesPerView={1.8}
          speed={2000}
          allowTouchMove={false}
          freeMode={{ enabled: true, momentum: false }}
          spaceBetween={6}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          modules={[Autoplay, FreeMode]}
          centeredSlides={!isDesktop}
          breakpoints={{
            600: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          onSwiper={(s) => {
            const wrapper = s.el.querySelector(
              ".swiper-wrapper"
            ) as HTMLElement | null;
            if (wrapper) wrapper.style.transitionTimingFunction = "linear";
          }}
        >
          {slidesToRender?.map((slide) => renderSwiperSlide(slide))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageGallery;
