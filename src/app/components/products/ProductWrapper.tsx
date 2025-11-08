"use client";
import React, { useState } from "react";
import Banner from "./Banner";
import ProductFilterList from "./ProductFilterList";
import { ProductWrapperProps } from "@/app/types/product.listing.type";

function ProductWrapper({
  section_one,
  product_categories,
}: ProductWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div>
      <Banner
        data={section_one}
        onSearch={setSearchQuery}
        setActiveTab={setActiveTab}
      />
      <ProductFilterList
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        catagoriesData={product_categories}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default ProductWrapper;
