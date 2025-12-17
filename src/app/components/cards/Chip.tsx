import Image from "next/image";
import { BodyText2 } from "../Typography2";

type ChipProps = {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  transparent?: boolean;
};

const Chip = ({ imageSrc, imageAlt, title, transparent }: ChipProps) => {
  return (
    <>
      {transparent ? (
        <div className={` bg-white/10 px-[18px] py-[8px] rounded-[40px]`}>
          <BodyText2 className="text-white text-[12px] lg:text-[16px]">
            {title}
          </BodyText2>
        </div>
      ) : (
        <div className="bg-[#eff3f5] flex gap-x-[8px] px-[20px] py-[10px] items-center rounded-[40px]">
          {imageSrc && (
            <div className="h-[17px] lg:h-[20px]  w-[25px] lg:w-[30px] max-w-[40px] lg:max-w-[60px] relative ">
              <Image
                src={imageSrc}
                alt={imageAlt ? imageAlt : "img"}
                fill
                className="object-contain"
              />
            </div>
          )}
          <BodyText2 className="text-[12px] lg:text-[16px]">{title}</BodyText2>
        </div>
      )}
    </>
  );
};

export default Chip;
