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
import GloballyCertified from "@/app/components/GloballyCertified";
import { FadeInReveal } from "@/app/components/ScrollReveal";

const sampleData = {
  mainProduct: {
    name: "Para Dichloro Benzene",
    slug: "para-dichloro-benzene",
    cta: {
      title: "Enquire now",
      link: "#",
    },
    imageLink: "/images/products/chemical12.png",
    description:
      "Para Nitro Chloro Benzene is a pale yellow crystalline solid widely used as an intermediate in dyes, agrochemicals, and pharmaceuticals. It is valued for its stability and efficiency in downstream applications.",
    documents: [
      {
        id: 0,
        name: "MSDS",
        url: "#",
      },
      {
        id: 1,
        name: "Product List",
        url: "#",
      },
      {
        id: 2,
        name: "Company Brochure",
        url: "#",
      },
    ],
    export: true,
    info: [
      {
        id: 0,
        title: "CAS No",
        desc: "100-00-5",
      },
      {
        id: 1,
        title: "Abbreviation",
        desc: "PNCB",
      },
      {
        id: 2,
        title: "IUPAC Name",
        desc: "4-Nitrochlorobenzene",
      },
    ],
    applications: ["Polymer", "Pigments", "Pharma", "Dyes", "Agrochemicals"],
    productInfo: [
      {
        id: 0,
        title: "Chemistries",
        desc: "Chlorination, Nitration",
      },
      {
        id: 1,
        title: "Common Names",
        desc: "PNCB",
      },
      {
        id: 2,
        title: "Pack Size",
        desc: "ISO Tanker, Loc Tanker, HDPE Bag (25KG/50KG), Jumbo Bag (500KG), HDPE Drum (40KG/50KG), MS Drum (50KG)",
      },
      {
        id: 3,
        title: "Product Form",
        desc: "Flakes, Liquid",
      },
    ],
  },
  relatedProducts: [
    {
      id: 0,
      name: "1,3,5 Tri Chloro Benzene",
      pdfLink: "#",
      url: "/1-3-5-trichloro-benzene",
    },
  ],
};

export default function ProductInnerPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full container my-[70px] lg:my-[100px]">
        <Breadcrumb
          breadcrumbArr={[
            { title: "Home", href: "/" },
            { title: "Products", href: "/products" },
            {
              title: `${sampleData?.mainProduct?.name}`,
              href: `/products/${sampleData?.mainProduct?.slug}`,
            },
          ]}
        />
        <FadeInReveal>
        <div className="w-full grid lg:grid-cols-[40%_1fr] gap-x-[60px] gap-y-[40px]">
          <div>
            <H3>{sampleData?.mainProduct?.name}</H3>
            <BodyText1 className="mt-2">
              {sampleData?.mainProduct?.description}
            </BodyText1>
            <div className="w-fit mt-[14px] lg:mt-[18px] cursor-pointer">
              <Button
                title={sampleData?.mainProduct?.cta?.title}
                href={sampleData?.mainProduct?.cta?.link}
                secondary
              />
            </div>
            <div className="mt-9">
              <BodyText1>Applications :</BodyText1>
              <div className="flex flex-wrap mt-3 gap-2">
                {sampleData?.mainProduct?.applications?.map((index) => {
                  return (
                    <div
                      key={index}
                      className="bg-[#ffece2] rounded-[20px] py-[6px] px-4 w-fit h-auto"
                    >
                      <BodyText3>{index}</BodyText3>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-10 grid h-[130px] md:h-[100px] place-items-center relative">
              <Image
                src={sampleData?.mainProduct?.imageLink}
                alt="img"
                fill
                className="absolute object-contain"
              />
            </div>
          </div>
          <div>
            <div className="grid lg:grid-cols-[60%_1fr] gap-[24px]">
              <div className="bg-grey-100 rounded-[14px] lg:rounded-[20px] p-5">
                {sampleData?.mainProduct?.export && (
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
                )}
                {sampleData?.mainProduct?.info?.map((items) => {
                  return (
                    <div
                      key={items?.id}
                      className="w-full flex gap-x-[16px] mb-2"
                    >
                      <BodyText2>{items?.title}</BodyText2>
                      <BodyText2>{items?.desc}</BodyText2>
                    </div>
                  );
                })}
              </div>
              <div className="bg-grey-100 rounded-[14px] lg:rounded-[20px] p-5">
                <BodyText1 className="mb-2">Documents :</BodyText1>
                {sampleData?.mainProduct?.documents?.map((items) => {
                  return (
                    <div
                      key={items?.id}
                      className="w-full flex gap-x-[6px] justify-between mb-2"
                    >
                      <BodyText2>{items?.name}</BodyText2>
                      <div className="w-fit  cursor-pointer">
                        <Link href={items?.url} target="_blank">
                          <Image
                            src="/images/download-icon-grey2.svg"
                            alt="icon"
                            width={18}
                            height={18}
                            className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] "
                          />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-[24px] border border-gray-200 rounded-[14px] lg:rounded-[20px] overflow-hidden">
              {sampleData?.mainProduct?.productInfo.map((items, index) => {
                return (
                  <div
                    key={items?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-[#F7F9FA]"
                    } grid grid-cols-[40%_60%] border-b  border-gray-200 px-[20px] py-5`}
                  >
                    <BodyText2>{items?.title}</BodyText2>
                    <BodyText2>{items?.desc}</BodyText2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </FadeInReveal>
        <FadeInReveal>
        <div className="mt-[70px] lg:mt-[120px] bg-grey-100  rounded-[14px] lg:rounded-[20px] p-5 lg:p-10 w-full">
          <SubH1 className="text-blue-100">Related Products</SubH1>
          <div className="mt-[40px] w-full grid lg:grid-cols-2 gap-x-[40px] gap-y-[20px]">
            {sampleData?.relatedProducts?.map((items, index) => {
              return (
                <ProductList
                  key={index}
                  secondary
                  title={items?.name}
                  link={items?.url}
                  pdfLink={items?.pdfLink}
                  pdfTitle="View TDS"
                />
              );
            })}
          </div>
        </div>
        </FadeInReveal>
      </div>
      <GloballyCertified
        title="Globally Certified"
        itemsData={[
          {
            id: 0,
            title: "Ecovadis Gold Rating",
            imgSrc: "/images/award1.png",
          },
          { id: 1, title: "CDP A rating", imgSrc: "/images/award2.png" },
          { id: 2, title: "ISO 27001:2022", imgSrc: "/images/award3.png" },
        ]}
      />
    </div>
  );
}
