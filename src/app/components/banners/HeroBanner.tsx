"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { BodyText1, BodyText2, H2 } from "../Typography2";
import Button from "../Button";
import Image from "next/image";
import { FadeInRevealBlur } from "../ScrollReveal";
import gsap from "gsap";
import clsx from "clsx";
import GeneralPopup from "../Popups/GeneralPopup";

type HeroBannerProps = {
  centerText?: boolean;
  leftDesc?: boolean;
  tag?: string;
  title?: string;
  desc?: string;
  btnTitle?: string;
  btnLink?: string;
  image?: string;
  mobImage?: string;
  mobAlt?: string;
  alt?: string;
  fullBg?: boolean;
  secondaryBtnLeftTitle?: string;
  secondaryBtnLeftLink?: string;
  secondaryBtnRightTitle?: string;
  secondaryBtnRightLink?: string;
  showStar2?: boolean;
  showStar3?: boolean;
  lineClassName?: string;
  centerTitleClassName?: string;
  bottomMiddleStarClassName?: string;
  popupButton?: boolean;
  popupButtonTitle?: string;
  useTargetBlank?:boolean;
};
const HeroBanner = ({
  centerText,
  leftDesc,
  title,
  tag,
  desc,
  btnTitle,
  btnLink,
  image,
  mobImage,
  mobAlt,
  alt,
  fullBg,
  secondaryBtnLeftTitle,
  secondaryBtnLeftLink,
  secondaryBtnRightTitle,
  secondaryBtnRightLink,
  showStar2 = true,
  showStar3 = true,
  centerTitleClassName,
  lineClassName,
  bottomMiddleStarClassName,
  popupButton = false,
  popupButtonTitle,
  useTargetBlank = true,
}: HeroBannerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const starRef2 = useRef<HTMLDivElement>(null);
  const starRef3 = useRef<HTMLDivElement>(null);
  const lineVertical = useRef<HTMLDivElement>(null);
  const lineHorizontal = useRef<HTMLDivElement>(null);
  const [showGeneralPopup, setshowGeneralPopup] = useState<boolean>(false);
  useLayoutEffect(() => {
    if (!wrapperRef.current || !lineVertical.current || !lineHorizontal.current)
      return;

    // build star list dynamically
    const stars: HTMLDivElement[] = [];

    if (starRef.current) stars.push(starRef.current); // star 1 always
    if (showStar2 && starRef2.current) stars.push(starRef2.current); // optional
    if (showStar3 && starRef3.current) stars.push(starRef3.current); // optional

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
  }, [showStar2, showStar3]);

  return (
    <>
      {fullBg ? (
        <>
          <div className={` w-full relative overflow-hidden `}>
            <div
              ref={wrapperRef}
              className={`relative overflow-hidden ${
                centerText ? "h-[360px] md:h-[440px]" : "h-[490px] lg:h-[640px]"
              } w-full`}
            >
              {image && (
                <Image
                  src={image}
                  alt={alt ? alt : "img"}
                  fill
                  className="object-cover hidden lg:block"
                />
              )}
              {mobImage && (
                <Image
                  src={mobImage}
                  alt={mobAlt ? mobAlt : "img"}
                  fill
                  className="object-cover block lg:hidden"
                />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0)_70%)]" />
              <div
                className={`w-full h-full absolute pt-[64px] z-[3] ${
                  centerText
                    ? "flex flex-col items-center justify-center !pt-0 lg:!pt-[50px] text-center"
                    : "lg:pt-[150px]"
                }`}
              >
                {tag && (
                  <FadeInRevealBlur delay={0.1}>
                    <BodyText2 className="text-white font-alte-hans fluid-container">
                      {tag}
                    </BodyText2>
                  </FadeInRevealBlur>
                )}
                {title && (
                  <FadeInRevealBlur delay={0.1}>
                    <H2
                      className={clsx(
                        `text-white mt-[12px] pr-[70px] md:pr-[unset] md:max-w-[480px] lg:max-w-[580px] fluid-container`,
                        centerText && "pr-0 lg:pr-[0]",
                        centerTitleClassName
                      )}
                    >
                      {title}
                    </H2>
                  </FadeInRevealBlur>
                )}
                {desc && leftDesc && (
                  <FadeInRevealBlur delay={0.1}>
                    <BodyText1 className="text-white mt-[12px] pr-[70px] md:pr-[unset] md:max-w-[480px] lg:max-w-[580px] fluid-container">
                      {desc}
                    </BodyText1>
                  </FadeInRevealBlur>
                )}
                {desc && centerText && (
                  <FadeInRevealBlur delay={0.1}>
                    <BodyText1 className="text-white mt-3 md:mt-[20px] max-w-[260px] md:max-w-[480px]">
                      {desc}
                    </BodyText1>
                  </FadeInRevealBlur>
                )}
                {/* buttons */}
                {(secondaryBtnLeftTitle || secondaryBtnRightTitle) && (
                  <FadeInRevealBlur
                    delay={0.1}
                    className="flex flex-col lg:flex-row gap-4 lg:gap-9 fluid-container mt-6 lg:mt-7"
                  >
                    {secondaryBtnLeftTitle && (
                      <Button
                        className="text-white white-btn-underline"
                        title={secondaryBtnLeftTitle}
                        href={secondaryBtnLeftLink || "#"}
                        secondary
                      />
                    )}

                    {secondaryBtnRightTitle && (
                      <Button
                        className="text-white white-btn-underline"
                        title={secondaryBtnRightTitle}
                        href={secondaryBtnRightLink || "#"}
                        secondary
                      />
                    )}
                  </FadeInRevealBlur>
                )}
                {btnTitle && btnLink && (
                  <FadeInRevealBlur delay={0.1}>
                    <div className="mt-[10px] lg:mt-[35px] fluid-container">
                      <Button title={btnTitle} href={btnLink}  useTargetBlank={useTargetBlank}/>
                    </div>
                  </FadeInRevealBlur>
                )}
              </div>
              {/* starts & lines */}
              <div
                ref={lineVertical}
                className={clsx(
                  `absolute min-h-screen h-screen bg-white w-[1px] top-0 right-[86px] lg:right-[212.5px] z-5`,
                  lineClassName
                )}
              />
              {!centerText && (
                <div
                  ref={lineHorizontal}
                  className={clsx(
                    `absolute w-full bg-white bottom-[52px] lg:bottom-[110px] h-[1px] z-5`
                  )}
                />
              )}
              <div
                ref={starRef}
                className={clsx(
                  `absolute bottom-[34px] lg:bottom-[84px] right-[67.5px] lg:right-[186px] w-[38px] lg:w-[54px] z-5`,
                  bottomMiddleStarClassName
                )}
              >
                <Image
                  src="/images/home/star-white.svg"
                  alt="star"
                  width={72}
                  height={72}
                />
              </div>
              {showStar2 && (
                <div
                  ref={starRef2}
                  className="absolute bottom-[-20px] lg:bottom-[-36px] right-[67px] lg:right-[177px]  w-[38px] lg:w-[72px]  z-5 bannerBottomStar"
                >
                  <Image
                    src="/images/home/star-white.svg"
                    alt="img"
                    width={72}
                    height={72}
                  />
                </div>
              )}
              {showStar3 && (
                <div
                  ref={starRef3}
                  className="absolute bottom-[-20px] lg:bottom-[-36px] right-[-21px] lg:right-[-36px]  w-[38px] lg:w-[72px] z-5"
                >
                  <Image
                    src="/images/home/star-white.svg"
                    alt="img"
                    width={72}
                    height={72}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="h-auto mt-[unset] lg:mt-[72px] lg:h-screen max-h-[680px] w-full relative overflow-hidden grid lg:grid-cols-[40%_1fr] gap-y-[40px] gap-x-[80px] mb-[72px] lg:mb-[unset]">
          <div className="px-[20px] lg:pl-[60px] lg:pr-[unset] pt-[30px] lg:pt-[unset] self-center">
            {tag && (
              <FadeInRevealBlur delay={0.1}>
                <BodyText2 className="text-orange-100 font-alte-hans">
                  {tag}
                </BodyText2>
              </FadeInRevealBlur>
            )}
            {title && (
              <FadeInRevealBlur delay={0.1}>
                <H2 className="mt-[12px] max-w-full lg:max-w-[480px] 2xl:max-w-full">
                  {title}
                </H2>
              </FadeInRevealBlur>
            )}
            {desc && (
              <FadeInRevealBlur delay={0.1}>
                <BodyText1 className="mt-[20px] max-w-full lg:max-w-[480px] 2xl:max-w-full">
                  {desc}
                </BodyText1>
              </FadeInRevealBlur>
            )}
            {btnTitle && btnLink && (
              <FadeInRevealBlur delay={0.1}>
                <div className="mt-[35px]">
                  <Button title={btnTitle} href={btnLink} useTargetBlank={useTargetBlank} />
                </div>
              </FadeInRevealBlur>
            )}
            {popupButton && (
              <FadeInRevealBlur delay={0.1}>
                <div className="mt-[10px] lg:mt-[35px]">
                  <button className="group relative w-fit py-[14px] px-[22px] rounded-[6px] cursor-pointer bg-gradient-orange-1 text-white text-[16px] font-normal leading-[100%] font-alte-hans overflow-hidden transition-all duration-300 " onClick={() => {
                    setshowGeneralPopup(true);
                  }}>
                    <span className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 text-white">{popupButtonTitle}</span></button>
                </div>
              </FadeInRevealBlur>
            )}
          </div>
          <div
            ref={wrapperRef}
            className="relative mx-[20px] lg:mx-[unset] rounded-[14px] lg:rounded-[unset] lg:rounded-l-[20px] overflow-hidden h-[280px] lg:h-full"
          >
            {image && (
              <Image
                src={image}
                alt={alt ? alt : "img"}
                fill
                className="object-cover hidden lg:block"
              />
            )}
            {mobImage && (
              <Image
                src={mobImage}
                alt={mobAlt ? mobAlt : "img"}
                fill
                className="object-cover block lg:hidden"
              />
            )}
            {/* starts & lines */}
            <div
              ref={lineVertical}
              className="absolute min-h-screen h-screen bg-white w-[1px] top-0 right-[75px] lg:right-[212.5px] z-5"
            />
            <div
              ref={lineHorizontal}
              className="absolute w-full bg-white bottom-[52px] lg:bottom-[120px] h-[1px] z-5"
            />
            <div
              ref={starRef}
              className="absolute 
              bottom-[34px] lg:bottom-[84px] 
              right-[57px] lg:right-[177px] 
              w-[38px] lg:w-[72px] 
              z-5 "
            >
              <Image
                src="/images/home/star-white.svg"
                alt="star"
                width={72}
                height={72}
              />
            </div>
            {showStar2 && (
              <div
                ref={starRef2}
                className="absolute bottom-[-19px] lg:bottom-[-36px] right-[57px] lg:right-[177px]  w-[38px] lg:w-[72px]  z-5 "
              >
                <Image
                  src="/images/home/star-white.svg"
                  alt="img"
                  width={72}
                  height={72}
                />
              </div>
            )}
            {showStar3 && (
              <div
                ref={starRef3}
                className="absolute bottom-[-19px] lg:bottom-[-36px] right-[-21px] lg:right-[-36px]  w-[38px] lg:w-[72px] z-5"
              >
                <Image
                  src="/images/home/star-white.svg"
                  alt="img"
                  width={72}
                  height={72}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <GeneralPopup
        isOpen={showGeneralPopup}
        setshowGeneralPopup={setshowGeneralPopup}
      />
    </>
  );
};

export default HeroBanner;
