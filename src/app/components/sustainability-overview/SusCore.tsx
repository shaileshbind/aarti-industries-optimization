"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { H3 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import NumberCard from "../cards/NumberCard";
import { SusCoreData } from "@/app/types/sustainability.type";

const SusCore = ({ data }: SusCoreData) => {
  const { sectionTitle, leftImage, rightSection } = data;
  const wrapperRef = useRef(null);
  const topLineRef = useRef(null);
  const wrapperRefBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lineWrapper = wrapperRef.current;
    const boxWrapper = wrapperRefBox.current;
    if (!lineWrapper || !boxWrapper) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === boxWrapper) trigger.kill();
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      const statBoxes = boxWrapper.querySelectorAll(".stat-box");

      const ctx = gsap.context(() => {
        gsap.fromTo(
          topLineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lineWrapper,
              start: "top 85%",
              end: "bottom 65%",
              scrub: true,
            },
          },
        );

        gsap.set(statBoxes, { y: 80, opacity: 0 });
        gsap.to(statBoxes, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: { each: 0.2, from: "random" },
          scrollTrigger: {
            trigger: boxWrapper,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onRefresh: () => {
              if (!ScrollTrigger.isInViewport(boxWrapper, 0.15)) {
                gsap.set(statBoxes, { y: 80, opacity: 0 });
              }
            },
          },
        });
      });

      return () => {
        clearTimeout(timer);
        ctx.revert();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <div
        ref={wrapperRef}
        className="container mx-auto mb-[72px] lg:mb-[120px] mt-[50px]"
      >
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
        <div className="max-w-full lg:max-w-[1048px] mx-[unset] lg:mx-auto text-center mt-4">
          {sectionTitle && (
            <AnimatedText>
              <H3 className="max-w-[600px] text-center mx-auto !text-[28px] md:!text-[36px] xl:!text-[44px]">
                {sectionTitle}
              </H3>
            </AnimatedText>
          )}
        </div>
        <div className="mt-[40px] lg:mt-[60px] flex">
          <div className="w-full min-h-[unset] lg:min-h-[350px] h-auto grid lg:grid-cols-[1fr] lgx:grid-cols-[312px_1fr] gap-[6px]">
            <div className="hidden lg:block relative rounded-[14px] lg:rounded-[20px] min-h-[350px] overflow-hidden">
              {leftImage?.url && (
                <Image
                  src={leftImage?.url}
                  alt={leftImage?.alternativeText ?? "Sustainability"}
                  width={312}
                  height={350}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div
              ref={wrapperRefBox}
              className="w-full max-w-[1048px] h-auto mx-auto"
            >
              <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-none lg:grid-rows-[1fr_1fr] gap-[6px]">
                <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px]">
                  {rightSection?.slice(0, 4)?.map((items) => {
                    return (
                      <NumberCard
                        key={items?.id}
                        title={items?.value}
                        desc={items?.description}
                        bottomText={items?.bottomText}
                        imageSrc={items?.image?.url}
                        className="stat-box"
                      />
                    );
                  })}
                </div>
                <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px]">
                  {rightSection?.slice(4, 8)?.map((items) => {
                    return (
                      <NumberCard
                        key={items?.id}
                        title={items?.value}
                        desc={items?.description}
                        bottomText={items?.bottomText}
                        imageSrc={items?.image?.url}
                        className="stat-box"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SusCore;
