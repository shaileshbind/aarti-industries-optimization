"use client";
import { useState } from "react";
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
