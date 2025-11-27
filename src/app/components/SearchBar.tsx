import Image from "next/image";
import React from "react";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
};

export default function SearchBar({
  value,
  onChange,
  handleSearch,
}: SearchBarProps) {
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full bg-white rounded-full shadow-sm overflow-hidden mx-auto max-w-[85%] md:max-w-[560px] z-10 mt-9"
    >
      <input
        type="text"
        placeholder="Search by Document Name..."
        value={value}
        onChange={onChange}
        className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-orange-500 cursor-pointer text-white p-3 flex items-center justify-center rounded-full m-2"
      >
        <div className="w-[20px] h-[20px] relative">
          <Image src="/images/search-white.svg" alt="search" fill />
        </div>
      </button>
    </form>
  );
}
