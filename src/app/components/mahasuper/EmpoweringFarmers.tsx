"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BodyText2, H2, H3, BodyText3, BodyText1 } from "../Typography2";
import { EmpoweringFarmersProps } from "@/app/types/mahasuper.type";
import clsx from "clsx";
import GeneralPopup from "../Popups/GeneralPopup";
import { FadeInReveal } from "../ScrollReveal";

const EmpoweringFarmers: React.FC<EmpoweringFarmersProps> = ({ data }) => {
  const { title, description, states, subtitle, stats, ctaTitle, image, bottomText } = data;
  const [showGeneralPopup, setshowGeneralPopup] = useState<boolean>(false);
  return (
    <section className="pb-[72px] overflow-hidden  ">
      <div className="container">
        <div className="grid grid-cols-12 w-full items-center">
          <FadeInReveal className=" xl:col-span-6 col-span-12 xl:pr-20">
            <div className="flex flex-col gap-2">
              {title && <H3>{title}</H3>}
              {description && (
                <BodyText2 className="text-grey-400 mt-2">
                  {description}
                </BodyText2>
              )}
              {states && (
                <ul className="flex flex-col gap-2 mt-5">
                  {states.map((state, index) => (
                    <li
                      key={index}
                      className={clsx(
                        "flex items-center gap-2 font-light mb-1",
                        // index == 0 ? "text-orange-200" : ""
                      )}
                    >
                      <i className="w-[18px] h-[18px] rounded-full bg-orange-100 border-[4px] border-[#F9C095]"></i>
                      {state.title}
                    </li>
                  ))}
                </ul>
              )}
              {subtitle && (
                <BodyText1 className="text-blue-100 mt-11">
                  {subtitle}
                </BodyText1>
              )}
              {stats && (
                <ul className="grid grid-cols-2 gap-2 mt-3 max-w-[620px]">
                  {stats.map((stat) => (
                    <li
                      key={stat.id}
                      className="flex flex-col gap-2 bg-grey-100 p-5 rounded-2xl"
                    >
                      <H2 className="text-orange-100 !text-[40px] md:!text-[60px]">
                        {stat.value}
                      </H2>
                      <BodyText3 className="text-[14px] text-[#4C5861]">
                        {stat.description}
                      </BodyText3>
                    </li>
                  ))}
                </ul>
              )}
              {bottomText && (
                <BodyText2 className="text-grey-400 mt-[20px] md:mt-[40px]">
                  {bottomText}
                </BodyText2>
              )}
              {ctaTitle && (
                <button
                  onClick={() => {
                    setshowGeneralPopup(true);
                  }}
                  className={`animated-underline w-fit mt-[16px] cursor-pointer text-orange-200 text-[16px] font-normal leading-[100% font-alte-hans underline underline-offset-[4px] [text-underline-position:under]`}
                >
                  {ctaTitle || "Read More"}
                </button>
              )}
            </div>
          </FadeInReveal>
          <FadeInReveal delay={0.4} className=" xl:col-span-6 col-span-12 mt-20 xl:mt-0">
            {image && (
              <Image
                src={image.url}
                alt={image.alternativeText ?? 'img'}
                width={685}
                height={779}
              />
            )}
          </FadeInReveal>
        </div>
      </div>
      <GeneralPopup
        isOpen={showGeneralPopup}
        setshowGeneralPopup={setshowGeneralPopup}
        prefillCategory=""
        prefillSubCategory=""
      />
    </section>
  );
};

export default EmpoweringFarmers;
