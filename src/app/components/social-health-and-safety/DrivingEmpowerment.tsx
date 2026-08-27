import React from "react";
import DrivingTabsSection from "./DrivingTabsSection";
import { DrivingEmpowermentProps } from "@/app/types/social-health-and-safety.type";
import { DrivingTabsSectionProps } from "@/app/types/social-health-and-safety.type";
import { ButtonProps, ImageProps } from "@/app/types/global.type";

const DrivingEmpowerment: React.FC<DrivingEmpowermentProps> = ({ data }) => {
  // Map the cards array to the structure expected by DrivingTabsSection
  // If cards is a flat array, transform it to tab items
  const mappedData: DrivingTabsSectionProps[] = React.useMemo(() => {
    if (!data?.cards || !Array.isArray(data.cards) || data.cards.length === 0) {
      return [];
    }

    // Check if cards is already in the correct format (array of tab items with heading and cards)
    const firstItem = data.cards[0];
    if ("heading" in firstItem && "cards" in firstItem) {
      return data.cards as DrivingTabsSectionProps[];
    }

    // Otherwise, transform flat cards array to tab items
    // Each card becomes a tab item where the card's title becomes the heading
    type FlatCard = {
      id: string | number;
      title: string;
      description: string;
      bottomDescription?: string | null;
      BulletPoints: {
        id: string | number;
        title: string;
      }[];
      image: ImageProps;
      mobImage: ImageProps | null;
      ctaButton: ButtonProps | null;
    };
    return (data.cards as FlatCard[]).map((card) => ({
      id: card.id,
      heading: card.title || "",
      cards: [
        {
          id: card.id,
          title: card.title,
          description: card.description,
          ctaButton: card.ctaButton || null,
          image: card.image,
          BulletPoints: (card.BulletPoints || []).map((bp) => ({
            id: bp.id,
            title: bp.title,
          })),
        },
      ],
    }));
  }, [data?.cards]);

  return (
    <>
      <div className="block w-full mt-[72px] md:mt-[100px] xl:mt-[140px]">
        <DrivingTabsSection data={mappedData} title={data?.heading} />
      </div>
    </>
  );
};

export default DrivingEmpowerment;
