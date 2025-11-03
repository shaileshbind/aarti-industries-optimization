"use client";
import React, { useState, useEffect, useRef } from "react";
import { BodyText2, BodyText3, H2, H3, SubH1, SubH3 } from "../Typography2";
import Button from "../Button";
import Image from "next/image";
import DesktopMapSvg from "./DesktopMapSvg";
import StateMapSvg from "./StateMapSvg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GRMaps = () => {
  const sectionOne = useRef<HTMLDivElement | null>(null);
  const sectionTwo = useRef<HTMLDivElement | null>(null);
  const revealCircle = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(4);
  const [activeMob, setActiveMob] = useState(0);
  const [activeBlip, setActiveBlip] = useState(4);
  const totalCities = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMob((prev) => (prev + 1) % totalCities);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

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
    { id: 5, percent: "6%", title: "Rest of the world" },
  ];

  return (
    <div>
      {/* Part 1 - Pinned Section */}
      <div
        ref={sectionOne}
        className="w-full lg:h-screen relative z-10 bg-white"
      >
        <div className="container pt-[70px] pb-[70px] lg:pt-[100px] lg:pb-[100px] h-full overflow-hidden">
          <H2 className="max-w-[unset] lg:max-w-[550px] text-center mx-auto mb-[30px] lg:mb-[60px]">
            Growing Across Markets and Beyond Borders
          </H2>
          <div className="relative w-full h-[180px] lg:h-[550px] ">
            <div className="w-fit h-full mx-auto hidden lg:block relative ">
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
              />
              <div
                onMouseEnter={() => setActiveBlip(0)}
                className="absolute top-[78%] left-[5.5%]  cursor-pointer"
              >
                <div
                  className={`${
                    activeBlip === 0
                      ? "bg-gradient-orange-1 border-transparent"
                      : "bg-white border-gray-200"
                  }    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-[123px] h-[73px] rounded-[10px] border  grid content-center text-center relative`}
                >
                  <SubH1
                    className={`${
                      activeBlip === 0 ? "text-white" : "text-orange-100"
                    } !text-[28px]`}
                  >
                    6%
                  </SubH1>
                  <BodyText3
                    className={`${
                      activeBlip === 0 ? "text-white" : "text-grey-400"
                    } !text-[12px]`}
                  >
                    Rest of the world
                  </BodyText3>
                  <div
                    className={`${
                      activeBlip === 0
                        ? "bg-[#e3590c] border-none"
                        : "bg-white blip-border"
                    } absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 z-[0]`}
                  ></div>
                </div>
              </div>
              {/* North America */}
              <div
                onMouseEnter={() => setActiveBlip(1)}
                className="absolute top-[21.5%] left-[12.5%] cursor-pointer"
              >
                <div
                  className={`${
                    activeBlip === 1
                      ? "bg-gradient-orange-1 border-transparent"
                      : "bg-white border-gray-200"
                  } transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-[123px] h-[73px] rounded-[10px] border  grid content-center text-center relative`}
                >
                  <SubH1
                    className={`${
                      activeBlip === 1 ? "text-white" : "text-orange-100"
                    } !text-[28px]`}
                  >
                    18%
                  </SubH1>
                  <BodyText3
                    className={`${
                      activeBlip === 1 ? "text-white" : "text-grey-400"
                    } !text-[12px]`}
                  >
                    North America
                  </BodyText3>
                  <div
                    className={`${
                      activeBlip === 1
                        ? "bg-[#e3590c] border-none"
                        : "bg-white blip-border"
                    } absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 z-[0]`}
                  ></div>
                </div>
              </div>
              {/* Europe */}
              <div
                onMouseEnter={() => setActiveBlip(2)}
                className="absolute top-[20.5%] left-[43%] cursor-pointer"
              >
                <div
                  className={`${
                    activeBlip === 2
                      ? "bg-gradient-orange-1 border-transparent"
                      : "bg-white border-gray-200"
                  } transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]  w-[123px] h-[73px] rounded-[10px] border grid content-center text-center relative`}
                >
                  <SubH1
                    className={`${
                      activeBlip === 2 ? "text-white" : "text-orange-100"
                    } !text-[28px]`}
                  >
                    4%
                  </SubH1>
                  <BodyText3
                    className={`${
                      activeBlip === 2 ? "text-white" : "text-grey-400"
                    } !text-[12px]`}
                  >
                    Europe
                  </BodyText3>
                  <div
                    className={`${
                      activeBlip === 2
                        ? "bg-[#e3590c] border-none"
                        : "bg-white blip-border"
                    } absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 z-[0]`}
                  ></div>
                </div>
              </div>
              {/* Middle East */}
              <div
                onMouseEnter={() => setActiveBlip(3)}
                className="absolute top-[33%] left-[53%] cursor-pointer"
              >
                <div
                  className={`${
                    activeBlip === 3
                      ? "bg-gradient-orange-1 border-transparent"
                      : "bg-white border-gray-200"
                  } transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]  w-[123px] h-[73px] rounded-[10px] border grid content-center text-center relative`}
                >
                  <SubH1
                    className={`${
                      activeBlip === 3 ? "text-white" : "text-orange-100"
                    } !text-[28px]`}
                  >
                    23%
                  </SubH1>
                  <BodyText3
                    className={`${
                      activeBlip === 3 ? "text-white" : "text-grey-400"
                    } !text-[12px]`}
                  >
                    Middle East
                  </BodyText3>
                  <div
                    className={`${
                      activeBlip === 3
                        ? "bg-[#e3590c] border-none"
                        : "bg-white blip-border"
                    } absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 z-[0]`}
                  ></div>
                </div>
              </div>
              {/* India */}
              <div
                onMouseEnter={() => setActiveBlip(4)}
                className="absolute top-[36%] left-[64.5%] cursor-pointer"
              >
                <div
                  className={`${
                    activeBlip === 4
                      ? "bg-gradient-orange-1 border-transparent"
                      : "bg-white border-gray-200"
                  } transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]  w-[123px] h-[73px] rounded-[10px] border  grid content-center text-center relative`}
                >
                  <SubH1
                    className={`${
                      activeBlip === 4 ? "text-white" : "text-orange-100"
                    } !text-[28px]`}
                  >
                    46%
                  </SubH1>
                  <BodyText3
                    className={`${
                      activeBlip === 4 ? "text-white" : "text-grey-400"
                    } !text-[12px]`}
                  >
                    India
                  </BodyText3>
                  <div
                    className={`${
                      activeBlip === 4
                        ? "bg-[#e3590c] border-none"
                        : "bg-white blip-border"
                    } absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 z-[0]`}
                  ></div>
                </div>
              </div>
              {/* Rest of Asia */}
              <div
                onMouseEnter={() => setActiveBlip(5)}
                className="absolute top-[19%] left-[76.3%] cursor-pointer"
              >
                <div
                  className={`${
                    activeBlip === 5
                      ? "bg-gradient-orange-1 border-transparent"
                      : "bg-white border-gray-200"
                  } transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]  w-[123px] h-[73px] rounded-[10px] border  grid content-center text-center relative`}
                >
                  <SubH1
                    className={`${
                      activeBlip === 5 ? "text-white" : "text-orange-100"
                    } !text-[28px]`}
                  >
                    6%
                  </SubH1>
                  <BodyText3
                    className={`${
                      activeBlip === 5 ? "text-white" : "text-grey-400"
                    } !text-[12px]`}
                  >
                    Rest of Asia
                  </BodyText3>
                  <div
                    className={`${
                      activeBlip === 5
                        ? "bg-[#e3590c] border-none"
                        : "bg-white blip-border"
                    } absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 z-[0]`}
                  ></div>
                </div>
              </div>
            </div>
            <Image
              src="/images/global-reach/gr-map-m.svg"
              alt="img"
              fill
              className="object-contain block lg:hidden"
            />
          </div>
          <div className="lg:hidden mt-[40px] grid grid-cols-2 gap-y-[16px] gap-x-[20px] mx-[20px]">
            {mobileStatsData?.map((items) => {
              return (
                <div
                  key={items?.id}
                  className="border-b border-grey-200 pb-[16px] grid justify-center"
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
          className="hidden lg:block fixed inset-0 bg-white transform scale-0 opacity-0 origin-center  z-20"
        >
          <div className="relative w-full container">
            <div
              ref={sectionTwo}
              className=" relative z-30 h-auto min-h-screen my-[70px] w-full container grid lg:grid-cols-[35%_1fr] gap-x-[100px] items-center opacity-0 lg:opacity-100"
            >
              <div>
                <div>
                  <H3>Infrastructure That Delivers Globally</H3>
                  <BodyText2 className="mt-[12px] lg:mt-[8px]">
                    AIL plants are strategically located and export-ready,
                    equipped with co-gen power, ZLD-ready, and integrated
                    utilities - built to support seamless global supply.
                  </BodyText2>
                  <div className="mt-5">
                    <Button
                      title="View our Manufacturing Capabilities"
                      href="#"
                      secondary
                    />
                  </div>
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
                      <BodyText2
                        className={`${
                          active === 2 ? "text-grey-400" : "text-grey-300"
                        }`}
                      >
                        Tarapur
                      </BodyText2>
                      <BodyText2 className="text-grey-300">Jhagadia</BodyText2>
                      <BodyText2
                        className={`${
                          active === 0 ? "text-grey-400" : "text-grey-300"
                        }`}
                      >
                        Bhachau
                      </BodyText2>
                      <BodyText2
                        className={`${
                          active === 1 ? "text-grey-400" : "text-grey-300"
                        }`}
                      >
                        Dahej
                      </BodyText2>
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
                      <SubH3 className="!text-[16px]">R&D Centers</SubH3>
                    </div>
                    <div className="mt-[20px] grid grid-cols-2">
                      <BodyText2
                        className={`${
                          active === 4 ? "text-grey-400" : "text-grey-300"
                        }`}
                      >
                        Vapi
                      </BodyText2>
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
                  <div className="bg-blue-100 p-2 absolute top-[5%] right-[22%] w-[270px] h-[300px] rounded-[12px]">
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
                        <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                        <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[94%] h-[97%]">
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
            <H3>Infrastructure That Delivers Globally</H3>
            <BodyText2 className="mt-[12px] lg:mt-[8px]">
              AIL plants are strategically located and export-ready, equipped
              with co-gen power, ZLD-ready, and integrated utilities - built to
              support seamless global supply.
            </BodyText2>
            <div className="mt-5">
              <Button
                title="View our Manufacturing Capabilities"
                href="#"
                secondary
              />
            </div>
          </div>
          {/* state map */}
          <div className="mt-[40px] w-[100%] h-[300px] relative">
            <StateMapSvg width="100%" height="300" />
            <div className="bg-blue-100 p-2 absolute top-[18%] right-[27%] w-[123px] h-[137px] rounded-[6px]">
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
                  <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                  <span className="absolute bottom-1 left-1 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[92%] h-[92%]">
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
                <BodyText2
                  className={`${
                    active === 2 ? "text-grey-400" : "text-grey-300"
                  }`}
                >
                  Tarapur
                </BodyText2>
                <BodyText2 className="text-grey-300">Jhagadia</BodyText2>
                <BodyText2
                  className={`${
                    active === 0 ? "text-grey-400" : "text-grey-300"
                  }`}
                >
                  Bhachau
                </BodyText2>
                <BodyText2
                  className={`${
                    active === 1 ? "text-grey-400" : "text-grey-300"
                  }`}
                >
                  Dahej
                </BodyText2>
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
                <SubH3 className="!text-[18px]">R&D Centers</SubH3>
              </div>
              <div className="mt-[20px] grid grid-cols-2">
                <BodyText2
                  className={`${
                    active === 4 ? "text-grey-400" : "text-grey-300"
                  }`}
                >
                  Vapi
                </BodyText2>
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
    </div>
  );
};

export default GRMaps;
