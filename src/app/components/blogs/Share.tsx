"use client";
import { ShareSharp } from "@mui/icons-material";
import Image from "next/image";

const Share = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Something went wrong with the share feature.", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <div
      className="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] rounded-full bg-[#DC4C03] grid place-items-center cursor-pointer"
      onClick={handleShare}
    >
      <ShareSharp className="text-[#FFF]" />
    </div>
  );
};

export default Share;
