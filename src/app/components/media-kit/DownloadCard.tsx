import { DownloadCardProps } from "@/app/types/media-kit.type";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

export default function DownloadCard({ src, className }: DownloadCardProps) {
  return (
    <div>
      <div
        className={clsx(
          `relative h-[328px] md:h-[398px] rounded-[20px]`,
          className
        )}
      >
        <Image
          src={src}
          width={312}
          height={398}
          alt="logo"
          className="w-full h-full"
        />

        <div className="absolute right-6 bottom-6 w-12 h-12 rounded-full bg-[#FFF] grid place-items-center cursor-pointer">
          <Image
            src="/images/download-curve-orange.svg"
            width={24}
            height={24}
            alt="download"
          />
        </div>
      </div>
    </div>
  );
}
