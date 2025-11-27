"use client";
import React, { useEffect, useRef } from "react";
import { BodyText2, H2, SubH1 } from "./Typography2";
import Image from "next/image";
import Tags from "./Tags";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInRevealBlur } from "./ScrollReveal";
import { RDInnovatingChemProps } from "@/app/types/r-and-d.type";

gsap.registerPlugin(ScrollTrigger);
const ScrollableCardWithImage: React.FC<RDInnovatingChemProps> = ({ data }) => {
  const { heading, cards } = data;

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
    <div>
      {heading && (
        <FadeInRevealBlur>
          <H2 className="max-w-[600px] mx-[20px] lg:mx-[60px]">{heading}</H2>
        </FadeInRevealBlur>
      )}

      {cards?.length > 0 && (
        <div className="mt-[50px] container mx-auto relative">
          {cards?.map((items, index) => {
            return (
              <div
                ref={(el) => {
                  if (el) gridRefs.current[index] = el;
                }}
                key={items?.id}
                className="grid grid-cols-[0.9fr] lg:grid-cols-[1fr_1fr] gap-x-[120px] justify-end lg:justify-[unset] gap-y-[18px] mb-[40px] lg:mb-[80px] relative "
              >
                {items?.image?.url && (
                  <div className="relative w-full lg:w-[424px] h-[286px] rounded-[20px] overflow-hidden justify-self-end">
                    <Image
                      src={items?.image?.url}
                      alt={items?.image?.alternativeText || "banner"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-start gap-x-[24px] pr-[unset] lg:pr-[110px]">
                    <Tags title={`0${index + 1}`} className="mt-1 xl:mt-[6px] !text-[14px] lg:!text-[20px]" />
                    <div className="">
                      {items?.title && (
                        <SubH1 className="text-blue-200">{items?.title}</SubH1>
                      )}

                      {items?.description && (
                        <BodyText2 className="text-grey-400 mt-[10px]">
                          {items?.description}
                        </BodyText2>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* line & star */}
          <div className="absolute top-0 left-[7%] translate-x-[-7%] lg:left-[50%] h-full lg:translate-x-[-50%] grid justify-items-center">
            {/* gray line */}
            <div className="mt-[-12px] h-full w-[1px] bg-grey-100 relative overflow-hidden">
              {/* orange line */}
              <div
                ref={orangeLineRef}
                className="absolute top-0 w-[2px] bg-orange-500 h-full"
              />
            </div>
            {/* star image */}
            <div
              ref={starRef}
              className="absolute top-0 mt-[-15px]"
              style={{ width: "37px", height: "37px" }}
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
      )}
    </div>
  );
};

export default ScrollableCardWithImage;
