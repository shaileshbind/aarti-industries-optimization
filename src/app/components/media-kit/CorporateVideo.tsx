import { useRef, useState } from "react";
import { SubH2 } from "../Typography2";
import Image from "next/image";
import { CorporateVideoProps } from "@/app/types/media-kit.type";

export default function CorporateVideo({ data }: CorporateVideoProps) {
  const { sectionVideos, title } = data;
  const posterUrl = sectionVideos[0]?.videoThumbnail?.url;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const handleInitialPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  return (
    <div>
      {title && (
        <SubH2 className="pb-[24px] text-center lg:text-left">{title}</SubH2>
      )}

      <div className="relative w-full h-[220px] md:h-[628px] rounded-[20px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          poster={posterUrl}
          controls={showControls}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setShowControls(false);
          }}
          className="w-full h-full rounded-[20px] object-cover"
        >
          <source src={sectionVideos?.[0]?.video?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Play Button Overlay: Only visible when the video is paused/stopped */}
        {!isPlaying && (
          <div
            onClick={handleInitialPlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-10 transition-opacity duration-300"
          >
            <div className="w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-white grid place-items-center hover:scale-110 transition-transform duration-200 shadow-xl">
              <Image
                src={"/images/orange-play.svg"}
                width={16}
                height={16}
                alt="play"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
