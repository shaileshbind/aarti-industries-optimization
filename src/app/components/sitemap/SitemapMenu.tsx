import Link from "next/link";
import Tags from "../Tags";
import type { SitemapMenuData } from "@/app/types/sitemap.type";

type SitemapMenuProps = {
  menu?: SitemapMenuData | null;
};

const SitemapMenu = ({ menu }: SitemapMenuProps) => {
  if (!menu?.length) return null;

  return (
    <div className="bg-transparent container !py-[50px] lg:!py-[120px]">
      <div className="grid lg:grid-cols-12 gap-[20px] gap-y-[36px]">
        {/* First category with special layout (like Company) */}
        <div className="lg:col-span-3">
          <div>
            {menu?.[0]?.category && (
              <Tags
                title={menu[0]?.category}
                className="mb-[14px] uppercase !text-orange-200"
              />
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
              {/* Same mapping style as Footer */}
              <div className="grid">
                {menu?.[0]?.subMenu?.[0]?.title && (
                  <div className="text-[14px] py-[5px] font-roboto font-normal text-[#999999]">
                    {menu[0]?.subMenu?.[0]?.title}
                  </div>
                )}
                {menu?.[0]?.subMenu?.[0]?.item?.map((items) => {
                  const link = items?.cta_link?.link ?? items?.externalLink;
                  if (!link) return null;
                  return (
                    <Link
                      key={items?.id}
                      href={link}
                      className="text-[14px] my-[5px] font-roboto font-normal text-[#585858] footer-animated-underline"
                    >
                      {items?.subMenuTitle}
                    </Link>
                  );
                })}
              </div>
              <div className="grid">
                {menu?.[0]?.subMenu?.[1]?.title && (
                  <div className="text-[14px] py-[5px] font-roboto font-normal text-[#999999]">
                    {menu[0]?.subMenu?.[1]?.title}
                  </div>
                )}
                {menu?.[0]?.subMenu?.[1]?.item?.map((items) => {
                  const link = items?.cta_link?.link ?? items?.externalLink;
                  if (!link) return null;
                  return (
                    <Link
                      key={items?.id}
                      href={link}
                      className="text-[14px] my-[5px] font-roboto font-normal text-[#585858] footer-animated-underline"
                    >
                      {items?.subMenuTitle}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Remaining categories */}
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
                              <Link
                                key={items.id}
                                href={link}
                                className="text-[14px] my-[5px] font-roboto font-normal text-[#585858] footer-animated-underline"
                              >
                                {items?.subMenuTitle}
                              </Link>
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
    </div>
  );
};

export default SitemapMenu;
