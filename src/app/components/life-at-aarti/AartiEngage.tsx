import { BodyText1, H2 } from "../Typography2";
import Image from "next/image";
import { LAAEngageProps } from "@/app/types/life-at-aarti.type";
import { useMargin } from "@/app/contexts/MarginContext";
import { FadeInReveal } from "../ScrollReveal";
const AartiEngage = ({ data }: LAAEngageProps) => {
  const { title, description, image, mobImage } = data;
  const { marginBottom } = useMargin();
  return (
    <div className="py-[72px] lg:py-[120px]"
    style={{ marginTop: marginBottom > 0 ? `${marginBottom}px` : undefined }}
    >
      {title && (
        <FadeInReveal>
        <H2 className="max-w-[unset] xl:max-w-[520px] mx-[20px] lg:mx-auto text-center">
          {title}
        </H2>
        </FadeInReveal>
      )}
      {description && (
        <FadeInReveal>
        <BodyText1 className="mt-[10px] lg:mt-[6px] max-w-[650px] mx-[20px] lg:mx-auto text-center">
          {description}
        </BodyText1>
        </FadeInReveal>
      )}
      <div className="mt-[44px] md:mt-[60px] mx-[20px]">
        <FadeInReveal className="w-full h-[200px] md:h-[600px] relative">
          {image?.url && (
            <Image
              src={image?.url}
              alt={image?.alternativeText ? image?.alternativeText : "img"}
              fill
              className="object-contain hidden md:block"
            />
          )}
          {mobImage?.url && (
            <Image
              src={mobImage?.url}
              alt={
                mobImage?.alternativeText ? mobImage?.alternativeText : "img"
              }
              fill
              className="object-contain block md:hidden"
            />
          )}
        </FadeInReveal>
      </div>
    </div>
  );
};

export default AartiEngage;
