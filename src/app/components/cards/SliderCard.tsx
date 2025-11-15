import React from "react";
import type { FC } from "react";
import Image from "next/image";
import { BodyText1, BodyText2, H2 } from "../Typography2";
import Button from "../Button";
import clsx from "clsx";

interface SliderValue {
  value?: string;
  description?: string;
}

interface CTAButton {
  title?: string;
  link?: string;
}

interface SliderCardProps {
  imgSrc: string;
  imgAlt?: string;
  title?: string;
  description?: string;
  values?: SliderValue[];
  ctaButton?: CTAButton;
}

const SliderCard: FC<SliderCardProps> = ({
  imgSrc,
  imgAlt,
  title,
  description,
  values,
  ctaButton,
}) => {
  return (
    <>
      {/* Mobile Version */}
      <div className="lg:hidden">
        <div
          className={clsx(
            "relative w-full pt-[60%] h-[300px]",
            "overflow-hidden rounded-[1rem] flex items-center justify-center"
          )}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imgSrc}
              alt={imgAlt ? imgAlt : "img"}
              fill
              className="object-cover scale-110"
            />
            <div className="absolute inset-0 bg-black/40 z-[1]" />

            <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
            <span className="absolute bottom-0 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-full h-full -ml-6">
              <Image
                src={imgSrc}
                alt={imgAlt ? imgAlt : "img"}
                fill
                className="object-cover scale-110"
              />
            </span>
          </div>
          {title && (
            <h2 className="absolute top-1/2 -translate-y-1/2 w-full text-center text-3xl font-medium text-white z-10">
              {title}
            </h2>
          )}
        </div>

        {description && (
          <BodyText1 className="mt-[20px]">{description}</BodyText1>
        )}

        <div className="gap-[1%] mt-6 mb-[36px] flex-wrap text-[26px]  grid grid-cols-2 items-start gap-y-[10px]">
          {values?.map((stat, idx) => (
            <div key={idx}>
              {stat?.value && <H2 className="text-orange-200">{stat.value}</H2>}
              {stat?.description && (
                <BodyText2 className="text-grey-400 mt-[4px]">
                  {stat.description}
                </BodyText2>
              )}
            </div>
          ))}
        </div>

        {ctaButton?.title && (
          <Button
            title={ctaButton.title}
            href={ctaButton.link || "#"}
            secondary
          />
        )}
      </div>

      {/* Desktop Version */}
      <div className="hidden lg:flex  gap-12 items-center flex-shrink-0 rounded-lg pr-10">
        <div className="relative w-[40%]   overflow-hidden rounded-[1rem] flex items-center justify-center">
          <div className="w-full pt-[100%] relative">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={imgSrc}
                alt={imgAlt ? imgAlt : "img"}
                fill
                className="object-cover scale-110"
              />
              <div className="absolute inset-0 bg-black/30 z-[1]" />

              <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
              <span className="absolute bottom-0 left-2 rounded-br-[400px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-full h-full -ml-6">
                <Image
                  src={imgSrc}
                  alt={imgAlt ? imgAlt : "img"}
                  fill
                  className="object-cover scale-110"
                />
              </span>
            </div>

            {title && (
              <h2 className="absolute top-1/2 -translate-y-1/2 w-full text-center text-4xl font-medium text-white z-10">
                {title}
              </h2>
            )}
          </div>
        </div>

        <div className="w-[60%]">
          {description && <BodyText1>{description}</BodyText1>}
          {values?.length ? (
            <div className=" gap-6 lg:gap-5 my-8 grid grid-cols-3 items-start gap-x-[10px]">
              {values.map((stat, idx) => (
                <div key={idx}>
                  {stat?.value && (
                    <H2 className="text-orange-200 !text-[36px]">
                      {stat.value}
                    </H2>
                  )}
                  {stat?.description && (
                    <BodyText2 className="text-grey-400 mt-[5px]">
                      {stat.description}
                    </BodyText2>
                  )}
                </div>
              ))}
            </div>
          ) : null}

          {ctaButton?.title && (
            <Button
              title={ctaButton.title}
              href={ctaButton.link || "#"}
              secondary
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SliderCard;
