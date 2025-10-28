import Image from "next/image";
import React from "react";
import { BodyText1, H2 } from "../Typography2";
import { CDMOSafegreenProps } from "@/app/types/cdmo.type";

const CDMOSafegreen: React.FC<CDMOSafegreenProps> = ({ data }) => {
  const { title, description, image } = data?.[0];

  return (
    <section className="flex lg:flex-row flex-col justify-between lg:py-[100px] py-[50px] pl-[20px] lg:pl-[60px]">
      <div className="w-full lg:w-[43%] flex flex-col items-start justify-center pr-[20px] lg:pr-0">
        {title && <H2>{title}</H2>}

        {description && (
          <BodyText1 className="pt-3 pb-3">{description}</BodyText1>
        )}
      </div>

      <div className="w-full lg:w-1/2 pr-[20px] lg:pr-0 mt-10 lg:mt-0">
        <div className="order-1 lg:order-2 relative h-[317px] lg:h-[640px] w-full overflow-hidden ">
          <div
            className={`absolute right-0 top-0 min-h-[317px] lg:min-h-[640px] w-[100%] lg:w-full rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] `}
          >
            {image?.url && (
              <Image
                src={image?.url}
                alt={image?.alternativeText || "green-banner"}
                fill
                className="absolute object-cover opacity-40 rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] "
              />
            )}

            <Image
              src={image?.url}
              alt={image?.alternativeText || "green-banner"}
              width={500}
              height={548}
              className="absolute object-cover rounded-tl-[20px] lg:rounded-tl-[30px]  h-[calc(100%-71px)] lg:h-[calc(100%-93px)] w-[calc(100%-71px)] lg:w-[calc(100%-210px)]"
            />
            <Image
              src="/images/home/star-white.svg"
              alt="img"
              width={72}
              height={72}
              className="absolute top-[-36px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
            />
            <Image
              src="/images/home/star-white.svg"
              alt="img"
              width={72}
              height={72}
              className="absolute bottom-[50px] lg:bottom-[57px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
            />
            <div className="absolute min-h-screen bg-white w-[1px] right-[71px] lg:right-[209.5px]" />
            <div className="absolute w-full bg-white bottom-[71px] lg:bottom-[92.5px] h-[1px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CDMOSafegreen;
