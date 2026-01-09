import { SubH2, BodyText2, BodyText3 } from "../Typography2";
import Button from "../Button";
import { ImageProps, ButtonProps } from "@/app/types/global.type";

type PodcastCardProps = {
  podcast: {
    title: string;
    episodeNumber?: string | number;
    episodeLabel?: string;
    duration?: string;
    date?: string;
    speakerInfo?: string;
    image?: ImageProps;
    mobImage?: ImageProps;
    ctaButton?: ButtonProps;
  };
};

const PodcastCard = ({ podcast }: PodcastCardProps) => {
  const { title, episodeLabel, duration, date, speakerInfo, ctaButton } =
    podcast;

  return (
    <div className="group relative transition-all duration-300 bg-grey-100 rounded-[10px] p-[20px] lg:p-[24px] flex flex-col h-full">
      {/* Header Section - Episode & Duration | Date */}
      <div className="flex items-start justify-between mb-[16px]">
        {/* Episode Label & Duration */}
        <div className="flex items-center gap-2">
          {episodeLabel && (
            <BodyText3 className="text-blue-200">{episodeLabel}</BodyText3>
          )}
          {duration && (
            <>
              <span className="text-blue-200">|</span>
              <BodyText3 className="text-blue-200">{duration}</BodyText3>
            </>
          )}
        </div>

        {/* Date */}
        {date && <BodyText3 className="text-blue-200">{date}</BodyText3>}
      </div>

      {/* Title */}
      {title && (
        <SubH2 className="text-blue-200 mb-[12px] flex-1">{title}</SubH2>
      )}

      {/* Speaker Info */}
      <div className="flex items-center gap-2 justify-between mb-[5px]">
        {speakerInfo && (
          <BodyText2 className="text-blue-200 ">{speakerInfo}</BodyText2>
        )}

        {/* CTA Link - Listen Now */}
        {ctaButton?.title &&
          (ctaButton?.hasExternalLink == "true"
            ? ctaButton?.externalLink
            : ctaButton?.link?.link) && (
            <div className="mt-auto min-w-[85px]">
              <Button
                title={ctaButton?.title}
                href={
                  ctaButton?.hasExternalLink == "true"
                    ? ctaButton?.externalLink
                    : ctaButton?.link?.link
                }
                secondary
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default PodcastCard;
