import Image from "next/image";
import React from "react";

export default function Logos() {
  return (
    <div>
      <div className="border-[1px] border-[#E1E1E1] grid place-items-center w-full md:w-[424px] h-[300px] rounded-[20px]">
        <div className="w-[248px] h-[95px]">
          <Image
            src="/images/logo.png"
            width={250}
            height={95}
            alt="logo"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="pt-4 md:pt-6 flex gap-[10px] items-center">
        <p className="text-lg text-[#4C5861] cursor-pointer">
          Download Logo Kit{" "}
        </p>
        <Image
          src="/images/download-curve-orange.svg"
          width={18}
          height={18}
          alt="download"
        />
      </div>
    </div>
  );
}
