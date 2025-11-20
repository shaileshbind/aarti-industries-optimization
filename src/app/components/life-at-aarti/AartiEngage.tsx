import React from "react";
import { BodyText1, H2 } from "../Typography2";
import Image from "next/image";
import { LAAEngageProps } from "@/app/types/life-at-aarti.type";

const AartiEngage = ({ data }: LAAEngageProps) => {
  const { title, description, image, mobImage } = data;
  return (
    <div className="py-[72px] lg:py-[120px]">
      {title && (
        <H2 className="max-w-[520px] mx-[20px] lg:mx-auto text-center">
          {title}
        </H2>
      )}
      {description && (
        <BodyText1 className="mt-[10px] lg:mt-[6px] max-w-[650px] mx-[20px] lg:mx-auto text-center">
          {description}
        </BodyText1>
      )}
      <div className="mt-[44px] lg:mt-[60px] mx-[20px]">
        <div className="w-full h-[200px] lg:h-[600px] relative">
          {image?.url && (
            <Image
              src={image?.url}
              alt={image?.alternativeText ? image?.alternativeText : "img"}
              fill
              className="object-contain hidden lg:block"
            />
          )}
          {mobImage?.url && (
            <Image
              src={mobImage?.url}
              alt={
                mobImage?.alternativeText ? mobImage?.alternativeText : "img"
              }
              fill
              className="object-contain block lg:hidden"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AartiEngage;
