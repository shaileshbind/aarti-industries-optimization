"use client";
import Image from "next/image";
import React, { useState } from "react";

const SearchBar: React.FC<{ onSearch: (q: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full bg-white rounded-full shadow-sm overflow-hidden mx-auto max-w-[85%] md:max-w-[560px] z-10"
    >
      <input
        type="text"
        placeholder="Search by product name, chemistry, or application"
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
