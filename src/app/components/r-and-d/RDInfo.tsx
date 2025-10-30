"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { H3 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import NumberCard from "../cards/NumberCard";
import { RDInfoProps } from "@/app/types/r-and-d.type";

gsap.registerPlugin(ScrollTrigger);

const RDInfo: React.FC<RDInfoProps> = ({ data }) => {
  const { description, valuesCard, rightSectionImage } = data;
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
          }
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
        {description && (
          <div className="max-w-full lg:max-w-[1048px] mx-[unset] lg:mx-auto text-center mt-4">
            <AnimatedText>
              <H3>{description}</H3>
            </AnimatedText>
          </div>
        )}

        <div className="mt-[40px] lg:mt-[60px] max-w-[unset] lg:max-w-[1048px] mx-auto ">
          <div
            ref={wrapperRefBox}
            className="w-full min-h-[unset] lg:min-h-[350px] h-auto grid lg:grid-cols-[1fr_312px] gap-[6px]"
          >
            <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-none lg:grid-rows-[1fr_1fr] gap-[6px]">
              {valuesCard?.length > 0 && (
                <div className="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-[6px]">
                  {valuesCard?.slice(0, 3)?.map((items, index) => {
                    return (
                      <NumberCard
                        key={"value_" + index}
                        title={items?.value}
                        desc={items?.description}
                        imageSrc={items?.image?.url}
                        imageAlt={items?.image?.alternativeText}
                        className="stat-box"
                      />
                    );
                  })}
                </div>
              )}

              <div className="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-[6px]">
                {valuesCard?.slice(3, 6)?.map((items, index) => {
                  return (
                    <NumberCard
                      key={"value_" + index}
                      title={items?.value}
                      desc={items?.description}
                      imageSrc={items?.image?.url}
                      imageAlt={items?.image?.alternativeText}
                      className="stat-box"
                    />
                  );
                })}
              </div>
            </div>
            {rightSectionImage?.url && (
              <div className="hidden lg:block relative rounded-[14px] lg:rounded-[20px] min-h-[136px] lg:min-h-[350px] overflow-hidden">
                <Image
                  src={rightSectionImage?.url}
                  alt={rightSectionImage?.alternativeText || "img"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RDInfo;
