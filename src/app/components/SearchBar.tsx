import Image from "next/image";
import React from "react";
import clsx from "clsx";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  placeholder?: string;
  headerSearch?: boolean;
  className?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder,
  handleSearch,
  headerSearch,
  className,
}: SearchBarProps) {
  return (
    <form
      onSubmit={handleSearch}
      className={clsx(
        "flex items-center w-full bg-white rounded-full shadow-sm overflow-hidden  max-w-[85%]  z-10 ",
        headerSearch
          ? "mr-0 max-w-[90%] lg:max-w-[760px] mt-4"
          : "mx-auto md:max-w-[560px] mt-9",
        className
      )}
    >
      <input
        type="text"
        placeholder={placeholder || "Search by Document Name..."}
        value={value}
        onChange={onChange}
        className={clsx(
          `flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none`
        )}
      />
      <button
        type="submit"
        className="bg-orange-500 cursor-pointer text-white p-3 flex items-center justify-center rounded-full m-2 disabled:opacity-40"
        disabled={value?.length < 3}
      >
        <div className="w-[20px] h-[20px] relative">
          <Image src="/images/search-white.svg" alt="search" fill />
        </div>
      </button>
    </form>
  );
}
