import GloballyCertified from "../components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import ContactBanner from "../components/Contact/ContactBanner";
import WhereWeOperate from "../components/Contact/WhereWeOperate";
import { getPageData } from "@/_lib/pageData.fetch";
import ContactExp from "../components/Contact/ContactExp";
import ContactMap from "../components/Contact/ContactMap";
import SEO from "../components/SEO";
import Script from "next/script";

const Page = async () => {
  const [data, whereWeOperateData, globallyCertifiedData] = await Promise.all([
    getPageData("/pages/by-slug/contact-us"),
    getData("/where-we-operates?populate=*"),
    getData("/globally-certified-datas?populate=*"),
  ]);
  const { leftSection, section_two, mapSection } = data?.data ?? {};
  const seo = data?.seo;
  return (
    <div>
      <SEO
        title={seo?.title ?? "Contact Us"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/contact"}
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
      {leftSection && <ContactBanner data={leftSection} />}
      {whereWeOperateData && <WhereWeOperate data={whereWeOperateData} />}
      {mapSection && (
        <ContactMap data={mapSection} />
      )}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_two && <ContactExp data={section_two} />}

      {process.env.NEXT_PUBLIC_IS_PRODUCTION === "true" && (
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-662876443/phxMCPasmJkcEJviirwC',
                'value': 1.0,
                'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      )}
    </div>
  );
};

export default Page;
