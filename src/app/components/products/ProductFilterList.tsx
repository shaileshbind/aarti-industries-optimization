"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import SmoothCollapseGSAP from "./SmoothCollapse";
import { BodyText1 } from "../Typography2";
import ProductTabs from "./ProductTabs";
import MobileFilter from "./MobileFilter";
import Image from "next/image";

type SubCategory = {
  id: string;
  name: string;
};

type Tab = {
  id: string;
  label: string;
  subCategories?: SubCategory[];
};

type Product = {
  id: string;
  title: string;
  tdsLink: string;
  redirectLink: string;
};

// Dummy Data
const tabs: Tab[] = [
  { id: "all", label: "All" },
  {
    id: "chemistry",
    label: "By Chemistry",
    subCategories: [
      { id: "chlorination", name: "Chlorination" },
      { id: "nitration", name: "Nitration" },
      { id: "hydrogenation", name: "Hydrogenation" },
      { id: "esterification", name: "Esterification" },
    ],
  },
  {
    id: "enduse",
    label: "By End Use",
    subCategories: [
      { id: "pharma", name: "Pharmaceuticals" },
      { id: "agro", name: "Agrochemicals" },
    ],
  },
  {
    id: "valuechain",
    label: "By Value Chain",
    subCategories: [
      { id: "pharma", name: "Pharmaceuticals" },
      { id: "agro", name: "Agrochemicals" },
      { id: "polymers", name: "Polymers" },
      { id: "dyes", name: "Dyes & Pigments" },
      { id: "speciality", name: "Speciality Chemicals" },
      { id: "others", name: "Others" },
      { id: "intermediates", name: "Intermediates" },
      { id: "solvents", name: "Solvents" },
      { id: "aromatics", name: "Aromatics" },
    ],
  },
];

const products: Product[] = [
  {
    id: "p1",
    title: "Para Dichloro Benzene",
    tdsLink: "#",
    redirectLink: "para-dichloro-benzene",
  },
  {
    id: "p2",
    title: "1,2,3 Tri Chloro Benzene",
    tdsLink: "#",
    redirectLink: "para-dichloro-benzene",
  },
  {
    id: "p3",
    title: "6-Chloro-2,4-dinitroaniline",
    tdsLink: "#",
    redirectLink: "#",
  },
  {
    id: "p4",
    title: "Ortho Dichloro Benzene",
    tdsLink: "#",
    redirectLink: "#",
  },
  {
    id: "p5",
    title: "1,3,5 Tri Chloro Benzene",
    tdsLink: "#",
    redirectLink: "#",
  },
  {
    id: "p6",
    title: "4-Chloro-2-methylphenol",
    tdsLink: "#",
    redirectLink: "#",
  },
  {
    id: "p7",
    title: "4-Chloro-2-nitroaniline",
    tdsLink: "#",
    redirectLink: "#",
  },
  {
    id: "p8",
    title: "1,3,5 Tri Chloro Benzene",
    tdsLink: "#",
    redirectLink: "#",
  },
  {
    id: "p9",
    title: "4-Chloro-2-methylphenol",
    tdsLink: "#",
    redirectLink: "#",
  },
  {
    id: "p10",
    title: "4-Chloro-2-nitroaniline",
    tdsLink: "#",
    redirectLink: "#",
  },
];

const ProductFilterList: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [desktop, setDesktop] = useState<boolean>(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    const update = () => setDesktop(window.innerWidth >= 720);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // store multi-selected subcategory ids for filtering
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const toggleSubCategory = (id: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[85rem] mx-auto my-[60px] px-4">
      {/* Tabs */}
      <ProductTabs
        tabs={tabs}
        activeId={activeTab}
        onChange={(id) => {
          setActiveTab(id);
          setShowSubCategories(id !== "all");
        }}
      />

      {/* Subcategories */}
      <SmoothCollapseGSAP
        className="hidden md:block"
        isOpen={showSubCategories}
      >
        <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-[#F7F9FA] max-w-5xl mx-auto">
          {tabs
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
        <BodyText1>All Results (345)</BodyText1>

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
              tabs.find((t) => t.id === activeTab)?.subCategories || []
            }
            selected={selectedSubCategories}
            onClose={() => setShowMobileFilter(false)}
            showMobileFilter={showMobileFilter}
            onApply={(selected) => setSelectedSubCategories(selected)}
            onClear={() => setSelectedSubCategories([])}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {products.map((product, index) => {
          const isHighlighted =
            hoveredIndex === index || (hoveredIndex === null && index === 0);
          return (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredIndex(index)}
              className={clsx(
                "flex items-center justify-between border-b-2 py-4 md:p-4 transition-colors duration-500 cursor-pointer lg:min-w-[628px] w-full md:w-auto",
                isHighlighted && desktop
                  ? "bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] rounded-lg text-white border-transparent"
                  : "bg-white hover:bg-orange-50 border-gray-200"
              )}
            >
              <div className="flex flex-col">
                {/* Title */}
                <BodyText1
                  className={clsx(
                    "text-lg font-medium",
                    isHighlighted && desktop ? "text-white" : "text-gray-800"
                  )}
                >
                  {product.title}
                </BodyText1>

                <a
                  href={product.tdsLink}
                  download
                  className={clsx(
                    " items-center space-x-1 text-sm md:hidden flex mt-1",
                    isHighlighted && desktop ? "text-white" : "text-gray-700"
                  )}
                >
                  <span>View TDS</span>
                </a>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <a
                  href={product.tdsLink}
                  download
                  className={clsx(
                    " items-center space-x-1 text-sm md:flex hidden",
                    isHighlighted && desktop ? "text-white" : "text-gray-700"
                  )}
                >
                  <span>View TDS</span>

                  <div className="w-[20px] h-[20px] relative">
                    {isHighlighted && desktop ? (
                      <Image
                        src="/images/download-icon-white.svg"
                        alt="icon"
                        fill
                        className="w-[20px] h-[20px] "
                      />
                    ) : (
                      <Image
                        src="/images/download-icon-grey.svg"
                        alt="icon"
                        fill
                        className="w-[20px] h-[20px] "
                      />
                    )}
                  </div>
                </a>

                <a
                  href={"/products/" + product.redirectLink}
                  className={clsx(
                    "w-8 h-8 flex items-center justify-center border rounded-[18px] transition",
                    isHighlighted && desktop
                      ? "border-white text-white hover:text-orange-600"
                      : "border-orange-500 text-orange-500 hover:bg-orange-500"
                  )}
                >
                  <div className="w-[20px] h-[20px] relative">
                    {isHighlighted && desktop ? (
                      <Image
                        src="/images/arrow-up-right-w.svg"
                        alt="icon"
                        fill
                        className="w-[20px] h-[20px] "
                      />
                    ) : (
                      <Image
                        src="/images/arrow-up-right-o.svg"
                        alt="icon"
                        fill
                        className="w-[20px] h-[20px] "
                      />
                    )}
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilterList;