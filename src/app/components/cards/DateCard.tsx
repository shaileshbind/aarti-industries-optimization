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
  showStatusTag?: boolean;
};

const getDateStatusLabel = (eventDate?: string) => {
  if (!eventDate) return null;

  const parsedEventDate = new Date(eventDate);
  if (Number.isNaN(parsedEventDate.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDay = new Date(parsedEventDate);
  eventDay.setHours(0, 0, 0, 0);

  if (today.getTime() > eventDay.getTime()) return "Past";
  if (today.getTime() < eventDay.getTime()) return "Upcoming";
  return "Today";
};

const DateCard = ({
  link,
  imageAlt,
  imageSrc,
  date,
  desc,
  animate,
  useTargetBlank = true,
  showStatusTag = false,
}: DateCardProps) => {
  const statusLabel = showStatusTag ? getDateStatusLabel(date) : null;
  const CardContent = () => (
    <>
      {animate ? (
        <div className="group relative inverted-radius transition-all duration-500 ease-in-out">
          {statusLabel && (
            <div className="absolute left-3 top-3 z-[3] bg-gradient-orange-1 text-white text-[12px] leading-[100%] font-normal font-roboto px-[10px] py-[6px] rounded-full">
              {statusLabel}
            </div>
          )}
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
          <div className="mt-[8px] pb-[2px] pl-[1px] font-roboto text-[16px] leading-[160%] font-normal text-grey-400 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
            {desc}
          </div>
        </div>
      ) : (
        <div className="group relative transition-all duration-300">
          {statusLabel && (
            <div className="absolute left-3 top-3 z-[3] bg-gradient-orange-1 text-white text-[12px] leading-[100%] font-normal font-roboto px-[10px] py-[6px] rounded-full">
              {statusLabel}
            </div>
          )}
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
          <SubH3 className="mt-[16px] font-roboto text-[14px] leading-[140%] font-normal text-orange-200">
            {date}
          </SubH3>
          <div className="mt-[8px] pb-[2px] pl-[1px] font-roboto text-[16px] leading-[160%] font-normal text-grey-400 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
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
