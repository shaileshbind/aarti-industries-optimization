import React from "react";
import { BodyText2, BodyText3, Cta, H3, SubH3 } from "../Typography2";
import Image from "next/image";
import { InvestorContactProps } from "@/app/types/investor-overview.type";

const InvestorContacts = ({ data }: InvestorContactProps) => {
  const { sectionTitle, image, investor_contacts } = data;
  return (
    <div>
      <div className="grid lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-x-[60px]  gap-y-[36px]  fluid-container mb-[72px] lg:mb-[120px]">
        {sectionTitle && (
          <H3 className="!text-[24px] block lg:hidden">{sectionTitle}</H3>
        )}
        <div className="rounded-[20px] overflow-hidden bg-blue-100 h-[420px] hidden lg:block">
          {sectionTitle && (
            <H3 className="text-white py-[30px] px-[36px]">{sectionTitle}</H3>
          )}
          <div className="w-full h-full relative">
            {image?.url && (
              <Image
                src={image?.url}
                alt={image?.alternativeText ? image?.alternativeText : "img"}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-[50px]">
          {investor_contacts?.map((items) => {
            return (
              <div key={items?.id}>
                {items?.tag && (
                  <Cta className="text-orange-200 !text-[12px] uppercase">
                    {items?.tag}
                  </Cta>
                )}
                {items?.name && (
                  <SubH3 className="mt-[10px]">{items?.name}</SubH3>
                )}
                <BodyText3 className="mt-[8px] !text-[14px]">
                  Company Secretary & Compliance Officer
                </BodyText3>
                {items?.address && (
                  <BodyText3 className="mt-[6px] !text-[14px]">
                    {items?.address}
                  </BodyText3>
                )}
                <div className="grid lg:grid-cols-2 items-start ">
                  {items?.mobile && (
                    <div className="mt-[10px] flex gap-x-[4px] items-center">
                      <Image
                        src="/images/phone.svg"
                        alt="img"
                        width={16}
                        height={16}
                        className="h-4 w-4 object-cover shrink-0"
                      />
                      <BodyText2 className="!text-[14px] lg:!text-[16px]">
                        {items?.mobile}
                      </BodyText2>
                    </div>
                  )}
                  {items?.fax && (
                    <div className="mt-[10px] flex gap-x-[4px] items-center">
                      <Image
                        src="/images/fax.svg"
                        alt="img"
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain shrink-0"
                      />
                      <BodyText2 className="!text-[14px] lg:!text-[16px]">
                        {items?.fax}
                      </BodyText2>
                    </div>
                  )}
                  {items?.website && (
                    <div className="mt-[10px] flex gap-x-[4px] items-center">
                      <Image
                        src="/images/website.svg"
                        alt="img"
                        width={16}
                        height={16}
                        className="h-4 w-4 object-cover shrink-0"
                      />
                      <BodyText2 className="!text-[14px] lg:!text-[16px]">
                        {items?.website}
                      </BodyText2>
                    </div>
                  )}
                  {items?.email && (
                    <div className="mt-[10px] flex gap-x-[4px] items-center">
                      <Image
                        src="/images/mail.svg"
                        alt="img"
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain shrink-0"
                      />
                      <BodyText2 className="!text-[14px] lg:!text-[16px]">
                        {items?.email}
                      </BodyText2>
                    </div>
                  )}
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
