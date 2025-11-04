import React from "react";
import BlackInfoSection from "../sections/BlackInfoSection";

const EnvStrong = () => {
  return (
    <div className="my-[50px] lg:my-[100px]">
      <BlackInfoSection
        image="/images/environment/strong-banner.png"
        mobAlt="ig"
        alt="img"
        mobImage="/images/environment/strong-banner.png"
        title="Strong Governance. Zero Compromise."
        description="Our ethical foundation is built on robust compliance. Led by our Board of Directors, we proactively adapt to global regulations using a digital Compliance Management System (CMS). This system tracks over 78 Acts and 10,000 legal provisions, ensuring we meet our obligations. Regular audits and a focus on transparency and accountability help us minimize risk and maintain business excellence."
        ctaLink="#"
        ctaTitle="View Our EC Compliance Report"
      />
    </div>
  );
};

export default EnvStrong;
