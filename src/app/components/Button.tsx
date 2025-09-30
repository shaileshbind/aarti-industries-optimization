import React from "react";
import Link from "next/link";

interface ButtonProps {
  title: string;
  href: string;
  secondary?: boolean;
}

const Button = ({ href, title, secondary }: ButtonProps) => {
  return (
    <>
      {secondary ? (
        <>
          <Link href={href} target="_blank" className="w-fit">
            <button className="animated-underline w-fit cursor-pointer text-orange-200 text-[16px] font-normal leading-[100% font-alte-hans underline underline-offset-[4px] [text-underline-position:under]">
              {title}
            </button>
          </Link>
        </>
      ) : (
        <Link href={href} target="_blank" className="w-fit">
          <button className="button-subtle-scale w-fit py-[14px] px-[22px] rounded-[6px] cursor-pointer bg-gradient-orange-1 text-white text-[16px] font-normal leading-[100% font-alte-hans">
            {title}
          </button>
        </Link>
      )}
    </>
  );
};

export default Button;
