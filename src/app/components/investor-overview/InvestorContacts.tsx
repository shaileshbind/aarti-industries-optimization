import React from "react";
import { BodyText2, BodyText3, Cta, H3, SubH3 } from "../Typography2";
import Image from "next/image";

const InvestorContacts = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-[280px_1fr] xl:grid-cols-[340px_1fr] gap-x-[72px]  gap-y-[36px]  fluid-container mb-[72px] lg:mb-[120px]">
        <H3 className="!text-[24px] block lg:hidden">Investor Contacts</H3>
        <div className="rounded-[20px] overflow-hidden bg-blue-100 h-[420px] hidden lg:block">
          <H3 className="text-white py-[30px] px-[36px]">Investor Contacts</H3>
          <div className="w-full h-full relative">
            <Image
              src="/images/home/hero-banner1.png"
              alt="img"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-x-[72px] gap-y-[50px] lg:gap-y-[60px]">
          {[...Array(4)].map((_, index) => {
            return (
              <div key={index}>
                <Cta className="text-orange-200 !text-[12px] uppercase">
                  FOR SHAREHOLDER & GRIEVANCES
                </Cta>
                <SubH3 className="mt-[10px]">Mr. Raj Sarraf</SubH3>
                <BodyText3 className="mt-[8px] !text-[14px]">
                  Company Secretary & Compliance Officer
                </BodyText3>
                <BodyText3 className="mt-[6px] !text-[14px]">
                  Embassy 247 Park, Tower C, 4th Floor, Gandhi Nagar, Vikhroli
                  West, Mumbai - 400083, Maharashtra, India
                </BodyText3>
                <div className="mt-[10px] flex gap-x-[8px] items-center">
                  <Image
                    src="/images/home/hero-banner1.png"
                    alt="img"
                    width={16}
                    height={16}
                    className="h-4 w-4 object-cover shrink-0"
                  />
                  <BodyText2 className="!text-[14px] lg:!text-[16px]">
                    +91 22 6943 6100
                  </BodyText2>
                </div>
                <div className="mt-[10px] flex gap-x-[8px] items-center">
                  <Image
                    src="/images/home/hero-banner1.png"
                    alt="img"
                    width={16}
                    height={16}
                    className="h-4 w-4 object-cover shrink-0"
                  />
                  <BodyText2 className="!text-[14px] lg:!text-[16px]">
                    investorrelations@aarti-industries.com
                  </BodyText2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvestorContacts;
