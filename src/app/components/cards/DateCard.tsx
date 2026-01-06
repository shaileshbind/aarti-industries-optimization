import Image from "next/image";
import Link from "next/link";
import { SubH3 } from "../Typography2";

type DateCardProps = {
  link?: string;
  imageSrc?: string;
  imageAlt?: string;
  date?: string;
  desc?: string;
  animate?: boolean;
  useTargetBlank?: boolean;
};

const DateCard = ({
  link,
  imageAlt,
  imageSrc,
  date,
  desc,
  animate,
  useTargetBlank = true,
}: DateCardProps) => {
  const CardContent = () => (
    <>
      {animate ? (
        <div className="group relative inverted-radius transition-all duration-500 ease-in-out">
          <div className="relative group-hover:rounded-[20px] transition-all duration-300 rounded-[10px] w-full h-[190px] lg:h-[230px] overflow-hidden z-[2]">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt ? imageAlt : "img"}
                fill
                className="object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-[1.1]"
              />
            )}
          </div>
          <SubH3 className="mt-[16px] font-roboto text-[14px] leading-[140%] font-normal text-orange-200">
            {date}
          </SubH3>
          <div className="mt-[8px] font-roboto text-[16px] leading-[156%] font-normal text-grey-400 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
            {desc}
          </div>
        </div>
      ) : (
        <div className="group relative transition-all duration-300">
          <div className="relative  transition-all duration-300 rounded-[10px] w-full h-[230px] overflow-hidden z-[2]">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt ? imageAlt : "img"}
                fill
                className="object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-[1.1]"
              />
            )}
          </div>
          <div className="mt-[16px] font-roboto text-[14px] leading-[140%] font-normal text-orange-200">
            {date}
          </div>
          <div className="mt-[8px] font-roboto text-[16px] leading-[156%] font-normal text-grey-400">
            {desc}
          </div>
        </div>
      )}
    </>
  );

  return link ? (
    <Link
      href={link}
      target={useTargetBlank ? "_blank" : "_self"}
      className="block cursor-pointer group"
    >
      {animate && (
        <div className="absolute  opacity-0 group-hover:opacity-100 right-3 scale-0 group-hover:scale-100 top-4 z-[2] w-12 h-12  place-items-center transition-all duration-500 pointer-events-none hidden lg:block">
          <Image
            src={"/images/arrow-up-right-o.svg"}
            alt={"arrow"}
            width={24}
            height={24}
          />
        </div>
      )}
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  );
};

export default DateCard;
