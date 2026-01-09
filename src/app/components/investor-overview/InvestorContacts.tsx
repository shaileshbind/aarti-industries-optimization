import { BodyText2, BodyText3, Cta, H3, SubH3 } from "../Typography2";
import Image from "next/image";
import { InvestorContactProps } from "@/app/types/investor-overview.type";
import clsx from "clsx";
import { FadeInReveal } from "../ScrollReveal";

const InvestorContacts = ({ data }: InvestorContactProps) => {
  const { sectionTitle, image, investor_contacts } = data;
  return (
    <FadeInReveal>
      <div className="grid lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-x-[50px]  gap-y-[36px]  fluid-container mb-[72px] lg:mb-[120px]">
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
        <div className="grid xl:grid-cols-2 gap-[50px]">
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
                <div
                  className={clsx(
                    "grid gap-x-[5px] items-start",
                    items?.fax ? "lg:grid-cols-2" : "lg:grid-cols-1",
                  )}
                >
                  {items?.mobile && (
                    <a
                      href={`tel:${items?.mobile}`}
                      className="mt-[10px] !flex gap-x-[4px] items-start footer-animated-underline"
                    >
                      <Image
                        src="/images/phone.svg"
                        alt="img"
                        width={16}
                        height={16}
                        className="h-4 w-4 object-cover shrink-0  mt-[5px]"
                      />
                      <BodyText2 className="!text-[14px] lg:!text-[16px]">
                        {items?.mobile}
                      </BodyText2>
                    </a>
                  )}
                  {items?.fax && (
                    <div className="mt-[10px] flex gap-x-[4px] items-start">
                      <Image
                        src="/images/fax.svg"
                        alt="img"
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain shrink-0 mt-[5px]"
                      />
                      <BodyText2 className="!text-[14px] lg:!text-[16px]">
                        {items?.fax}
                      </BodyText2>
                    </div>
                  )}
                  {items?.website && (
                    <a
                      href={
                        items?.website.startsWith("http")
                          ? items?.website
                          : `https://${items?.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-[10px] !flex gap-x-[4px] items-start footer-animated-underline"
                    >
                      <Image
                        src="/images/website.svg"
                        alt="img"
                        width={16}
                        height={16}
                        className="h-4 w-4 object-cover shrink-0 mt-[5px]"
                      />
                      <BodyText2 className="!text-[14px] lg:!text-[16px]">
                        {items?.website}
                      </BodyText2>
                    </a>
                  )}
                  {items?.email && (
                    <a
                      href={`mailto:${items?.email}`}
                      className="mt-[10px] !flex gap-x-[4px] items-start footer-animated-underline w-full"
                    >
                      <Image
                        src="/images/mail.svg"
                        alt="img"
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain shrink-0 mt-[5px]"
                      />
                      <BodyText2 className="!text-[14px] lg:!text-[16px] break-all w-full">
                        {items?.email}
                      </BodyText2>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FadeInReveal>
  );
};

export default InvestorContacts;
