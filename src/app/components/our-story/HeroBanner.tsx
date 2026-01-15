"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FadeInRevealBlur } from "../ScrollReveal";
import { BodyText2, H1, } from "../Typography2";
import { OurStoryHeroProps } from "@/app/types/our.story.type";
import { useMediaQuery } from "@mui/material";
import Button from "../Button";

const HeroBanner: React.FC<OurStoryHeroProps> = ({ data }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const lineVertical = useRef<HTMLDivElement>(null);
  const lineHorizontal = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery("(max-width:768px)");
  // Extract data safely
  const tag = data?.sectionTitle || "";
  const title = data?.title || "";
  const image = data?.image?.url || "";
  const mobImage = data?.mobImage?.url || "";
  const alt = data?.image?.alternativeText || "Hero Image";
  const ctaButton = data?.ctaButton;

  // GSAP Animations
  useLayoutEffect(() => {
    if (
      !wrapperRef.current ||
      !starRef.current ||
      !lineVertical.current ||
      !lineHorizontal.current
    )
      return;

    const star = starRef.current;
    const vLine = lineVertical.current;
    const hLine = lineHorizontal.current;

    gsap.set(wrapperRef.current, { opacity: 0, scale: 0.95 });
    gsap.set(star, { opacity: 0, scale: 0 });
    gsap.set(vLine, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(hLine, { scaleX: 0, transformOrigin: "left center" });

    const tl = gsap.timeline();
    tl.to(wrapperRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(vLine, { scaleY: 1, duration: 0.8, ease: "power2.out" }, "-=0.2")
      .to(hLine, { scaleX: 1, duration: 0.8, ease: "power2.out" }, "<")
      .to(
        star,
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "<",
      );
  }, []);

  return (
    <div className="h-full lg:pt-[140px] lg:pb-[120px] py-[50px] w-full relative overflow-hidden flex flex-col gap-y-[40px] gap-x-[80px]">
      {/* Text Section */}
      <div className="fluid-container flex flex-col lg:items-center justify-center lg:text-center">
        {tag && (
          <FadeInRevealBlur delay={0.1}>
            <BodyText2 className="text-orange-100 font-alte-hans">
              {tag}
            </BodyText2>
          </FadeInRevealBlur>
        )}
        {title && (
          <FadeInRevealBlur delay={0.2}>
            <H1 className="mt-[12px] max-w-full lg:max-w-[480px] text-left lg:text-center text-[28px] md:text-[36px] xl:text-[44px] leading-[124%]">
              {title}
            </H1>
          </FadeInRevealBlur>
        )}
        {ctaButton && ctaButton.length > 0 && (
          <FadeInRevealBlur delay={0.3}>
            <div className="flex flex-wrap gap-[12px] mt-[12px] justify-left lg:justify-center">
              {ctaButton?.map((items, index) => {
                return (
                  <React.Fragment key={index}>
                    {items?.ctaButton?.map((button, btnIndex) => {
                      if (
                        button?.title &&
                        (button?.externalLink || button?.link?.link)
                      ) {
                        return (
                          <Button
                            key={btnIndex}
                            title={button.title}
                            href={
                              button?.hasExternalLink === "true"
                                ? button?.externalLink
                                : button?.link?.link
                            }
                            useTargetBlank={button?.hasExternalLink === "true"}
                            secondary
                          />
                        );
                      }
                      return null;
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </FadeInRevealBlur>
        )}
      </div>

      {/* Image Section */}
      <div
        ref={wrapperRef}
        className="relative fluid-container rounded-[14px] lg:rounded-l-[20px] overflow-hidden h-[280px] lg:h-[520px]"
      >
        {image && !isTablet && (
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover hidden md:block"
            priority
          />
        )}
        {mobImage && isTablet && (
          <Image
            src={mobImage}
            alt={alt}
            fill
            className="object-cover block md:hidden"
            priority
          />
        )}

        {/* Animated lines & star */}
        <div
          ref={lineVertical}
          className="absolute min-h-screen h-screen bg-white w-[1px] top-0 right-[88px] lg:right-[152px] z-10 opacity-40"
        />
        <div
          ref={lineHorizontal}
          className="absolute w-full bg-white bottom-[52px] lg:bottom-[119px] h-[1px] z-10 opacity-40"
        />
        <div
          ref={starRef}
          className="absolute bottom-[32px] lg:bottom-[84px] right-[68px] lg:right-[116px] w-[42px] lg:w-[72px] z-10"
        >
          <Image
            src="/images/home/star-white.svg"
            alt="star"
            width={72}
            height={72}
          />
        </div>

        <div
          ref={starRef}
          className="absolute -bottom-[22px] md:-bottom-6 lg:-bottom-9 right-[68px] lg:right-[116px] w-[42px] lg:w-[72px] z-10"
        >
          <Image
            src="/images/home/star-white.svg"
            alt="star"
            width={72}
            height={72}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
