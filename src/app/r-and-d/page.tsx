import React from "react";
import RDHeroBanner from "../components/r-and-d/RDHeroBanner";
// import RDInfo from "../components/r-and-d/RDInfo";
// import RDInnovatingChem from "../components/r-and-d/RDInnovatingChem";
// import RDDiverseChem from "../components/r-and-d/RDDiverseChem";
// import RDSafety from "../components/r-and-d/RDSafety";
// import RDAnalyticalExc from "../components/r-and-d/RDAnalyticalExc";
// import GloballyCertified from "../components/GloballyCertified";
// import RDExplore from "../components/r-and-d/RDExplore";
import { getPageData } from "@/_lib/pageData.fetch";
// import { getData } from "@/_lib/getData.fetch";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/research-and-development");
  // const globallyCertifiedData = await getData(
  //   "/globally-certified-datas?populate=*"
  // );

  const {
    section_one,
    // section_two,
    // section_three,
    // section_four,
    // section_five,
    // section_six,
    // section_seven,
    // section_eight,
  } = data;

  return (
    <div>
      {section_one && <RDHeroBanner data={section_one} />}

      {/* {section_two && <RDInfo data={section_two} />}

      {section_three && <RDInnovatingChem data={section_three} />}

      {section_four && <RDAnalyticalExc data={section_four} />}

      {section_five && <RDDiverseChem data={section_five} />}

      {section_six && <RDSafety data={section_six} />}

      {section_seven && (
        <GloballyCertified
          title={section_seven?.title}
          itemsData={globallyCertifiedData}
        />
      )}

      {section_eight && <RDExplore data={section_eight} />} */}
    </div>
  );
};

export default page;
