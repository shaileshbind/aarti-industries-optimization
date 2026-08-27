import { BodyText2, SubH1, SubH2 } from "./Typography2";
import Image from "next/image";
import { FadeInReveal, ScaleInGroup } from "./ScrollReveal";
import { TitleCardsContainerProps } from "../types/digital-transformation.type";

export default function TitleCardsContainer({
  data,
}: TitleCardsContainerProps) {
  const { title, card } = data;

  return (
    <div className="lg:flex justify-between gap-12 fluid-container">
      {title && (
        <FadeInReveal className="lg:max-w-[300px] xl:max-w-[400px] pb-8 lg:pb-0">
          <SubH1>{title}</SubH1>
        </FadeInReveal>
      )}

      <ScaleInGroup delay={0.2}>
        {card?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-1">
            {card.map(({ title, image, description }, i) => (
              <div
                key={i}
                className="sm:h-auto lg:min-h-[320px] w-full bg-[#EFF3F5] rounded-3xl p-5 xl:p-8 flex flex-col justify-between"
                data-scroll
              >
                {image?.url && (
                  <Image
                    src={image?.url}
                    alt={image?.alternativeText || "logo"}
                    width={48}
                    height={48}
                    className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] "
                  />
                )}

                <div className="mt-5 md:mt-8 space-y-3">
                  {title && <SubH2>{title}</SubH2>}

                  {description && <BodyText2>{description}</BodyText2>}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScaleInGroup>
    </div>
  );
}
