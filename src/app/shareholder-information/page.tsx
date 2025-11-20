import React from "react";
import ShareHolderBanner from "../components/shareholder-information/ShareHolderBanner";
import TabsYearsContainer from "../components/shareholder-information/TabsYearsContainer";

export default function page() {
  const section_one = {
    id: 1,
    title: "Shareholders Information",
    description:
      "We deliver sustainable chemical solutions that power innovation across global industries.",
    image: {
      id: 560,
      documentId: "v9vsi5urwetsioe5jl34slr1",
      url: "https://d2sslj1veyp2s3.cloudfront.net/DJI_0094_a9bdcf4bc6.jpg",
      alternativeText: null,
      mime: "image/jpeg",
      ext: ".jpg",
      isUrlSigned: false,
    },
    mobImage: {
      id: 560,
      documentId: "v9vsi5urwetsioe5jl34slr1",
      url: "https://d2sslj1veyp2s3.cloudfront.net/DJI_0094_a9bdcf4bc6.jpg",
      alternativeText: null,
      mime: "image/jpeg",
      ext: ".jpg",
      isUrlSigned: false,
    },
  };

  return (
    <div>
      {section_one && <ShareHolderBanner data={section_one} />}

      <TabsYearsContainer />
    </div>
  );
}
