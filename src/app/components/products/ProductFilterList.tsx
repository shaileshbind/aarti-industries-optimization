"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import SmoothCollapseGSAP from "./SmoothCollapse";
import { BodyText1 } from "../Typography2";
import ProductTabs from "./ProductTabs";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ProductFilterProps } from "@/app/types/product.listing.type";
import { ProductData } from "@/app/types/product.inner.type";

interface ProductFilterListProps extends ProductFilterProps {
  searchQuery?: string; //  new optional prop
}

const ProductFilterList: React.FC<ProductFilterListProps> = ({
  catagoriesData,
  searchQuery = "",
}) => {
  const ProductList = dynamic(() => import("./ProdutList"), { ssr: false });

  const [activeTab, setActiveTab] = useState<string>("all");
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  //  Fetch products (normal)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const subSlugs = selectedSubCategories.join(",");
      const url = `/api/products?category=${activeTab}${subSlugs ? `&subcategory=${subSlugs}` : ""}`;
      const res = await fetch(url);
      const result = await res.json();
      setFilteredProducts(result.data || []);
      setTotalProducts(result.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(filteredProducts, "filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

  //  Fetch based on search query
  const fetchSearchResults = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
      const result = await res.json();
      setFilteredProducts(result.data || []);
      setTotalProducts(result.total || 0);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const fetchData = async () => {
    if (searchQuery) {
      await fetchSearchResults(searchQuery);
    } else {
      await fetchProducts();
    }
  };
  fetchData();
}, [searchQuery, activeTab, selectedSubCategories]);

  //  Toggle subcategory selection
  const toggleSubCategory = (slug: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug]
    );
  };

  return (
    <div className="w-full max-w-[85rem] mx-auto my-[60px] px-4">
      {/*  Category Tabs */}
      <ProductTabs
        tabs={catagoriesData}
        activeTab={activeTab}
        onChange={(id: string) => {
          setActiveTab(id);
          setShowSubCategories(id !== "all");
          setSelectedSubCategories([]);
        }}
      />

      {/*  Subcategory Filter */}
      <SmoothCollapseGSAP className="hidden md:block" isOpen={showSubCategories}>
        <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-[#F7F9FA] max-w-5xl mx-auto">
          {catagoriesData
            .find((item) => item.slug === activeTab)
            ?.product_sub_categories?.map((sub) => {
              const selected = selectedSubCategories.includes(sub.slug);
              return (
                <button
                  key={sub.slug}
                  type="button"
                  onClick={() => toggleSubCategory(sub.slug)}
                  className={clsx(
                    "px-4 py-2 border rounded-[10px] transition inline-flex items-center",
                    selected
                      ? "border-[#DC4C03] text-[#DC4C03]"
                      : "border-[#4C5861] hover:bg-gray-100"
                  )}
                >
                  <span className="mr-2">{sub.subCategory}</span>
                  {selected && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubCategory(sub.slug);
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

      {/*  Result Header */}
      <div className="flex items-center justify-between mb-6 md:mt-10">
        <BodyText1>
          {searchQuery
            ? `Search Results for "${searchQuery}" (${loading ? "..." : totalProducts})`
            : `All Results (${loading ? "..." : totalProducts})`}
        </BodyText1>
      </div>

      {/*  Product List */}
      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-x-[64px] gap-y-[20px]">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ProductList
                title={product.productName ?? ""}
                link={`/${product.slug}`}
                pdfLink={typeof product?.productDetails?.documentSection === 'string' ? product.productDetails.documentSection : ''}
                pdfTitle={product?.productDetails?.abbreviation || ""}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ProductFilterList;