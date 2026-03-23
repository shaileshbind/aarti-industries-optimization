"use client";

import Image from "next/image";
import { BodyText2, H2 } from "../Typography2";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";
import ParallaxImage from "../ParallaxImage";
import clsx from "clsx";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

type BlackInfoSectionProps = {
  image?: string;
  mobImage?: string;
  alt?: string;
  mobAlt?: string;
  title?: string;
  description?: string;
  ctaTitle?: string;
  ctaLink?: string;
  overlayClassName?: string;
};

const BlackInfoSection = ({
  image,
  mobImage,
  alt,
  mobAlt,
  title,
  description,
  ctaTitle,
  ctaLink,
  overlayClassName,
}: BlackInfoSectionProps) => {

  const isTablet = useMatchMedia("(max-width:1024px)");
  console.log(isTablet);
  return (
    <>
      {mobImage && isTablet && (
        <div className="rounded-[14px] overflow-hidden mb-[20px] relative block lg:hidden mx-[20px]">
          <Image
            src={mobImage}
            alt={mobAlt ? mobAlt : "banner"}
            width={400}
            height={220}
            className="object-cover w-full "
          />
          {/* <div className="absolute inset-0 bg-black/20 " /> */}
        </div>
      )}
      <div className="w-full relative lg:h-[calc(100vh-70px)]">
        {image && !isTablet && (
          <div className="relative w-full h-full">
            <ParallaxImage
              src={image}
              alt={alt ? alt : "banner"}
              className="hidden lg:block w-full h-full object-cover z-0 px-[20px] lg:px-0 rounded-[50px] lg:rounded-[0px]"
            />
            <div
              className={clsx(
                `absolute inset-0 bg-black/20 hidden lg:block `,
                overlayClassName,
              )}
            />
          </div>
        )}
        <div className="lg:absolute w-full lg:py-[80px] px-[20px] lg:px-[60px] top-0 flex flex-col justify-between h-full">
          {title && (
            <FadeInReveal>
              <H2 className="text-[#002F50] lg:text-white max-w-[unset] lg:max-w-[648px]">
                {title}
              </H2>
            </FadeInReveal>
          )}
          <div className="grid mt-[12px] lg:mt-[90px] xl:justify-end w-full lg:max-w-[540px] ml-auto">
            <FadeInReveal>
              {description && (
                <BodyText2 className="lg:max-w-[540px] text-grey-400 lg:text-[#F7F9FA]">
                  {description}
                </BodyText2>
              )}
              {ctaLink && ctaTitle && (
                <div className="mt-[28px] lg:mt-[38px]">
                  <Button title={ctaTitle} href={ctaLink ? ctaLink : "#"} />
                </div>
              )}
            </FadeInReveal>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlackInfoSection;
