import { Suspense } from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import SEO from "../components/SEO";
import SearchResults from "../components/search-results/SearchResults";

const page = async () => {
  const data = await getPageData("/pages/by-slug/ethics");
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Search Results"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/search-results"
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
      <div className="container">
        <Suspense>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
