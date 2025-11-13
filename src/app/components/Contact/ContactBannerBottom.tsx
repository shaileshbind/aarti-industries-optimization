import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cta, SubH1 } from "../Typography2";
import { FadeInReveal } from "../ScrollReveal";
import { ButtonProps } from "@/app/types/global.type";

type ContactBannerBottomProps = {
  data: {
      title: string;
      ctaButton: ButtonProps;
  };
};
const ContactBannerBottom = ({ data }: ContactBannerBottomProps) => { 
  console.log("datacontactbannerbottom", data);  
  // const exploreMore = data;
  console.log("exploreMore", data);
  return (
    <div className="container">
      <FadeInReveal>
        <div className="relative  w-full min-h-[186px] md:min-h-[158px] max-w-[full] lg:max-w-[920px] mx-auto rounded-[14px] md:rounded-[20px] py-[30px] md:py-[37px] px-[28px] md:px-[40px]  grid md:flex justify-between items-center gap-y-[24px] bg-gradient-orange-1 overflow-hidden">
          <Image
            src="/images/home/flower-t.svg"
            alt="img"
            width={217}
            height={217}
            className="absolute bottom-[-48px] md:bottom-[20px] -right-[35px] -md:right-[50px] w-[155px] h-[155px] md:w-[217px] md:h-[217px]"
          />

          {data?.title && (
            <FadeInReveal delay={0.2} className="w-full ">
              <SubH1 className="text-white">{data?.title}</SubH1>
            </FadeInReveal>
          )}

          {data?.ctaButton?.title && (
            <FadeInReveal delay={0.2}>
              <Link href={data?.ctaButton?.link || "#"} target="_blank">
                <div className="bg-white button-subtle-scale rounded-[6px] py-[14px] px-[22px] h-[47px]  cursor-pointer relative z-10">
                  <Cta className="text-orange-200  whitespace-nowrap">
                    {data?.ctaButton?.title}
                  </Cta>
                </div>
              </Link>
            </FadeInReveal>
          )}
        </div>
      </FadeInReveal>
    </div>
  );
};

export default ContactBannerBottom;
