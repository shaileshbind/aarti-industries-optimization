"use client";
import { useState } from "react";
import Image from "next/image";
import { Cta, SubH2 } from "../Typography2";
import Link from "next/link";
import { ButtonProps } from "@/app/types/global.type";
import GeneralPopup from "../Popups/GeneralPopup";

type ExploreCardProps = {
  title?: string;
  ctaButton?: ButtonProps[];
  lightVariant?: boolean;
  formTitle?: string;
};

const ExploreCard = ({
  title,
  ctaButton,
  lightVariant,
  formTitle,
}: ExploreCardProps) => {
  const imageSize = 20;
  const [showGeneralPopup, setshowGeneralPopup] = useState<boolean>(false);

  return (
    <>
      <div
        className={`relative w-full min-h-[100px] lg:min-h-[unset] rounded-[16px] lg:rounded-[20px] py-5 px-6 lg:py-7 lg:px-9 overflow-hidden ${
          lightVariant ? "bg-orange-300" : "bg-orange-200"
        } `}
      >
        <Image
          src="/images/home/flower-t.svg"
          alt="img"
          width={151}
          height={151}
          className="absolute top-[-35px] md:top-[-40px] -right-[18px] md:-right-[30px] w-[93px] h-[93px] md:w-[151px] md:h-[151px]"
        />
        <SubH2 className="text-white w-[80%]">{title}</SubH2>
          <div className="mt-[10px] lg:mt-[22px] flex flex-col md:flex-row gap-[12px] xl:gap-x-[50px]">
            {formTitle && (
              <div
                onClick={() => {
                  setshowGeneralPopup(true);
                }}
                className="flex gap-x-[12px] items-center cursor-pointer group"
              >
                <Cta className="bg-transparent text-white text-[14px] lg:text-[16px]">
                  {formTitle}
                </Cta>
                <div
                  className={`relative flex items-center justify-center 
                            w-[24px] h-[24px]  lg:w-[30px] lg:h-[30px] rounded-full 
                              border border-white overflow-hidden`}
                >
                  <Image
                    src="/images/arrow-up-right-w.svg"
                    alt="icon-primary"
                    width={imageSize}
                    height={imageSize}
                    className={`absolute transition-transform duration-500 ease-in-out 
                               w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] 
                               group-hover:translate-x-[187.5%] group-hover:-translate-y-[187.5%] 
                               lg:group-hover:translate-x-[150%] lg:group-hover:-translate-y-[150%]`}
                  />
                  <Image
                    src="/images/arrow-up-right-w.svg"
                    alt="icon-secondary"
                    width={imageSize}
                    height={imageSize}
                    className={`absolute transition-transform duration-500 ease-in-out 
                               w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] 
                               translate-x-[-187.5%] translate-y-[187.5%] 
                               group-hover:translate-x-0 group-hover:translate-y-0
                               lg:translate-x-[-150%] lg:translate-y-[150%] 
                               lg:group-hover:translate-x-0 lg:group-hover:translate-y-0`}
                  />
                </div>
              </div>
            )}
            {ctaButton?.map((item) => {
              if (!item?.link?.link && !item?.hasExternalLink) return null;
              return (
                <Link
                  href={`${
                    item?.hasExternalLink == "true"
                      ? item?.externalLink
                      : item?.link?.link
                  }`}
                  target={
                    item?.hasExternalLink === "true" ? "_blank" : undefined
                  }
                  key={item?.title}
                  className="flex gap-x-[12px] items-center cursor-pointer group"
                >
                  {item?.title && (
                    <Cta className="bg-transparent text-white text-[14px] lg:text-[16px]">
                      {item?.title}
                    </Cta>
                  )}
                  <div
                    className={`relative flex items-center justify-center 
                            w-[24px] h-[24px]  lg:w-[30px] lg:h-[30px] rounded-full 
                              border border-white overflow-hidden`}
                  >
                    <Image
                      src="/images/arrow-up-right-w.svg"
                      alt="icon-primary"
                      width={imageSize}
                      height={imageSize}
                      className={`absolute transition-transform duration-500 ease-in-out 
                               w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] 
                               group-hover:translate-x-[187.5%] group-hover:-translate-y-[187.5%] 
                               lg:group-hover:translate-x-[150%] lg:group-hover:-translate-y-[150%]`}
                    />
                    <Image
                      src="/images/arrow-up-right-w.svg"
                      alt="icon-secondary"
                      width={imageSize}
                      height={imageSize}
                      className={`absolute transition-transform duration-500 ease-in-out 
                               w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] 
                               translate-x-[-187.5%] translate-y-[187.5%] 
                               group-hover:translate-x-0 group-hover:translate-y-0
                               lg:translate-x-[-150%] lg:translate-y-[150%] 
                               lg:group-hover:translate-x-0 lg:group-hover:translate-y-0`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
      </div>
      {showGeneralPopup && (
        <GeneralPopup
          isOpen={showGeneralPopup}
          setshowGeneralPopup={setshowGeneralPopup}
        />
      )}
    </>
  );
};

export default ExploreCard;
