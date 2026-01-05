"use client";
import React from "react";
import AnimatedText from "../AnimatedText";
import { BodyText1, BodyText3, H2, SubH2 } from "../Typography2";
import Image from "next/image";
import { GlobalInnovationProps } from "@/app/types/our.story.type";
import Button from "../Button";
//import GeneralPopup from "../Popups/GeneralPopup";

const GlobalInnovation: React.FC<GlobalInnovationProps> = ({
  data,
  useBulletes = true,
}) => {
  const {
    title,
    focusSectionTitle,
    ctaButton,
    focus_item,
    image,
    description,
    sectionTitle,
   // formTitle,
  } = data;

//  const [showGeneralPopup, setshowGeneralPopup] = useState<boolean>(false);
  const displayImage = image?.url || "/images/cdmo/cdmo-driving-banner.png";
  const displayAlt = image?.alternativeText || "innovation-banner";

  return (
    <>
      <section className="fluid-container flex flex-col justify-between my-[60px] lg:my-[120px]">
        {sectionTitle && (
          <BodyText3 className="text-orange-200 !text-[18px] md:!text-[20px] !font-alte-hans mb-[6px]">
            {sectionTitle}
          </BodyText3>
        )}
        {/* Animated Heading */}
        <AnimatedText className="lg:w-[60%] w-full lg:mb-16 mb-10">
          <H2>{title}</H2>
        </AnimatedText>

      <div className="flex flex-col lg:flex-row justify-between items-start">
        {/* Image Section */}
        <div className="relative w-full h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden lg:w-[55%]">
          <div className="relative w-full pt-[100%]">
          <div className="absolute right-0 top-0 w-[100%] lg:w-full rounded-[20px] h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
            <Image
              src={displayImage}
              alt={displayAlt}
              fill
              className="absolute object-cover rounded-[20px]"
            />

            {/* Decorative overlays */}
            <div className="absolute left-0 object-cover backdrop-blur-lg rounded-tl-[20px] lg:rounded-tl-[20px] h-[calc(100%-40px)] lg:h-[calc(100%-93px)] w-[71px] lg:w-[155px]" />
            <div className="absolute bottom-0 right-0 object-cover backdrop-blur-lg lg:!rounded-[20px] lg:!rounded-tl-[0px] rounded-b-[20px] h-[40px] lg:h-[92.5px] w-full" />

            <Image
              src="/images/home/star-white.svg"
              alt="star-icon"
              width={72}
              height={72}
              className="absolute bottom-[20px] lg:bottom-[57px] z-10 left-[50px] lg:left-[120px] w-[42px] lg:w-[72px]"
            />
            <div className="absolute min-h-screen bg-white w-[1px] left-[71px] lg:left-[155px]" />
            <div className="absolute w-full bg-white bottom-[40px] lg:bottom-[92.5px] h-[1px]" />
          </div>
          </div>
        </div>

        {/* Focus Items */}
        <div className="lg:w-[40%] w-full flex flex-col gap-4 lg:gap-5 mt-[30px] lg:mt-0">
          {focusSectionTitle && (
            <SubH2 className="lg:mb-6 mb-2">{focusSectionTitle}</SubH2>
          )}

          {focus_item.map((item, index) =>
            useBulletes ? (
              <div
                key={item.id}
                className={`
                flex gap-6 lg:gap-[53px] 
                ${
                  index !== focus_item.length - 1
                    ? "border-b border-b-[#E6EBEE] lg:pb-5 pb-4"
                    : ""
                }
              `}
              >
                <BodyText1 className="text-[#DC4C03]">
                  {item.order.padStart(2, "0")}
                </BodyText1>
                <BodyText1 className="lg:w-[60%] text-[#4C5861]">
                  {item.description}
                </BodyText1>
              </div>
            ) : (
              <ul
                key={item.id}
                className={`
                flex gap-6 lg:gap-[53px] ml-5 
                ${
                  index !== focus_item.length - 1
                    ? "border-b border-b-[#E6EBEE] lg:pb-5 pb-4"
                    : ""
                }
              `}
              >
                <li className="lg:w-[60%] marker:text-[#DC4C03] list-disc pl-1 lg:pl-3 text-[#4C5861] text-[14px] md:text-[16px] xl:text-[18px]">
                  {item.description}
                </li>
              </ul>
            )
          )}

          {description && <BodyText1 className="lg:mt-[unset] mt-4">{description}</BodyText1>}

            {/* FORM CTA */}
            {/* {formTitle && (
              <button
                onClick={() => {
                  setshowGeneralPopup(true);
                }}
                className={`animated-underline w-fit cursor-pointer  text-[16px]
                      font-normal leading-[100%] font-alte-hans underline underline-offset-[4px]
                      [text-underline-position:under] text-white white-btn-underline`}
              >
                {formTitle}
              </button>
            )} */}
            {ctaButton?.title &&
              (ctaButton?.externalLink || ctaButton?.link?.link) && (
                <Button
                  secondary
                  title={ctaButton?.title}
                  href={
                    ctaButton?.hasExternalLink === "true"
                      ? ctaButton?.externalLink
                      : ctaButton?.link?.link
                  }
                />
              )}
          </div>
        </div>
      </section>
      {/* <GeneralPopup
        isOpen={showGeneralPopup}
        setshowGeneralPopup={setshowGeneralPopup}
      /> */}
    </>
  );
};

export default GlobalInnovation;
