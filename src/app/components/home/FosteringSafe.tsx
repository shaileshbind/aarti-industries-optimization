import React, { useState, useEffect } from "react";
import { BodyText1, H2 } from "../Typography2";
import Button from "../Button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const FosteringSafe = () => {
  const images = [
    {
      id: 0,
      src: "/images/home/safe-slide-1.png",
      alt: "img",
    },
    {
      id: 1,
      src: "/images/home/safe-slide-2.png",
      alt: "img",
    },
    {
      id: 2,
      src: "/images/home/safe-slide-3.png",
      alt: "img",
    },
    {
      id: 3,
      src: "/images/home/safe-slide-4.png",
      alt: "img",
    },
    {
      id: 4,
      src: "/images/home/safe-slide-5.png",
      alt: "img",
    },
    {
      id: 5,
      src: "/images/home/safe-slide-6.png",
      alt: "img",
    },
    {
      id: 6,
      src: "/images/home/safe-slide-7.png",
      alt: "img",
    },
    {
      id: 7,
      src: "/images/home/safe-slide-8.png",
      alt: "img",
    },
  ];

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
  const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };

      // Set initial value
      handleResize();
      // Add event listener
      window.addEventListener("resize", handleResize);

      // Clean up the event listener
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isDesktop;
  };

  const isDesktop = useIsDesktop();

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

    while (imageIndex < imageArray.length) {
      const imagesInThisSlide = pattern[patternIndex];
      const slideConfig = slideConfigs[patternIndex];
      const slideImages: SlideImageData[] = [];

      for (
        let i = 0;
        i < imagesInThisSlide && imageIndex < imageArray.length;
        i++
      ) {
        slideImages.push({
          src: imageArray[imageIndex].src,
          alt: imageArray[imageIndex].alt,
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

  const generateSwiperSlides = (imageArray: typeof images): Slide[] => {
    const pattern = [1, 2, 2, 2, 1];
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
          { marginTop: "mt-0", height: "h-[262px]" },
          { marginTop: "mt-[6px]", height: "h-[193px]" },
        ],
      },
      {
        images: [{ marginTop: "mt-[116px]", height: "h-[234px]" }],
      },
    ];

    while (imageIndex < imageArray.length) {
      const imagesInThisSlide = pattern[patternIndex];
      const slideConfig = slideConfigs[patternIndex];
      const slideImages: SlideImageData[] = [];

      for (
        let i = 0;
        i < imagesInThisSlide && imageIndex < imageArray.length;
        i++
      ) {
        slideImages.push({
          src: imageArray[imageIndex].src,
          alt: imageArray[imageIndex].alt,
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
    ? generateSwiperSlides(images)
    : generateMobileSwiperSlides(images);

  const renderSwiperSlide = (slide: Slide): React.ReactElement => {
    return (
      <SwiperSlide key={slide.id}>
        {slide.images.map((imageData, index) => (
          <div
            key={index}
            className={`w-full rounded-[14px] overflow-hidden ${imageData.config.marginTop} ${imageData.config.height}`}
          >
            <img
              src={imageData.src}
              alt={imageData.alt}
              className="swiper-lazy w-full h-full object-cover"
            />
          </div>
        ))}
      </SwiperSlide>
    );
  };

  return (
    <div>
      <H2 className="text-blue-200 max-w-[560px] mx-auto text-center">
        Fostering a Safe, Inclusive and Empowering Workplace
      </H2>
      <BodyText1 className="mt-[20px] text-grey-400  max-w-[640px] mx-auto text-center font-roboto">
        We nurture a culture of open dialogue and holistic support through
        structured forums, regular feedback cycles, and focused well-being
        programmes. Our well-being framework spans the physical, social, career,
        financial, and community dimensions.
      </BodyText1>
      <div className="mt-[36px] w-fit mx-auto">
        <Button href="#" title="Join Our Team" />
      </div>
      <div className="mt-[100px] relative">
        <Swiper
          slidesPerView={isDesktop ? 5 : 1.8}
          allowTouchMove={false}
          spaceBetween={6}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          centeredSlides={!isDesktop}
        >
          {slidesToRender.map((slide) => renderSwiperSlide(slide))}
        </Swiper>
      </div>
    </div>
  );
};

export default FosteringSafe;
