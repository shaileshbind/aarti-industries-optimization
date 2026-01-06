import { getData } from "@/_lib/getData.fetch";
import BlogBanner from "../components/blogs/BlogBanner";
import GloballyCertified from "../components/GloballyCertified";
import ContactBanner from "../components/ContactBanner";
import LatestBlog from "../components/blogs/LatestBlog";
import BlogAndCaseStudies from "../components/blogs/BlogAndCaseStudies";
import { getBlogsCasestudies } from "@/_lib/getBlogsCaseStudies.fetch";
import SEO from "../components/SEO";
import { getPageData } from "@/_lib/pageData.fetch";

export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getPageData("/pages/by-slug/blogs");
  const latestBlog = await getBlogsCasestudies(
    "/blog-case-studies?sort[0]=date:desc&filters[type][$eq]=blog&populate[thumbnailImageDesktop][fields][0]=url&populate[thumbnailImageDesktop][fields][1]=alternativeText&populate[thumbnailImageDesktop][fields][2]=mime&populate[thumbnailImageDesktop][fields][3]=ext&populate[thumbnailImageMobile][fields][0]=url&populate[thumbnailImageMobile][fields][1]=alternativeText&populate[thumbnailImageMobile][fields][2]=mime&populate[thumbnailImageMobile][fields][3]=ext&fields[0]=title&fields[1]=date&fields[2]=type&fields[3]=excerpt&fields[4]=slug&pagination[pageSize]=1&pagination[page]=1&status=published"
  );

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  const { section_one, section_two, section_three, section_four } = data?.data;
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Blogs"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/blogs"}
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

      {section_one && <BlogBanner data={section_one} />}

      {latestBlog?.data?.length > 0 && (
        <div className="py-[72px] lg:py-[100px]">
          <LatestBlog data={latestBlog} section_two={section_two} />
        </div>
      )}

      {section_three && (
        <div className="pb-[72px] lg:pb-[100px] md:pt-10">
          <BlogAndCaseStudies
            data={section_three}
            lastestBlogId={latestBlog?.data?.[0]?.documentId}
          />
        </div>
      )}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_four && <ContactBanner data={section_four} />}
    </div>
  );
}
