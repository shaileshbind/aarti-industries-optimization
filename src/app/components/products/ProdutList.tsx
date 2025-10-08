import React, { useState } from "react";
import { BodyText1 } from "../Typography2";
import Image from "next/image";
import clsxN from "../../../../utils/clsxN";
import Link from "next/link";

type ProductListProps = {
  title: string;
  link: string;
  pdfLink?: string;
  pdfTitle?: string;
  secondary?: boolean;
};

const ProductList = ({ title, link, pdfLink, secondary }: ProductListProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsxN(
        "button-subtle-scale duration-800 flex items-center justify-between border-b-2 p-4 border-transparent min-w-full w-full md:w-auto",
        isHovered
          ? `bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] text-white rounded-lg  `
          : `${secondary ? " border-gray-200" : "bg-white border-gray-200"} `
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left side */}
      <div className="flex flex-col">
        <BodyText1
          className={clsxN(
            "text-lg font-medium  ",
            isHovered ? "text-white" : "text-blue-200"
          )}
        >
          {title}
        </BodyText1>
        {/* Mobile PDF link */}
        {pdfLink && (
          <a
            href={pdfLink}
            download
            className={clsxN(
              "flex items-center space-x-1 text-sm md:hidden mt-1 ",
              isHovered ? "text-white" : "text-gray-800"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {"View TDS"}
          </a>
        )}
      </div>
      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Desktop PDF download */}
        {pdfLink && (
          <Link
            href={pdfLink}
            download
            className={clsxN(
              "hidden md:flex items-center space-x-1 text-sm  cursor-pointer ",
              isHovered ? "text-white" : "text-gray-800"
            )}
          >
            <span
              className={clsxN(isHovered ? "text-white" : "text-[#4d5861]")}
            >
              {"View TDS"}
            </span>
            <div className="w-[20px] h-[20px] relative ">
              <Image
                src={
                  isHovered
                    ? "/images/download-icon-white.svg"
                    : "/images/download-icon-grey.svg"
                }
                alt="download icon"
                fill
              />
            </div>
          </Link>
        )}
        {/* Redirect link */}
        {link && (
          <Link
            href={"/products" + link}
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

export default ProductList;
