import React from "react";
import CDMOBanner from "../components/cdmo/CDMOBanner";
import CDMOPartner from "../components/cdmo/CDMOPartner";
import CDMODriving from "../components/cdmo/CDMODriving";
import CDMOE2E from "../components/cdmo/CDMOE2E";
import CDMOSplchem from "../components/cdmo/CDMOSplchem";
import CDMOSafegreen from "../components/cdmo/CDMOSafegreen";
import GloballyCertified from "../components/GloballyCertified";
import CDMOExp from "../components/cdmo/CDMOExp";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";

export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getPageData("/pages/by-slug/cdmo");
  const globallyCertifiedData = await getData();

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

      {section_two && <CDMOPartner data={section_two} />}

      {section_three && <CDMODriving data={section_three} />}

      {section_four && <CDMOE2E data={section_four} />}

      {section_five && <CDMOSplchem data={section_five} />}

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
