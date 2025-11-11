import React from "react";
import CDMOBanner from "../components/cdmo/CDMOBanner";
import CDMODriving from "../components/cdmo/CDMODriving";
import CDMOE2E from "../components/cdmo/CDMOE2E";
import CDMOSafegreen from "../components/cdmo/CDMOSafegreen";
import GloballyCertified from "../components/GloballyCertified";
import CDMOExp from "../components/cdmo/CDMOExp";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import CardsSlider from "../components/CardsSlider";
import GridCardsContainer from "../components/GridCardsContainer";

export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getPageData("/pages/by-slug/cdmo");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
    section_seven,
    section_eight,
  } = data;

  return (
    <div>
      {section_one && <CDMOBanner data={section_one} />}

      {section_two && <GridCardsContainer data={section_two} />}

      {section_three && <CDMODriving data={section_three} />}

      {section_four && <CDMOE2E data={section_four} />}

      {section_five && <CardsSlider data={section_five} />}

      {section_six && <CDMOSafegreen data={section_six} />}

      {section_seven && (
        <GloballyCertified
          title={section_seven?.title}
          itemsData={globallyCertifiedData}
        />
      )}

      {section_eight && <CDMOExp data={section_eight} />}
    </div>
  );
};

export default Page;
