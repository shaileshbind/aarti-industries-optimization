"use client";
import React, { useRef, useLayoutEffect, useState, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInReveal } from "../ScrollReveal";
import { BodyText2, H3, SubH1 } from "../Typography2";
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
  const bottomLeftImageRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);
  const stickyImageRef = useRef<HTMLDivElement>(null!);
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
          { ref: bottomLeftImageRef, y: -300 },
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

        // --- DISTANCE CALCULATOR ---
        const calculateDistance = () => {
          if (bottomImageRef.current && stickyImageRef.current) {
            const bottomRect = bottomImageRef.current.getBoundingClientRect();
            const stickyRect = stickyImageRef.current.getBoundingClientRect();
            return stickyRect.top - bottomRect.top + 116;
          }
          return 600; // fallback
        };

        // --- RESPONSIVE MATCH MEDIA ---
        const mm = gsap.matchMedia();

        mm.add(
          {
            isDesktop: "(min-width: 1281px)",
            isMidScreen: "(min-width: 1025px) and (max-width: 1280px)",
            is1024: "(max-width: 1024px)",
          },
          (context) => {
            const { isDesktop, isMidScreen, is1024 } = context.conditions as {
              isDesktop: boolean;
              isMidScreen: boolean;
              is1024: boolean;
            };

            // Set responsive scale & x-offset
            const scaleValue = isDesktop
              ? 1.9 // large desktops
              : isMidScreen
              ? 1.55 // mid screens (like 1280px)
              : is1024
              ? 1.3 // small tablets / 1024px
              : 1.9;

            const xOffset = isDesktop
              ? 50
              : isMidScreen
              ? 50
              : is1024
              ? 45
              : 50;

            // --- SCROLL TRIGGER ANIMATION ---
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: stickyImageRef.current,
                start: "top 80%",
                end: "top 24%",
                scrub: 1,
                // markers: true, // uncomment for debugging
              },
            });

            // Move + scale + fade cross animation
            tl.to(
              bottomImageRef.current,
              {
                y: calculateDistance,
                ease: "none",
                scale: scaleValue,
                x: xOffset,
              },
              0
            )
              .to(
                bottomImageRef.current,
                {
                  opacity: 0,
                  ease: "none",
                },
                0.6
              )
              .to(
                stickyImageRef.current,
                {
                  opacity: 1,
                  ease: "none",
                },
                0.6
              );
          }
        );
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

      <div className="mt-5 lg:mt-[90px]">
        <div className="flex gap-12 justify-between">
          {images?.[0]?.image?.url && (
            <div
              ref={leftImageRef}
              className="w-[284px] h-[275px] hidden lg:block rounded-r-[20px] overflow-hidden"
            >
              <Image
                src={images?.[0]?.image?.url}
                alt={images?.[0]?.image?.alternativeText ? images?.[0]?.image?.alternativeText : 'img'}
                width={284}
                height={275}
                className="w-full h-full"
              />
            </div>
          )}

          {description && (
            <AnimatedText className="w-[90%] lg:w-[70%] text-center mx-auto">
              <SubH1 className="text-blue-200">{description}</SubH1>
            </AnimatedText>
          )}

          {images?.[1]?.image?.url && (
            <div
              ref={rightImageRef}
              className="w-[236px] h-[216px] hidden lg:block rounded-l-[20px] overflow-hidden"
            >
              <Image
                src={images?.[1]?.image?.url}
                alt={images?.[1]?.image?.alternativeText ? images?.[1]?.image?.alternativeText : 'img'}
                width={236}
                height={216}
                className="w-full h-full"
              />
            </div>
          )}
        </div>

        <div className="justify-around mt-[66px] hidden lg:flex">
          {images?.[2]?.image?.url && (
            <div
              ref={bottomLeftImageRef}
              className="w-[274px] h-[198px] rounded-[20px] overflow-hidden"
            >
              <Image
                src={images?.[2]?.image?.url}
                alt={images?.[2]?.image?.alternativeText ? images?.[2]?.image?.alternativeText : 'img'}
                width={274}
                height={198}
                className="w-full h-full"
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
                alt={images?.[3]?.image?.alternativeText ? images?.[3]?.image?.alternativeText : 'img'}
                width={355}
                height={256}
                className="w-full h-full"
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
              alt={images?.[3]?.mobImage?.alternativeText ? images?.[3]?.mobImage?.alternativeText : 'img'}
              width={335}
              height={246}
              className="w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Section Two - Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] xl:gap-[86px] pt-[64px] lg:pt-[110px] px-5 lg:pl-[60px]">
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

          <FadeInReveal className="pt-6 xl:pt-18">
            {accordion?.map((item, index) => (
              <MainAccordion
                key={`accordion-${index}`}
                expanded={expanded === index}
                onChange={() => setExpanded(index)}
                title={
                  <h2 className="text-base md:text-xl text-[#002F50]">
                    {item?.title}
                  </h2>
                }
              >
                <div>
                  {item?.description && (
                    <BodyText2 className="pb-4 ">{item?.description}</BodyText2>
                  )}

                  {item?.bulletPoints?.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {item?.bulletPoints?.map((item, index) => (
                        <div key={"list_" + index} className="flex gap-2">
                          <Image
                            src={"/images/star-orange.svg"}
                            alt="banner"
                            width={20}
                            height={20}
                          />
                          <BodyText2>{item?.title}</BodyText2>
                        </div>
                      ))}
                    </div>
                  )}

                  {item?.description_two && (
                    <BodyText2 className="text-[#3A3F42] py-5">
                      {item?.description_two}
                    </BodyText2>
                  )}

                  {item?.ctaButton?.title && (
                    <Button
                      secondary
                      title={item?.ctaButton?.title}
                      href={item?.ctaButton?.link || "#"}
                      className=" mb-2"
                    />
                  )}
                </div>
              </MainAccordion>
            ))}
          </FadeInReveal>
        </div>

        {/* Sticky Image Desktop */}
        {image?.url && (
          <StickyImage
            stickyImageRef={stickyImageRef}
            className="hidden lg:block"
            src={image?.url}
          />
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
      <div className="order-1 lg:order-2 h-[317px] lg:h-[640px] w-full overflow-hidden relative lg:sticky lg:top-[100px]">
        <div
          ref={stickyImageRef}
          className={`absolute right-0 top-0 min-h-[317px] lg:min-h-[400px] xl:min-h-[568px] w-[100%] lg:w-full rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] opacity-100 lg:opacity-0`}
        >
          <Image
            src={src}
            alt={"banner"}
            fill
            className="absolute object-cover opacity-40 rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset]"
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
