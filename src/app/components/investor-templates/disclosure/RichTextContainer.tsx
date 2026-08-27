"use client";
import SearchBanner from "../../banners/SearchBanner";
import DisclosureTabs from "./DisclosureTabs";
import { RichTextContainerProps } from "@/app/types/disclosure.type";

export default function RichTextContainer({
  data,
  categories,
}: RichTextContainerProps) {
  const { title, description, image, mobImage } = data?.banner || {};

  const htmlContent =
    (data?.reportLayout as { ckEditer?: string }[])?.[0]?.ckEditer ?? "";

  return (
    <div>
      <SearchBanner
        title={title}
        desc={description}
        fullBg
        centerText={true}
        image={image?.url}
        mobImage={mobImage?.url}
        alt={image?.alternativeText}
        mobAlt={mobImage?.alternativeText}
        value=""
        onChange={() => {}}
        handleSearch={() => {}}
        lineClassName="hidden"
        bottomMiddleStarClassName="hidden"
        showStar3={false}
        showStar2={false}
      />

      <DisclosureTabs categories={categories} />

      <div className="container py-[42px] lg:py-[70px] lg:pt-10">
        {htmlContent ? (
          <div
            className="ck-editor-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <p className="text-lg text-[#002F50] py-40 text-center">
            No content available
          </p>
        )}
      </div>
    </div>
  );
}
