import React from "react";
import HeroBanner from "../banners/HeroBanner";

const PartnershipBanner = () => {
  return (
    <div>
      <HeroBanner
        fullBg
        title={"Contract Manufacturing & Strategic Partnerships"}
        image={"/images/partnership/banner.png"}
        mobImage={"/images/partnership/banner.png"}
        alt={"banner"}
        mobAlt={"banner"}
        secondaryBtnLeftTitle="Partner With Us"
        secondaryBtnLeftLink="#"
        secondaryBtnRightTitle="Explore Partnership Model"
        secondaryBtnRightLink="#"
      />
    </div>
  );
};

export default PartnershipBanner;
