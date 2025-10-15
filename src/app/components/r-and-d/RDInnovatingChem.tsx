"use client";
import React, { useEffect, useRef } from "react";
import { BodyText2, H2, SubH1 } from "../Typography2";
import Image from "next/image";
import Tags from "../Tags";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const RDInnovatingChem = () => {
  const chemData = [
    {
      id: 0,
      title: "Labs That Drive Seamless Scale-Up",
      imgSrc: "/images/rd/inno-banner1.png",
      desc: "With Paperless ELN-enabled labs, parallel reactors (DoE), and lab-to-pilot focused systems, we accelerate innovation and reduce errors. Our advanced tools- including React-IR, FBRM, calorimetry and continuous flow systems ensure first-time-right outcomes and seamless transfer from bench to plant.",
    },
    {
      id: 1,
      title: "Engineering Efficiency Across the Value Chain",
      imgSrc: "/images/rd/inno-banner1.png",
      desc: "Our infrastructure is built on process intensification, scale-up engineering, and green chemistry principles. This ensures cost-efficient solutions that transition seamlessly from bench to plant, delivering faster, sustainable impact across global value chains.",
    },
  ];
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
    <div className="">
      <H2 className="max-w-[600px] mx-[20px] lg:mx-[60px]">
        Innovating Chemistry, Empowering Tomorrow
      </H2>
      <div className="mt-[50px] container mx-auto relative">
        {chemData?.map((items, index) => {
          return (
            <div
              ref={(el) => {
                if (el) gridRefs.current[index] = el;
              }}
              key={items?.id}
              className="grid grid-cols-[0.9fr] lg:grid-cols-[1fr_1fr] justify-end lg:justify-items-center gap-x-[60px] gap-y-[18px] mb-[40px] lg:mb-[80px] relative"
            >
              <div className="relative w-full lg:w-[424px] h-[286px] rounded-[20px] overflow-hidden">
                <Image
                  src={items?.imgSrc}
                  alt="img"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex gap-x-[24px]">
                  <Tags title={`0${items?.id + 1}`} />
                  <div>
                    <SubH1 className="text-blue-200">{items?.title}</SubH1>
                    <BodyText2 className="text-grey-400 mt-[10px]">
                      {items?.desc}
                    </BodyText2>
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
    </div>
  );
};

export default RDInnovatingChem;
