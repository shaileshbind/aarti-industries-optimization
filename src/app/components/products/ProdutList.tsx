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
};

const ProductList = ({ title, link, pdfLink, pdfTitle }: ProductListProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsxN(
        "flex items-center justify-between border-b-2 p-4 border-transparent transition-all min-w-full lg:min-w-[628px] w-full md:w-auto",
        isHovered
          ? "bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] text-white rounded-lg"
          : "bg-white border-gray-200"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left side */}
      <div className="flex flex-col">
        <BodyText1
          className={clsxN(
            "text-lg font-medium transition-colors",
            isHovered ? "text-white" : "text-gray-800"
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
              "flex items-center space-x-1 text-sm md:hidden mt-1 transition-colors",
              isHovered ? "text-white" : "text-gray-700"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {pdfTitle || "View TDS"}
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
              "hidden md:flex items-center space-x-1 text-sm transition-colors cursor-pointer",
              isHovered ? "text-white" : "text-gray-700"
            )}
          >
            <span>{pdfTitle || "View TDS"}</span>
            <div className="w-[20px] h-[20px] relative">
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
            href={"/products/" + link}
            className={clsxN(
              "w-8 h-8 flex items-center justify-center border rounded-[18px] cursor-pointer transition-all",
              isHovered
                ? "border-white text-white hover:text-orange-600"
                : "border-orange-500 text-orange-500 hover:bg-orange-500"
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
