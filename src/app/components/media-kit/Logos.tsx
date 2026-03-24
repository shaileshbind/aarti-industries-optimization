import { LogosProps } from "@/app/types/media-kit.type";
import Image from "next/image";
import React from "react";

export default function Logos({ data }: LogosProps) {
  const { sectionImages } = data;

  const handleDownload = (
    e: React.MouseEvent,
    downloadUrl: string,
    filename: string,
  ) => {
    e.preventDefault();

    if (!downloadUrl) return;

    const filenameParam = filename
      ? `&filename=${encodeURIComponent(filename)}`
      : "";
    const proxyUrl = `/api/download?url=${encodeURIComponent(
      downloadUrl,
    )}${filenameParam}`;

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = proxyUrl;
    document.body.appendChild(iframe);
    setTimeout(() => document.body.removeChild(iframe), 30000);
  };

  return (
    <div>
      <div className="border-[1px] border-[#E1E1E1] grid place-items-center w-full md:w-[424px] h-[300px] rounded-[20px]">
        {sectionImages?.[0]?.imageCards?.[0]?.image?.url && (
          <div className="w-[248px] h-[95px]">
            <Image
              src={sectionImages?.[0]?.imageCards?.[0]?.image?.url}
              width={250}
              height={95}
              alt={
                sectionImages?.[0]?.imageCards?.[0]?.image?.alternativeText ||
                "logo"
              }
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {sectionImages?.[0]?.title && (
        <div
          className="pt-4 md:pt-6 flex gap-[10px] items-center  cursor-pointer"
          onClick={(e) => {
            const fileUrl = sectionImages?.[0]?.imageCards?.[0]?.file?.url;
            const ext = fileUrl?.split(".").pop()?.split("?")[0] || "zip";
            handleDownload(e, fileUrl, `Logo-Kit.${ext}`);
          }}
        >
          <p className="text-lg text-[#4C5861]">{sectionImages?.[0]?.title} </p>
          <Image
            src="/images/download-curve-orange.svg"
            width={18}
            height={18}
            alt="download"
          />
        </div>
      )}
    </div>
  );
}
