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

    try {
      // Use API route to bypass CORS
      const filenameParam = filename
        ? `&filename=${encodeURIComponent(filename)}`
        : "";
      const proxyUrl = `/api/download?url=${encodeURIComponent(
        downloadUrl
      )}${filenameParam}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Get filename from Content-Disposition header or use provided filename
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
      // Fallback: open in new tab
      window.open(downloadUrl, "_blank");
    }
  };

  return (
    <div>
      {src && (
        <div
          onClick={handleDownload}
          className={clsx(
            `relative h-[328px] md:h-[398px] rounded-[20px] overflow-hidden cursor-pointer`,
            className
          )}
        >
          <Image
            src={src}
            width={312}
            height={398}
            alt="logo"
            className="w-full h-full object-cover"
          />

          <div className="absolute right-6 bottom-6 w-12 h-12 rounded-full bg-[#FFF] grid place-items-center cursor-pointer hover:scale-110 transition-transform">
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
