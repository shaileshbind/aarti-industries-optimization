"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { H2, SubH2 } from "../Typography2";
import Image from "next/image";
import MainAccordion from "../Accordion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InvestingInPotentialProps } from "@/app/types/thrive-at-aarti.type";

gsap.registerPlugin(ScrollTrigger);

export default function InvestingInPotential({
  data,
}: InvestingInPotentialProps) {
  const { title, cards } = data;

  const [activeCard, setActiveCard] = useState(0);
  const [expanded, setExpanded] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const prevIndexRef = useRef(0);

  // 🔹 Animation function for image transition
  const animateImageTransition = (newIndex: number, direction: number) => {
    const incoming = imageRefs.current[newIndex];
    const outgoing = imageRefs.current[prevIndexRef.current];

    if (newIndex === prevIndexRef.current || !incoming || !outgoing) return;

    // Animate outgoing image
    gsap.to(outgoing, {
      clipPath: direction > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
      duration: 0.6,
      ease: "power2.in",
    });

    // Animate incoming image
    gsap.fromTo(
      incoming,
      {
        clipPath:
          direction > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "power2.out",
      }
    );

    prevIndexRef.current = newIndex;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = cards.length;
      const scrollDistance = window.innerHeight * total * 0.8;

      // Initialize clip paths
      imageRefs.current.forEach((el, i) => {
        gsap.set(el, {
          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        });
      });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 10%",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const progress = self.progress;
          let idx = Math.floor(progress * total);
          idx = Math.min(Math.max(idx, 0), total - 1);

          if (idx !== prevIndexRef.current) {
            setExpanded(idx);
            setActiveCard(idx);
            animateImageTransition(idx, self.direction);
          }
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        st.kill();
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, [cards.length]);

  return (
    <div ref={wrapperRef}>
      <div
        ref={containerRef}
        className="h-[calc(100vh-70px)] relative overflow-hidden"
      >
        {/* Vertical Line */}
        <div className="w-[1px] h-full bg-white absolute right-[6.3%] lg:right-[7.1%] top-0 z-[2]" />

        {/* Accordion Section */}
        <div className="relative z-[2] flex flex-col justify-between h-[90%]">
          {title && (
            <H2 className="text-white py-6 lg:py-[32px] max-w-[449px] fluid-container">
              {title}
            </H2>
          )}

          {cards?.length > 0 && (
            <div>
              {cards?.map((item, index) => (
                <div
                  key={index}
                  className={`relative potential-accordion ${
                    expanded === index ? "is-expanded" : ""
                  }`}
                >
                  <MainAccordion
                    borderBottom={
                      cards.length - 1 !== index ? "1px solid white" : "none"
                    }
                    expanded={expanded === index}
                    showIcon={false}
                    onChange={() => {
                      // Just update state and animate - NO scrolling
                      const direction = index > prevIndexRef.current ? 1 : -1;

                      setExpanded(index);
                      setActiveCard(index);
                      animateImageTransition(index, direction);
                    }}
                    title={
                      <SubH2 className="text-white xl:py-2 fluid-container">
                        <span className="mr-4 lg:mr-[50px] text-sm md:text-base">{`0${
                          index + 1
                        }`}</span>
                        {item?.title}
                      </SubH2>
                    }
                  >
                    {item?.description ? (
                      <div className="lg:flex justify-end lg:-mt-12 pr-12 xl:pr-40">
                        <p className="text-white lg:w-[45%] xl:w-1/2 text-sm lg:text-base pb-4 pl-5 lg:pl-0">
                          {item?.description}
                        </p>
                      </div>
                    ) : null}
                  </MainAccordion>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Background Images */}
        {cards?.length > 0 && (
          <div className="absolute inset-0 z-[0]">
            {cards?.map(
              (item, index) =>
                item?.image?.url && (
                  <div
                    key={`image-${index}`}
                    ref={(el) => {
                      if (el) imageRefs.current[index] = el;
                    }}
                    className="absolute inset-0"
                    style={{ zIndex: activeCard === index ? 2 : 1 }}
                  >
                    <Image
                      src={item?.image?.url}
                      alt={
                        item?.image?.alternativeText
                          ? item?.image?.alternativeText
                          : "img"
                      }
                      fill
                      className="object-cover object-top"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/30 z-[1]" />
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
