import React from "react";
import CDMOPartner from "../components/cdmo/CDMOPartner";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import PartnershipBanner from "../components/partnership/PartnershipBanner";
import PartneshipExplore from "../components/partnership/PartnershipExplore";
import CardsSlider from "../components/CardsSlider";
import GridCardsContainer from "../components/GridCardsContainer";
import ParallaxCardSection from "../components/partnership/ParallaxCardSection";
import WhyAarti from "../components/partnership/WhyAarti";
import WorksWithPartners from "../components/partnership/WorksWithPartners";

export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getPageData("/pages/by-slug/cdmo");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  const cardData = {
    id: 1,
    title: "Why Global Companies Trust AIL",
    description:
      "Partnering with AIL means gaining more than a supplier; you gain a strategic ally who understands the complexity of speciality chemicals and global markets.",
    card: [
      {
        id: 281,
        title: "Reduce Risk",
        description: "Proven EHS, Responsible Care certified, EcoVadis Gold.",
        image: {
          url: "https://d2sslj1veyp2s3.cloudfront.net/fi_1320521_70628892db.png",
        },
      },
      {
        id: 282,
        title: "Scale With Confidence",
        description: "Multi-location plants, flexible MPP capacity.",
        image: {
          url: "https://d2sslj1veyp2s3.cloudfront.net/development_2_37ccefdad0.png",
        },
      },
      {
        id: 283,
        title: "Accelerate Innovation",
        description: "Deep R&D, pilot-to-commercial scale-up.",
        image: {
          url: "https://d2sslj1veyp2s3.cloudfront.net/fi_11538824_d6548e7961.png",
        },
      },
      {
        id: 284,
        title: "Secure Supply Chains",
        description: "Long-term sourcing partnerships for critical RMs.",
        image: {
          url: "https://d2sslj1veyp2s3.cloudfront.net/fi_98741_1caa547923.png",
        },
      },
      {
        id: 285,
        title: "Global Trust",
        description: "400+ customers, 60+ countries, 10+ year relationships.",
        image: {
          url: "https://d2sslj1veyp2s3.cloudfront.net/fi_98741_1caa547923.png",
        },
      },
    ],
  };

  const { section_five } = data;

  return (
    <div>
      <PartnershipBanner />

      <ParallaxCardSection />

      {section_five && <CardsSlider data={section_five} />}

      {cardData && <GridCardsContainer data={cardData} />}

      <WhyAarti />

      <WorksWithPartners />

      {<GloballyCertified itemsData={globallyCertifiedData} />}

      {<PartneshipExplore />}
    </div>
  );
};

export default Page;
