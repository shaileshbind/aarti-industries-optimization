import { LogosProps } from "@/app/types/media-kit.type";
import Image from "next/image";
import React from "react";

export default function Logos({ data }: LogosProps) {
  const { sectionImages } = data;

  const handleDownload = async (
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

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (isIOS) {
      window.open(proxyUrl, "_blank");
      return;
    }

    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const contentDisposition = response.headers.get("Content-Disposition");
      let downloadFilename = filename || "download";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          downloadFilename = filenameMatch[1];
        }
      }

      const link = document.createElement("a");
      link.href = url;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(proxyUrl, "_blank");
    }
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
          onClick={(e) =>
            handleDownload(
              e,
              sectionImages?.[0]?.imageCards?.[0]?.file?.url,
              "Logo Kit",
            )
          }
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
