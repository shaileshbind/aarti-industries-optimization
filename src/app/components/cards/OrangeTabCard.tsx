"use client";
import { useState } from "react";
import { BodyText1 } from "../Typography2";
import Image from "next/image";
import clsxN from "../../../../utils/clsxN";
import Link from "next/link";

type ProductListProps = {
  title: string;
  link: string;
  scale?: boolean;
  useTargetBlank?: boolean;
  titleClassName?: string;
};

const OrangeTabCard = ({
  title,
  link,
  scale = false,
  useTargetBlank = true,
  titleClassName,
}: ProductListProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <>
      {/* Left side */}
      <div className="flex flex-col">
        {title && (
          <BodyText1
            className={clsxN(
              "text-sm lg:text-lg font-medium pr-4 ",
              isHovered ? "text-white" : "text-blue-200",
              titleClassName,
            )}
          >
            {title}
          </BodyText1>
        )}
      </div>
      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Arrow icon */}
        <div
          className={clsxN(
            "w-8 h-8 flex items-center justify-center border rounded-[18px] pointer-events-none relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full",
            isHovered
              ? "border-white text-white"
              : "border-orange-800 text-orange-800",
          )}
        >
          <div className="w-[20px] h-[20px] relative overflow-hidden">
            {/* Original arrow - exits upward diagonally on hover */}
            <Image
              src={isHovered ? "/images/arrow-up-right-w.svg" : "/images/arrow-up-right-o.svg"}
              alt="redirect icon"
              fill
              className={clsxN(
                "absolute transition-transform duration-500 ease-in-out",
                isHovered
                  ? "translate-x-[187.5%] -translate-y-[187.5%]"
                  : "translate-x-0 translate-y-0",
              )}
            />
            {/* New arrow - enters from bottom diagonally on hover */}
            <Image
              src="/images/arrow-up-right-w.svg"
              alt="redirect icon secondary"
              fill
              className={clsxN(
                "absolute transition-transform duration-500 ease-in-out",
                isHovered
                  ? "translate-x-0 translate-y-0"
                  : "-translate-x-[187.5%] translate-y-[187.5%]",
              )}
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {link && <Link
        href={link}
        target={useTargetBlank ? "_blank" : "_self"}
        className={clsxN(
          "duration-800 flex relative items-center justify-between border-b-2 py-4 lg:px-4 border-transparent min-w-full w-full md:w-auto cursor-pointer",
          scale && "button-subtle-scale ",
          isHovered
            ? `bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] text-white rounded-lg px-2`
            : `"bg-white border-gray-200 `,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>}
    </>
  );
};

export default OrangeTabCard;
