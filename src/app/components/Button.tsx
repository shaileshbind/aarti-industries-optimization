import React from "react";
import Link from "next/link";

interface ButtonProps {
  title: string;
  href?: string;
  secondary?: boolean;
  className?: string;
  useTargetBlank?: boolean;
}

const Button = ({
  href,
  title,
  secondary,
  className,
  useTargetBlank = true,
}: ButtonProps) => {
  return (
    <>
      {secondary ? (
        <>
          <Link
            href={href || ""}
            target={useTargetBlank ? "_blank" : "_self"}
            className="w-fit"
          >
            <button
              className={`animated-underline w-fit cursor-pointer text-orange-200 text-[16px] font-normal leading-[100% font-alte-hans underline underline-offset-[4px] [text-underline-position:under] ${className}`}
            >
              {title}
            </button>
          </Link>
        </>
      ) : (
        <Link
          href={href || ""}
          target={useTargetBlank ? "_blank" : "_self"}
          className="w-fit group relative inline-block"
        >
          <button
            className={`relative w-fit py-[14px] px-[22px] rounded-[6px] cursor-pointer bg-gradient-orange-1 text-white text-[16px] font-normal leading-[100%] font-alte-hans overflow-hidden transition-all duration-300 ${className}`}
          >
            <span className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 text-white">{title}</span>
          </button>
        </Link>
      )}
    </>
  );
};

export default Button;
