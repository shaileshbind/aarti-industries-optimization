"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BodyText2, H2, H3 } from "../Typography2";

gsap.registerPlugin(ScrollTrigger);

const GlobalPartner: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Clear any existing ScrollTrigger instances for this element
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === wrapper) {
        trigger.kill();
      }
    });

    // Small delay to ensure DOM is ready and scroll position is settled
    const timer = setTimeout(() => {
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      // Get all stat-box elements within this component
      const statBoxes = wrapper.querySelectorAll(".stat-box");

      // Reset elements to initial state
      gsap.set(statBoxes, {
        y: 80,
        opacity: 0,
      });

      // Create the animation
      animationRef.current = gsap.to(statBoxes, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.2,
          from: "random",
        },
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onRefresh: () => {
            // Ensure elements are in correct state on refresh
            const isInView = ScrollTrigger.isInViewport(wrapper, 0.15);

            if (!isInView) {
              gsap.set(statBoxes, { y: 80, opacity: 0 });
            }
          },
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      // Kill the specific animation and its ScrollTrigger
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill();
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs on every mount

  return (
    <div className="container mx-auto my-[100px]">
      <div
        ref={wrapperRef}
        className="w-full min-h-[unset] lg:min-h-[350px] h-auto grid lg:grid-cols-[312px_1fr] gap-[6px]"
      >
        <div className="bg-gradient-orange-1 relative rounded-[14px] lg:rounded-[20px] py-[38px] px-[24px] min-h-[136px] lg:min-h-[350px] overflow-hidden">
          <H3 className="text-white max-w-[230px] md:max-w-fit">
            Global Partner of Choice
          </H3>
          <Image
            src="/images/home/flower-t.svg"
            alt="img"
            width={295}
            height={295}
            className="absolute bottom-[30px] md:bottom-[-86px] right-[-40px] md:right-[-90px] w-[151px] h-[151px] md:w-[295px] md:h-[295px]"
          />
        </div>
        <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-none lg:grid-rows-[1fr_1fr] gap-[6px]">
          <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px]">
            <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
              <H2 className="text-orange-200">40+</H2>
              <BodyText2>years of speciality chemical expertise</BodyText2>
            </div>
            <div className="rounded-[20px] overflow-hidden relative stat-box">
              <Image
                src="/images/home/chemical.png"
                alt="img"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
              <H2 className="text-orange-200">20+</H2>
              <BodyText2>sectors being served</BodyText2>
            </div>
            <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
              <H2 className="text-orange-200">2</H2>
              <BodyText2>state-of-the-art R&D facilities</BodyText2>
            </div>
          </div>
          <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px]">
            <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
              <H2 className="text-orange-200">60+</H2>
              <BodyText2>
                countries served with a growing export footprint
              </BodyText2>
            </div>
            <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
              <H2 className="text-orange-200">100+</H2>
              <BodyText2>products</BodyText2>
            </div>
            <div className="rounded-[20px] overflow-hidden relative stat-box">
              <Image
                src="/images/home/test-lab.png"
                alt="img"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
              <H2 className="text-orange-200">16</H2>
              <BodyText2>manufacturing facilities across India</BodyText2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPartner;
