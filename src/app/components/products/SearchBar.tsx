"use client";
import { SearchBarProps } from "@/app/types/product.listing.type";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  setActiveTab,
  clearTrigger, // Add this prop
}) => {
  const [query, setQuery] = useState("");

  // Clear query when clearTrigger changes
  useEffect(() => {
    if (clearTrigger) {
      setQuery("");
    }
  }, [clearTrigger]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Only search if there's a query
    if (query.trim() === "") return;

    // Set active tab to "all" and trigger search
    setActiveTab("all");
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full bg-white rounded-full shadow-sm overflow-hidden mx-auto max-w-[85%]  md:max-w-[460px] lgx:max-w-[560px] z-10"
    >
      <input
        type="text"
        placeholder="Search within products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-orange-500 cursor-pointer text-white p-3 flex items-center justify-center rounded-full m-2"
      >
        <div className="w-[20px] h-[20px] relative">
          <Image src="/images/search-white.svg" alt="icon" fill />
        </div>
      </button>
    </form>
  );
};

export default SearchBar;
