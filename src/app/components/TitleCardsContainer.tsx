import React from "react";
import { BodyText2, SubH1, SubH2 } from "./Typography2";
import Image from "next/image";

export default function TitleCardsContainer() {
  const cards = [
    {
      title: "Conducted information",
      description: "Deep R&D, pilot-to-commercial scale-up.",
      image: {
        url: "/images/star-orange.svg",
        alternativeText: "Banner",
      },
    },
    {
      title: "Conducted information",
      description: "Deep R&D, pilot-to-commercial scale-up.",
      image: {
        url: "/images/star-orange.svg",
        alternativeText: "Banner",
      },
    },
    {
      title: "Conducted information",
      description: "Deep R&D, pilot-to-commercial scale-up.",
      image: {
        url: "/images/star-orange.svg",
        alternativeText: "Banner",
      },
    },
    {
      title: "Conducted information",
      description: "Deep R&D, pilot-to-commercial scale-up.",
      image: {
        url: "/images/star-orange.svg",
        alternativeText: "Banner",
      },
    },
    {
      title: "Conducted information",
      description: "Deep R&D, pilot-to-commercial scale-up.",
      image: {
        url: "/images/star-orange.svg",
        alternativeText: "Banner",
      },
    },
    {
      title: "Conducted information",
      description: "Deep R&D, pilot-to-commercial scale-up.",
      image: {
        url: "/images/star-orange.svg",
        alternativeText: "Banner",
      },
    },
  ];

  return (
    <div className="lg:flex justify-between gap-10 fluid-container">
      <SubH1 className="lg:max-w-[300px] xl:max-w-[400px] pb-8 lg:pb-0">
        We strengthen operations with full-site security checks, trained teams,
        and modern digital systems.
      </SubH1>

      {cards?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
          {cards.map(({ title, image, description }, i) => (
            <div
              key={i}
              className="sm:h-auto lg:min-h-[320px] w-full bg-[#EFF3F5] rounded-3xl p-4 xl:p-8 flex flex-col justify-between"
              data-scroll
            >
              {image?.url && (
                <Image
                  src={image?.url}
                  alt={image?.alternativeText || "logo"}
                  width={48}
                  height={48}
                />
              )}

              <div className=" mt-3 md:mt-8 space-y-3">
                {title && <SubH2>{title}</SubH2>}

                {description && <BodyText2>{description}</BodyText2>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
