import { DownloadCardProps } from "@/app/types/media-kit.type";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

export default function DownloadCard({
  src,
  className,
  downloadUrl,
  filename,
}: DownloadCardProps) {
  const handleDownload = async (e: React.MouseEvent) => {
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
      {src && (
        <div
          onClick={handleDownload}
          className={clsx(
            `relative h-[328px] md:h-[398px] rounded-[20px] overflow-hidden cursor-pointer border-[1px] border-[#d2d2d2]`,
            className,
          )}
        >
          <Image
            src={src}
            width={312}
            height={398}
            alt="logo"
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute right-6 bottom-6 w-12 h-12 rounded-full bg-[#FFF] grid place-items-center cursor-pointer hover:scale-110 transition-transform shadow-md">
            <Image
              src="/images/download-curve-orange.svg"
              width={24}
              height={24}
              alt="download"
            />
          </div>
        </div>
      )}
    </div>
  );
}
