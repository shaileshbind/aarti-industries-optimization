"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { H2, BodyText1 } from "../Typography2";
import { FadeInRevealBlur } from "../ScrollReveal";
import Button from "../Button";
import { FourtyYearsProps } from "@/app/types/home.type";

gsap.registerPlugin(ScrollTrigger);

const FourtyYears: React.FC<FourtyYearsProps> = ({ data }) => {
  const { sectionTitle, description, title, ctaButton } = data;

  const wrapperRef = useRef(null);
  const topLineRef = useRef(null);
  const starRef = useRef(null);
  const bottomLineRef = useRef(null);

  useEffect(() => {
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
        }
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
        { opacity: 1, scale: 1, ease: "back.out(1.7)", duration: 0.3 }
      );
      starLineTl.fromTo(
        bottomLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, ease: "power2.out", duration: 0.8 }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      <div ref={wrapperRef} className="container mx-auto my-[100px]">
        {/* Top Line */}
        <div
          ref={topLineRef}
          className="mx-auto h-[64px] md:h-[120px] w-[1px] mb-20 lg:mb-0"
        >
          <Image
            src="/images/home/line.svg"
            alt="line"
            width={1}
            height={120}
          />
        </div>
        {/* Text content */}
        <div className="max-w-[unset] lg:max-w-[780px] mx-auto text-center mt-4">
          {sectionTitle && (
            <FadeInRevealBlur>
              {<H2 className="text-orange-100">{sectionTitle}</H2>}
            </FadeInRevealBlur>
          )}

          {title && (
            <FadeInRevealBlur delay={0.1}>
              <H2 className="text-blue-100">{title}</H2>
            </FadeInRevealBlur>
          )}

          <FadeInRevealBlur>
            {description && (
              <BodyText1 className="mt-[16px] md:mt-[20px] text-grey-400">
                {description}
              </BodyText1>
            )}

            {ctaButton?.title && (
              <div className="my-[36px]">
                <Button
                  title={ctaButton?.title}
                  href={ctaButton?.link || "#"}
                />
                {/* </FadeInReveal> */}
              </div>
            )}
          </FadeInRevealBlur>
        </div>
        {/* Bottom Line */}
        <div className="relative mt-[30px] md:mt-[36px] w-[37px] mx-auto grid justify-items-center">
          <div ref={starRef}>
            <Image
              src="/images/home/star.svg"
              alt="star"
              width={37}
              height={37}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourtyYears;
