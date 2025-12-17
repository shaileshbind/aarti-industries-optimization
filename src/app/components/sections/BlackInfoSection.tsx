import Image from "next/image";
import { BodyText1, H2 } from "../Typography2";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";

type BlackInfoSectionProps = {
  image?: string;
  mobImage?: string;
  alt?: string;
  mobAlt?: string;
  title?: string;
  description?: string;
  ctaTitle?: string;
  ctaLink?: string;
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
}: BlackInfoSectionProps) => {
  return (
    <>
      {mobImage && (
        <div className="rounded-[14px] overflow-hidden mb-[20px] h-[240px] md:h-[340px] relative block lg:hidden mx-[20px]">
          <Image
            src={mobImage}
            alt={mobAlt ? mobAlt : "banner"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 " />
        </div>
      )}
      <div className="w-full relative lg:h-[calc(100vh-70px)]">
        {image && (
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={alt ? alt : "banner"}
              fill
              className="hidden lg:block object-top object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
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
          <div className="grid mt-[12px] lg:mt-[90px] xl:justify-end">
            <FadeInReveal>
              {description && (
                <BodyText1 className="xl:max-w-[620px] 2xl:max-w-[850px] text-grey-400 lg:text-white  2xl:!text-[24px] ">
                  {description}
                </BodyText1>
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
