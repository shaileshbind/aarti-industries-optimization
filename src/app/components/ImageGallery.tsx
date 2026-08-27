"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import { FadeInReveal } from "./ScrollReveal";
import { BodyText1, H2 } from "./Typography2";
import Button from "./Button";
import { ButtonProps, ImageProps } from "../types/global.type";
import ImagePopup from "./ImagePopup";

type FosteringSafeProps = {
  data?: {
    title?: string;
    description?: string;
    ctaButton?: ButtonProps;
  };
  imgArr?: {
    images?: {
      image?: ImageProps;
    }[];
  };
};

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

const ImageGallery = ({ data, imgArr }: FosteringSafeProps) => {
  const { title, description, ctaButton } = data ?? {};
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SlideImageData | null>(
    null,
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

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

  type ImageArrayType =
    | {
      image?: ImageProps;
    }[]
    | undefined;

  // if not enough images on mobile add one -
  const generateMobileSwiperSlides = (imageArray?: ImageArrayType): Slide[] => {
    if (!imageArray || imageArray.length === 0) return [];

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
          { marginTop: "mt-0", height: "h-[154px]" },
          { marginTop: "mt-[4px]", height: "h-[135px]" },
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
          src: imageArray[currentImageIndex]?.image?.url || "",
          alt: imageArray[currentImageIndex]?.image?.alternativeText || "",
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

  const generateSwiperSlides = (imageArray?: ImageArrayType): Slide[] => {
    if (!imageArray || imageArray.length === 0) return [];

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
          src: imageArray[imageIndex]?.image?.url || "",
          alt: imageArray[imageIndex]?.image?.alternativeText || "",
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

  const imageArray = imgArr?.images;
  const baseSlides = useMemo(
    () =>
      isDesktop
        ? generateSwiperSlides(imageArray)
        : generateMobileSwiperSlides(imageArray),
    [imageArray, isDesktop],
  );

  // Single set of slides; we render it twice in the DOM for seamless loop with translateX(-50%)
  const slidesToRender = useMemo(() => {
    if (!baseSlides || baseSlides.length === 0) return [];
    return baseSlides;
  }, [baseSlides]);

  // Get all unique images for navigation
  const allImages = useMemo(() => {
    if (!imgArr?.images || imgArr.images.length === 0) return [];
    return imgArr.images.map((item, index) => ({
      src: item?.image?.url || "",
      alt: item?.image?.alternativeText || "",
      index: index,
    }));
  }, [imgArr?.images]);

  // Calculate animation duration based on constant speed
  const calculateAnimationDuration = useCallback(() => {
    if (marqueeRef.current && isDesktop !== null && slidesToRender.length > 0) {
      // Constant speed in pixels per second (adjust these values to control speed)
      const speedPxPerSecond = isDesktop ? 100 : 60; // Desktop: 100px/s, Mobile: 60px/s

      // Get the actual width of the marquee content
      const marqueeWidth = marqueeRef.current.scrollWidth;

      // Calculate duration based on distance (50% of total width) and speed
      // Since we're moving -50%, we need to cover half the width
      const distance = marqueeWidth / 2;
      const duration = distance / speedPxPerSecond;

      marqueeRef.current.style.animationDuration = `${duration}s`;
      marqueeRef.current.style.animationPlayState = isHovered
        ? "paused"
        : "running";
    }
  }, [isHovered, isDesktop, slidesToRender]);

  // Update animation styles dynamically with constant speed
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is fully laid out before measuring
    requestAnimationFrame(() => {
      calculateAnimationDuration();
    });
  }, [calculateAnimationDuration]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        calculateAnimationDuration();
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateAnimationDuration]);

  const handleImageClick = (imageData: SlideImageData) => {
    setSelectedImage(imageData);
    setCurrentImageIndex(imageData.index);
    setIsPopupOpen(true);
  };

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  }, []);

  const handleNextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (allImages.length === 0) return;
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allImages.length;
        setSelectedImage({
          src: allImages[nextIndex].src,
          alt: allImages[nextIndex].alt,
          config: { marginTop: "", height: "" },
          index: nextIndex,
        });
        return nextIndex;
      });
    },
    [allImages],
  );

  const handlePrevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (allImages.length === 0) return;
      setCurrentImageIndex((prevIndex) => {
        const newPrevIndex =
          (prevIndex - 1 + allImages.length) % allImages.length;
        setSelectedImage({
          src: allImages[newPrevIndex].src,
          alt: allImages[newPrevIndex].alt,
          config: { marginTop: "", height: "" },
          index: newPrevIndex,
        });
        return newPrevIndex;
      });
    },
    [allImages],
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isPopupOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevImage();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClosePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPopupOpen, handleNextImage, handlePrevImage, handleClosePopup]);

  const renderSlide = (slide: Slide, keyPrefix: string): React.ReactElement => {
    return (
      <div key={`${keyPrefix}-${slide.id}`} className="px-[2px] w-[236px] lg:w-[350px] ">
        {slide?.images?.length > 0 &&
          slide?.images?.map((imageData, index) => (
            <div
              key={index}
              className={`w-full rounded-[14px] overflow-hidden ${imageData.config.marginTop} ${imageData.config.height} ${isDesktop ? "cursor-pointer" : ""}`}
              onClick={
                isDesktop ? () => handleImageClick(imageData) : undefined
              }
            >
              {imageData?.src && (
                <Image
                  src={imageData?.src}
                  alt={imageData?.alt || "banner"}
                  className="swiper-lazy w-full h-full object-cover"
                  width={350}
                  height={270}
                />
              )}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="w-full my-[72px] lg:my-[140px]">
      <div className="w-full container mx-auto">
        {title && (
          <FadeInReveal>
            <H2 className="text-blue-200 max-w-[unset] lg:max-w-[560px] mx-auto text-center">
              {title}
            </H2>
          </FadeInReveal>
        )}

        {description && (
          <FadeInReveal>
            <BodyText1 className="mt-[20px] text-grey-400  max-w-[unset] lg:max-w-[640px] mx-auto text-center font-roboto">
              {description}
            </BodyText1>
          </FadeInReveal>
        )}

        {ctaButton?.title && (
          <FadeInReveal>
            <div className="mt-[36px] w-fit mx-auto">
              {ctaButton?.title &&
                (ctaButton?.hasExternalLink === "true"
                  ? ctaButton?.externalLink
                  : ctaButton?.link?.link) && (
                  <Button
                    title={ctaButton?.title}
                    href={
                      ctaButton?.hasExternalLink === "true"
                        ? ctaButton?.externalLink
                        : ctaButton?.link?.link
                    }
                    useTargetBlank={ctaButton?.hasExternalLink === "true"}
                  />
                )}
            </div>
          </FadeInReveal>
        )}
      </div>
      <div
        className="mt-[100px] relative overflow-hidden"
        onMouseEnter={isDesktop ? () => setIsHovered(true) : undefined}
        onMouseLeave={isDesktop ? () => setIsHovered(false) : undefined}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes imageGalleryMarquee {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-50%);
              }
            }
            .image-gallery-marquee {
              display: flex;
              width: fit-content;
              animation: imageGalleryMarquee linear infinite;
              /* Duration is set dynamically via JavaScript to maintain constant speed */
            }
          `,
          }}
        />
        <div
          ref={marqueeRef}
          className="image-gallery-marquee pointer-events-none lg:pointer-events-auto"
          style={{
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {/* First set */}
          {slidesToRender?.map((slide) => renderSlide(slide, "a"))}
          {/* Dplicate - with translateX(-50%) */}
          {slidesToRender?.map((slide) => renderSlide(slide, "b"))}
        </div>
      </div>

      {/* Image Popup */}
      <ImagePopup
        isOpen={isPopupOpen}
        onOverlayClick={handleClosePopup}
        className="!w-[90%] lg:!w-[70%] !p-4 md:!p-8"
      >
        {selectedImage && allImages.length > 0 && (
          <div className="w-full h-full flex items-center justify-center relative">
            {/* Previous Button */}
            {allImages.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 md:left-0 z-20  rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <Image
                  src="/images/home/chevron-right-white.svg"
                  alt="next"
                  width={45}
                  height={45}
                  sizes="45px"
                  className="rotate-180"
                />
              </button>
            )}

            {/* Image Container */}
            <div className="relative w-full h-[70vh] rounded-[20px] overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt || "banner"}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {/* Next Button */}
            {allImages.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 md:right-0 z-20   rounded-full  shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <Image
                  src="/images/home/chevron-right-white.svg"
                  alt="next"
                  width={45}
                  height={45}
                  sizes="45px"
                />
              </button>
            )}

            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/60 text-white px-4 py-2 rounded-full text-sm md:text-base">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            )}
          </div>
        )}
      </ImagePopup>
    </div>
  );
};

export default ImageGallery;
