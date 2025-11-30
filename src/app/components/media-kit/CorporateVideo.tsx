import React, { useRef, useState } from "react";
import { SubH2 } from "../Typography2";
import Image from "next/image";

export default function CorporateVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        setShowControls(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowControls(false);
      }
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(false);
  };

  return (
    <div>
      <SubH2 className="pb-[24px]">Corporate Video Name</SubH2>

      <div className="relative w-full h-[350px] md:h-[628px] rounded-[20px] overflow-hidden">
        <video
          ref={videoRef}
          width="320"
          height="240"
          //   controls={showControls}
          onClick={showControls ? handleVideoClick : undefined}
          onPause={handleVideoPause}
          onPlay={handleVideoPlay}
          onEnded={handleVideoEnded}
          className={`w-full h-full rounded-[20px] ${
            showControls ? "cursor-pointer" : "pointer-events-none"
          }`}
        >
          <source src="/videos/sample.mp4" type="video/mp4" />
          <source src="/videos/sample.mp4" type="video/ogg" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute right-6 bottom-6 w-12 h-12 rounded-full bg-[#FFF] grid place-items-center cursor-pointer">
          <Image
            src="/images/download-curve-orange.svg"
            width={24}
            height={24}
            alt="download"
          />
        </div>

        {!showControls && (
          <div
            onClick={handlePlayClick}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-[#FFF] grid place-items-center cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
          >
            <Image
              src={"/images/orange-play.svg"}
              width={16}
              height={16}
              alt={isPlaying ? "pause" : "play"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
