"use client";
import Breadcrumb from "@/app/components/BreadCrumb";
import { BodyText1, BodyText2, H3, SubH1 } from "@/app/components/Typography2";
import Image from "next/image";
import ProductList from "@/app/components/products/ProdutList";
import { FadeInReveal } from "@/app/components/ScrollReveal";
import {
  CategorySubcategoryProps,
  ProductData,
  RelatedProduct,
} from "@/app/types/product.inner.type";
import MSDSPopup from "../Popups/MSDSPopup";
import { useEffect, useState } from "react";
import GeneralPopup from "../Popups/GeneralPopup";

interface ProductInnerPageProps {
  data?: ProductData;
  relatedData?: RelatedProduct[];
}

export default function ProductInnerPage({
  data,
  relatedData,
}: ProductInnerPageProps) {
  const [showMSDSPopup, setshowMSDSPopup] = useState<boolean>(false);
  const [showGeneralPopup, setshowGeneralPopup] = useState<boolean>(false);
  const [document, setdocument] = useState<string>("");

  const product = data;
  const productDetails = product?.productDetails;
  const relatedProducts = relatedData;

  const productTable = [
    { title: "Chemistries", desc: productDetails?.chemistries },
    {
      title: "Common Names",
      desc: productDetails?.commonName,
    },
    { title: "Chemical Formula", desc: productDetails?.chemicalFormula },
    { title: "Pack Size", desc: productDetails?.packSize },
    { title: "Product Form", desc: productDetails?.productForm },
  ];

  const descriptionData = [
    { title: "CAS No", desc: productDetails?.casNo },
    {
      title: "Abbreviation",
      desc: productDetails?.abbreviation,
    },
    { title: "IUPAC Name", desc: productDetails?.iupacName },
  ];

  useEffect(() => {
    const filteredCategorySubcategory: CategorySubcategoryProps = [];

    product?.product_sub_categories?.forEach((item) => {
      filteredCategorySubcategory?.push({
        category: item?.product_category?.productCategory,
        subCategories: [item?.subCategory],
      });
    });
  }, [product?.product_sub_categories]);
  return (
    <div className="w-full min-h-screen">
      <div className="w-full container my-[70px] mt-[30px] lg:my-[100px]">
        <Breadcrumb
          breadcrumbArr={[
            { title: "Home", href: "/" },
            { title: "Products", href: "/products" },
            {
              title: `${product?.slug}`,
              href: `/products/${product?.slug}`,
            },
          ]}
        />
        <FadeInReveal>
          <div className="w-full grid lg:grid-cols-[40%_1fr] gap-x-[60px] gap-y-[40px]">
            {/* LEFT COLUMN */}
            <div>
              <div className="bg-[#FFF2E9] inline-flex gap-2 items-center px-4 py-2 rounded-full mb-[10px]">
                <Image
                  src="/images/products/world-orange.svg"
                  alt="globe"
                  width={16}
                  height={16}
                />
                <p className="text-[#F36633] text-xs font-medium tracking-[0.48px]">
                  EXPORT AVAILABLE
                </p>
              </div>

              {product?.productName && <H3>{product?.productName}</H3>}

              {product?.description && (
                <BodyText1 className="mt-2">{product?.description}</BodyText1>
              )}

              {/* Documents */}
              <div className="bg-[#F7F9FA] rounded-[20px] py-5 px-6 mt-7 lg:w-[80%]">
                {product?.productDetails?.documentSection?.sectionTitle && (
                  <p className="text-[#002F50] text-base md:text-lg">
                    {product?.productDetails?.documentSection?.sectionTitle}
                  </p>
                )}

                {/* product list */}
                <div className="flex flex-col gap-[10px] mt-[0]">
                  <div
                    className="flex justify-between text-[#4C5861] text-sm md:text-base cursor-pointer"
                    onClick={() => {
                      setshowGeneralPopup(true);
                      setdocument("/reports/product-list.pdf");
                    }}
                  >
                    Product List
                    <Image
                      src="/images/download-icon-grey2.svg"
                      alt="globe"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                {/* company brochure */}
                <div className="flex flex-col gap-[10px] mt-[10px]">
                  <div
                    className="flex justify-between text-[#4C5861] text-sm md:text-base cursor-pointer"
                    onClick={() => {
                      setshowGeneralPopup(true);
                      setdocument("/reports/company-brochure.pdf");
                    }}
                  >
                    Company Brochure
                    <Image
                      src="/images/download-icon-grey2.svg"
                      alt="globe"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                {/* msds only - via cms */}
                {product?.productDetails?.documentSection?.documents
                  ?.length && (
                  <div className="flex flex-col gap-[10px] mt-[10px]">
                    {product?.productDetails?.documentSection?.documents?.map(
                      (item, index) =>
                        item?.documentName && (
                          <div
                            className="flex justify-between text-[#4C5861] text-sm md:text-base cursor-pointer"
                            key={"index_" + index}
                            onClick={() => {
                              if (index === 0) {
                                setshowMSDSPopup(true);
                              } else {
                                setshowGeneralPopup(true);
                              }
                              setdocument(item?.file?.url);
                            }}
                          >
                            {item?.documentName}
                            <Image
                              src="/images/download-icon-grey2.svg"
                              alt="globe"
                              width={20}
                              height={20}
                            />
                          </div>
                        )
                    )}
                  </div>
                )}
                <button
                  className="text-[#DC4C03] text-base pt-4 md:pt-6 group cursor-pointer"
                  onClick={() => {
                    setshowGeneralPopup(true);
                    setdocument("");
                  }}
                >
                  Enquire now
                  <div className="w-[90px] h-[1px] mt-[0.4px] bg-[#DC4C03] transition-all duration-300 origin-left group-hover:w-0" />
                </button>
              </div>

              {/* Product Image */}
              {product?.productImage?.url && (
                <div className="mt-10 grid place-items-center relative">
                  <Image
                    src={
                      product?.productImage?.url ||
                      "/images/products/chemical12.png"
                    }
                    alt={product?.productName || "Product Image"}
                    height={product?.productImage?.height || 60}
                    width={product?.productImage?.width || 60}
                  />
                </div>
              )}
            </div>
            {/* RIGHT COLUMN */}
            <div>
              <div className="bg-[#F7F9FA] rounded-[20px] py-5 px-6 grid xl:grid-cols-[40%_1px_1fr] gap-x-[30px] ">
                {/* Description */}
                <div className="w-full">
                  {descriptionData?.length > 0 && (
                    <div>
                      <p className="pb-4 text-[#002F50] text-base md:text-lg">
                        Description :
                      </p>
                      <div className="flex flex-col gap-[10px]  ">
                        {descriptionData?.map((item, index) => (
                          <div key={"desc_" + index} className="flex gap-4">
                            <p className="text-sm md:text-base shrink-0">
                              {item?.title} :
                            </p>
                            <p className="text-sm md:text-base">{item?.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full h-[1px] xl:w-[1px] xl:h-[100%] bg-[#002F5047] my-6 xl:my-0" />
                {/* Applications */}
                <div>
                  {product?.productDetails?.application?.length && (
                    <div>
                      <p className="pb-4 text-[#002F50] text-base md:text-lg">
                        Applications :
                      </p>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-[40px] justify-between">
                        {product?.productDetails?.application?.map(
                          (item, index, arr) => {
                            const isLastItem = index === arr.length - 1;
                            const isOddCount = arr.length % 2 !== 0;
                            const hasDesc = Boolean(item?.application?.trim());
                            return (
                              <div
                                key={"application" + index}
                                className={`flex items-start gap-2 ${
                                  isLastItem && isOddCount ? "col-span-2" : ""
                                }`}
                              >
                                {hasDesc && (
                                  <Image
                                    src="/images/star-orange.svg"
                                    alt="star"
                                    width={16}
                                    height={16}
                                    className="shrink-0 mt-1"
                                  />
                                )}
                                {hasDesc && (
                                  <p className="text-sm md:text-base">
                                    {item.application}
                                  </p>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Product Info Section */}
              {productTable?.filter((item) => item?.desc)?.length > 0 && (
                <div className="mt-[24px] border border-gray-200 rounded-[14px] lg:rounded-[20px] overflow-hidden">
                  {productTable
                    .filter((item) => item?.desc)
                    .map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          index % 2 === 0 ? "" : "bg-[#F7F9FA]"
                        } grid grid-cols-[40%_60%] gap-4 border-b border-gray-200 px-[20px] py-5`}
                      >
                        <BodyText2 className="text-[#002F50]">
                          {item.title + " :"}
                        </BodyText2>
                        <BodyText2>{item.desc}</BodyText2>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </FadeInReveal>

        {/* Related Products */}
        <FadeInReveal>
          <div className="mt-[70px] lg:mt-[120px] bg-grey-100 rounded-[14px] lg:rounded-[20px] p-5 py-7 lg:p-10 w-full">
            <SubH1 className="text-blue-100">Related Products</SubH1>
            {relatedProducts?.length && (
              <div className="mt-2 lg:mt-[40px] w-full grid lg:grid-cols-2 gap-x-[40px] lg:gap-y-[20px]">
                {relatedProducts?.map((item) => (
                  <ProductList
                    key={item?.id}
                    secondary
                    title={item?.productName}
                    link={"/" + item?.slug}
                    pdfLink={item?.tdsDocument?.file?.url}
                    pdfTitle="View TDS"
                  />
                ))}
              </div>
            )}
          </div>
        </FadeInReveal>
      </div>

      {showMSDSPopup ? (
        <MSDSPopup
          setshowMSDSPopup={setshowMSDSPopup}
          isOpen={showMSDSPopup}
          document={document}
        />
      ) : (
        <GeneralPopup
          isOpen={showGeneralPopup}
          setshowGeneralPopup={setshowGeneralPopup}
          document={document}
          // document="https://example-files.online-convert.com/document/pdf/example.pdf"
          prefillCategory="Business Products / Services"
          prefillSubCategory="Chemicals Products"
          prefillProduct={product?.productName}
        />
      )}
    </div>
  );
}
