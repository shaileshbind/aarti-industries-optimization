import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
  link?: string;
  imageSrc?: string;
  imageAlt?: string;
  date?: string;
  desc?: string;
  animate?: boolean;
  useTargetBlank?: boolean;
  icon?: string;
  tag?: string;
};

const NewsCard = ({
  link,
  imageAlt,
  imageSrc,
  date,
  desc,
  animate,
  useTargetBlank = true,
  icon,
  tag,
}: NewsCardProps) => {
  const CardContent = () => (
    <>
      {animate ? (
        <>
          <div className="group relative inverted-radius transition-all duration-300 ">
            <div className="relative group-hover:rounded-[20px] transition-all duration-300 rounded-[10px] w-full h-[190px] lg:h-[230px] overflow-hidden z-[2] border-[1px] border-gray-300 ">
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt={imageAlt ? imageAlt : "img"}
                  fill
                  className="object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-[1.1]"
                />
              )}
            </div>
          </div>
          <div className="flex mt-[16px] gap-x-[14px] items-center">
            {tag && (
              <div className="flex gap-x-[10px]">
                {icon && (
                  <Image
                    src={icon}
                    alt="icon"
                    width={14}
                    height={14}
                    className="object-contain"
                  />
                )}
                {tag && (
                  <div className="font-roboto text-[12px] leading-[160%] font-normal text-grey-400 uppercase">
                    {tag}
                  </div>
                )}
              </div>
            )}
            {tag && date && (
              <div className="rounded-full w-[6px] h-[6px] bg-grey-300" />
            )}
            {date && (
              <div className="font-roboto text-[14px] leading-[140%] font-normal text-orange-200">
                {date}
              </div>
            )}
          </div>
          <div className="mt-[8px] mb-1 font-roboto text-[16px] leading-[156%] font-normal text-grey-400">
            {desc}
          </div>
        </>
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
          <div className="mt-[8px] font-roboto text-[16px] leading-[156%] font-normal text-grey-400 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
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
      className="block cursor-pointer"
    >
      {animate && (
        <div className="absolute right-3 top-2 z-[2] w-12 h-12 grid place-items-center transition-all duration-500 pointer-events-none">
          <Image
            src="/images/arrow-up-right-o.svg"
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

export default NewsCard;
