"use client";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";

const CopyLink = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  };

  return (
    <div className="relative">
      <div
        className="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] rounded-full bg-[#DC4C03] grid place-items-center cursor-pointer"
        onClick={handleCopy}
      >
        <LinkIcon className="text-[#FFF] rotate-45" />
      </div>
      {copied && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max bg-[#DC4C03] text-white text-[12px] rounded-md px-2 py-1">
          Link copied!
        </div>
      )}
    </div>
  );
};

export default CopyLink;
