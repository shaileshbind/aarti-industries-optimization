import { getPageData } from "@/_lib/pageData.fetch";
import SEO from "@/app/components/SEO";
import { BodyText2, H1 } from "@/app/components/Typography2";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const pressInnerData = await getPageData(`/press-releases/slug/${slug}`);

  if (!pressInnerData?.pressData) {
    notFound();
  }
  const seo = pressInnerData?.seo;
  const data = pressInnerData.pressData;

  return (
    <section>
      <SEO
        title={seo?.title ?? "Press Releases"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          `https://www.aarti-industries.com/press-releases/${slug}`
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
      <div className="my-[50px] lg:my-[100px] container">
        <BodyText2 className="text-orange-200">{data.date}</BodyText2>
        <H1 className="lg:!text-[36px]" applyTitleCase={true}>{data.heading}</H1>
        <div
          className="mt-[20px] dangerousHTMLPress font-alte-hans"
          dangerouslySetInnerHTML={{ __html: data?.pdfContent }}
        />
      </div>
    </section>
  );
};

export default Page;
