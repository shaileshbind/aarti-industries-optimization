import ExploreCard from "../cards/ExploreCard";
import { GRExpProps } from "@/app/types/global-reach.type";
import { FadeInRevealBlur } from "../ScrollReveal";

const GRExplore = ({ data }: GRExpProps) => {
  const { exploreMore } = data;
  if (!data || !exploreMore || !Array.isArray(exploreMore) || exploreMore.length === 0) return null;
  return (
    <FadeInRevealBlur
      delay={0.2}
      className="py-[50px] lg:py-[100px] container !max-w-[1130px]"
    >
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title={exploreMore[0]?.title}
          ctaButton={exploreMore[0]?.ctaButton}
          formTitle={exploreMore?.[0]?.formTitle}
        />
        <ExploreCard
          lightVariant
          title={exploreMore[1]?.title}
          ctaButton={exploreMore[1]?.ctaButton}
          formTitle={exploreMore?.[1]?.formTitle}
        />
      </div>
    </FadeInRevealBlur>
  );
};

export default GRExplore;
