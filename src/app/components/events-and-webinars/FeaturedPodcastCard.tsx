import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SubH2, BodyText2, BodyText3 } from "../Typography2";
import { ImageProps, ButtonProps } from "@/app/types/global.type";

type FeaturedPodcastCardProps = {
  podcast: {
    title: string;
    episodeNumber?: string;
    episodeLabel?: string;
    duration?: string;
    date?: string;
    speakerInfo?: string;
    image: ImageProps;
    mobImage: ImageProps;
    ctaButton?: ButtonProps;
  };
};

const FeaturedPodcastCard = ({ podcast }: FeaturedPodcastCardProps) => {
  return (
    <Link
      href={`${podcast.ctaButton?.hasExternalLink == "true" ? podcast.ctaButton?.externalLink : podcast.ctaButton?.link?.link}`}
      className="block h-full"
    >
      <div className="relative rounded-[10px] overflow-hidden bg-grey-100 h-full flex flex-col group cursor-pointer">
        {/* Image Section - Top 2/3 */}
        <div className="relative w-full aspect-[648/433] overflow-hidden">
          <Image
            src={podcast.image?.url || podcast.mobImage?.url || ""}
            alt={podcast.image?.alternativeText || podcast.title || "Podcast"}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Text Section - Bottom 1/3 with dark blue background */}
        <div className="bg-[#1A3258] p-5 lg:p-6 flex flex-col flex-1">
          {/* Top Row - Episode/Duration & Date */}
          <div className="flex items-start justify-between mb-3">
            {/* Left: Episode Label & Duration */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                {podcast.episodeLabel && (
                  <BodyText3 className="text-white font-medium">
                    {podcast.episodeLabel}
                  </BodyText3>
                )}
                {podcast.duration && (
                  <>
                    <span className="text-white">|</span>
                    <BodyText3 className="text-white">
                      {podcast.duration}
                    </BodyText3>
                  </>
                )}
              </div>
              {/* Speaker Info */}
              {podcast.speakerInfo && (
                <BodyText2 className="text-white">
                  {podcast.speakerInfo}
                </BodyText2>
              )}
            </div>
            
            {/* Right: Date */}
            {podcast.date && (
              <BodyText3 className="text-white">
                {podcast.date}
              </BodyText3>
            )}
          </div>
          
          {/* Title - Bottom */}
          {podcast.title && (
            <SubH2 className="text-white mt-auto">
              {podcast.title}
            </SubH2>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPodcastCard;
