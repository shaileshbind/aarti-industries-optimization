import { getBlogsCasestudies } from "@/_lib/getBlogsCaseStudies.fetch";
import { getData } from "@/_lib/getData.fetch";
import CopyLink from "@/app/components/blogs/CopyLink";
import Share from "@/app/components/blogs/Share";
import DateCard from "@/app/components/cards/DateCard";
import ContactBanner from "@/app/components/ContactBanner";
import GloballyCertified from "@/app/components/GloballyCertified";
import { BodyText2, H2, H3, SubH1 } from "@/app/components/Typography2";
import {
  BlogInnerProps,
  PointerProps,
  RelatedBogsProps,
} from "@/app/types/blogs.type";
import Image from "next/image";
import React from "react";
import { formatDate } from "../../../../utils/formatDate";
import SEO from "@/app/components/SEO";
import clsx from "clsx";
import StickyShare from "@/app/components/blogs/StickyShare";
import { FadeInReveal } from "@/app/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function page({ params }: BlogInnerProps) {
  const { blogInner } = await params;
  const data = await getBlogsCasestudies(
    `/blog-case-study/by-slug/${blogInner}`
  );

  const relatedBlogs = await getBlogsCasestudies(
    `/blog-case-studies?sort[0]=date:desc&filters[type][$eq]=blog&populate[thumbnailImageDesktop][fields][0]=url&populate[thumbnailImageDesktop][fields][1]=alternativeText&populate[thumbnailImageDesktop][fields][2]=mime&populate[thumbnailImageDesktop][fields][3]=ext&populate[thumbnailImageMobile][fields][0]=url&populate[thumbnailImageMobile][fields][1]=alternativeText&populate[thumbnailImageMobile][fields][2]=mime&populate[thumbnailImageMobile][fields][3]=ext&fields[0]=title&fields[1]=date&fields[2]=type&fields[3]=excerpt&fields[4]=slug&filters[documentId][$ne]=${data?.data?.[0]?.documentId}&pagination[pageSize]=4&pagination[page]=1&status=published`
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
    ctaSection,
    shareViaSocials,
  } = data?.data?.[0];

  const seo = data?.data?.[0]?.seo;

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <>
      <SEO
        title={seo?.title ?? "Blogs"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          `https://www.aarti-industries.com/blogs/${blogInner}`
        }
        robots={seo?.robots ?? "index, follow"}
        ogURL={seo?.ogURL}
        ogImg={seo?.ogImg?.url}
        ogTitle={seo?.ogTitle}
        ogDesc={seo?.ogDesc}
        twtUrl={seo?.twtUrl}
        twtImg={seo?.twtImg?.url}
        twtTitle={seo?.twtTitle}
        twtDesc={seo?.twtDesc}
        schemaData={seo?.schemaData}
      />

      <div className="pt-[50px] lg:pt-[140px] fluid-container">
        <div className="md:flex items-start gap-[60px] relative">
          <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%]">
            {date && (
              <p className="text-sm text-[#DC4C03]">{formatDate(date)}</p>
            )}

            {title && <H3 className="py-1">{title}</H3>}

            {bannerImageDesktop?.url && (
              <FadeInReveal className="w-full h-[280px] md:h-[350px] lg:h-[406px] rounded-[20px] overflow-hidden mt-6 mb-4 md:mb-[30px]">
                <Image
                  src={bannerImageDesktop?.url}
                  width={872}
                  height={406}
                  alt={bannerImageDesktop?.all || "banner"}
                  className="w-full h-full object-cover"
                />
              </FadeInReveal>
            )}

            {bannerDescription && (
              <FadeInReveal delay={0.1}>
                <BodyText2>{bannerDescription}</BodyText2>
              </FadeInReveal>
            )}

            {pointers?.length > 0 && (
              <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 md:mb-16">
                {pointers?.map((item: PointerProps, index: number) => (
                  <FadeInReveal delay={index * 0.1} key={"num" + index}>
                    {item?.title && (
                      <H2 className="text-[#DC4C03] pb-1">{item?.title}</H2>
                    )}

                    <BodyText2>{item?.description}</BodyText2>
                  </FadeInReveal>
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

          <div className="hidden md:block">
            <StickyShare title={shareViaSocials?.title} />{" "}
          </div>

          <div className="block md:hidden">
            <div className="mt-6">
              <p className="text-[#002F50] text-base pb-4">
                {shareViaSocials?.title}
              </p>
              <div className="flex gap-4 items-start">
                <Share />
                <CopyLink />
              </div>
            </div>
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs?.data?.length > 0 && (
          <div className="pb-[72px] md:pb-[100px] pt-[72px] lg:pt-[120px]">
            {relatedBlogSecTitle && <SubH1>{relatedBlogSecTitle}</SubH1>}

            {relatedBlogs?.data?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mt-[30px]">
                {relatedBlogs?.data
                  ?.slice(0, 4)
                  ?.map((item: RelatedBogsProps, index: number) => (
                    <FadeInReveal
                      delay={index * 0.2}
                      key={"item_" + index}
                      className="relative"
                    >
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
                    </FadeInReveal>
                  ))}
              </div>
            )}
          </div>
        )}

        {globallyCertifiedData && (
          <div
            className={clsx(
              (relatedBlogs?.data?.length === 0 || !relatedBlogs) &&
                "mt-[72px] lg:mt-[140px]"
            )}
          >
            <GloballyCertified itemsData={globallyCertifiedData} />
          </div>
        )}

        {ctaSection && (
          <ContactBanner
            data={ctaSection}
            src={"/images/download-icon-orange.svg"}
            className="w-[240px] md:w-full"
          />
        )}
      </div>
    </>
  );
}
