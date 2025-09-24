"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BodyText2, H2, H3 } from "../Typography2";
// import useAnimatedCount from "@/app/hooks/useAnimatedCount";

gsap.registerPlugin(ScrollTrigger);

const GlobalPartner = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  //const [startAnimation, setStartAnimation] = useState(false);

  // Call all hooks unconditionally at the top level - removed for now 
  // const count40 = useAnimatedCount(startAnimation ? 40 : 0, 1500);
  // const count20 = useAnimatedCount(startAnimation ? 20 : 0, 1500);
  // const count2 = useAnimatedCount(startAnimation ? 2 : 0, 1500);
  // const count60 = useAnimatedCount(startAnimation ? 60 : 0, 1500);
  // const count100 = useAnimatedCount(startAnimation ? 100 : 0, 1500);
  // const count16 = useAnimatedCount(startAnimation ? 16 : 0, 1500);

  // useEffect(() => {
  //   // Animation for stat boxes sliding up
  //   gsap.from(".stat-box", {
  //     y: 80,
  //     opacity: 0,
  //     duration: 0.8,
  //     ease: "power3.out",
  //     stagger: {
  //       each: 0.2,
  //       from: "random",
  //     },
  //     scrollTrigger: {
  //       trigger: ".grid",
  //       start: "top 80%",
  //       end: "top 90%",
  //       toggleActions: "play none none none",
  //     },
  //   });

  //   // Separate ScrollTrigger for starting the number animations
  //   ScrollTrigger.create({
  //     trigger: wrapperRef.current,
  //     start: "top 80%",
  //     onEnter: () => {
  //       setStartAnimation(true);
  //     },
  //     onLeaveBack: () => {
  //       setStartAnimation(false);
  //     },
  //   });

  //   // Cleanup function
  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  useEffect(() => {
  const anim = gsap.from(".stat-box", {
    y: 80,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: {
      each: 0.2,
      from: "random",
    },
    scrollTrigger: {
      trigger: wrapperRef.current,
      start: "top 80%",
      toggleActions: "play none none none",
    // toggleActions: "play reverse play reverse",
    },
  });

  return () => {
    anim.scrollTrigger?.kill();
  };
}, []);

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
            <H2 className="text-orange-200">
              {/* {Math.floor(count40)}+ */}
              40+
            </H2>
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
            <H2 className="text-orange-200">
              {/* {Math.floor(count20)}+ */}
              20+
            </H2>
            <BodyText2>sectors being served</BodyText2>
          </div>
          <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
            <H2 className="text-orange-200">{/* {Math.floor(count2)} */}2</H2>
            <BodyText2>state-of-the-art R&D facilities</BodyText2>
          </div>
        </div>
        <div className="grid grid-rows-4 lg:grid-rows-none lg:grid-cols-4 gap-[6px]">
          <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
            <H2 className="text-orange-200">
              {/* {Math.floor(count60)}+ */}
              60+
            </H2>
            <BodyText2>
              countries served with a growing export footprint
            </BodyText2>
          </div>
          <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
            <H2 className="text-orange-200">
              {/* {Math.floor(count100)}+ */}
              100+
            </H2>
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
            <H2 className="text-orange-200">
              {/* {Math.floor(count16)} */}
              16
            </H2>
            <BodyText2>manufacturing facilities across India</BodyText2>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GlobalPartner;
