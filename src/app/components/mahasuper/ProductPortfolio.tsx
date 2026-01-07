"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BodyText2, SubH2, SubH3 } from "../Typography2";
import ParallaxImage from "../ParallaxImage";
import { ProductPortfolioProps } from "@/app/types/mahasuper.type";

const ProductPortfolio: React.FC<ProductPortfolioProps> = ({ data }) => {
  const {
    image,
    cardSectionOneTitle,
    cardSectionOneDescription,
    cardSectionTwoTitle,
    cardSectionOne,
    cardSectionTwo,
  } = data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="h-auto min-h-[calc(100vh-100px)] md:py-[100px] pt-[20px] pb-[50px] relative w-full md:w-[calc(100%-120px)] md:mx-[60px] flex-col sm:flex-row flex items-center">
      <div className="sm:absolute top-0 left-0 w-full h-full  rounded-[20px] overflow-hidden">
        {image?.url && (
          <Image
            src={image?.url}
            alt={image?.alternativeText || "banner"}
            width={1440}
            height={849}
            className="block sm:hidden sm:w-full h-full object-cover z-0 w-[calc(100%-40px)] mx-auto sm:px-0 rounded-[14px] sm:rounded-[0px]"
          />
        )}

        {image?.url && (
          <ParallaxImage
            src={image?.url}
            alt={image?.alternativeText || "banner"}
            className="hidden sm:block w-full h-full object-cover z-0 px-[20px] sm:px-0 rounded-[50px] sm:rounded-[0px]"
          />
        )}
      </div>

      <div className="  sm:px-14 mb-0   z-10 w-full flex sm:flex-row flex-col justify-between container">
        <div className="w-full max-w-[540px] bg-white rounded-3xl relative ">
          {/* Main Content Section - Always Visible */}
          <div className="sm:pt-[40px] sm:pb-[120px] pt-7  flex flex-col">
            {cardSectionOneTitle && (
              <SubH2 className="w-full pb-2 md:pb-6 md:px-[20px] sm:px-[42px] sm:!text-[30px]">
                {cardSectionOneTitle}
              </SubH2>
            )}

            {cardSectionOneDescription && (
              <>
                <BodyText2 className="pb-7 md:px-[20px] sm:px-[42px]">
                  {cardSectionOneDescription}
                </BodyText2>
                <div className="flex flex-col gap-2 md:px-[20px] sm:px-[40px]">
                  {cardSectionOne?.length > 0 &&
                    cardSectionOne?.map(
                      (item, index) =>
                        item?.title && (
                          <div key={index} className="flex items-start gap-3">
                            <Image
                              src="/images/star-orange.svg"
                              alt="check-icon"
                              width={16}
                              height={16}
                              className="mt-[2px] md:mt-[3px]"
                            />
                            <BodyText2 className="text-grey-400">
                              {item?.title}
                            </BodyText2>
                          </div>
                        )
                    )}
                </div>
              </>
            )}

            <div
              className={`hidden sm:block absolute bottom-0  w-full transition-all duration-700 bg-gradient-orange-3 overflow-hidden ${
                isOpen ? "rounded-2xl h-full" : "rounded-b-3xl h-[84px]"
              }`}
            >
              {/* Accordion Header - Always Visible */}
              {cardSectionTwoTitle && (
                <button
                  onClick={toggleAccordion}
                  className="w-full py-6 px-[42px] flex justify-between items-center cursor-pointer"
                >
                  <SubH3 className="text-white">{cardSectionTwoTitle}</SubH3>
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
              {cardSectionTwo?.length > 0 && (
                <div
                  className={`transition-all duration-700 ease-in-out h-[calc(100%-84px)] overflow-hidden   relative`}
                >
                  <Image
                    src="/images/home/flower-t.svg"
                    alt="img"
                    width={245}
                    height={245}
                    className="absolute bottom-[-35px] md:bottom-[-40px] -right-[30px] md:-right-[50px] w-[245px] h-[245px]"
                  />
                  {/* Capabilities List */}
                  <div className="px-[42px] pb-9 overflow-scroll max-h-[calc(100%-84px)] scrollbar-style">
                    <div className="space-y-4 ">
                      {cardSectionTwo?.map(
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
          className={`block sm:hidden md:mx-3 w-auto transition-all duration-700 bg-gradient-orange-3 rounded-2xl mt-5`}
        >
          {/* Accordion Header - Always Visible */}
          {cardSectionTwoTitle && (
            <button
              onClick={toggleAccordion}
              className="w-full py-3 px-[22px] flex justify-between items-center cursor-pointer"
            >
              <SubH2 className="text-white text-left md:text-center">{cardSectionTwoTitle}</SubH2>
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
          {cardSectionTwo?.length > 0 && (
            <div
              className={`transition-all duration-700 ease-in-out 
                ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"} 
                overflow-scroll  
                scrollbar-style
              `}
            >
              {/* Capabilities List */}
              <div className="px-[22px] pb-5 md:pb-9">
                <div className="space-y-2 md:space-y-4">
                  {cardSectionTwo?.map(
                    (capability, index) =>
                      capability?.title && (
                        <div key={index} className="flex items-start gap-3">
                          <Image
                            src="/images/star.png"
                            alt="check-icon"
                            width={16}
                            height={16}
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
    </section>
  );
};

export default ProductPortfolio;
