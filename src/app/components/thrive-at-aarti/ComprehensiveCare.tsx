"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInRevealBlur } from "../ScrollReveal";
import { BodyText2, H2, SubH2 } from "../Typography2";
import Button from "../Button";
import { ComprehensiveCareProps } from "@/app/types/thrive-at-aarti.type";

gsap.registerPlugin(ScrollTrigger);

const ComprehensiveCare: React.FC<ComprehensiveCareProps> = ({ data }) => {
  const { title, cards, ctaButton } = data;

  const orangeLineRef = useRef<HTMLDivElement | null>(null);
  const starRef = useRef<HTMLDivElement | null>(null);
  const gridRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!orangeLineRef.current || !starRef.current) return;

    const line = orangeLineRef.current;
    const star = starRef.current;

    gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: line.parentElement,
          start: "top bottom",
          end: "bottom 50%",
          scrub: true,
          onUpdate: (self) => {
            const scaleY = self.progress;
            star.style.transform = `translateY(${
              line.offsetHeight * scaleY
            }px)`;
          },
        },
      }
    );

    gridRefs.current.forEach((grid) => {
      gsap.fromTo(
        grid,
        { opacity: 0.2, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="lg:mt-[50px] fluid-container mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[80px]">
        <FadeInRevealBlur>
          {title && <H2 className="max-w-[450px] mb-9">{title}</H2>}

          {ctaButton?.title && (
            <Button title={ctaButton?.title} href={ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link} />
          )}
        </FadeInRevealBlur>

        {cards?.length > 0 && (
          <div className="flex flex-col gap-10 lg:gap-[60px]">
            {cards?.map((item, index) => (
              <div
                key={"card_" + index}
                ref={(el) => {
                  if (el) gridRefs.current[index] = el;
                }}
              >
                <div className="flex gap-x-4">
                  <p className="mt-0 lg:mt-1 pl-6 text-[#DC4C03] text-base">{`0${
                    index + 1
                  }`}</p>
                  <div>
                    {item?.title && (
                      <SubH2 className="text-blue-200">{item?.title}</SubH2>
                    )}

                    {item?.description && (
                      <BodyText2 className="text-grey-400 mt-[10px]">
                        {item?.description}
                      </BodyText2>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* line & star */}
      <div className="absolute top-[33%] md:top-[46%] lg:top-0 left-[4%] md:left-[1%] translate-x-[-7%] lg:left-[50%] h-[70%] md:h-[60%] lg:h-full lg:translate-x-[-50%] grid justify-items-center">
        {/* gray line */}
        <div className="mt-[-12px] h-full w-[1px] bg-grey-100 relative overflow-hidden">
          {/* orange line */}
          <div
            ref={orangeLineRef}
            className="absolute top-0 lg:top-0 w-[2px] bg-orange-500 h-full"
          />
        </div>
        {/* star image */}
        <div
          ref={starRef}
          className="absolute top-0 mt-[-15px] w-6 lg:w-9 h-6 lg:h-9"
        >
          <Image
            src="/images/home/star.svg"
            alt="star"
            width={37}
            height={37}
          />
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveCare;
