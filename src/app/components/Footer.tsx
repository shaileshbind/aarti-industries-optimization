"use client";
import React from "react";
import Image from "next/image";
import Tags from "./Tags";
import Link from "next/link";

const footerData = {
  footer_logo_section: {
    text: "Follow Us",
    footer_socials: {
      social_medias: [
        {
          id: 1,
          link: "https://facebook.com",
          image_desktop: "/images/logo-fb.svg",
          image_mobile: "/images/logo-fb.svg",
        },
        {
          id: 2,
          link: "https://twitter.com",
          image_desktop: "/images/logo-x.svg",
          image_mobile: "/images/logo-x.svg",
        },
        {
          id: 3,
          link: "https://instagram.com",
          image_desktop: "/images/logo-insta.svg",
          image_mobile: "/images/logo-insta.svg",
        },
        {
          id: 4,
          link: "https://youtube.com",
          image_desktop: "/images/logo-yt.svg",
          image_mobile: "/images/logo-yt.svg",
        },
      ],
    },
  },
  copy_rights: "© 2025 Aarti Industries Ltd.",
  footer_menus: [
    {
      id: 0,
      title: "Company",
      sub_menus: [
        {
          id: 0,
          title: "Discover Aarti",
          menus: [
            {
              id: 1,
              title: "Who we are",
              link: "#",
            },
            {
              id: 2,
              title: "Our Story",
              link: "#",
            },
            {
              id: 3,
              title: "Industries we Serve",
              link: "#",
            },
            {
              id: 4,
              title: "Global Reach",
              link: "#",
            },
          ],
          link: "#",
        },
        {
          id: 0,
          title: "Capabilities & Partnerships",
          menus: [
            {
              id: 0,
              title: "R&D",
              link: "#",
            },
            {
              id: 1,
              title: "Aarti Advantage",
              link: "#",
            },
            {
              id: 2,
              title: "Digital Transformation",
              link: "#",
            },
            {
              id: 3,
              title: "Manufacturing Capabilities",
              link: "#",
            },
            {
              id: 4,
              title: "Partnership",
              link: "#",
            },
          ],
          link: "#",
        },
      ],
    },
    {
      id: 1,
      title: "Business",
      sub_menus: [
        {
          id: 0,
          title: "",
          menus: [
            {
              id: 0,
              title: "CDMO",
              link: "#",
            },
            {
              id: 1,
              title: "Analytical Testing",
              link: "#",
            },
            {
              id: 2,
              title: "Process Safety Testing Services",
              link: "#",
            },
            {
              id: 3,
              title: "Aarti Mahasuper",
              link: "#",
            },
          ],
          link: "#",
        },
      ],
    },
    {
      id: 2,
      title: "Sustainability",
      sub_menus: [
        {
          id: 0,
          title: "",
          menus: [
            {
              id: 0,
              title: "Environment",
              link: "#",
            },
            {
              id: 1,
              title: "Social",
              link: "#",
            },
            {
              id: 2,
              title: "Responsible Supply Chain",
              link: "#",
            },
            {
              id: 3,
              title: "Health & Safety",
              link: "#",
            },
          ],
          link: "#",
        },
      ],
    },
    {
      id: 3,
      title: "Investors",
      sub_menus: [
        {
          id: 0,
          title: "",
          menus: [
            {
              id: 0,
              title: "Overview",
              link: "#",
            },
            {
              id: 1,
              title: "Financial Information",
              link: "#",
            },
            {
              id: 2,
              title: "Shareholders Information",
              link: "#",
            },
            {
              id: 3,
              title: "Governance",
              link: "#",
            },
            {
              id: 4,
              title: "Policies & Code",
              link: "#",
            },
            {
              id: 5,
              title: "Ethics",
              link: "#",
            },
          ],
          link: "#",
        },
      ],
    },
    {
      id: 4,
      title: "Resources",
      sub_menus: [
        {
          id: 0,
          title: "",
          menus: [
            {
              id: 0,
              title: "Newsroom",
              link: "#",
            },
            {
              id: 1,
              title: "Press Releases",
              link: "#",
            },
            {
              id: 2,
              title: "Webinars",
              link: "#",
            },
            {
              id: 3,
              title: "Media Kit",
              link: "#",
            },
            {
              id: 4,
              title: "Blogs ",
              link: "#",
            },
          ],
          link: "#",
        },
      ],
    },
    {
      id: 5,
      title: "Career",
      sub_menus: [
        {
          id: 0,
          title: "",
          menus: [
            {
              id: 0,
              title: "Life at Aarti",
              link: "#",
            },
            {
              id: 1,
              title: "Learning & Development",
              link: "#",
            },
            {
              id: 2,
              title: "Campus",
              link: "#",
            },
          ],
          link: "#",
        },
      ],
    },
    {
      id: 6,
      title: "Contact",
      sub_menus: [
        {
          id: 0,
          title: "",
          menus: null,
          link: "#",
        },
      ],
    },
  ],
};
const Footer = () => {
  return (
    <footer>
      <div className="bg-white container !py-[30px] lg:!py-[60px] grid lg:grid-cols-4 gap-x-[60px]">
        <div className="lg:col-span-1 grid content-between">
          <div>
            <Image
              src="/images/logo.png"
              alt="logo"
              width={190}
              height={73}
              priority
            />
            <div
              className="mt-[40px] text-[14px] font-roboto text-[#002F50] hidden md:block"
              dangerouslySetInnerHTML={{
                __html: footerData.footer_logo_section.text,
              }}
            />
            <div className=" hidden md:grid mt-[15px] grid-cols-4 w-fit gap-x-[8px]">
              {footerData.footer_logo_section.footer_socials.social_medias.map(
                (item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-[#E55E2C] w-[42px] h-[42px] grid place-items-center rounded-[50%] overflow-hidden">
                      <Image
                        src={item.image_desktop}
                        alt="icon"
                        width={24}
                        height={24}
                        className="w-[24px] h-[24px] rounded-[50%] object-contain"
                      />
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 grid lg:grid-cols-12 gap-[20px] gap-y-[36px] mt-[40px] md:mt-[unset]">
          <div className="lg:col-span-3">
            <div>
              <Tags
                title={footerData?.footer_menus[0]?.title}
                className="mb-[20px]"
              />
              <div className="grid grid-cols-2 md:grid-cols-1">
                <div className=" grid">
                  <div className="text-[14px] py-[5px] font-roboto font-normal text-[#999999]">
                    {footerData?.footer_menus[0]?.sub_menus[0]?.title}
                  </div>
                  {footerData?.footer_menus[0]?.sub_menus[0]?.menus?.map(
                    (items) => {
                      return (
                        <a
                          key={items.id}
                          href={items?.link}
                          className="text-[14px] py-[5px] font-roboto font-normal text-[#585858]"
                        >
                          {items?.title}
                        </a>
                      );
                    }
                  )}
                </div>
                <div className="grid">
                  <div className="text-[14px] py-[5px] font-roboto font-normal text-[#999999]">
                    {footerData?.footer_menus[0]?.sub_menus[1]?.title}
                  </div>
                  {footerData?.footer_menus[0]?.sub_menus[1]?.menus?.map(
                    (items) => {
                      return (
                        <a
                          key={items.id}
                          href={items?.link}
                          className="text-[14px] py-[5px] font-roboto font-normal text-[#585858]"
                        >
                          {items?.title}
                        </a>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:col-span-9 grid-cols-2 md:grid-cols-3 gap-y-[10px]">
            {footerData.footer_menus.slice(1).map((section) => (
              <div key={section?.id} className="">
                <Tags title={section.title} className="mb-[20px]" />
                <div>
                  <div className="text-[14px] py-[5px] font-roboto font-normal text-[#999999]">
                    {section?.sub_menus.map((item) => {
                      return (
                        <div
                          key={item?.id}
                          className="text-[14px] py-[5px] font-roboto font-normal text-[#999999]"
                        >
                          {item?.title}
                          <div className="grid">
                            {item?.menus?.map((items) => {
                              return (
                                <a
                                  key={items.id}
                                  href={items?.link}
                                  className="text-[14px] py-[5px] font-roboto font-normal text-[#585858]"
                                >
                                  {items?.title}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="mt-[40px] text-[14px] font-roboto text-[#002F50] block lg:hidden"
          dangerouslySetInnerHTML={{
            __html: footerData.footer_logo_section.text,
          }}
        />
        <div className=" mt-[15px] grid grid-cols-4 lg:hidden w-fit gap-x-[8px]">
          {footerData.footer_logo_section.footer_socials.social_medias.map(
            (item) => (
              <Link
                key={item?.id}
                href={item?.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-[#E55E2C] w-[42px] h-[42px] grid place-items-center rounded-[50%] overflow-hidden">
                  <Image
                    src={item.image_desktop}
                    alt="icon"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] rounded-[50%] object-contain"
                  />
                </div>
              </Link>
            )
          )}
        </div>
      </div>
      <div className="container h-[1px] w-full bg-grey-200 mb-[24px]" />
      <div className="container w-full mb-[24px] grid lg:flex lg:justify-between">
        <p className="font-roboto text-center lg:text-left mt-[18px] md:mt-[unset] text-[14px] leading-[100%] font-normal text-[#343434] order-1 lg:order-0">
          {footerData?.copy_rights}
        </p>
        <div className="flex flex-nowrap  gap-x-[16px] lg:gap-x-[24px] order-0 lg:order-1">
          <p className="cursor-pointer font-roboto text-[14px] leading-[100%] font-normal text-[#343434]">
            Legal Disclaimer
          </p>
          <p className="cursor-pointer font-roboto text-[14px] leading-[100%] font-normal text-[#343434]">
            Privacy Policy
          </p>
          <p className="cursor-pointer  font-roboto text-[14px] leading-[100%] font-normal text-[#343434]">
            Sitemap
          </p>
          <p className="cursor-pointer  font-roboto text-[14px] leading-[100%] font-normal text-[#343434]">
            Job Fraud Alert
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
