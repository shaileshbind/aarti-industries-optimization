"use client";
import React from "react";
import Image from "next/image";
import Tags from "./Tags";

// Static JSON data
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
      id: 1,
      title: "Company",
      sub_menus: [
        {
          id: 1,
          title: "Discover Aarti",
          link: "#",
        },
        {
          id: 2,
          title: "Who we are",
          link: "#",
        },
        {
          id: 3,
          title: "Our Story",
          link: "#",
        },
        {
          id: 4,
          title: "Industries we Serve",
          link: "#",
        },
        {
          id: 5,
          title: "Global Reach",
          link: "#",
        },
      ],
    },
    {
      id: 2,
      title: "Business",
      sub_menus: [
        {
          id: 1,
          title: "CDMO",
          link: "#",
        },
        {
          id: 2,
          title: "Analytical Testing",
          link: "#",
        },
        {
          id: 3,
          title: "Process Safety Testing Services",
          link: "#",
        },
        {
          id: 4,
          title: "Aarti Mahasuper",
          link: "#",
        },
      ],
    },
    {
      id: 3,
      title: "Sustainability",
      sub_menus: [
        {
          id: 1,
          title: "Environment",
          link: "#",
        },
        {
          id: 2,
          title: "Social",
          link: "#",
        },
        {
          id: 3,
          title: "Responsible Supply Chain",
          link: "#",
        },
        {
          id: 4,
          title: "Health & Safety",
          link: "#",
        },
      ],
    },
    {
      id: 4,
      title: "Investors",
      sub_menus: [
        {
          id: 1,
          title: "Overview",
          link: "#",
        },
        {
          id: 2,
          title: "Financial Information",
          link: "#",
        },
        {
          id: 3,
          title: "Shareholders Information",
          link: "#",
        },
        {
          id: 4,
          title: "Governance",
          link: "#",
        },
        {
          id: 5,
          title: "Policies & Code",
          link: "#",
        },
        {
          id: 6,
          title: "Ethics",
          link: "#",
        },
      ],
    },
    {
      id: 5,
      title: "Capabilities & Partnerships",
      sub_menus: [
        {
          id: 1,
          title: "R&D",
          link: "#",
        },
        {
          id: 2,
          title: "Aarti Advantage",
          link: "#",
        },
        {
          id: 3,
          title: "Digital Transformation",
          link: "#",
        },
        {
          id: 4,
          title: "Manufacturing Capabilities",
          link: "#",
        },
        {
          id: 5,
          title: "Partnership",
          link: "#",
        },
      ],
    },
    {
      id: 6,
      title: "Resources",
      sub_menus: [
        {
          id: 1,
          title: "Newsroom",
          link: "#",
        },
        {
          id: 2,
          title: "Press Releases",
          link: "#",
        },
        {
          id: 3,
          title: "Webinars",
          link: "#",
        },
        {
          id: 4,
          title: "Blogs",
          link: "#",
        },
        {
          id: 5,
          title: "Media Kit",
          link: "#",
        },
      ],
    },
    {
      id: 7,
      title: "Career",
      sub_menus: [
        {
          id: 1,
          title: "Life at Aarti",
          link: "#",
        },
        {
          id: 2,
          title: "Learning & Development",
          link: "#",
        },
        {
          id: 3,
          title: "Campus",
          link: "#",
        },
      ],
    },
    {
      id: 8,
      title: "Contact",
      sub_menus: [],
    },
  ],
};

const Footer = () => {
 
  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden lg:block">
        <div className="bg-white container !py-[60px] grid grid-cols-4 gap-x-[60px]">
          <div className="col-span-1 grid content-between">
            <div>
              <Image
                src="/images/logo.png"
                alt="logo"
                width={190}
                height={73}
                priority
              />
              <div
                className="mt-[40px] text-[14px] font-roboto text-[#002F50]"
                dangerouslySetInnerHTML={{
                  __html: footerData.footer_logo_section.text,
                }}
              />
              <div className="mt-[15px] grid grid-cols-4 w-fit gap-x-[8px]">
                {footerData.footer_logo_section.footer_socials.social_medias.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="bg-[#E55E2C] w-[42px] h-[42px] grid place-items-center rounded-[50%] overflow-hidden"
                    >
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={item.image_desktop}
                          alt="icon"
                          width={24}
                          height={24}
                          className="w-[24px] h-[24px] rounded-[50%] object-contain"
                        />
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-4 gap-[20px]">
            {footerData.footer_menus.slice(0, 4).map((section) => (
              <div key={section.id}>
                <Tags title={section?.title} className="mb-[20px]" />
                <div className="grid">
                  {section.sub_menus.map((item) => (
                    <a
                      key={item.id}
                      href={item.link}
                      className="block text-[14px] py-[5px] font-roboto font-normal text-[#585858]"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            {footerData.footer_menus.slice(4).map((section) => (
              <div key={section.id} className="mt-[30px]">
                <Tags title={section.title} />
                <div className="grid">
                  {section.sub_menus.map((item) => (
                    <a
                      key={item.id}
                      href={item.link}
                      className="block text-[14px] py-[5px] font-roboto font-normal text-[#585858]"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container h-[1px] w-full bg-grey-200 mb-[24px]" />
        <div className="container w-full mb-[24px] flex justify-between">
          <p className="font-roboto text-[14px] leading-[100%] font-normal text-[#585858]">
            {footerData?.copy_rights}
          </p>
          <div className="flex gap-x-[24px]">
            <p className="cursor-pointer font-roboto text-[14px] leading-[100%] font-normal text-[#585858]">
              Legal Disclaimer
            </p>
            <p className="cursor-pointer font-roboto text-[14px] leading-[100%] font-normal text-[#585858]">
              Privacy Policy
            </p>
            <p className="cursor-pointer  font-roboto text-[14px] leading-[100%] font-normal text-[#585858]">
              Sitemap
            </p>
            <p className="cursor-pointer  font-roboto text-[14px] leading-[100%] font-normal text-[#585858]">
              Job Fraud Alert
            </p>
          </div>
        </div>
      </footer>
      {/* Mobile Footer */}
      <footer className={`block lg:hidden container !py-[30px]`}>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={156}
          height={60}
          priority
        />

        <div className="mt-[40px] grid grid-cols-2 gap-[20px]">
          {footerData.footer_menus?.map((section) => (
            <div key={section?.id}>
              <Tags title={section?.title} className="mb-[20px]" />
              <div className="grid">
                {section.sub_menus.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="block text-[14px] py-[5px] font-roboto font-normal text-[#585858]"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-[40px]">{footerData.footer_logo_section.text}</p>
        <div className="mt-[15px] grid grid-cols-4 w-fit gap-x-[8px]">
          {footerData.footer_logo_section.footer_socials.social_medias.map(
            (item) => (
              <div
                key={item.id}
                className="bg-[#E55E2C] w-[42px] h-[42px] grid place-items-center rounded-[50%] overflow-hidden"
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={item.image_desktop}
                    alt="icon"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] rounded-[50%] object-contain"
                  />
                </a>
              </div>
            )
          )}
        </div>

        <div className="container h-[1px] w-full bg-grey-200 mt-[40px]" />
        <div className="mt-[16px] flex gap-x-[12px] justify-between">
          <p className="cursor-pointer font-roboto text-[12px] leading-[100%] font-normal text-[#585858]">
            Legal Disclaimer
          </p>
          <p className="cursor-pointer font-roboto text-[12px] leading-[100%] font-normal text-[#585858]">
            Privacy Policy
          </p>
          <p className="cursor-pointer  font-roboto text-[12px] leading-[100%] font-normal text-[#585858]">
            Sitemap
          </p>
          <p className="cursor-pointer  font-roboto text-[12px] leading-[100%] font-normal text-[#585858]">
            Job Fraud Alert
          </p>
        </div>

        <p className="mt-[23px] mb-[44px] font-roboto text-[14px] text-center leading-[100%] font-normal text-[#585858]">
          {footerData?.copy_rights}
        </p>
      </footer>
    </>
  );
};

export default Footer;
