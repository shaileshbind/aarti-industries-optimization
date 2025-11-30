import { getBlogsCasestudies } from "@/_lib/getBlogsCaseStudies.fetch";
import { getData } from "@/_lib/getData.fetch";
import CopyLink from "@/app/components/blogs/CopyLink";
import Share from "@/app/components/blogs/Share";
import DateCard from "@/app/components/cards/DateCard";
import ContactBanner from "@/app/components/ContactBanner";
import GloballyCertified from "@/app/components/GloballyCertified";
import { BodyText2, H2, H3, SubH1 } from "@/app/components/Typography2";
import {
  CaseStuydInnerProps,
  PointerProps,
  RelatedBogsProps,
} from "@/app/types/blogs.type";
import Image from "next/image";
import React from "react";
import { formatDate } from "../../../../utils/formatDate";

export const dynamic = "force-dynamic";

export default async function page({ params }: CaseStuydInnerProps) {
  const { caseStudyInner } = await params;
  const data = await getBlogsCasestudies(
    `/blog-case-study/by-slug/${caseStudyInner}`
  );

  const {
    date,
    title,
    bannerImageDesktop,
    bannerDescription,
    relatedBlogSecTitle,
    pointers,
    type,
    contentSections,
    shareViaSocials,
    relatedBlogs,
  } = data?.data?.[0];

  console.log("data", data);

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div className="pt-[72px] lg:pt-[140px] fluid-container">
      <div className="md:flex items-start gap-[60px] relative">
        <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%]">
          {date && <p className="text-sm text-[#DC4C03]">{formatDate(date)}</p>}

          {title && <H3>{title}</H3>}

          {bannerImageDesktop?.url && (
            <div className="w-full h-[280px] md:h-[350px] lg:h-[406px] rounded-[20px] overflow-hidden mt-6 mb-4 md:mb-[30px]">
              <Image
                src={bannerImageDesktop?.url}
                width={872}
                height={406}
                alt={bannerImageDesktop?.all || "banner"}
                className="w-full h-full"
              />
            </div>
          )}

          {bannerDescription && <BodyText2>{bannerDescription}</BodyText2>}

          {pointers?.length > 0 && (
            <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 md:mb-16">
              {pointers?.map((item: PointerProps, index: number) => (
                <div key={"num" + index}>
                  {item?.title && (
                    <H2 className="text-[#DC4C03] pb-1">{item?.title}</H2>
                  )}

                  <BodyText2>{item?.description}</BodyText2>
                </div>
              ))}
            </div>
          )}

          {/* Rich Text */}
          {contentSections?.[0]?.description && (
            <div className="blogInner">
              <div
                dangerouslySetInnerHTML={{
                  __html: contentSections?.[0]?.description,
                }}
              />
            </div>
          )}
        </div>

        <div className="mt-6 md:mt-24 md:sticky md:top-24">
          <p className="text-[#002F50] text-base pb-4">
            {shareViaSocials?.title}
          </p>
          <div className="flex gap-4 items-start">
            <Share />
            <CopyLink />
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      <div className="pb-[72px] md:pb-[100px] pt-[72px] lg:pt-[120px]">
        {relatedBlogSecTitle && <SubH1>{relatedBlogSecTitle}</SubH1>}

        {relatedBlogs?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mt-[30px]">
            {relatedBlogs
              ?.slice(0, 4)
              ?.map((item: RelatedBogsProps, index: number) => (
                <div key={"item_" + index} className="relative">
                  <DateCard
                    imageSrc={item?.thumbnailImageDesktop?.url}
                    date={formatDate(item?.date)}
                    desc={item?.excerpt}
                    link={
                      type === "blog"
                        ? `/blogs/${item?.slug}`
                        : `/case-studies/${item?.slug}`
                    }
                    animate
                    useTargetBlank={false}
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {data?.sectionTen && <ContactBanner data={data?.sectionTen} />}
    </div>
  );
}
