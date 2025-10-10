"use client";
import React, { useLayoutEffect, useRef } from "react";
import { BodyText1, BodyText2, H2 } from "../Typography2";
import Button from "../Button";
import Image from "next/image";
import { FadeInRevealBlur } from "../ScrollReveal";
import gsap from "gsap";

type HeroBannerProps = {
  tag?: string;
  title?: string;
  desc?: string;
  btnTitle?: string;
  btnLink?: string;
  image?: string;
  alt?: string;
};
const HeroBanner = ({
  title,
  tag,
  desc,
  btnTitle,
  btnLink,
  image,
  alt,
}: HeroBannerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const lineVertical = useRef<HTMLDivElement>(null);
  const lineHorizontal = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !wrapperRef.current ||
      !starRef.current ||
      !lineVertical.current ||
      !lineHorizontal.current
    )
      return;

    const star = starRef.current;
    const stars = [star];
    const vLine = lineVertical.current;
    const hLine = lineHorizontal.current;

      gsap.set(wrapperRef.current, {
      opacity: 0,
      scale: 0.95,
    });
    // Set initial state - all stars are completely hidden
    gsap.set(stars, {
      opacity: 0,
      scale: 0,
    });
    // Set initial state for lines - hidden by scaling
    gsap.set(vLine, {
      scaleY: 0,
      transformOrigin: "top center",
    });
    gsap.set(hLine, {
      scaleX: 0,
      transformOrigin: "left center",
    });
  

    const tl = gsap.timeline();
    tl.to(wrapperRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    })
      .to(
        vLine,
        {
          scaleY: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        hLine,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        stars,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "sine.out",
          stagger: 0.2,
        },
        "<"
      );
  }, []);

  return (
    <div className="h-full lg:h-screen w-full relative overflow-hidden grid lg:grid-cols-[40%_1fr] gap-y-[40px] gap-x-[80px]">
      <div className="px-[20px] lg:pl-[60px] lg:pr-[unset] pt-[80px] lg:pt-[unset] self-center">
        {tag && (
          <FadeInRevealBlur delay={0.1}>
            <BodyText2 className="text-orange-100 font-alte-hans">
              {tag}
            </BodyText2>
          </FadeInRevealBlur>
        )}
        {title && (
          <FadeInRevealBlur delay={0.1}>
            <H2 className="mt-[12px] max-w-full lg:max-w-[480px]">{title}</H2>
          </FadeInRevealBlur>
        )}
        {desc && (
          <FadeInRevealBlur delay={0.1}>
            <BodyText1 className="mt-[20px]">{desc}</BodyText1>
          </FadeInRevealBlur>
        )}
        {btnTitle && btnLink && (
          <FadeInRevealBlur delay={0.1}>
            <div className="mt-[35px]">
              <Button title={btnTitle} href={btnLink} />
            </div>
          </FadeInRevealBlur>
        )}
      </div>
      <div
        ref={wrapperRef}
        className="relative mx-[20px] lg:mx-[unset] rounded-[14px] lg:rounded-l-[20px] overflow-hidden h-[280px] lg:h-screen"
      >
        {image && (
          <Image
            src={image}
            alt={alt ? alt : "img"}
            fill
            className="object-cover"
          />
        )}
        {/* starts & lines */}
        <div
          ref={lineVertical}
          className="absolute min-h-screen h-screen bg-white w-[1px] top-0 right-[88px] lg:right-[212.5px] z-5"
        />
        <div
          ref={lineHorizontal}
          className="absolute w-full bg-white bottom-[105px] lg:bottom-[119px] h-[1px] z-5"
        />
        <div
          ref={starRef}
          className="absolute bottom-[84px] right-[68px] lg:right-[177px] w-[42px] lg:w-[72px] z-5 "
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
