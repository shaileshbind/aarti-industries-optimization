import React, { useRef, useState, useEffect } from "react";
import { SubH2 } from "../Typography2";
import Image from "next/image";
import {
  CorporateVideoProps,
  VendorFullscreenDocument,
} from "@/app/types/media-kit.type";

export default function CorporateVideo({ data }: CorporateVideoProps) {
  const { sectionVideos } = data;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as VendorFullscreenDocument;

      const isCurrentlyFullscreen = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      
      setIsFullscreen(isCurrentlyFullscreen);

      // If exiting fullscreen and video is paused, hide controls to show play button
      if (!isCurrentlyFullscreen && videoRef.current?.paused) {
        setShowControls(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current && !isFullscreen) {
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
      <SubH2 className="pb-[24px] text-center lg:text-left">Corporate Video Name</SubH2>

      <div className="relative w-full h-[220px] md:h-[628px] rounded-[20px] overflow-hidden">
        <video
          ref={videoRef}
          width="320"
          height="240"
          controls={showControls}
          onClick={!isFullscreen ? handleVideoClick : undefined}
          onPause={handleVideoPause}
          onPlay={handleVideoPlay}
          onEnded={handleVideoEnded}
          className={`w-full h-full rounded-[20px] object-cover ${
            showControls && !isFullscreen ? "cursor-pointer" : ""
          } ${!isFullscreen && !isPlaying && "pointer-events-none"}`}
        >
          <source src={sectionVideos?.[0]?.video?.url} type="video/mp4" />
          <source src={sectionVideos?.[0]?.video?.url} type="video/ogg" />
          Your browser does not support the video tag.
        </video>

        {!showControls && !isFullscreen && (
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
