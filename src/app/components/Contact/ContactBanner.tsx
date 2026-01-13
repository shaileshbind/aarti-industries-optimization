"use client";
import React from "react";
import Image from "next/image";
import { BodyText1, BodyText2, H2, SubH2 } from "../Typography2";
import Link from "next/link";
import { ContactBannerProps } from "@/app/types/contact.type";
import GeneralForm from "../forms/GeneralForm";

const ContactBanner: React.FC<ContactBannerProps> = ({ data }) => {
  return (
    <section className="w-full ">
      <div className="container">
        <H2 className="mb-[40px] mt-[50px] lg:mt-[145px] lg:text-center font-normal">
          {data?.sectionTitle}
        </H2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 gap-y-[50px] w-full">
          <div className="lg:col-span-5">
            <div className="relative w-full rounded-[20px] overflow-hidden bg-[#EFF3F5]">
              {/* Top Image Section */}
              {data?.office?.image?.url && (
                <div className="relative h-[240px] w-full overflow-hidden rounded-tl-[20px] rounded-tr-[20px]">
                  <Image
                    src={data.office.image.url}
                    alt={data.office.image.alternativeText || "banner"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content Section */}
              <div className="px-[30px] pb-[30px] pt-[30px]">
                {/* Corporate Office Label */}
                <div className="mb-[8px]">
                  <p className="font-alte-hans font-normal text-[14px] leading-[136%] text-orange-200">
                    {data?.office?.officeLabel}
                  </p>
                </div>

                {/* Company Name */}
                <div className="mb-[8px]">
                  <SubH2 className="text-blue-200">
                    {data?.office?.companyName}
                  </SubH2>
                </div>

                {/* Address */}
                <div className="mb-[24px]">
                  <BodyText2 className="text-grey-400">
                    {data?.office?.address}
                  </BodyText2>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-[8px] mb-[10px]">
                  <div className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M13.0027 7.93023C12.0788 7.00632 10.616 7.00632 9.69205 7.93023L8.22919 9.39308C7.99821 9.2391 7.30528 8.85414 6.92032 8.46917C6.53535 8.08421 6.15039 7.39128 5.99641 7.08331L7.45926 5.62045C8.38317 4.69654 8.38317 3.23368 7.45926 2.30977L5.76543 0.692932C4.84152 -0.230977 3.37866 -0.230977 2.45475 0.692932L0.837911 2.38677C-1.16389 4.38857 0.683925 8.85414 3.60964 11.8568C6.53535 14.7826 11.0779 16.6304 13.0797 14.6286L14.7736 12.9347C15.6975 12.0108 15.6975 10.548 14.7736 9.62406L13.0027 7.93023ZM13.6187 11.8568L11.9248 13.5507C10.9239 14.5516 7.38227 13.4737 4.68753 10.7789C1.9928 8.08421 0.914903 4.54256 1.91581 3.54165L3.60964 1.84782C3.91761 1.53985 4.45656 1.53985 4.76453 1.84782L6.45836 3.54165C6.76633 3.84962 6.76633 4.38857 6.45836 4.69654L4.76453 6.1594C3.91761 7.00632 5.0725 8.77714 5.84242 9.54707C6.30438 10.009 8.22919 11.5489 9.23009 10.625L10.8469 9.00812C11.1549 8.70015 11.6939 8.70015 12.0018 9.00812L13.6957 10.702C13.9266 11.0099 13.9266 11.4719 13.6187 11.8568Z"
                        fill="#4C5861"
                      />
                    </svg>
                  </div>
                  <BodyText1 className="text-grey-400">
                    {data?.office?.mobileNo
                      ?.split("/")
                      .map((phone, index, array) => {
                        const trimmedPhone = phone.trim();
                        // For numbers after the first one, construct full number by replacing last part
                        let fullNumber = trimmedPhone;
                        if (index > 0 && array[0]) {
                          const firstPart = array[0].trim();
                          const parts = firstPart.split(" ");
                          const baseNumber = parts.slice(0, -1).join(" ");
                          fullNumber = `${baseNumber} ${trimmedPhone}`;
                        }
                        return (
                          <React.Fragment key={index}>
                            <a
                              href={`tel:${fullNumber.replace(/\s+/g, "")}`}
                              className="hover:text-orange-200 transition-all duration-300 cursor-pointer"
                            >
                              {trimmedPhone}
                            </a>
                            {index < array.length - 1 && <span> / </span>}
                          </React.Fragment>
                        );
                      })}
                  </BodyText1>
                </div>

                {/* View on Map */}
                <div className="flex items-center gap-[8px]">
                  <div className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 15 18"
                      fill="none"
                    >
                      <path
                        d="M13.8409 7.29545C13.8409 12.3864 7.29545 16.75 7.29545 16.75C7.29545 16.75 0.75 12.3864 0.75 7.29545C0.75 5.55949 1.43961 3.89463 2.66712 2.66712C3.89463 1.43961 5.55949 0.75 7.29545 0.75C9.03142 0.75 10.6963 1.43961 11.9238 2.66712C13.1513 3.89463 13.8409 5.55949 13.8409 7.29545Z"
                        stroke="#4C5861"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.29545 9.47727C8.50044 9.47727 9.47727 8.50044 9.47727 7.29545C9.47727 6.09047 8.50044 5.11364 7.29545 5.11364C6.09047 5.11364 5.11364 6.09047 5.11364 7.29545C5.11364 8.50044 6.09047 9.47727 7.29545 9.47727Z"
                        stroke="#4C5861"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {data?.office?.googleMapLink && (
                    <Link
                      href={data.office.googleMapLink}
                      target="_blank"
                      className="group"
                    >
                      <BodyText1 className="text-grey-400 group-hover:text-orange-200 transition-all duration-300 cursor-pointer">
                        View on map
                      </BodyText1>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:col-span-7 lg:pl-[30px]">
            <GeneralForm
              showTitle={false}
              className="max-h-full overflow-y-visible pt-[0px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
