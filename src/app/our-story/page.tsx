import HeroBanner from "../components/our-story/HeroBanner";
import AboutCompany from "../components/our-story/AboutCompany";
import TimeLine from "../components/our-story/TimeLine";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import GlobalInnovation from "../components/sections/GlobalInnovation";
import SEO from "../components/SEO";
import { Inter } from "next/font/google";

import OurExp from "../components/our-story/OurExp";

// Only TimeLine on this route uses `font-inter`. Loading it here instead of in
// the root layout keeps 40KB of High-priority woff2 off every other page.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
  // Next still folds this @font-face into a shared CSS chunk, so without this
  // the homepage was emitting a High-priority <link rel=preload as=font> for a
  // 48KB file it never renders. Inter is one decorative number on this route.
  preload: false,
});

export default async function page() {
  const [data, globallyCertifiedData] = await Promise.all([
    getPageData("/pages/by-slug/our-story"),
    getData("/globally-certified-datas?populate=*"),
  ]);
  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
  } = data?.data ?? {};
  const seo = data?.seo;

  return (
    <div className={inter.variable}>
      <SEO
        title={seo?.title ?? "Our Story"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/our-story"
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
      {section_one && <HeroBanner data={section_one} />}
      {section_two && <AboutCompany data={section_two} />}
      {section_three && <TimeLine data={section_three} />}
      {section_four && (
        <GlobalInnovation data={section_four} useBulletes={false} />
      )}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_five && <OurExp data={section_five} />}
    </div>
  );
}
