import React, { useState, useEffect } from "react";
import { BodyText1, H2 } from "../Typography2";
import Button from "../Button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { FadeInRevealBlur } from "../ScrollReveal";

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
    {
      id: 8,
      src: "/images/home/safe-slide-4.png",
      alt: "img",
    },
    {
      id: 9,
      src: "/images/home/safe-slide-5.png",
      alt: "img",
    },
    {
      id: 10,
      src: "/images/home/safe-slide-6.png",
      alt: "img",
    },
    {
      id: 11,
      src: "/images/home/safe-slide-7.png",
      alt: "img",
    },
    {
      id: 12,
      src: "/images/home/safe-slide-8.png",
      alt: "img",
    },
    {
      id: 13,
      src: "/images/home/safe-slide-1.png",
      alt: "img",
    },
    {
      id: 14,
      src: "/images/home/safe-slide-2.png",
      alt: "img",
    },
    {
      id: 15,
      src: "/images/home/safe-slide-3.png",
      alt: "img",
    },
    {
      id: 16,
      src: "/images/home/safe-slide-3.png",
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

  // const { isDesktop, mounted } = useIsDesktop();
  const { isDesktop } = useIsDesktop();

  // const generateMobileSwiperSlides = (imageArray: typeof images): Slide[] => {
  //   const pattern = [2, 2, 2];
  //   const slides: Slide[] = [];
  //   let imageIndex = 0;
  //   let patternIndex = 0;

  //   const slideConfigs: SlideConfig[] = [
  //     {
  //       images: [
  //         { marginTop: "mt-0", height: "h-[154px]" },
  //         { marginTop: "mt-[4px]", height: "h-[135px]" },
  //       ],
  //     },
  //     {
  //       images: [
  //         { marginTop: "mt-[32px]", height: "h-[122px]" },
  //         { marginTop: "mt-[4px]", height: "h-[160px]" },
  //       ],
  //     },
  //     {
  //       images: [
  //         { marginTop: "mt-0", height: "h-[136px]" },
  //         { marginTop: "mt-[4px]", height: "h-[139px]" },
  //       ],
  //     },
  //   ];
  //   while (imageIndex < imageArray.length) {
  //     const imagesInThisSlide = pattern[patternIndex];
  //     const slideConfig = slideConfigs[patternIndex];
  //     const slideImages: SlideImageData[] = [];

  //     for (
  //       let i = 0;
  //       i < imagesInThisSlide && imageIndex < imageArray.length;
  //       i++
  //     ) {
  //       slideImages.push({
  //         src: imageArray[imageIndex].src,
  //         alt: imageArray[imageIndex].alt,
  //         config: slideConfig.images[i],
  //         index: imageIndex,
  //       });
  //       imageIndex++;
  //     }

  //     if (slideImages.length > 0) {
  //       slides.push({
  //         id: slides.length,
  //         images: slideImages,
  //         patternIndex: patternIndex,
  //       });
  //     }

  //     patternIndex = (patternIndex + 1) % pattern.length;
  //   }
  //   return slides;
  // };

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

    while (imageIndex < imageArray.length) {
      const imagesInThisSlide = pattern[patternIndex];
      const slideConfig = slideConfigs[patternIndex];
      const slideImages: SlideImageData[] = [];

      for (let i = 0; i < imagesInThisSlide; i++) {
        // If we've reached the end of images, start repeating from the beginning
        const currentImageIndex = imageIndex % imageArray.length;

        slideImages.push({
          src: imageArray[currentImageIndex].src,
          alt: imageArray[currentImageIndex].alt,
          config: slideConfig.images[i],
          index: currentImageIndex,
        });

        // Only increment imageIndex if we haven't processed all original images yet
        if (imageIndex < imageArray.length) {
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
      if (slides.length >= Math.ceil(imageArray.length * 1.5)) {
        break;
      }
    }

    return slides;
  };

  const generateSwiperSlides = (imageArray: typeof images): Slide[] => {
    // const pattern = [1, 2, 2, 2, 1];
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
      // {
      //   images: [{ marginTop: "mt-[116px]", height: "h-[234px]" }],
      // },
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
    <div className="w-full my-[100px]">
      <div className="w-full container mx-auto">
        <FadeInRevealBlur>
          <H2 className="text-blue-200 max-w-[unset] lg:max-w-[560px] mx-auto text-center">
            Fostering a Safe, Inclusive and Empowering Workplace
          </H2>
        </FadeInRevealBlur>
        <FadeInRevealBlur delay={0.3}>
          <BodyText1 className="mt-[20px] text-grey-400  max-w-[unset] lg:max-w-[640px] mx-auto text-center font-roboto">
            We nurture a culture of open dialogue and holistic support through
            structured forums, regular feedback cycles, and focused well-being
            programmes. Our well-being framework spans the physical, social,
            career, financial, and community dimensions.
          </BodyText1>
        </FadeInRevealBlur>
        <FadeInRevealBlur delay={0.3}>
          <div className="mt-[36px] w-fit mx-auto">
            <Button href="#" title="Join Our Team" />
          </div>
        </FadeInRevealBlur>
      </div>
      <div className="mt-[100px] relative">
        <Swiper
          key={isDesktop ? "desktop" : "mobile"}
          slidesPerView={isDesktop ? 5 : 1.8}
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
        >
          {slidesToRender.map((slide) => renderSwiperSlide(slide))}
        </Swiper>
      </div>
    </div>
  );
};

export default FosteringSafe;
