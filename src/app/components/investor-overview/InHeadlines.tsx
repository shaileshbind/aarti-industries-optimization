"use client";
import { useEffect, useState } from "react";
import { BodyText2, H2, SubH2 } from "../Typography2";
import Button from "../Button";
import DateCard from "../cards/DateCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import { InvestorHeadlines } from "@/app/types/investor-overview.type";
import Link from "next/link";
import { formatDate } from "../../../../utils/formatDate";
import { FadeInReveal } from "../ScrollReveal";
import { fetchNews } from "@/_lib/fetchNews";

type HeadlineItem = {
  heading?: string;
  date?: string | null;
  href?: string | null;
};

function flattenPressHeadlines(
  data: Record<string, { items?: unknown[] }> | null
): HeadlineItem[] {
  if (!data || typeof data !== "object") return [];
  const flat: HeadlineItem[] = [];
  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));
  for (const year of years) {
    const yearData = data[year];
    const items = yearData?.items;
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      const report = (item as { report?: unknown[] })?.report;
      if (!Array.isArray(report)) continue;
      for (const quarter of report) {
        const entries = (quarter as { report?: unknown[] })?.report;
        if (!Array.isArray(entries)) continue;
        for (const entry of entries) {
          const e = entry as {
            heading?: string;
            date?: string | null;
            link?: string | null;
            file?: { url?: string };
          };
          if (!e?.heading) continue;
          const href = e?.file?.url ?? e?.link ?? null;
          flat.push({
            heading: e.heading,
            date: e?.date ?? null,
            href: href ?? null,
          });
        }
      }
    }
  }
  return flat;
}

const InHeadlines = ({ data }: InvestorHeadlines) => {
  const { sectionTitle, pressRelease, mediaCoverage } = data;
  const [headlines, setHeadlines] = useState<HeadlineItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const apiData = await fetchNews("/api/press");
      setHeadlines(flattenPressHeadlines(apiData));
    };
    load();
  }, []);

  return (
    <FadeInReveal className="my-[72px] lg:my-[120px]">
      {sectionTitle && <H2 className="fluid-container">{sectionTitle}</H2>}
      <div className="mt-[30px] grid lg:grid-cols-[300px_1fr] gap-y-[50px] gap-x-[60px] mx-[unset] lg:mx-[60px]">
        <div className="mx-[20px] lg:mx-[unset]">
          {pressRelease?.title && (
            <SubH2 className="mb-[12px] lg:mb-[30px]">
              {pressRelease?.title}
            </SubH2>
          )}
          {headlines.slice(0, 4).map((release, index) => {
            const content = (
              <div className="pb-[14px] border-b border-grey-200 mb-[14px]">
                {release?.heading && (
                  <BodyText2>{release.heading}</BodyText2>
                )}
                {release?.date && (
                  <BodyText2 className="!text-grey-300 !text-[12px] lg:!text-[14px]">
                    {formatDate(release.date)}
                  </BodyText2>
                )}
              </div>
            );
            if (release.href) {
              return (
                <Link href={release.href} target="_blank" key={index}>
                  {content}
                </Link>
              );
            }
            return <div key={index}>{content}</div>;
          })}
          {pressRelease?.ctaButton?.title &&
            (pressRelease?.ctaButton?.hasExternalLink == "true"
              ? pressRelease?.ctaButton?.externalLink
              : pressRelease?.ctaButton?.link?.link) && (
              <Button
                secondary
                href={
                  pressRelease.ctaButton?.hasExternalLink == "true"
                    ? pressRelease.ctaButton?.externalLink
                    : pressRelease.ctaButton?.link?.link
                }
                title={pressRelease?.ctaButton?.title}
                className="mt-[10px] lg:mt-[30px]"
                useTargetBlank={
                  pressRelease?.ctaButton?.hasExternalLink == "true"
                }
              />
            )}
        </div>
        <div className=" overflow-hidden">
          <div className="flex justify-between mx-[20px] lg:mx-[unset]">
            {mediaCoverage?.title && (
              <H2 className="!text-[20px] lg:!text-[24px] ">
                {mediaCoverage?.title}
              </H2>
            )}
            {mediaCoverage?.ctaButton?.[0]?.title &&
              (mediaCoverage?.ctaButton?.[0]?.hasExternalLink == "true"
                ? mediaCoverage?.ctaButton?.[0]?.externalLink
                : mediaCoverage?.ctaButton?.[0]?.link?.link) && (
                <Button
                  href={
                    mediaCoverage?.ctaButton?.[0]?.hasExternalLink == "true"
                      ? mediaCoverage?.ctaButton?.[0]?.externalLink
                      : mediaCoverage?.ctaButton?.[0]?.link?.link
                  }
                  title={mediaCoverage?.ctaButton?.[0]?.title}
                  secondary
                  useTargetBlank={
                    mediaCoverage?.ctaButton?.[0]?.hasExternalLink == "true"
                  }
                />
              )}
          </div>
          <div className="mt-[28px]">
            <Swiper
              spaceBetween={15}
              slidesPerView={1.2}
              modules={[Navigation, Pagination, Mousewheel]}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              pagination={{
                el: ".in-headlines-section-progressbar",
                type: "progressbar",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                  spaceBetween: 15,
                  allowTouchMove: true,
                },
                600: {
                  slidesPerView: 2.2,
                  spaceBetween: 15,
                  allowTouchMove: true,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
              className="!px-[20px] lg:!px-[0px]"
            >
              {mediaCoverage?.news?.map((news, index) => {
                return (
                  <SwiperSlide key={index}>
                    <DateCard
                      key={news?.id}
                      imageSrc={news?.image?.url}
                      date={formatDate(news?.date ?? "")}
                      desc={news?.newsDescription}
                      link={news?.ctaButton?.externalLink}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="w-full pt-[24px] lg:hidden">
            <div className="mx-[20px] relative h-[2px]">
              <div className="in-headlines-section-progressbar !static !w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </FadeInReveal>
  );
};

export default InHeadlines;
