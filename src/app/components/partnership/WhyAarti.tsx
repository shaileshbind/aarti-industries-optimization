"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { BodyText2, H2 } from "../Typography2";
import MainAccordion from "../Accordion";
import useMediaQuery from "@mui/material/useMediaQuery";
import { WhyAartiProps } from "@/app/types/partnership.type";
import { FadeInReveal } from "../ScrollReveal";

interface LayoutImageProps {
  src: string;
  imageFade?: boolean;
}

export default function WhyAarti({ data }: WhyAartiProps) {
  const { title, content } = data;

  const [expanded, setExpanded] = useState<number>(0);
  const [activeImage, setactiveImage] = useState<string>(
    content[0]?.image?.url,
  );
  const [progressWidth, setProgressWidth] = useState<number>(0);
  const [imageFade, setImageFade] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedProgressRef = useRef<number>(0);
  const isMobile = useMediaQuery("(max-width:820px)");

  const startProgressAnimation = (startFrom: number = 0) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    startTimeRef.current = Date.now();
    const duration = 15000; // 5 seconds
    const updateInterval = 16; // ~60fps

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(startFrom + (elapsed / duration) * 100, 100);
      setProgressWidth(progress);

      if (progress >= 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }
    }, updateInterval);
  };

  const stopProgressAnimation = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    pausedProgressRef.current = progressWidth;
  };

  const resumeProgressAnimation = () => {
    startProgressAnimation(pausedProgressRef.current);
  };

  const handleAccordion = (index: number) => {
    setExpanded(index);
    setImageFade(false);

    setTimeout(() => {
      setactiveImage(content?.[index]?.image?.url);
      setImageFade(true);
    }, 300);

    // Reset progress
    setProgressWidth(0);
    pausedProgressRef.current = 0;

    // Clear existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Start auto rotation and progress if not hovered
    if (!isHovered) {
      startAutoRotation();
      startProgressAnimation(0);
    }
  };

  const startAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setExpanded((prevExpanded) => {
        const nextIndex = (prevExpanded + 1) % content.length;

        // Fade out image
        setImageFade(false);

        setTimeout(() => {
          setactiveImage(content[nextIndex]?.image?.url);
          setImageFade(true);
        }, 300);

        // Reset progress
        setProgressWidth(0);
        pausedProgressRef.current = 0;

        // Start new progress animation
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        startProgressAnimation(0);

        return nextIndex;
      });
    }, 15000);
  };

  const stopAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Handle hover state
  useEffect(() => {
    if (isHovered) {
      stopAutoRotation();
      stopProgressAnimation();
    } else {
      // Resume when not hovered
      startAutoRotation();
      if (pausedProgressRef.current > 0) {
        resumeProgressAnimation();
      } else {
        startProgressAnimation(0);
      }
    }
  }, [isHovered]);

  // Initial setup
  useEffect(() => {
    startProgressAnimation(0);
    startAutoRotation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return (
    <FadeInReveal className="fluid-container grid grid-cols-1 lg:grid-cols-2 gap-[60px] xl:gap-[100px] pb-[72px] lg:pb-[110px]">
      {/* Desktop */}
      <div className="hidden lg:block">
        <LayoutImage src={activeImage} imageFade={imageFade} />
      </div>

      <div className="xl:w-[80%] relative">
        {title && <H2>{title}</H2>}

        {content?.length > 0 && (
          <div className="pt-[14px] xl:pt-[62px]">
            {content?.map((item, index) => (
              <div
                key={`accordion-${index}`}
                className="relative"
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
              >
                <MainAccordion
                  expanded={expanded === index}
                  showIcon={isMobile ? true : false}
                  onChange={() => handleAccordion(index)}
                  icon={
                    isMobile && (
                      <Image
                        src="/images/accordian-down.svg"
                        alt="arrow"
                        width={34}
                        height={34}
                        className="rotate-180 w-5 h-5 md:w-[34px] md:h-[34px]"
                      />
                    )
                  }
                  title={
                    <h2
                      className={`text-lg md:text-2xl text-[#002F50] opacity-40 ${
                        expanded === index && "opacity-100"
                      }`}
                    >
                      {item?.title}
                    </h2>
                  }
                >
                  <div>
                    {/* Mobile */}
                    {item?.mobImage?.url && (
                      <div className="block lg:hidden mb-4">
                        <LayoutImage
                          src={item?.mobImage?.url}
                          imageFade={imageFade}
                        />
                      </div>
                    )}

                    {item?.description && (
                      <BodyText2 className="pb-4 ">
                        {item?.description}
                      </BodyText2>
                    )}

                    {item?.BulletPoints?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {item?.BulletPoints?.map(
                          (listItem, listIndex) =>
                            listItem?.title && (
                              <div
                                key={"list_" + listIndex}
                                className="flex gap-2 items-start"
                              >
                                <Image
                                  src={"/images/star-orange.svg"}
                                  alt="banner"
                                  width={20}
                                  height={20}
                                  className="w-[14px] h-[14px] mt-1 md:w-5 md:h-5 md:mt-0"
                                />
                                <BodyText2>{listItem?.title}</BodyText2>
                              </div>
                            ),
                        )}
                      </div>
                    )}
                  </div>
                </MainAccordion>

                {expanded === index && (
                  <div
                    className="h-[2px] bg-[#DC4C03] absolute bottom-0 transition-none"
                    style={{ width: `${progressWidth}%` }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </FadeInReveal>
  );
}

const LayoutImage: React.FC<LayoutImageProps> = ({ src, imageFade }) => {
  return (
    <div className="relative h-[317px] lg:h-[600px] w-full overflow-hidden rounded-[20px]!">
      <div className="absolute right-0 top-0 min-h-[317px] lg:min-h-[500px] xl:min-h-[600px] w-[100%] lg:w-full rounded-[20px]">
        <Image
          src={src || "img"}
          alt={"banner"}
          fill
          className={`absolute object-cover rounded-[20px] transition-opacity duration-300 ${
            imageFade ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Decorative overlays */}
        <div className="absolute left-0 object-cover backdrop-blur-lg h-full lg:h-[calc(100%-70px)] w-[72px] lg:w-[110px]" />

        <div className="absolute bottom-0 right-0 object-cover backdrop-blur-lg h-[calc(100%-277px)] lg:h-[70px] w-full rounded-bl-[20px] rounded-br-[20px]" />

        <Image
          src="/images/home/star-white.svg"
          alt="star-icon"
          width={72}
          height={72}
          className="absolute bottom-[19px] lg:bottom-[34px] z-10 left-[50px] lg:left-[74px] w-[42px] lg:w-[72px]"
        />
        <div className="absolute min-h-screen bg-white w-[1px] left-[71px] lg:left-[110px]" />
        <div className="absolute w-full bg-white bottom-[39px] lg:bottom-[70px] h-[1px]" />
      </div>
    </div>
  );
};
