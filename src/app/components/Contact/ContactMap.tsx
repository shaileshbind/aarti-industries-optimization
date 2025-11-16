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
      <div className="relative container mx-auto w-full">
        {image?.url && (
          <Image
            src={image?.url}
            alt="img"
            width={1265}
            height={623}
            className="w-full h-auto block lg:hidden"
          />
        )}
        {mobImage?.url && (
          <Image
            src={mobImage?.url}
            alt="img"
            width={365}
            height={180}
            className="w-full h-auto hidden lg:block"
          />
        )}
      </div>
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[42px] gap-y-[42px] mt-[50px] container">
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
