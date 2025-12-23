"use client";
import { useState, useEffect, useRef } from "react";
import { BodyText2, H2, H3, SubH3 } from "../Typography2";
import Button from "../Button";
import Image from "next/image";
import DesktopMapSvg from "./DesktopMapSvg";
import StateMapSvg from "./StateMapSvg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GRMapsProps } from "@/app/types/global-reach.type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GRMaps = ({ data }: GRMapsProps) => {
  const { sectionTitle, title, description, ctaButton } = data;
  const sectionOne = useRef<HTMLDivElement | null>(null);
  const sectionTwo = useRef<HTMLDivElement | null>(null);
  const revealCircle = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(4);
  const [activeMob, setActiveMob] = useState(0);
  const [activeBlip, setActiveBlip] = useState<number | null>(4);
  const totalCities = 5;

  useEffect(() => {
  const interval = setInterval(() => {
    setActiveMob((prev) => (prev + 1) % totalCities);
  }, 4000);
  return () => clearInterval(interval);
}, [activeMob]); 

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !sectionOne.current ||
      !revealCircle.current ||
      !sectionTwo.current
    )
      return;
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop) {
      gsap.set(sectionTwo.current, { opacity: 1, zIndex: 30 });
      gsap.set(revealCircle.current, { opacity: 0, scale: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionOne.current,
        start: "top top",
        end: "+=800",
        pin: true,
        scrub: 0.5,
        pinSpacing: true,
      },
    });

    tl.to(revealCircle.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    }).fromTo(
      sectionTwo.current,
      { opacity: 0, zIndex: 0 },
      { opacity: 1, zIndex: 30, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const mobileStatsData = [
    { id: 0, percent: "46%", title: "India" },
    { id: 1, percent: "23%", title: "Middle East" },
    { id: 2, percent: "18%", title: "North America" },
    { id: 3, percent: "4%", title: "Europe" },
    { id: 4, percent: "6%", title: "Rest of Asia" },
    { id: 5, percent: "3%", title: "Rest of the world" },
  ];

  return (
    <div>
      {/* Part 1 - Pinned Section */}
      <div
        ref={sectionOne}
        className="w-full xl:h-screen relative z-10 bg-white"
      >
        <div className="container pt-[70px] pb-[70px] lg:pt-[100px] lg:pb-[100px] h-full overflow-hidden">
          {sectionTitle && (
            <H2 className="max-w-[unset] lg:max-w-[550px] text-center mx-auto mb-[30px] lg:mb-[60px]">
              {sectionTitle}
            </H2>
          )}
          <div className="relative w-full h-[180px] lg:h-[550px]">
            <div className="w-[100%] h-full mx-auto hidden lg:block relative ">
              <DesktopMapSvg
                hoverRestWorld={() => setActiveBlip(0)}
                hoverNorthAmerica={() => setActiveBlip(1)}
                hoverEurope={() => setActiveBlip(2)}
                hoverMiddleE={() => setActiveBlip(3)}
                hoverIndia={() => setActiveBlip(4)}
                hoverAsia={() => setActiveBlip(5)}
                fillRestOfWorld={activeBlip === 0 ? "#898698" : "#E7EBED"}
                fillNorthAmerica={activeBlip === 1 ? "#898698" : "#E7EBED"}
                fillEurope={activeBlip === 2 ? "#898698" : "#E7EBED"}
                fillMiddleEast={activeBlip === 3 ? "#898698" : "#E7EBED"}
                fillIndia={activeBlip === 4 ? "#898698" : "#E7EBED"}
                fillRestOfAsia={activeBlip === 5 ? "#898698" : "#E7EBED"}
                isActive0={activeBlip === 0 ? true : false}
                isActive1={activeBlip === 1 ? true : false}
                isActive2={activeBlip === 2 ? true : false}
                isActive3={activeBlip === 3 ? true : false}
                isActive4={activeBlip === 4 ? true : false}
                isActive5={activeBlip === 5 ? true : false}
              />
            </div>
            <Image
              src="/images/global-reach/gr-map-m.svg"
              alt="img"
              fill
              className="object-contain block lg:hidden"
            />
          </div>
          <div className="lg:hidden mt-[40px] grid grid-cols-2 gap-y-[16px] gap-x-[20px] mx-[20px]">
            {mobileStatsData?.map((items, index) => {
              const isLastTwo = index >= mobileStatsData.length - 2;
              return (
                <div
                  key={items?.id}
                  className={`pb-[16px] grid justify-center ${
                    !isLastTwo ? "border-b border-grey-200" : ""
                  }`}
                >
                  <H2 className="text-orange-200 text-center">
                    {items?.percent}
                  </H2>
                  <BodyText2 className="text-center">{items?.title}</BodyText2>
                </div>
              );
            })}
          </div>
        </div>
        {/* Part 2 - desktop only Circle Animation */}
        <div
          ref={revealCircle}
          className="hidden xl:block fixed inset-0 bg-white transform scale-0 opacity-0 origin-center  z-20"
        >
          <div className="relative w-full container">
            <div
              ref={sectionTwo}
              className=" relative z-30 h-auto min-h-screen my-[70px] w-full container grid xl:grid-cols-[35%_1fr] gap-x-[100px] items-center opacity-0 lg:opacity-100"
            >
              <div>
                <div>
                  {title && <H3>{title}</H3>}
                  {description && (
                    <BodyText2 className="mt-[12px] lg:mt-[8px]">
                      {description}
                    </BodyText2>
                  )}
                  {ctaButton?.title && (
                    <div className="mt-5">
                      <Button
                        title={ctaButton?.title}
                        href={
                          ctaButton?.hasExternalLink == "true"
                            ? ctaButton?.externalLink
                            : ctaButton?.link?.link
                        }
                        secondary
                      />
                    </div>
                  )}
                </div>
                <div className="mt-[62px] w-full grid lg:grid-cols-2 gap-y-[16px] gap-x-[5px] items-start lg:justify-between">
                  <div className="border-b lg:border-none border-grey-200 pb-[16px] lg:pb-[unset]">
                    <div className="flex gap-x-[12px] items-start w-full">
                      <Image
                        src="/images/global-reach/blip-orange.svg"
                        alt="img"
                        width={18}
                        height={18}
                        className="object-cover h-[18px] w-[18px]"
                      />
                      <SubH3 className="!text-[16px]">
                        Manufacturing Facilities
                      </SubH3>
                    </div>
                    <div className="mt-[20px] grid grid-cols-2">
                      <div
                        onClick={() => setActive(2)}
                        className="cursor-pointer w-fit"
                      >
                        <BodyText2
                          className={`${
                            active === 2 ? "text-grey-400" : "text-grey-300"
                          }`}
                        >
                          Tarapur
                        </BodyText2>
                      </div>
                      <div className="w-fit">
                        <BodyText2 className="text-grey-300">
                          Jhagadia
                        </BodyText2>
                      </div>
                      <div
                        onClick={() => setActive(0)}
                        className="cursor-pointer w-fit"
                      >
                        <BodyText2
                          className={`${
                            active === 0 ? "text-grey-400" : "text-grey-300"
                          }`}
                        >
                          Bhachau
                        </BodyText2>
                      </div>
                      <div
                        onClick={() => setActive(1)}
                        className="cursor-pointer w-fit"
                      >
                        <BodyText2
                          className={`${
                            active === 1 ? "text-grey-400" : "text-grey-300"
                          }`}
                        >
                          Dahej
                        </BodyText2>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-x-[12px] items-center">
                      <Image
                        src="/images/global-reach/blip-blue.svg"
                        alt="img"
                        width={18}
                        height={18}
                        className="object-cover h-[18px] w-[18px]"
                      />
                      <SubH3 className="!text-[16px]">R&D Centres</SubH3>
                    </div>
                    <div className="mt-[20px] grid grid-cols-2">
                      <div
                        onClick={() => setActive(4)}
                        className="cursor-pointer w-fit"
                      >
                        <BodyText2
                          className={`${
                            active === 4 ? "text-grey-400" : "text-grey-300"
                          }`}
                        >
                          Vapi
                        </BodyText2>
                      </div>
                      <div
                        onClick={() => setActive(3)}
                        className="cursor-pointer w-fit"
                      >
                        <BodyText2
                          className={`${
                            active === 3 ? "text-grey-400" : "text-grey-300"
                          }`}
                        >
                          Navi Mumbai
                        </BodyText2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* desktop statemap */}
                <StateMapSvg
                  width="737"
                  height="569"
                  hoverBachau={() => setActive(0)}
                  hoverDahej={() => setActive(1)}
                  hoverTarapur={() => setActive(2)}
                  hoverNaviM={() => setActive(3)}
                  hoverVapi={() => setActive(4)}
                />
                <div
                  className={`${
                    [0, 1, 2].includes(active) ? "bg-[#e55e2d]" : "bg-blue-100"
                  }  p-2 absolute top-[5%] right-[22%] w-[270px] h-[300px] rounded-[12px]`}
                >
                  <div className="relative w-full h-[240px] overflow-hidden rounded-[1rem] flex items-center justify-center">
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={
                          active === 0
                            ? "/images/global-reach/gr-banner.png"
                            : active === 1
                            ? "/images/rd/rd-banner.png"
                            : active === 2
                            ? "/images/cdmo/cdmo-driving-banner.png"
                            : active === 3
                            ? "/images/home/blog1.png"
                            : "/images/home/framework-forged-1.png"
                        }
                        alt="img"
                        fill
                        className="object-cover scale-110"
                      />
                      <i className="absolute top-0 left-0 w-full h-full backdrop-blur-3xl"></i>
                      <span className="absolute bottom-0 right-0 rounded-br-[20px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[300px] overflow-hidden w-[100%] h-[100%]">
                        <Image
                          src={
                            active === 0
                              ? "/images/global-reach/gr-banner.png"
                              : active === 1
                              ? "/images/rd/rd-banner.png"
                              : active === 2
                              ? "/images/cdmo/cdmo-driving-banner.png"
                              : active === 3
                              ? "/images/home/blog1.png"
                              : "/images/home/framework-forged-1.png"
                          }
                          alt="img"
                          fill
                          className="object-cover scale-110"
                        />
                      </span>
                    </div>
                  </div>
                  <BodyText2 className="text-white mt-[14px] text-center">
                    {active === 0
                      ? "Bhachau"
                      : active === 1
                      ? "Dahej "
                      : active === 2
                      ? "Tarapur"
                      : active === 3
                      ? "Navi Mumbai"
                      : "Vapi"}
                  </BodyText2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Part 2 - Mobile only */}
        <div className="block lg:hidden">
          <div className="mt-[72px] mx-[20px]">
            {title && <H3>{title}</H3>}
            {description && (
              <BodyText2 className="mt-[12px] lg:mt-[8px]">
                {description}
              </BodyText2>
            )}
            {ctaButton?.title && (
              <div className="mt-5">
                <Button
                  title={ctaButton?.title}
                  href={
                    ctaButton?.hasExternalLink == "true"
                      ? ctaButton?.externalLink
                      : ctaButton?.link?.link
                  }
                  secondary
                />
              </div>
            )}
          </div>
          {/* state map */}
          <div className="mt-[40px] w-[100%] h-[300px] relative">
            <StateMapSvg width="100%" height="300" />
            <div
              className={`${
                [0, 1, 2].includes(activeMob) ? "bg-[#e55e2d]" : "bg-blue-100"
              }  p-2 absolute top-[18%] right-[27%] w-[123px] h-[137px] rounded-[6px]`}
            >
              <div className="relative w-full h-[93px] overflow-hidden rounded-[6px] flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    key={activeMob}
                    src={
                      activeMob === 0
                        ? "/images/global-reach/gr-banner.png"
                        : activeMob === 1
                        ? "/images/rd/rd-banner.png"
                        : activeMob === 2
                        ? "/images/cdmo/cdmo-driving-banner.png"
                        : activeMob === 3
                        ? "/images/home/blog1.png"
                        : "/images/home/framework-forged-1.png"
                    }
                    alt="img"
                    fill
                    className="object-cover scale-110"
                  />
                  <i className="absolute top-0 left-0 w-full h-full backdrop-blur-3xl"></i>
                  <span className="absolute bottom-0 right-0 rounded-br-[20px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[300px] overflow-hidden w-[100%] h-[100%]">
                    <Image
                      key={`inner-${activeMob}`}
                      src={
                        activeMob === 0
                          ? "/images/global-reach/gr-banner.png"
                          : activeMob === 1
                          ? "/images/rd/rd-banner.png"
                          : activeMob === 2
                          ? "/images/cdmo/cdmo-driving-banner.png"
                          : activeMob === 3
                          ? "/images/home/blog1.png"
                          : "/images/home/framework-forged-1.png"
                      }
                      alt="img"
                      fill
                      className="object-cover scale-110"
                    />
                  </span>
                </div>
              </div>
              <BodyText2 className="text-white mt-[5px] text-center">
                {activeMob === 0
                  ? "Bhachau"
                  : activeMob === 1
                  ? "Dahej "
                  : activeMob === 2
                  ? "Tarapur"
                  : activeMob === 3
                  ? "Navi Mumbai"
                  : "Vapi"}
              </BodyText2>
            </div>
          </div>
          <div className="my-[62px] px-[20px] w-full grid lg:grid-cols-2 gap-y-[16px] gap-x-[5px] items-start lg:justify-between">
            <div className="border-b  border-grey-200 pb-[16px] lg:pb-[unset]">
              <div className="flex gap-x-[12px] items-center w-full">
                <Image
                  src="/images/global-reach/blip-orange.svg"
                  alt="img"
                  width={18}
                  height={18}
                  className="object-cover h-[18px] w-[18px]"
                />
                <SubH3 className="!text-[18px]">Manufacturing Facilities</SubH3>
              </div>
              <div className="mt-[20px] grid grid-cols-2">
                <div
                  onClick={() => setActiveMob(2)}
                  className="cursor-pointer w-fit"
                >
                  <BodyText2
                    className={`${
                      activeMob === 2 ? "text-grey-400" : "text-grey-300"
                    }`}
                  >
                    Tarapur
                  </BodyText2>
                </div>
                <div className="w-fit">
                  <BodyText2 className="text-grey-300">Jhagadia</BodyText2>
                </div>
                <div
                  onClick={() => setActiveMob(0)}
                  className="cursor-pointer w-fit"
                >
                  <BodyText2
                    className={`${
                      activeMob === 0 ? "text-grey-400" : "text-grey-300"
                    }`}
                  >
                    Bhachau
                  </BodyText2>
                </div>
                <div
                  onClick={() => setActiveMob(1)}
                  className="cursor-pointer w-fit"
                >
                  <BodyText2
                    className={`${
                      activeMob === 1 ? "text-grey-400" : "text-grey-300"
                    }`}
                  >
                    Dahej
                  </BodyText2>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-x-[12px] items-center">
                <Image
                  src="/images/global-reach/blip-blue.svg"
                  alt="img"
                  width={18}
                  height={18}
                  className="object-cover h-[18px] w-[18px]"
                />
                <SubH3 className="!text-[18px]">R&D Centres</SubH3>
              </div>
              <div className="mt-[20px] grid grid-cols-2">
                <div
                  onClick={() => setActiveMob(4)}
                  className="cursor-pointer w-fit"
                >
                  <BodyText2
                    className={`${
                      activeMob === 4 ? "text-grey-400" : "text-grey-300"
                    }`}
                  >
                    Vapi
                  </BodyText2>
                </div>
                <div
                  onClick={() => setActiveMob(3)}
                  className="cursor-pointer w-fit"
                >
                  <BodyText2
                    className={`${
                      activeMob === 3 ? "text-grey-400" : "text-grey-300"
                    }`}
                  >
                    Navi Mumbai
                  </BodyText2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GRMaps;
