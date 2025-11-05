import React from "react";
import HeroBanner from "../banners/HeroBanner";

const EnvBanner = () => {
  return (
    <div>
      <HeroBanner
        fullBg
        tag="Environment"
        title="Creating Chemistry with Care for the Environment"
        image="/images/environment/env-banner.png"
        mobImage="/images/environment/env-banner.png"
        alt="img"
        mobAlt="img"
      />
    </div>
  );
};

export default EnvBanner;
