"use client";
import Breadcrumb from "@/app/components/BreadCrumb";
import {
  BodyText1,
  BodyText2,
  BodyText3,
  H3,
  SubH1,
} from "@/app/components/Typography2";
import Image from "next/image";
import Button from "@/app/components/Button";
import Link from "next/link";
import ProductList from "@/app/components/products/ProdutList";
import { FadeInReveal } from "@/app/components/ScrollReveal";
import { ProductData, RelatedProduct } from "@/app/types/product.inner.type";
import { appDetails } from "@/app/types/product.type";

interface ProductInnerPageProps {
  data?: ProductData;
  relatedData?: RelatedProduct[];
}

export default function ProductInnerPage({ data, relatedData }: ProductInnerPageProps) {
  const product = data;
  const productDetails = product?.productDetails;

  // Hardcoded CTA and commonName
  const cta = {
    title: "Enquire now",
    link: "#",
  };
  const commonName = "2,3 DCNB";

  // Hardcoded related products (until API integration)
  // const relatedProducts = [
  //   {
  //     id: 0,
  //     name: "1,3,5 Tri Chloro Benzene",
  //     pdfLink: "#",
  //     url: "/1-3-5-trichloro-benzene",
  //   },
  // ];

  const relatedProducts = relatedData;

  console.log(relatedProducts)

  return (
    <div className="w-full min-h-screen">
      <div className="w-full container my-[70px] lg:my-[100px]">
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
              <H3>{product?.productName}</H3>
              <BodyText1 className="mt-2">{product?.description}</BodyText1>

              <div className="w-fit mt-[14px] lg:mt-[18px] cursor-pointer">
                <Button title={cta.title} href={cta.link} secondary />
              </div>

              {/* Applications */}
              {(productDetails?.application ?? []).length > 0 && (
                <div className="mt-9">
                  <BodyText1>Applications :</BodyText1>
                  <div className="flex flex-wrap mt-3 gap-2">
                    {(productDetails?.application ?? []).map((app: appDetails) => (
                      <div
                        key={app?.id}
                        className="bg-[#ffece2] rounded-[20px] py-[6px] px-4 w-fit h-auto"
                      >
                        <BodyText3>{app?.application}</BodyText3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Image */}
              <div className="mt-10 grid place-items-center relative">
                <Image
                  src={product?.productImage?.url || "/images/products/chemical12.png"}
                  alt={product?.productName || "Product Image"}
                  height={product?.productImage?.height || 60}
                  width={product?.productImage?.width || 60}
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div>
              <div className="grid lg:grid-cols-[60%_1fr] gap-[24px]">
                {/* Basic Info */}
                <div className="bg-grey-100 rounded-[14px] lg:rounded-[20px] p-5">
                  {/* Example export badge */}
                  <div className="mb-[14px] rounded-[20px] border border-orange-200 w-fit py-[6px] px-3 flex gap-x-[6px]">
                    <Image
                      src="/images/products/world-orange.svg"
                      alt="icon"
                      width={16}
                      height={16}
                    />
                    <BodyText3 className="text-orange-200 uppercase">
                      Export Available
                    </BodyText3>
                  </div>

                  {/* Key Details */}
                  {[
                    { title: "CAS No", desc: productDetails?.casNo },
                    { title: "Abbreviation", desc: productDetails?.abbreviation },
                    { title: "IUPAC Name", desc: productDetails?.iupacName },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="w-full flex gap-x-[16px] mb-2"
                    >
                      <BodyText2>{item.title}</BodyText2>
                      <BodyText2>{item.desc}</BodyText2>
                    </div>
                  ))}
                </div>

                {/* Documents */}
                {
                 productDetails?.documentSection && productDetails?.documentSection?.documents?.length !== 0 &&
                  <div className="bg-grey-100 rounded-[14px] lg:rounded-[20px] p-5">
                    <BodyText1 className="mb-2">Documents :</BodyText1>
                    {productDetails?.documentSection?.documents?.map((doc) => (
                      <div
                        key={doc?.id}
                        className="w-full flex gap-x-[6px] justify-between mb-2"
                      >
                        <BodyText2>{doc?.documentName}</BodyText2>
                        <div className="w-fit cursor-pointer">
                          <Link href={doc?.link || "#"} target="_blank">
                            <Image
                              src="/images/download-icon-grey2.svg"
                              alt="icon"
                              width={18}
                              height={18}
                              className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]"
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              </div>

              {/* Product Info Section */}
              <div className="mt-[24px] border border-gray-200 rounded-[14px] lg:rounded-[20px] overflow-hidden">
                {[
                  { title: "Chemistries", desc: productDetails?.chemistries },
                  { title: "Common Names", desc: productDetails?.commonName || commonName },
                  { title: "Pack Size", desc: productDetails?.packSize },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${index % 2 === 0 ? "" : "bg-[#F7F9FA]"
                      } grid grid-cols-[40%_60%] border-b border-gray-200 px-[20px] py-5`}
                  >
                    <BodyText2>{item.title}</BodyText2>
                    <BodyText2>{item.desc}</BodyText2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInReveal>

        {/* Related Products */}
        <FadeInReveal>
          <div className="mt-[70px] lg:mt-[120px] bg-grey-100 rounded-[14px] lg:rounded-[20px] p-5 lg:p-10 w-full">
            <SubH1 className="text-blue-100">Related Products</SubH1>
            <div className="mt-[40px] w-full grid lg:grid-cols-2 gap-x-[40px] gap-y-[20px]">
              {relatedProducts?.map((item) => (
                <ProductList
                  key={item.id}
                  secondary
                  title={item.productName}
                  link={"/"+item.slug}
                  pdfLink={item.pdfLink}
                  pdfTitle="View TDS"
                />
              ))}
            </div>
          </div>
        </FadeInReveal>
      </div>
    </div>
  );
}
