"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import SmoothCollapseGSAP from "./SmoothCollapse";
import { BodyText1 } from "../Typography2";
import ProductTabs from "./ProductTabs";
import MobileFilter from "./MobileFilter";
import Image from "next/image";
import dynamic from "next/dynamic";

type SubCategory = {
  id: number;
  name: string;
  products: Product[];
};
type Tab = {
  id: number;
  label: string;
  subCategories?: SubCategory[];
};
type Product = {
  id: number;
  title: string;
  link: string;
  pdfTitle: string;
  pdfLink: string;
};

const sampleJsonData = {
  categories: [
    {
      id: 1,
      category: "All",
      subcategories: [
        {
          id: 1,
          subCategory: "Nitration",
          products: [],
        },
      ],
    },
    {
      id: 2,
      category: "By chemistry",
      subcategories: [
        {
          id: 2,
          subCategory: "Chlorination",
          products: [
            {
              id: 1,
              title: "chem-C-Para Dichloro Benzene",
              link: "/para-dichloro-benzene",
              pdfTitle: "PDCB Datasheet",
              pdfLink: "/pdfs/pdcb-datasheet.pdf",
            },
          ],
        },
        {
          id: 3,
          subCategory: "Nitration",
          products: [
            {
              id: 2,
              title: "chem-N-Nitro Benzene",
              link: "/nitro-benzene",
              pdfTitle: "NB Technical Sheet",
              pdfLink: "/pdfs/nitro-benzene.pdf",
            },
          ],
        },
        {
          id: 4,
          subCategory: "Oxidation",
          products: [
            {
              id: 3,
              title: "chem-O-Maleic Anhydride",
              link: "/maleic-anhydride",
              pdfTitle: "MA Safety Sheet",
              pdfLink: "/pdfs/maleic-anhydride.pdf",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      category: "By End-Use",
      subcategories: [
        {
          id: 5,
          subCategory: "Agrochemicals",
          products: [
            {
              id: 4,
              title: "end-A-Herbicide Intermediate",
              link: "/herbicide-intermediate",
              pdfTitle: "Herbicide Tech Doc",
              pdfLink: "/pdfs/herbicide-intermediate.pdf",
            },
          ],
        },
        {
          id: 6,
          subCategory: "Polymers",
          products: [
            {
              id: 5,
              title: "end-P-Styrene Monomer",
              link: "/styrene-monomer",
              pdfTitle: "Styrene Datasheet",
              pdfLink: "/pdfs/styrene-monomer.pdf",
            },
          ],
        },
        {
          id: 7,
          subCategory: "Dyes",
          products: [
            {
              id: 6,
              title: "end-D-Azo Dye Intermediate",
              link: "/azo-dye-intermediate",
              pdfTitle: "Azo Dye Product Sheet",
              pdfLink: "/pdfs/azo-dye.pdf",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      category: "By Value Chain",
      subcategories: [
        {
          id: 8,
          subCategory: "Benzene Derivatives",
          products: [
            {
              id: 7,
              title: "value-B-Aniline",
              link: "/aniline",
              pdfTitle: "Aniline Datasheet",
              pdfLink: "/pdfs/aniline.pdf",
            },
          ],
        },
        {
          id: 9,
          subCategory: "Di Chloro Benzene",
          products: [
            {
              id: 8,
              title: "value-D-1,2-Dichlorobenzene",
              link: "/12-dichlorobenzene",
              pdfTitle: "1,2-DCB Tech Sheet",
              pdfLink: "/pdfs/12-dcb.pdf",
            },
          ],
        },
        {
          id: 10,
          subCategory: "Phenol Chain",
          products: [
            {
              id: 9,
              title: "value-P-Phenol",
              link: "/phenol",
              pdfTitle: "Phenol Datasheet",
              pdfLink: "/pdfs/phenol.pdf",
            },
          ],
        },
      ],
    },
  ],
};

const categoryTabs: Tab[] = sampleJsonData.categories.map((item) => ({
  id: item.id,
  label: item.category,
  subCategories: item.subcategories.map((sub) => ({
    id: sub.id,
    name: sub.subCategory,
    products: sub.products,
  })),
}));

const ProductFilterList: React.FC = () => {
  const ProductList = dynamic(() => import("./ProdutList"), { ssr: false });

  const [activeTab, setActiveTab] = useState<number>(categoryTabs[0].id);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [desktop, setDesktop] = useState<boolean>(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    const update = () => setDesktop(window.innerWidth >= 720);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>(
    []
  );
  const toggleSubCategory = (id: number) => {
    setSelectedSubCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredProducts = categoryTabs.flatMap((tab) => {
    if (activeTab === 1) {
      return tab.subCategories?.flatMap((sub) => sub.products) || [];
    }
    if (tab.id === activeTab) {
      return (
        tab.subCategories?.flatMap((sub) => {
          if (selectedSubCategories.length === 0) return sub.products;
          return selectedSubCategories.includes(sub.id) ? sub.products : [];
        }) || []
      );
    }
    return [];
  });

  return (
    <div className="w-full max-w-[85rem] mx-auto my-[60px] px-4">
      {/* Tabs */}
      <ProductTabs
        tabs={categoryTabs}
        activeId={activeTab}
        onChange={(id) => {
          setActiveTab(id);
          setShowSubCategories(id !== 1);
          setSelectedSubCategories([]);
        }}
      />
      {/* Subcategories */}
      <SmoothCollapseGSAP
        className="hidden md:block"
        isOpen={showSubCategories}
      >
        <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-[#F7F9FA] max-w-5xl mx-auto">
          {categoryTabs
            .find((t) => t.id === activeTab)
            ?.subCategories?.map((sub) => {
              const selected = selectedSubCategories.includes(sub.id);
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => toggleSubCategory(sub.id)}
                  className={clsx(
                    "px-4 py-2 border rounded-[10px] transition inline-flex items-center",
                    selected
                      ? "border-[#DC4C03] text-[#DC4C03]"
                      : "border-[#4C5861] hover:bg-gray-100"
                  )}
                >
                  <span className="mr-2">{sub.name}</span>
                  {selected && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubCategory(sub.id);
                      }}
                      className="w-[20px] h-[20px] relative"
                    >
                      <Image src="/images/cross-orange.svg" alt="icon" fill />
                    </div>
                  )}
                </button>
              );
            })}
        </div>
      </SmoothCollapseGSAP>
      {/* Product List */}
      <div className="flex items-center justify-between mb-6 md:mt-10">
        <BodyText1>All Results ({filteredProducts.length})</BodyText1>
        {!desktop && showSubCategories && (
          <button
            className="flex gap-2 items-center"
            onClick={() => setShowMobileFilter(true)}
          >
            <BodyText1>Filters</BodyText1>
            <div className="w-[16px] h-[16px] relative">
              <Image src="/images/filter.svg" alt="icon" fill />
            </div>
          </button>
        )}
        {!desktop && showMobileFilter && (
          <MobileFilter
            subCategories={
              categoryTabs.find((t) => t.id === activeTab)?.subCategories || []
            }
            selected={selectedSubCategories}
            onClose={() => setShowMobileFilter(false)}
            showMobileFilter={showMobileFilter}
            onApply={(selected) => setSelectedSubCategories(selected)}
            onClear={() => setSelectedSubCategories([])}
          />
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-x-[64px] gap-y-[20px]">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-full">
            <ProductList
              title={product.title}
              link={product.link}
              pdfLink={product.pdfLink}
              pdfTitle={product.pdfTitle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilterList;