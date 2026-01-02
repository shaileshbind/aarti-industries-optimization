"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import NumberCard from "../cards/NumberCard";
import { WhoCardsProps } from "@/app/types/who-we-are.type";

gsap.registerPlugin(ScrollTrigger);

const WhoCards: React.FC<WhoCardsProps> = ({ data }) => {
  const { cards } = data;
  const wrapperRef = useRef(null);
  const wrapperRefBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxWrapper = wrapperRefBox.current;
    if (!boxWrapper) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === boxWrapper) trigger.kill();
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      const statBoxes = boxWrapper.querySelectorAll(".stat-box");

      const ctx = gsap.context(() => {
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
    <div ref={wrapperRef} className="container mx-auto">
      <div className="mt-[40px] lg:mt-[140px] max-w-[unset] lg:max-w-[1048px] mx-auto ">
        <div ref={wrapperRefBox} className="w-full h-auto mx-auto">
          {cards?.length > 0 && (
            <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-none lg:grid-rows-[1fr_1fr] gap-[6px]">
              <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px] relative z-[1]">
                {cards?.slice(0, 4)?.map((items) => {
                  return (
                    <NumberCard
                      key={items?.id}
                      title={items?.value}
                      desc={items?.description}
                      imageSrc={items?.image?.url}
                      className="stat-box"
                      titleClassName={"text-[28px] lg:text-[44px]"}
                    />
                  );
                })}
              </div>
              <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px] relative z-[1]">
                {cards?.slice(4, 8)?.map((items) => {
                  return (
                    <NumberCard
                      key={items?.id}
                      title={items?.value}
                      desc={items?.description}
                      imageSrc={items?.image?.url}
                      className="stat-box"
                      titleClassName={"text-[28px] lg:text-[44px]"}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhoCards;
