"use client";
import { useState } from "react";
import { BodyText2, H2 } from "../Typography2";
import DesktopMapSvg from "../global-reach/DesktopMapSvg";
import Image from "next/image";
import { useMargin } from "@/app/contexts/MarginContext";

const HomeMap = () => {
  const [activeBlip, setActiveBlip] = useState(4);
  const { marginBottom } = useMargin();
  const mobileStatsData = [
    { id: 0, percent: "46%", title: "India" },
    { id: 1, percent: "23%", title: "Middle East" },
    { id: 2, percent: "18%", title: "North America" },
    { id: 3, percent: "4%", title: "Europe" },
    { id: 4, percent: "6%", title: "Rest of Asia" },
    { id: 5, percent: "3%", title: "Rest of the world" },
  ];
  return (
    <div
      className="w-full relative z-10 bg-white pt-20"
      style={{ marginTop: marginBottom > 0 ? `${marginBottom}px` : undefined }}
    >
      <div className="container pt-[70px] pb-[70px] lg:pt-[100px] lg:pb-[100px] h-full overflow-hidden">
        <H2 className="max-w-[unset] lg:max-w-[550px] text-center mx-auto mb-[30px] lg:mb-[60px]">
          Growing Across Markets and Beyond Borders
        </H2>
        <div className="relative w-full h-[180px] lg:h-[550px] mb-[50px] lg:mb-[100px] ">
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
          <p className="text-[#002F50] text-xs text-left mt-4 lg:mt-0 md:mb-[52px] lg:block hidden">
            *% indicate revenue breakup by market share.
          </p>
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

        <p className="text-[#002F50] text-xs text-left mt-4 lg:mt-0 md:mb-[52px] lg:hidden block">
          *% indicate revenue breakup by market share.
        </p>
      </div>
    </div>
  );
};

export default HomeMap;
