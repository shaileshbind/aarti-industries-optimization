"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { H2, BodyText1 } from "../Typography2";
import { FadeInReveal } from "../ScrollReveal";
import Button from "../Button";
import { FourtyYearsProps } from "@/app/types/home.type";

const DetailsContainer: React.FC<FourtyYearsProps> = ({
  data,
  showBottomLine = true,
}) => {
  const { sectionTitle, description, title, ctaButton } = data;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !topLineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        topLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );
      const starLineTl = gsap.timeline({
        scrollTrigger: {
          trigger: bottomLineRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      });
      starLineTl.fromTo(
        starRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, ease: "back.out(1.7)", duration: 0.3 },
      );
      starLineTl.fromTo(
        bottomLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, ease: "power2.out", duration: 0.8 },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      <div
        ref={wrapperRef}
        className="container mx-auto mt-[54px] lg:mt-[42px] mb-[52px] lg:mb-[100px]"
      >
        {/* Top Line */}
        <div className="relative w-full h-[64px] md:h-[120px]">
          <div
            ref={topLineRef}
            className="mx-auto h-[64px] md:h-[120px] w-[2px] md:w-[1px] mb-6 lg:mb-0 border-l border-orange-100 scale-y-0 origin-top"
          ></div>
        </div>
        {/* Text content */}
        <div className="max-w-[unset] lg:max-w-[880px] mx-auto text-center mt-4">
          {sectionTitle && (
            <FadeInReveal>
              {<H2 className="text-orange-100 font-light">{sectionTitle}</H2>}
            </FadeInReveal>
          )}

          {title && (
            <FadeInReveal delay={0.1}>
              <H2 className="text-[#002F50]">{title}</H2>
            </FadeInReveal>
          )}

          <FadeInReveal>
            {description && (
              <BodyText1 className="mt-[16px] md:mt-[20px] text-grey-400">
                {description}
              </BodyText1>
            )}

            {ctaButton?.title &&
              (ctaButton?.hasExternalLink == "true"
                ? ctaButton?.externalLink
                : ctaButton?.link?.link) && (
                <div className="my-[36px]">
                  <Button
                    title={ctaButton?.title}
                    href={`${ctaButton?.hasExternalLink == "true"
                        ? ctaButton?.externalLink
                        : ctaButton?.link?.link
                      }`}
                    className="!px-2 md:!px-[22px]"
                    useTargetBlank={ctaButton?.hasExternalLink == "true"}
                  />
                </div>
              )}
          </FadeInReveal>
        </div>
        {/* Bottom Line */}
        {showBottomLine && (
          <div className="relative mt-[30px] md:mt-[36px] w-[37px] mx-auto grid justify-items-center">
            <div ref={starRef}>
              <Image
                src="/images/home/star.svg"
                alt="star"
                width={37}
                height={37}
                sizes="37px"
              />
            </div>
            <div
              ref={bottomLineRef}
              className="mt-[-10px] h-[88px] md:h-[144px] w-[1px]"
            >
              <Image
                src="/images/home/star-line.svg"
                alt="star-line"
                width={1}
                height={144}
                sizes="1px"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsContainer;
