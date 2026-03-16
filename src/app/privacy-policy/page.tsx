import PrivacyPolicyBanner from "@/app/components/privacy-policy/privacyPolicyBanner";
import PrivacyPolicyContent from "../components/privacy-policy/PrivacyPolicyContent";
import { getPageData } from "@/_lib/pageData.fetch";
import SEO from "../components/SEO";

const page = async () => {
  const data = await getPageData("/pages/by-slug/privacy-policy");
  const seo = data?.seo;

  const BannerData = {
    title: data?.data?.title,
    description: "",
    image: {
      alternativeText: "",
      url: data?.data?.image?.url,
    },
    mobImage: {
      alternativeText: "",
      url: data?.data?.mobImage?.url,
    },
  };

  return (
    <div>
      <SEO
        title={seo?.title ?? "Privacy Policy"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/privacy-policy"
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
      {BannerData.title ? <PrivacyPolicyBanner data={BannerData} /> : null}
      {data?.data && <PrivacyPolicyContent data={data?.data} />}
    </div>
  );
};

export default page;
