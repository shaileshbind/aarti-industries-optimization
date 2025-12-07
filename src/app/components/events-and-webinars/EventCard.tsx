import React from "react";
import Image from "next/image";
import { SubH2, BodyText1, BodyText2, BodyText3 } from "../Typography2";
import Button from "../Button";

type EventCardProps = {
  pastEvent?: boolean;
  event: {
    title: string;
    date?: string;
    location?: string;
    description?: string;
    image: {
      url: string;
      alternativeText: string;
    };
    mobImage: {
      url: string;
      alternativeText: string;
    };
    ctaButton?: {
      title: string;
      link: string;
      externalLink?: string;
    };
  };
  onButtonClick?: () => void;
};

const EventCard = ({ event, onButtonClick, pastEvent = false }: EventCardProps) => {
  const { title, date, location, description, image, mobImage, ctaButton } = event;

  return (
    <div className="group relative transition-all duration-300">
      {/* Image Section */}
      <div className="relative w-full aspect-[424/313] overflow-hidden rounded-[10px]">
        {image?.url && (
          <Image
            src={image.url}
            alt={image.alternativeText || title}
            fill
            className="hidden lg:block object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-[1.1]"
          />
        )}
        {mobImage?.url && (
          <Image
            src={mobImage.url}
            alt={mobImage.alternativeText || title}
            fill
            className="block lg:hidden object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-[1.1]"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="mt-[16px]">
        {/* Date */}
        {date && (
          <BodyText3 className="text-grey-300 mb-[8px]">
            {date}
          </BodyText3>
        )}

        {/* Event Title */}
        {title && (
          <SubH2 className="text-blue-200 mb-[8px]">
            {title}
          </SubH2>
        )}

        {/* Location */}
        {location && (
          <BodyText2 className="text-grey-400 mb-[8px]">
            {location}
          </BodyText2>
        )}

        {/* Description */}
        {description && !pastEvent && (
          <BodyText1 className="text-grey-400 mb-[12px]">
            {description}
          </BodyText1>
        )}

        {/* CTA Link */}
        {ctaButton?.title && ctaButton?.link && (
          onButtonClick ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onButtonClick();
              }}
              className="w-fit cursor-pointer text-orange-200 text-[16px] font-normal leading-[100%] font-alte-hans underline underline-offset-[4px] [text-underline-position:under] animated-underline"
            >
              {ctaButton.title}
            </button>
          ) : (
            <Button title={ctaButton.title} href={ctaButton.link} secondary />
          )
        )}
      </div>
    </div>
  );
};

export default EventCard;
