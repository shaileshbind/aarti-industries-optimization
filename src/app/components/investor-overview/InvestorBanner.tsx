import React from "react";
import HeroBanner from "../banners/HeroBanner";

const InvestorBanner = () => {
  return (
    <div>
      <HeroBanner
        tag="Investor Overview"
        title="Annual Report 2024 - 2025"
        desc=""
        btnTitle="Download Annual Report"
        btnLink="#"
        image="/images/home/hero-banner1.png"
        mobImage="/images/home/hero-banner1.png"
        alt="img"
        mobAlt="img"
        fullBg
        showStar2={false}
        showStar3={false}
      />
    </div>
  );
};

export default InvestorBanner;
