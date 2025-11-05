import React from "react";
import type { FC } from "react";
import Image from "next/image";
import { BodyText1, BodyText2, H2 } from "../Typography2";
import Button from "../Button";

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
        <div className="relative w-full h-[400px] overflow-hidden rounded-[1rem] flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imgSrc}
              alt={imgAlt ? imgAlt : "img"}
              fill
              className="object-cover scale-110"
            />
            <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
            <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[90%] h-[90%]">
              <Image
                src={imgSrc}
                alt={imgAlt ? imgAlt : "img"}
                fill
                className="object-cover scale-110"
              />
            </span>
          </div>
          {title && (
            <h2 className="absolute text-3xl font-medium text-white z-10">
              {title}
            </h2>
          )}
        </div>

        {description && (
          <BodyText1 className="mt-[20px]">{description}</BodyText1>
        )}

        <div className="flex gap-6 lg:gap-12 mt-6 mb-[36px]">
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
      <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center flex-shrink-0 rounded-lg">
        <div className="relative w-full h-[500px] overflow-hidden rounded-[1rem] flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imgSrc}
              alt={imgAlt ? imgAlt : "img"}
              fill
              className="object-cover scale-110"
            />
            <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
            <span className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[90%] h-[90%]">
              <Image
                src={imgSrc}
                alt={imgAlt ? imgAlt : "img"}
                fill
                className="object-cover scale-110"
              />
            </span>
          </div>
          {title && (
            <h2 className="absolute text-4xl font-medium text-white z-10">
              {title}
            </h2>
          )}
        </div>

        <div>
          {description && <BodyText1>{description}</BodyText1>}
          {values?.length ? (
            <div className="flex gap-6 lg:gap-12 my-8">
              {values.map((stat, idx) => (
                <div key={idx}>
                  {stat?.value && (
                    <H2 className="text-orange-200">{stat.value}</H2>
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
