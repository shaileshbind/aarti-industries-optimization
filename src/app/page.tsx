import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import HomeHero from "./components/home/HomeHero";
import SEO from "./components/SEO";
import { Suspense } from "react";

const DetailsContainer = dynamic(
  () => import("./components/sections/DetailsContainer"),
);
const GlobalPartner = dynamic(() => import("./components/home/GlobalPartner"));
const HomeSections = dynamic(() => import("./components/home/HomeSections"));
const ByUseSection = dynamic(() => import("./components/home/ByUseSection"));
const ImageGallery = dynamic(() => import("./components/ImageGallery"));
const FrameworkForged = dynamic(
  () => import("./components/sections/FrameworkForged"),
);
const LatestAtAarti = dynamic(() => import("./components/home/LatestAtAarti"));
const GloballyCertified = dynamic(
  () => import("./components/GloballyCertified"),
);
const HomeExplore = dynamic(() => import("./components/home/HomeExplore"));

async function GloballyCertifiedSection() {
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*",
  );

  if (!globallyCertifiedData) return null;

  return <GloballyCertified itemsData={globallyCertifiedData} />;
}

export default async function Home() {
  // Device is resolved server-side so the correct banner is in the HTML for the
  // preload scanner. isMobileOnly = phones; tablets keep the desktop banner,
  // matching the md: breakpoint this replaces (isMobile is true for iPads).
  // getSelectorsByUserAgent returns undefined (and warns) on an empty UA.
  const ua = (await headers()).get("user-agent") ?? "";
  const isMobileDevice = ua
    ? Boolean(getSelectorsByUserAgent(ua)?.isMobileOnly)
    : false;

  const data = await getPageData("/pages/by-slug/home-page");
  const {
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour,
    sectionFive,
    sectionSix,
    sectionSeven,
    sectionEight,
    sectionNine,
    sectionTen,
    sectionFiveTitle,
  } = data?.data ?? {};
  const seo = data?.seo;
  return (
    <div>
      <SEO
        title={seo?.title ?? "Aarti Industries"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com"}
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
      {sectionOne && (
        <HomeHero data={sectionOne} isMobileDevice={isMobileDevice} />
      )}
      {sectionTwo && <DetailsContainer data={sectionTwo} />}
      {sectionThree && <GlobalPartner data={sectionThree} />}
      <HomeSections sustainableChemData={sectionFour} />
      {sectionFive && (
        <ByUseSection data={sectionFive} sectionFiveTitle={sectionFiveTitle} />
      )}
      {sectionSix && <ImageGallery data={sectionSix} imgArr={sectionSeven} />}
      {sectionEight && <FrameworkForged data={sectionEight} />}
      {sectionNine && <LatestAtAarti data={sectionNine} />}
      <Suspense fallback={<div>loading...</div>}>
        <GloballyCertifiedSection />
      </Suspense>
      {sectionTen && <HomeExplore data={sectionTen} />}
    </div>
  );
}
