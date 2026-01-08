"use client";
import React, { useRef, useLayoutEffect, useState, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInReveal } from "../ScrollReveal";
import { BodyText2, H3, SubH2 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import Image from "next/image";
import Button from "../Button";
import MainAccordion from "../Accordion";
import { useMediaQuery } from "@mui/material";
import { ParallaxCardSectionProps } from "@/app/types/partnership.type";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface StickyImageProps {
  stickyImageRef?: RefObject<HTMLDivElement>;
  className?: string;
  src: string;
}

export default function ParallaxCardSection({
  section_two,
  section_three,
}: ParallaxCardSectionProps) {
  const { description, images } = section_two;
  const { heading, accordion, image, mobImage, title } = section_three;

  const containerRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const stickyImageRefWrapper = useRef<HTMLDivElement>(null);
  const bottomLeftImageRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);
  const stickyImageRef = useRef<HTMLDivElement>(null!);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef(null);
  const mobileBottomImageRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState<number>(0);
  const isMobile = useMediaQuery("(max-width:820px)");

  useLayoutEffect(() => {
    gsap.fromTo(
      topLineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 65%",
          scrub: true,
        },
      }
    );

    const ctx = gsap.context(() => {
      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      if (!isMobile) {
        // --- BASIC PARALLAX FOR STATIC IMAGES ---
        const images = [
          { ref: leftImageRef, y: -400 },
          { ref: rightImageRef, y: -400 },
          { ref: bottomLeftImageRef, y: -250 },
          { ref: bottomImageRef, y: -250 },
        ];

        images.forEach(({ ref, y }) => {
          gsap.to(ref.current, {
            y,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        // --- STICKY IMAGE PIN ---
        if (stickyImageRefWrapper.current && stickyContainerRef.current) {
          ScrollTrigger.create({
            trigger: stickyContainerRef.current,
            start: "top top+=100",
            end: () => {
              if (!stickyContainerRef.current || !stickyImageRefWrapper.current) return "+=0";
              const containerHeight = stickyContainerRef.current.offsetHeight;
              const stickyHeight = stickyImageRefWrapper.current.offsetHeight;
              return `+=${Math.max(0, containerHeight - stickyHeight - 100)}`;
            },
            pin: stickyImageRefWrapper.current,
            pinSpacing: false,
          });
        }
      } else {
        gsap.fromTo(
          mobileBottomImageRef.current,
          { scale: 0.2, transformOrigin: "center center" },
          {
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mobileBottomImageRef.current,
              start: "top 90%",
              end: "top 50%",
              scrub: 2,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, [isMobile]);

  return (
    <div ref={containerRef} className="pt-[48px]">
      {/* Top Line */}
      <div
        ref={topLineRef}
        className="mx-auto h-[64px] md:h-[60px] lg:h-[120px] w-[2px]"
      >
        <Image src="/images/home/line.svg" alt="line" width={1} height={120} />
      </div>

      <div className="mt-5 xl:mt-[0px]">
        <div className="flex gap-12 justify-between">
          {images?.[0]?.image?.url && (
            <div
              ref={leftImageRef}
              className="w-[284px] h-[275px] hidden lg:block rounded-r-[20px] overflow-hidden"
            >
              <Image
                src={images?.[0]?.image?.url}
                alt={
                  images?.[0]?.image?.alternativeText
                    ? images?.[0]?.image?.alternativeText
                    : "img"
                }
                width={284}
                height={275}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {description && (
            <AnimatedText className="w-[90%] lg:w-[70%] text-center mx-auto">
              <SubH2 className="text-blue-200 text-[20px] md:text-[22px] xl:text-[24px]">
                {description}
              </SubH2>
            </AnimatedText>
          )}

          {images?.[1]?.image?.url && (
            <div
              ref={rightImageRef}
              className="w-[236px] h-[216px] hidden lg:block rounded-l-[20px] overflow-hidden"
            >
              <Image
                src={images?.[1]?.image?.url}
                alt={
                  images?.[1]?.image?.alternativeText
                    ? images?.[1]?.image?.alternativeText
                    : "img"
                }
                width={236}
                height={216}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="justify-around mt-[46px] md:mt-[146px] lgx:mt-[100px] hidden lg:flex">
          {images?.[2]?.image?.url && (
            <div
              ref={bottomLeftImageRef}
              className="w-[274px] h-[198px] rounded-[20px] overflow-hidden"
            >
              <Image
                src={images?.[2]?.image?.url}
                alt={
                  images?.[2]?.image?.alternativeText
                    ? images?.[2]?.image?.alternativeText
                    : "img"
                }
                width={274}
                height={198}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {images?.[3]?.image?.url && (
            <div
              ref={bottomImageRef}
              className="w-[355px] h-[256px] rounded-[20px] overflow-hidden"
            >
              <Image
                src={images?.[3]?.image?.url}
                alt={
                  images?.[3]?.image?.alternativeText
                    ? images?.[3]?.image?.alternativeText
                    : "img"
                }
                width={355}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Mobile */}
        {images?.[3]?.mobImage?.url && (
          <div
            className="w-[90%] mx-auto h-[246px] md:h-[400px] block lg:hidden mt-[42px] rounded-[20px] overflow-hidden"
            ref={mobileBottomImageRef}
          >
            <Image
              src={images?.[3]?.mobImage?.url}
              alt={
                images?.[3]?.mobImage?.alternativeText
                  ? images?.[3]?.mobImage?.alternativeText
                  : "img"
              }
              width={335}
              height={246}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Section Two - Accordion */}
      <div ref={stickyContainerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] xl:gap-[86px] pt-[72px] lg:pt-[0px] pl-5 pr-5 lg:pr-0 lg:pl-[60px] items-start">
        <div className="">
          <FadeInReveal>
            {heading && <H3>{heading}</H3>}

            {title && (
              <p className="text-sm md:text-base pt-3 lg:pt-0">{title}</p>
            )}

            {/* Mobile */}
            {mobImage?.url && (
              <StickyImage className="block lg:hidden" src={mobImage?.url} />
            )}
          </FadeInReveal>

          {accordion?.length > 0 && (
            <FadeInReveal className="pt-6 xl:pt-18 accordionWidth">
              {accordion?.map((item, index) => (
                <MainAccordion
                  key={`accordion-${index}`}
                  borderBottom={
                    accordion?.length - 1 === index
                      ? "border-b-0"
                      : "1px solid #D9D9D9"
                  }
                  expanded={expanded === index}
                  onChange={() => setExpanded(index)}
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
                    <h2 className="text-base md:text-xl text-[#002F50]">
                      {item?.title}
                    </h2>
                  }
                >
                  <div>
                    {item?.description && (
                      <BodyText2 className="pb-4 ">
                        {item?.description}
                      </BodyText2>
                    )}

                    {item?.bulletPoints?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {item?.bulletPoints?.map((item, index) => (
                          <div
                            key={"list_" + index}
                            className="flex items-start gap-2"
                          >
                            <Image
                              src={"/images/star-orange.svg"}
                              alt="banner"
                              width={20}
                              height={20}
                            />
                            <BodyText2 className="w-[96%]">
                              {item?.title}
                            </BodyText2>
                          </div>
                        ))}
                      </div>
                    )}

                    {item?.description_two && (
                      <BodyText2 className="text-[#3A3F42] py-5">
                        {item?.description_two}
                      </BodyText2>
                    )}

                    {item?.ctaButton?.title &&
                      (item?.ctaButton?.hasExternalLink == "true"
                        ? item?.ctaButton?.externalLink
                        : item?.ctaButton?.link?.link) && (
                      <Button
                        secondary
                        title={item?.ctaButton?.title}
                        href={`${
                          item?.ctaButton?.hasExternalLink == "true"
                            ? item?.ctaButton?.externalLink
                            : item?.ctaButton?.link?.link
                        }`}
                        className=" mb-2"
                        useTargetBlank={item?.ctaButton?.hasExternalLink == "true"}
                      />
                    )}
                  </div>
                </MainAccordion>
              ))}
            </FadeInReveal>
          )}
        </div>

        {/* Sticky Image Desktop */}
        {image?.url && (
          <div ref={stickyImageRefWrapper}>
            <StickyImage
              stickyImageRef={stickyImageRef}
              className="hidden lg:block"
              src={image?.url}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const StickyImage: React.FC<StickyImageProps> = ({
  stickyImageRef,
  className,
  src,
}) => {
  return (
    <div className={`lg:pr-0 mt-6 lg:mt-0 ${className}`}>
      <div className="order-1 lg:order-2 w-full overflow-hidden relative lg:sticky lg:top-[100px]">
        <div
          ref={stickyImageRef}
          className={`relative min-h-[317px] lg:min-h-[400px] xl:min-h-[568px] w-[100%] lg:w-full rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] opacity-100 lg:opacity-100`}
        >
          <Image
            src={src}
            alt={"banner"}
            fill
            className="absolute object-cover opacity-40 rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] blur-[4px]"
          />

          <Image
            src={src}
            alt={"banner"}
            width={500}
            height={548}
            className="absolute object-cover rounded-tl-[20px] lg:rounded-tl-[30px]  h-[calc(100%-71px)] lg:h-[calc(100%-93px)] w-[calc(100%-71px)] lg:w-[calc(100%-210px)]"
          />
          <Image
            src="/images/home/star-white.svg"
            alt="img"
            width={72}
            height={72}
            className="absolute top-[-36px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
          />
          <Image
            src="/images/home/star-white.svg"
            alt="img"
            width={72}
            height={72}
            className="absolute bottom-[50px] lg:bottom-[57px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
          />
          <div className="absolute min-h-screen bg-white w-[1px] right-[71px] lg:right-[209.5px]" />
          <div className="absolute w-full bg-white bottom-[71px] lg:bottom-[92.5px] h-[1px]" />
        </div>
      </div>
    </div>
  );
};
