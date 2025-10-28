"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BodyText1, BodyText2, H2, SubH2 } from "../Typography2";
import ParallaxImage from "../ParallaxImage";
import { CDMODrivingProps } from "@/app/types/cdmo.type";

const CDMODriving: React.FC<CDMODrivingProps> = ({ data }) => {
  const { image, leftSection, righSection } = data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="h-auto lg:h-full relative lg:py-[100px] py-[50px]">
      {image?.url && (
        <Image
          src={image?.url}
          alt={image?.alternativeText || "banner"}
          width={1440}
          height={849}
          className="block lg:hidden w-full h-full object-cover z-0 px-[20px] lg:px-0 rounded-[50px] lg:rounded-[0px]"
        />
      )}

      {image?.url && (
        <ParallaxImage
          src={image?.url}
          alt={image?.alternativeText || "banner"}
          className="hidden lg:block w-full h-full object-cover z-0 px-[20px] lg:px-0 rounded-[50px] lg:rounded-[0px]"
        />
      )}

      <div className="lg:absolute bottom-9 lg:px-14 mb-0 lg:mb-24 z-10 w-full flex lg:flex-row flex-col justify-between">
        <div className="w-full lg:w-[50%] bg-white rounded-3xl overflow-hidden">
          {/* Main Content Section - Always Visible */}
          <div className="lg:pt-[40px] lg:pb-[70px] pt-7">
            {leftSection?.title && (
              <H2 className="lg:w-[85%] w-full pb-6 px-[20px] lg:px-[42px]">
                {leftSection?.title}
              </H2>
            )}

            {leftSection?.description && (
              <BodyText1 className="pb-7 px-[20px] lg:px-[42px]">
                {leftSection?.description}
              </BodyText1>
            )}

            <div
              className={`hidden lg:block absolute bottom-0 lg:w-[46.40%] w-full transition-all duration-700 bg-gradient-orange-3 ${
                isOpen ? "rounded-2xl" : "rounded-b-3xl"
              }`}
            >
              {/* Accordion Header - Always Visible */}
              {leftSection?.accordion?.title && (
                <button
                  onClick={toggleAccordion}
                  className="w-full py-6 px-[42px] flex justify-between items-center cursor-pointer"
                >
                  <SubH2 className="text-white">
                    {leftSection?.accordion?.title}
                  </SubH2>
                  <span
                    className={`text-white text-3xl font-light transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              )}

              {/* Accordion Content - Collapsible */}
              {leftSection?.accordion?.items?.length > 0 && (
                <div
                  className={`transition-all duration-700 ease-in-out 
                ${isOpen ? "max-h-[332px] opacity-100" : "max-h-0 opacity-0"} 
                overflow-scroll  
                scrollbar-style
              `}
                >
                  {/* Capabilities List */}
                  <div className="px-[42px] pb-9">
                    <div className="space-y-4 ">
                      {leftSection?.accordion?.items?.map(
                        (capability, index) =>
                          capability?.title && (
                            <div key={index} className="flex items-start gap-3">
                              <Image
                                src="/images/star.png"
                                alt="check-icon"
                                width={20}
                                height={20}
                                className=""
                              />
                              <BodyText2 className="text-white">
                                {capability?.title}
                              </BodyText2>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`block lg:hidden mx-3 w-auto transition-all duration-700 bg-gradient-orange-3 rounded-2xl mb-9`}
        >
          {/* Accordion Header - Always Visible */}
          {leftSection?.accordion?.title && (
            <button
              onClick={toggleAccordion}
              className="w-full py-3 px-[22px] flex justify-between items-center cursor-pointer"
            >
              <SubH2 className="text-white">
                {leftSection?.accordion?.title}
              </SubH2>
              <span
                className={`text-white text-3xl font-light transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
          )}

          {/* Accordion Content - Collapsible */}
          {leftSection?.accordion?.items?.length > 0 && (
            <div
              className={`transition-all duration-700 ease-in-out 
                ${isOpen ? "max-h-[332px] opacity-100" : "max-h-0 opacity-0"} 
                overflow-scroll  
                scrollbar-style
              `}
            >
              {/* Capabilities List */}
              <div className="px-[22px] pb-9">
                <div className="space-y-4 ">
                  {leftSection?.accordion?.items?.map(
                    (capability, index) =>
                      capability?.title && (
                        <div key={index} className="flex items-start gap-3">
                          <Image
                            src="/images/star.png"
                            alt="check-icon"
                            width={20}
                            height={20}
                            className=""
                          />
                          <BodyText2 className="text-white">
                            {capability?.title}
                          </BodyText2>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[45%] flex justify-center items-center flex-wrap gap-6">
          {righSection?.values?.map((item, index) => (
            <div
              className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box h-[150px] w-[164px] lg:h-[185px] lg:w-[246px]"
              key={"item_" + index}
            >
              {item?.value && (
                <H2 className="text-orange-200">{item?.value}</H2>
              )}
              {item?.description && (
                <BodyText2 className="lg:w-[80%] w-full">
                  {item?.description}
                </BodyText2>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CDMODriving;
