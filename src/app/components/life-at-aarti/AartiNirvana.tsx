/* eslint-disable @typescript-eslint/no-explicit-any */
import { BodyText1, H2, SubH2 } from "../Typography2";
import Image from "next/image";
import NirvanaCard from "../cards/NirvanaCard";
import {
  LAANirvanaProps,
} from "@/app/types/life-at-aarti.type";
import ImageGallery from "../ImageGallery";

type Props = {
  data: LAANirvanaProps;
  dataImg: any;
};

const AartiNirvana = ({ data,
   dataImg 
  }: Props) => {
  const { title, description, cards } = data;

  return (
    <div>
      {title && (
        <H2 className="max-w-[600px] mx-[20px] lg:mx-auto text-left lg:text-center">
          {title}
        </H2>
      )}
      {description && (
        <BodyText1 className="mt-[10px] lg:mt-[6px] max-w-[730px] mx-[20px] lg:mx-auto text-left lg:text-center">
          {description}
        </BodyText1>
      )}
      {/* desktop only */}
      <div className="hidden md:grid mt-[30px] lg:mt-[48px] grid-cols-2 lg:grid-cols-4 gap-[6px] max-w-[1024px] mx-auto">
        {cards?.map((items) => {
          return (
            <NirvanaCard
              key={items?.id}
              grey={items?.hasGreyBackgroung === "true" ? true : false}
              image={items?.image?.url}
              mobImage={items?.image?.url}
              icon={items?.icon?.url}
              desc={items?.description}
              flipImg={items?.flipImage?.url}
            />
          );
        })}
      </div>
      {/* mobile only */}
      <div className="block md:hidden">
        <div className="mt-[30px] container">
          {cards
            ?.filter((item) => item?.description)
            ?.map((items, index) => (
              <div
                key={items?.id ?? index}
                className="bg-[#EFF3F5] rounded-[14px] px-[20px] py-[24px] mb-[17px]"
              >
                {items?.mobImage?.url && (
                  <Image
                    src={items?.mobImage?.url}
                    height={40}
                    width={40}
                    alt="icon"
                    className="h-[40px] w-[40px] object-contain"
                  />
                )}
                <SubH2 className="mt-[30px] text-grey-400 text-[14px]">
                  {items?.description}
                </SubH2>
              </div>
            ))}
        </div>
        <div className="mt-[60px]">
          {dataImg && <ImageGallery imgArr={dataImg} />}
        </div>
      </div>
    </div>
  );
};

export default AartiNirvana;
