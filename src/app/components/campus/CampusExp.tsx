import ExploreCard from "../cards/ExploreCard";
import { CampusExpProps } from "@/app/types/campus.type";

const CampusExp = ({ data }: CampusExpProps) => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid md:flex gap-y-[10px] md:gap-x-[25px]">
        <ExploreCard title={data?.[0]?.title} ctaButton={data?.[0]?.ctaButton}  formTitle={data?.[0]?.formTitle}/>
        <ExploreCard
          lightVariant
          title={data?.[1]?.title}
          ctaButton={data?.[1]?.ctaButton}  
          formTitle={data?.[1]?.formTitle}
        />
      </div>
    </div>
  );
};

export default CampusExp;
