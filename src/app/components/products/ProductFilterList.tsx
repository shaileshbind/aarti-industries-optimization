"use client";
import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import SmoothCollapseGSAP from "./SmoothCollapse";
import { BodyText1 } from "../Typography2";
import ProductTabs from "./ProductTabs";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ProductFilterListProps,
  SubCategory,
} from "@/app/types/product.listing.type";
import { ProductData } from "@/app/types/product.inner.type";
import MobileFilter from "./MobileFilter";
import Button from "../Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Custom sorting function for product names with numbers (e.g., "2,6 Di Fluoro Benzamide")
const sortProductNames = (a: ProductData, b: ProductData): number => {
  const nameA = (a.productName || "").toLowerCase().trim();
  const nameB = (b.productName || "").toLowerCase().trim();
  // Extract leading numbers (including comma-separated numbers like "2,6")
  const getLeadingNumbers = (str: string): number[] => {
    const match = str.match(/^(\d+(?:,\d+)*)/);
    if (!match) return [];
    return match[1].split(",").map(Number);
  };
  const numsA = getLeadingNumbers(nameA);
  const numsB = getLeadingNumbers(nameB);
  // If both have leading numbers, compare them numerically
  if (numsA.length > 0 && numsB.length > 0) {
    const minLength = Math.min(numsA.length, numsB.length);
    for (let i = 0; i < minLength; i++) {
      if (numsA[i] !== numsB[i]) {
        return numsA[i] - numsB[i];
      }
    }
    // If one has more numbers, it comes after
    if (numsA.length !== numsB.length) {
      return numsA.length - numsB.length;
    }
    // If numbers are equal, compare the rest alphabetically
    const restA = nameA.replace(/^\d+(?:,\d+)*\s*/, "");
    const restB = nameB.replace(/^\d+(?:,\d+)*\s*/, "");
    return restA.localeCompare(restB, undefined, { numeric: true, sensitivity: "base" });
  }
  // If only one has leading numbers, numbers come first
  if (numsA.length > 0) return -1;
  if (numsB.length > 0) return 1;

  // If neither has leading numbers, use standard alphabetical sort
  return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: "base" });
};

const ProductFilterList: React.FC<ProductFilterListProps> = ({
  catagoriesData,
  searchQuery = "",
  activeTab: activeTabProp,
  setActiveTab,
  clearSearch,
}) => {
  const ProductList = dynamic(() => import("./ProdutList"), { ssr: false });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  // Initialize activeTab from URL on mount, otherwise use prop
  const [activeTab, setActiveTabState] = useState(() => {
    const categoryFromUrl = searchParams.get("category");
    return categoryFromUrl || activeTabProp;
  });

  const [showSubCategories, setShowSubCategories] = useState(() => {
    const categoryFromUrl = searchParams.get("category");
    return categoryFromUrl ? categoryFromUrl !== "all" : false;
  });

  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    () => {
      const subcategoryFromUrl = searchParams.get("subcategory");
      return subcategoryFromUrl
        ? subcategoryFromUrl.split(",").filter(Boolean)
        : [];
    },
  );

  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [desktop, setDesktop] = useState<boolean>(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync local activeTab state with parent when it changes programmatically
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (!categoryFromUrl && activeTabProp !== activeTab) {
      setActiveTabState(activeTabProp);
    }
  }, [activeTabProp]);

  // Update URL when filters change
  const updateURL = useCallback(
    (category: string, subcategories: string[]) => {
      const params = new URLSearchParams(searchParams);

      // Update category
      if (category && category !== "all") {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      // Update subcategory
      if (subcategories.length > 0) {
        params.set("subcategory", subcategories.join(","));
      } else {
        params.delete("subcategory");
      }

      // Navigate with new params
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.push(newUrl, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [activeTab, selectedSubCategories, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Fetch products based on category and subcategory filters
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const subSlugs = selectedSubCategories.join(",");
      const url = `/api/products?category=${activeTab}${
        subSlugs ? `&subcategory=${subSlugs}` : ""
      }`;
      const res = await fetch(url);
      const result = await res.json();
      const products = result.data || [];
      // Sort products using custom function that handles numbers and commas
      const sortedProducts = products.sort(sortProductNames);
      setFilteredProducts(sortedProducts);
      setTotalProducts(result.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFilteredProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  }, [activeTab, selectedSubCategories]);

  // Fetch based on search query
  const fetchSearchResults = useCallback(async (query: string) => {
    if (!query || query.trim() === "") return;

    setLoading(true);
    try {
      const url = `/api/product-search?q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const result = await res.json();
      const products = result.products || [];
      // Sort products using custom function that handles numbers and commas
      const sortedProducts = products.sort(sortProductNames);
      setFilteredProducts(sortedProducts);
      setTotalProducts(sortedProducts.length);
    } catch (error) {
      console.error("Error searching products:", error);
      setFilteredProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Main effect: Fetch products or search results
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      fetchSearchResults(searchQuery);
    } else {
      fetchProducts();
    }
  }, [
    activeTab,
    selectedSubCategories,
    searchQuery,
    fetchProducts,
    fetchSearchResults,
  ]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      if (activeTab !== "all") {
        setActiveTabState("all");
        setActiveTab("all");
      }

      setShowSubCategories(false);
      setSelectedSubCategories([]);
    }
  }, [searchQuery]);

  // Toggle subcategory selection
  const toggleSubCategory = (slug: string) => {
    setSelectedSubCategories((prev) => {
      const newSelection = prev.includes(slug)
        ? prev.filter((x) => x !== slug)
        : [slug];

      updateURL(activeTab, newSelection);
      return newSelection;
    });
  };

  // Handle responsive behavior
  useEffect(() => {
    const update = () => setDesktop(window.innerWidth >= 720);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Handle tab change - CLEAR SEARCH COMPLETELY
  const handleTabChange = (id: string) => {
    setActiveTabState(id);
    setActiveTab(id); // Also update parent state
    setShowSubCategories(id !== "all");
    setSelectedSubCategories([]);

    updateURL(id, []);
    clearSearch();
  };

  // Handle load more
  const handleLoadMore = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setVisibleCount((c) => c + 12);
  };

  // Handle mobile filter apply
  const handleMobileFilterApply = (selected: string[]) => {
    setSelectedSubCategories(selected);
    updateURL(activeTab, selected);
  };

  return (
    <div className="w-full max-w-[85rem] mx-auto my-[60px] px-4">
      {/* Rest of the JSX remains the same */}
      <ProductTabs
        tabs={catagoriesData}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      {activeTab !== "all" && (
        <SmoothCollapseGSAP
          className="hidden md:block"
          isOpen={showSubCategories}
        >
          <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-[#F7F9FA] max-w-5xl mx-auto justify-center">
            {(() => {
              const subCategories = catagoriesData
                .find((item) => item.slug === activeTab)
                ?.product_sub_categories || [];
              return [...subCategories]
                .sort((a: SubCategory, b: SubCategory) => {
                  const subA = (a.subCategory || "").trim().toLowerCase();
                  const subB = (b.subCategory || "").trim().toLowerCase();
                  return subA.localeCompare(subB, undefined, { numeric: true, sensitivity: "base" });
                })
                .map((sub: SubCategory) => {
                const selected = selectedSubCategories.includes(sub.slug);
                return (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => toggleSubCategory(sub.slug)}
                    className={clsx(
                      "px-4 py-2 border rounded-[10px] transition inline-flex gap-2 items-center text-center cursor-pointer",
                      selected
                        ? "border-[#DC4C03] text-[#DC4C03]"
                        : "border-[#4C5861] hover:bg-gray-100",
                    )}
                  >
                    <span className="">
                      {sub.subCategory?.startsWith("Other-")
                        ? "Other"
                        : sub.subCategory?.startsWith("Acid-")
                          ? "Acid"
                          : sub.subCategory}
                    </span>
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
                });
            })()}
          </div>
        </SmoothCollapseGSAP>
      )}

      <div className="flex items-center justify-between mb-6 md:mt-10 relative z-[1]">
        <BodyText1>
          {searchQuery && searchQuery.trim() !== ""
            ? `Search Results for "${searchQuery}" (${
                loading ? "..." : totalProducts
              })`
            : activeTab !== "all"
              ? `Filtered Results (${loading ? "..." : totalProducts})`
              : `All Results (${loading ? "..." : totalProducts})`}
        </BodyText1>
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
      </div>

      {!desktop && showMobileFilter && (
        <MobileFilter
          subCategories={
            catagoriesData
              .find((item) => item.slug === activeTab)
              ?.product_sub_categories?.slice()
              .sort((a: SubCategory, b: SubCategory) => {
                const subA = (a.subCategory || "").trim().toLowerCase();
                const subB = (b.subCategory || "").trim().toLowerCase();
                return subA.localeCompare(subB, undefined, { numeric: true, sensitivity: "base" });
              }) || []
          }
          selected={selectedSubCategories}
          onClose={() => setShowMobileFilter(false)}
          showMobileFilter={showMobileFilter}
          onApply={handleMobileFilterApply}
          onClear={() => {
            setSelectedSubCategories([]);
            updateURL(activeTab, []);
          }}
        />
      )}

      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : filteredProducts.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-2 gap-x-[64px] lg:gap-y-[20px]">
            {visibleProducts.map((product) => (
              <div key={product.id} className="w-full">
                <ProductList
                  title={product.productName ?? ""}
                  link={`/${product.slug}${
                    queryString ? `?${queryString}` : ""
                  }`}
                  pdfLink={product?.tdsDocument?.file?.url}
                  pdfTitle="View TDS"
                />
              </div>
            ))}
          </div>
          {filteredProducts.length > visibleCount && (
            <div className="flex justify-center mt-10 lg:mt-[60px]">
              <div onClick={handleLoadMore} className="">
                <Button secondary title="View More" href="#" />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">No products found.</div>
      )}
    </div>
  );
};

export default ProductFilterList;
