"use client";
import React, { useState } from "react";
import { BodyText2, SubH2 } from "../Typography2";
import Image from "next/image";

interface MobileFilterProps {
  subCategories: { id: number; subCategory: string }[];
  selected: number[];
  onClose: () => void;
  onApply: (selected: number[]) => void;
  onClear: () => void;
  showMobileFilter: boolean;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  subCategories,
  selected,
  onClose,
  onApply,
  onClear,
  showMobileFilter = false,
}) => {
  const [localSelected, setLocalSelected] = useState<number[]>(selected);

  const toggleSubCategory = (id: number) => {
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApply(localSelected);
    onClose();
  };

  const handleClear = () => {
    setLocalSelected([]);
    onClear();
  };

  return (
    <div
      className={`fixed inset-0 top-[30%] z-50 bg-white flex flex-col h-0-full md:hidden transition-transform duration-300 ${
        showMobileFilter ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-start p-4">
        <button onClick={onClose} className="text-gray-500 mr-3">
          <div className="w-[16px] h-[16px] relative">
            <Image src="/images/chevron-left.svg" alt="icon" fill />
          </div>
        </button>
        <SubH2>Filter by</SubH2>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7F9FA]">
        {subCategories.map((sub) => {
          const isSelected = localSelected.includes(sub.id);
          return (
            <label
              key={sub.id}
              className="flex items-center justify-between gap-3 cursor-pointer select-none"
            >
              <BodyText2 className="text-gray-800">{sub.subCategory}</BodyText2>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSubCategory(sub.id)}
                className="h-5 w-5 accent-[#E55E2C] cursor-pointer"
              />
            </label>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex">
        <button
          onClick={handleClear}
          className="flex-1 py-3 rounded-lg text-gray-700"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="flex-1 py-3 bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] text-white rounded-tl-xl"
        >
          Apply filters
        </button>
      </div>
    </div>
  );
};

export default MobileFilter;
