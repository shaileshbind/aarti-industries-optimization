import { FC } from "react";
import Image from "next/image";
import { BodyText1, BodyText2, H2, SubH1 } from "../Typography2";
import Button from "../Button";
import clsx from "clsx";
import { ButtonProps } from "@/app/types/global.type";

interface SliderValue {
  value?: string;
  description?: string;
}

interface bulletProp {
  id?: number;
  title?: string;
}

interface SliderCardProps {
  imgSrc: string;
  imgAlt?: string;
  title?: string;
  heading?: string;
  description?: string;
  values?: SliderValue[];
  ctaButton?: ButtonProps;
  bullets?: bulletProp[];
  imageWrapperRef?: React.RefObject<HTMLDivElement>;
  index?: number;
}

const SliderCard: FC<SliderCardProps> = ({
  imgSrc,
  imgAlt,
  title,
  heading,
  description,
  values,
  ctaButton,
  bullets,
  index,
}) => {
  return (
    <>
      {/* Mobile Version */}
      <div className="lg:hidden">
        <div
          className={clsx(
            "relative w-full pt-[60%] h-[250px] lg:h-[300px] mb-[10px] lg:mb-[unset]",
            "overflow-hidden rounded-[1rem] flex items-center justify-center"
          )}
        >
          <div className="absolute inset-0 overflow-hidden">
            {imgSrc && (
              <Image
                src={imgSrc}
                alt={imgAlt ? imgAlt : "img"}
                fill
                className="object-cover scale-110"
              />
            )}
            <div className="absolute inset-0 bg-black/40 z-[1]" />

            <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md bg-black/10"></i>
            <span className="absolute bottom-0 left-2 rounded-br-[400px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[90%] md:w-full h-full -ml-2 lg:-ml-6">
              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt={imgAlt ? imgAlt : "img"}
                  fill
                  className="object-cover scale-110"
                />
              )}
            </span>
          </div>
          {title && (
            <h2 className="absolute top-1/2 -translate-y-1/2 w-full text-center text-3xl font-medium text-white z-10">
              {title}
            </h2>
          )}
        </div>
        {heading && (
          <SubH1 className="lg:mb-[14px] mt-[14px] lg:mt-[unset]">
            {heading}
          </SubH1>
        )}
        {description && (
          <BodyText1 className="mt-[20px] lg:mt-[20px]">
            {description}
          </BodyText1>
        )}
        {bullets && (
          <div className="mt-[16px] lg:mt-[18px]">
            {bullets?.map((bp: bulletProp) => (
              <div
                key={bp?.id}
                className="mb-[10px] flex gap-x-[10px] items-start"
              >
                <Image
                  src="/images/star-orange.svg"
                  alt="icon"
                  width={14}
                  height={14}
                  className="mt-[5px]"
                />
                <BodyText2>{bp?.title}</BodyText2>
              </div>
            ))}
          </div>
        )}
        <div className="gap-9 md:gap-[1%] mt-[10px] lg:mt-6  mb-[20px] lg:mb-[36px] flex-wrap text-[26px]  grid grid-cols-2 items-start gap-y-5 md:gap-y-[10px]">
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
        {ctaButton?.title &&
          ctaButton?.link?.link &&
          ctaButton?.hasExternalLink && (
            <Button
              title={ctaButton?.title}
              href={
                ctaButton?.hasExternalLink == "true"
                  ? ctaButton?.externalLink
                  : ctaButton?.link?.link
              }
              secondary
            />
          )}
      </div>
      {/* Desktop Version */}
      <div className="hidden lg:flex  gap-12 items-center flex-shrink-0 rounded-lg pr-10">
        <div className="relative w-[40%]   overflow-hidden rounded-[1rem] flex items-center justify-center">
          <div className={`w-full pt-[100%] relative ${index != 0 ? 'sliderStagger' : ''}`}>
            <div className="absolute w-full h-full top-0 left-0 overflow-hidden! rounded-[20px]!">
              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt={imgAlt ? imgAlt : "img"}
                  fill
                  className="object-cover scale-110"
                />
              )}
              <div className="absolute inset-0 bg-black/30 z-[1] rounded-lg" />

              <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
              <span className="absolute bottom-0 left-2 rounded-br-[400px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-full h-full -ml-6">
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={imgAlt ? imgAlt : "img"}
                    fill
                    className="object-cover scale-110"
                  />
                )}
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
          {heading && <SubH1 className="mb-[14px] sliderStagger">{heading}</SubH1>}
          {description && <BodyText1 className="sliderStagger">{description}</BodyText1>}
          {bullets && (
            <div className="mt-[18px]">
              {bullets?.map((bp: bulletProp) => (
                <div
                  key={bp?.id}
                  className="mb-[10px] flex gap-x-[10px] items-start sliderStagger"
                >
                  <Image
                    src="/images/star-orange.svg"
                    alt="icon"
                    width={14}
                    height={14}
                    className="mt-[5px]"
                  />
                  <BodyText2>{bp?.title}</BodyText2>
                </div>
              ))}
            </div>
          )}
          {values?.length ? (
            <div className=" gap-6 lg:gap-5 my-8 grid grid-cols-3 items-start gap-x-[10px] sliderStagger">
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
          {ctaButton?.title &&
            ctaButton?.link?.link &&
            ctaButton?.hasExternalLink && (
              <Button
                title={ctaButton?.title}
                className="sliderStagger"
                href={
                  ctaButton?.hasExternalLink == "true"
                    ? ctaButton?.externalLink
                    : ctaButton?.link?.link
                }
                secondary
              />
            )}
        </div>
      </div>
    </>
  );
};

export default SliderCard;
