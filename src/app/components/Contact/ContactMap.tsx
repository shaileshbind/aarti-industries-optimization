import React from "react";
import { BodyText2, H2, SubH3 } from "../Typography2";
import Image from "next/image";
import { ContactMapProps } from "@/app/types/contact.type";

const ContactMap = ({ data, data2 }: ContactMapProps) => {
  const { title, image, mobImage } = data;
  return (
    <div className="my-[50px] lg:my-[100px]">
      {title && (
        <H2 className="max-w-[unset] lg:max-w-[550px] text-center mx-auto mb-[30px] lg:mb-[60px]">
          {title}
        </H2>
      )}
      <div className="relative container mx-auto w-full h-[180px] lg:h-[600px]">
        {image?.url && (
          <Image
            src={image?.url}
            alt="img"
            fill
            className="absolute object-contain hidden lg:block"
          />
        )}
        {mobImage?.url && (
          <Image
            src={mobImage?.url}
            alt="img"
            fill
            className="absolute object-contain block lg:hidden"
          />
        )}
      </div>
      <div className="block lg:hidden">
        <div className="grid gap-y-[42px] mt-[50px] container">
          {data2?.map((items, index) => {
            return (
              <div key={index}>
                <div className="text-white bg-gradient-orange-1 w-fit px-[24px] py-[6px] rounded-full text-[12px] uppercase">
                  {items?.officeLabel}
                </div>
                <SubH3 className="mt-[10px]">{items?.regionName}</SubH3>
                <BodyText2 className="mt-[6px]">{items?.companyName}</BodyText2>
                <BodyText2>{items?.address}</BodyText2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
