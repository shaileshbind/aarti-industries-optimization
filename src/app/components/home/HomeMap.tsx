"use client";
import React, { useState } from "react";
import { BodyText2, BodyText3, H2, SubH1 } from "../Typography2";
import DesktopMapSvg from "../global-reach/DesktopMapSvg";
import Image from "next/image";

const HomeMap = () => {
  const [activeBlip, setActiveBlip] = useState(4);
  const mobileStatsData = [
    { id: 0, percent: "46%", title: "India" },
    { id: 1, percent: "23%", title: "Middle East" },
    { id: 2, percent: "18%", title: "North America" },
    { id: 3, percent: "4%", title: "Europe" },
    { id: 4, percent: "6%", title: "Rest of Asia" },
    { id: 5, percent: "6%", title: "Rest of the world" },
  ];
  return (
    <div className="w-full lg:h-screen relative z-10 bg-white">
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
    </div>
  );
};

export default HomeMap;
