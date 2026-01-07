"use client";
import Image from "next/image";
import Tags from "./Tags";
import Link from "next/link";
import { FooterProps } from "../types/header-footer.type";

const Footer = ({ data }: FooterProps) => {
  const { Logo, FollowUs, Legal, menu } = data;
  return (
    <footer>
      <div className="bg-white container !py-[30px] lg:!py-[60px] grid lg:grid-cols-4 gap-x-[60px]">
        <div className="lg:col-span-1 grid content-between">
          <div className="mb-[unset] md:mb-[30px] lg:mb-[unset] w-[124px] md:w-[190px] h-12 md:h-[74px]">
            {Logo?.Logo?.url && (
              <Image
                src={Logo?.Logo?.url}
                alt="logo"
                width={190}
                height={73}
                priority
                className="w-full h-full"
              />
            )}
            <div
              className="mt-[40px] text-[14px] font-roboto text-[#002F50] hidden lg:block"
              dangerouslySetInnerHTML={{
                __html: "Follow Us",
              }}
            />
            <div className="hidden lg:grid mt-[15px] lg:grid-cols-4 2xl:grid-cols-5 w-fit gap-2">
              {FollowUs?.map((items) => (
                <Link
                  key={items?.id}
                  href={items?.link ? items?.link : ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="bg-[#E55E2C] w-[42px] h-[42px] grid place-items-center rounded-full overflow-hidden 
             transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
             hover:scale-110  hover:shadow-lg hover:shadow-[#E55E2C]/30"
                  >
                    {items?.image?.url && (
                      <Image
                        src={items?.image?.url}
                        alt="icon"
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain transition-transform duration-300 ease-in-out"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 grid lg:grid-cols-12 gap-[20px] gap-y-[36px] mt-[40px] md:mt-[unset] ">
          <div className="lg:col-span-3">
            <div>
              {menu?.[0]?.category && (
                <Tags
                  title={menu[0]?.category}
                  className="mb-[14px] uppercase !text-orange-200"
                />
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
                <div className=" grid">
                  {menu?.[0]?.subMenu?.[0]?.title && (
                    <div className="text-[14px] py-[5px] font-roboto font-normal text-[#999999]">
                      {menu[0]?.subMenu?.[0]?.title}
                    </div>
                  )}
                  {menu?.[0]?.subMenu?.[0]?.item?.map((items) => {
                    const link = items?.cta_link?.link ?? items?.externalLink;
                    if (!link) return null;
                    return (
                      <a
                        key={items?.id}
                        href={link}
                        className="text-[14px] my-[5px] font-roboto font-normal text-[#585858] footer-animated-underline"
                      >
                        {items?.subMenuTitle}
                      </a>
                    );
                  })}
                </div>
                <div className="grid">
                  <div className="text-[14px] py-[5px] font-roboto font-normal text-[#999999]">
                    {menu?.[0]?.subMenu?.[1]?.title}
                  </div>
                  {menu?.[0]?.subMenu?.[1]?.item?.map((items) => {
                    const link = items?.cta_link?.link ?? items?.externalLink;
                    if (!link) return null;
                    return (
                      <a
                        key={items.id}
                        href={link}
                        className="text-[14px] my-[5px] font-roboto font-normal text-[#585858] footer-animated-underline"
                      >
                        {items?.subMenuTitle}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:col-span-9 grid-cols-2 md:grid-cols-3 gap-y-[10px]">
            {menu?.slice(1).map((section) => (
              <div key={section?.id}>
                {section?.category && (
                  <Tags
                    title={section?.category}
                    className="mb-[7px] lg:mb-[14px] uppercase !text-orange-200"
                  />
                )}
                <div>
                  <div className="text-[14px] lg:pb-[5px] font-roboto font-normal text-[#999999]">
                    {section?.subMenu?.map((item) => {
                      return (
                        <div
                          key={item?.id}
                          className="text-[14px] lg:pb-[5px] font-roboto font-normal text-[#999999]"
                        >
                          {item?.title}
                          <div className="grid mb-4 lg:mb-0">
                            {item?.item?.map((items) => {
                              const link =
                                items?.cta_link?.link ?? items?.externalLink;
                              if (!link) return null;
                              return (
                                <a
                                  key={items.id}
                                  href={link}
                                  className="text-[14px] my-[5px] font-roboto font-normal text-[#585858] footer-animated-underline"
                                >
                                  {items?.subMenuTitle}
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
            __html: "Follow Us",
          }}
        />
        <div className="mt-[15px] grid grid-cols-4 md:grid-cols-5 lg:hidden w-fit gap-2">
          {FollowUs?.map((item) => (
            <Link
              key={item?.id}
              href={item?.link ? item?.link : ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="bg-[#E55E2C] w-[42px] h-[42px] grid place-items-center rounded-full overflow-hidden 
             transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
             hover:scale-110  hover:shadow-xl hover:shadow-[#E55E2C]/30"
              >
                {item?.image?.url && (
                  <Image
                    src={item?.image?.url}
                    alt="icon"
                    width={24}
                    height={24}
                    className="w-6 h-6  object-contain transition-transform duration-300 ease-in-out"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="container h-[1px] w-full bg-grey-200 mb-[24px]" />
      <div className="container w-full mb-[24px] grid lg:flex lg:justify-between">
        {Legal?.leftText && (
          <p className="font-roboto text-center lg:text-left mt-[18px] lg:mt-[unset] text-[14px] leading-[100%] font-normal text-grey-400 order-1 lg:order-0">
            {Legal?.leftText}
          </p>
        )}
        <div className="flex flex-nowrap  gap-x-[16px] lg:gap-x-[24px] order-0 lg:order-1 justify-between">
          {Legal?.data?.map((items) => {
            if (!items?.link) return null;
            return (
              <a
                key={items?.id}
                href={items?.link}
                className="cursor-pointer font-roboto text-[12px] md:text-[14px] leading-[100%] font-normal text-grey-400 my-[0.5px] footer-animated-underline text-center"
              >
                {items?.text}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;