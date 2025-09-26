import {
  ProductPageProps,
  ProductData,
} from "@/app/products/[productId]/product";
import Breadcrumb from "@/app/components/BreadCrumb";
import {
  BodyText1,
  BodyText2,
  H3,
  SubH2,
  SubH3,
} from "@/app/components/Typography2";
import Image from "next/image";

const mockProductData: Record<string, ProductData> = {
  "para-dichloro-benzene": {
    id: "para-dichloro-benzene",
    name: "Para Dichloro Benzene",
    description:
      "We are one of Indias leading manufacturers, exporters & suppliers of Nitro Benzene (NB).",
    specifications: {
      casNumber: "106-46-7",
      abbreviation: "PDCB",
      iupacName: "1,4-Dichlorobenzene",
      chemicalFormula: "C6H4Cl2",
      commonName: "-",
      valueChain: "Di Chloro Benzene",
    },
    documents: {
      tds: "/documents/pdcb-tds.pdf",
      sds: "/documents/pdcb-sds.pdf",
      rds: "/documents/pdcb-rds.pdf",
    },
    chemicalStructure: {
      imageUrl: "/images/products/chemical12.png",
      altText: "Para Dichloro Benzene molecular structure",
    },
    features: [
      "High purity grade",
      "Consistent quality",
      "Reliable supply chain",
    ],
    applications: [
      "Pesticide manufacturing",
      "Chemical synthesis",
      "Industrial processes",
    ],
  },
  "sample-product": {
    id: "sample-product",
    name: "Sample Chemical Product",
    description: "Sample product for demonstration purposes.",
    specifications: {
      casNumber: "000-00-0",
      abbreviation: "SCP",
      iupacName: "Sample Chemical Product",
      chemicalFormula: "C2H4O",
      commonName: "Sample",
      valueChain: "Sample Chain",
    },
    documents: {},
    features: ["Feature 1", "Feature 2"],
    applications: ["Application 1", "Application 2"],
  },
};

function getProductById(productId: string): ProductData | null {
  return mockProductData[productId] || null;
}

export default function ProductInnerPage({ params }: ProductPageProps) {
  const { productId } = params;
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container my-[57px] md:!max-w-[1320px] mx-auto px-4 py-8">
        <Breadcrumb
          breadcrumbArr={[
            { title: "Home", href: "/" },
            { title: "Products", href: "/products" },
            { title: product.name, href: `/products/${product.id}` },
          ]}
        />

        <div className="flex justify-between flex-col md:flex-row gap-10">
          <div className="md:w-[30%] w-full">
            {/* Product Header */}
            <header>
              <H3 className="mb-2">{product.name}</H3>
              <BodyText1 className="max-w-3xl">{product.description}</BodyText1>
            </header>

            <div className="flex md:flex-col flex-col-reverse mt-10">
              {/* Documents Section */}
              <section className="bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] rounded-lg p-6 border border-orange-200">
                <SubH2 className="text-white pb-[18px]">Documents</SubH2>
                <div className="grid grid-cols-3 gap-4 pb-[36px]">
                  {product.documents.tds && (
                    <a
                      href={product.documents.tds}
                      download
                      className="flex gap-4 items-center"
                    >
                      <BodyText1 className="text-white">TDS</BodyText1>
                      <div className="w-[16px] h-[16px] relative">
                        <Image
                          src="/images/download-icon.svg"
                          alt="icon"
                          fill
                        />
                      </div>
                    </a>
                  )}

                  {product.documents.sds && (
                    <a
                      href={product.documents.sds}
                      download
                      className="flex gap-4 items-center"
                    >
                      <BodyText1 className="text-white">SDS</BodyText1>
                      <div className="w-[16px] h-[16px] relative">
                        <Image
                          src="/images/download-icon.svg"
                          alt="icon"
                          fill
                        />
                      </div>
                    </a>
                  )}

                  {product.documents.rds && (
                    <a
                      href={product.documents.rds}
                      download
                      className="flex gap-4 items-center"
                    >
                      <BodyText1 className="text-white">RDS</BodyText1>
                      <div className="w-[16px] h-[16px] relative">
                        <Image
                          src="/images/download-icon.svg"
                          alt="icon"
                          fill
                        />
                      </div>
                    </a>
                  )}
                </div>
                <button className="py-[14px] px-[22px] bg-white text-center w-full rounded-[6px]">
                  Enquire now
                </button>
              </section>

              {/* Chemical Structure Placeholder */}
              {product.chemicalStructure && (
                <section className="text-center">
                  <div className="bg-gray-100 rounded-lg m-8 inline-block">
                    <img
                      src={
                        product.chemicalStructure.imageUrl
                          ? product.chemicalStructure.imageUrl
                          : "/images/products/chemical12.png"
                      }
                      alt={
                        product.chemicalStructure.altText
                          ? product.chemicalStructure.altText
                          : "chemical img"
                      }
                      className="max-w-md mx-auto"
                    />

                    <div
                      className="text-2xl font-mono text-gray-700"
                      style={{
                        display: product.chemicalStructure.imageUrl
                          ? "none"
                          : "block",
                      }}
                    >
                      {product.specifications.chemicalFormula}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          <div className="md:w-[60%] w-full">
            {/* Product Content - Placeholder for future components */}
            <main className="space-y-[36px]">
              <div className="grid grid-cols-1 gap-0 border border-gray-200 rounded-3xl overflow-hidden">
                <div className="grid md:grid-cols-3 grid-cols-2 border-b border-gray-200 bg-[#F7F9FA] px-[30px] py-5">
                  <BodyText2>CAS Number:</BodyText2>
                  <BodyText2>{product.specifications.casNumber}</BodyText2>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 border-b border-gray-200 px-[30px] py-5">
                  <BodyText2>Abbreviation:</BodyText2>
                  <BodyText2>{product.specifications.abbreviation}</BodyText2>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 border-b border-gray-200 bg-[#F7F9FA] px-[30px] py-5">
                  <BodyText2>IUPAC Name:</BodyText2>
                  <BodyText2>{product.specifications.iupacName}</BodyText2>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 border-b border-gray-200 px-[30px] py-5">
                  <BodyText2>Chemical Formula:</BodyText2>
                  <BodyText2>
                    {product.specifications.chemicalFormula}
                  </BodyText2>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 border-b border-gray-200 bg-[#F7F9FA] px-[30px] py-5">
                  <BodyText2>Common Name:</BodyText2>
                  <BodyText2>{product.specifications.commonName}</BodyText2>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 border-b border-gray-200 px-[30px] py-5">
                  <BodyText2>Value Chain:</BodyText2>
                  <BodyText2>{product.specifications.valueChain}</BodyText2>
                </div>
              </div>

              {/* Features and Applications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-6">
                {/* Features */}
                <section className="bg-[#F7F9FA] p-5 rounded-t-xl md:rounded-xl">
                  <SubH3 className="mb-4">Features :</SubH3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 mt-1 mr-5 flex-shrink-0">
                          <div className="w-[14px] h-[14px] relative">
                            <Image
                              src="/images/star-orange.svg"
                              alt="icon"
                              fill
                            />
                          </div>
                        </span>
                        <BodyText2 className="text-gray-700">
                          {feature}
                        </BodyText2>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Applications */}
                <section className="bg-[#F7F9FA] p-5 rounded-b-xl md:rounded-xl">
                  <SubH3 className="mb-4">Applications :</SubH3>
                  <ul className="space-y-2">
                    {product.applications.map((application, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 mt-1 mr-5 flex-shrink-0">
                          <div className="w-[14px] h-[14px] relative">
                            <Image
                              src="/images/star-orange.svg"
                              alt="icon"
                              fill
                            />
                          </div>
                        </span>
                        <BodyText2 className="text-gray-700">
                          {application}
                        </BodyText2>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}