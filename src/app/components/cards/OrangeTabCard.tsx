"use client";
import React, { useState } from "react";
import { BodyText1 } from "../Typography2";
import Image from "next/image";
import clsxN from "../../../../utils/clsxN";
import Link from "next/link";

type ProductListProps = {
  title: string;
  link: string;
  scale?: boolean;
};

const OrangeTabCard = ({ title, link, scale = true }: ProductListProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsxN(
        "duration-800 flex items-center justify-between border-b-2 py-4 px-2 lg:px-4 border-transparent min-w-full w-full md:w-auto",
        scale && "button-subtle-scale ",
        isHovered
          ? `bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] text-white rounded-lg  `
          : `"bg-white border-gray-200 `
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left side */}
      <div className="flex flex-col">
        {title && (
          <BodyText1
            className={clsxN(
              "text-sm lg:text-lg font-medium pr-4",
              isHovered ? "text-white" : "text-blue-200"
            )}
          >
            {title}
          </BodyText1>
        )}
      </div>
      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Redirect link */}
        {link && (
          <Link
            href={link}
            target="_blank"
            className={clsxN(
              "w-8 h-8 flex items-center justify-center border rounded-[18px] cursor-pointer",
              isHovered
                ? "border-white text-white hover:text-orange-600"
                : "border-orange-800 text-orange-800 hover:bg-orange-800"
            )}
          >
            <div className="w-[20px] h-[20px] relative">
              <Image
                src={
                  isHovered
                    ? "/images/arrow-up-right-w.svg"
                    : "/images/arrow-up-right-o.svg"
                }
                alt="redirect icon"
                fill
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default OrangeTabCard;
