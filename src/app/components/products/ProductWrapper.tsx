"use client";
import { useState, useEffect } from "react";
import Banner from "./Banner";
import ProductFilterList from "./ProductFilterList";
import { ProductWrapperProps } from "@/app/types/product.listing.type";

function ProductWrapper({
  section_one,
  product_categories,
}: ProductWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [clearTrigger, setClearTrigger] = useState(0); // Add this state

  // Scroll to top when component mounts (when navigating to products page)
  useEffect(() => {
    // Reset scroll position to top when navigating to products page
    // Use requestAnimationFrame to ensure DOM is ready and Lenis has processed
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      // Also try direct scrollTop assignment as fallback for Lenis compatibility
      if (typeof window !== "undefined" && window.document?.documentElement) {
        window.document.documentElement.scrollTop = 0;
        window.document.body.scrollTop = 0;
      }
    });
  }, []);

  // Clear search query and trigger input field clear
  const clearSearch = () => {
    setSearchQuery("");
    setClearTrigger((prev) => prev + 1); // Increment to trigger clear in SearchBar
  };

  return (
    <div>
      <Banner
        data={section_one}
        onSearch={setSearchQuery}
        setActiveTab={setActiveTab}
        clearTrigger={clearTrigger}
      />
      <ProductFilterList
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        catagoriesData={product_categories}
        searchQuery={searchQuery}
        clearSearch={clearSearch}
      />
    </div>
  );
}

export default ProductWrapper;
