import React from "react";
import EnvBanner from "../components/environment/EnvBanner";
import EnvInfo from "../components/environment/EnvInfo";
import EnvCards from "../components/environment/EnvCards";
import EnvStrong from "../components/environment/EnvStrong";
import EnvLatest from "../components/environment/EnvLatest";
import GloballyCertified from "../components/GloballyCertified";
import EnvExp from "../components/environment/EnvExp";
import EnvResp from "../components/environment/EnvResp";

const page = () => {
  return (
    <div>
      <EnvBanner />
      <EnvInfo />
      <EnvCards />
      <EnvResp/>
      <EnvStrong />
      <EnvLatest />
      <GloballyCertified
        title="Globally Certified"
        itemsData={[
          {
            id: 0,
            heading: "Ecovadis Gold Rating",
            image: { url: "/images/award1.png", alternativeText: "" },
          },
          {
            id: 1,
            heading: "CDP A rating",
            image: { url: "/images/award2.png", alternativeText: "" },
          },
          {
            id: 2,
            heading: "ISO 27001:2022",
            image: { url: "/images/award3.png", alternativeText: "" },
          },
        ]}
      />
      <EnvExp/>

    </div>
  );
};

export default page;
