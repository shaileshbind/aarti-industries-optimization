"use client";
import React, { useState } from "react";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", query);
        // 👉 Add your search logic here
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
                className="bg-orange-500 hover:bg-orange-600 text-white p-3 flex items-center justify-center rounded-full m-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.9984 21L16.6484 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </form>
    );
};

export default SearchBar;
