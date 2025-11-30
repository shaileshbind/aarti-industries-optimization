import { getData } from "@/_lib/getData.fetch";
import { getPageData } from "@/_lib/pageData.fetch";
import CopyLink from "@/app/components/blogs/CopyLink";
import Share from "@/app/components/blogs/Share";
import DateCard from "@/app/components/cards/DateCard";
import ContactBanner from "@/app/components/ContactBanner";
import GloballyCertified from "@/app/components/GloballyCertified";
import { BodyText2, H2, H3, SubH1 } from "@/app/components/Typography2";
import Image from "next/image";
import React from "react";

export default async function page() {
  const data = await getPageData("/pages/by-slug/home-page");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div className="pt-[72px] lg:pt-[140px] fluid-container">
      <div className="md:flex items-start gap-[60px] relative">
        <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%]">
          <p className="text-sm text-[#DC4C03]">May 21, 2025</p>

          <H3>Striding for a noble cause</H3>

          <div className="w-full h-[280px] md:h-[350px] lg:h-[406px] rounded-[20px] overflow-hidden mt-6 mb-4 md:mb-[30px]">
            <Image
              src="/images/home/hero-banner1.png"
              width={872}
              height={406}
              alt="banner"
              className="w-full h-full"
            />
          </div>

          <BodyText2>
            Our ethical foundation is built on robust compliance. Led by our
            Board of Directors, we proactively adapt to global regulations using
            a digital Compliance Management System (CMS). This system tracks
            over 78 Acts and 10,000 legal provisions, ensuring we meet our
            obligations. Regular audits and a focus on transparency and
            accountability help us minimize risk and maintain business
            excellence.
          </BodyText2>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 md:mb-16">
            {[...Array(3)]?.map((_, index) => (
              <div key={"num" + index}>
                <H2 className="text-[#DC4C03] pb-1">10,000+</H2>
                <BodyText2>People from the community</BodyText2>
              </div>
            ))}
          </div>

          {/* Rich Text */}
          <div className="blogInner">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/YLslsZuEaNE?si=2OUUo3EgVVsMUeeG"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <Image
              src="/images/home/hero-banner2.png"
              width={872}
              height={406}
              alt="banner"
              className="w-full h-full"
            />

            <h3>
              In the CXO run, corporate leaders allied with visually disabled
              persons
            </h3>
          </div>
        </div>

        <div className="mt-6 md:mt-24 md:sticky md:top-24">
          <p className="text-[#002F50] text-base pb-4">Share Now</p>
          <div className="flex gap-4 items-start">
            <Share />
            <CopyLink />
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      <div className="pb-[72px] md:pb-[100px] pt-[72px] lg:pt-[140px]">
        <SubH1>Related Blogs</SubH1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mt-[30px]">
          {[...Array(4)]?.map((_, index) => (
            <div key={"item_" + index} className="relative">
              <DateCard
                imageSrc={"/images/home/blog1.png"}
                date={"May 21, 2025"}
                desc={
                  "Lorem ipsum dolor sit amet consectetur. Tristique nulla sed hac donec nulla habitant facilisi."
                }
                link={"/blogs/16"}
                animate
                useTargetBlank={false}
              />
            </div>
          ))}
        </div>
      </div>

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {data?.sectionTen && <ContactBanner data={data?.sectionTen} />}
    </div>
  );
}
