"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { BodyText1 } from "../Typography2";

interface Phase {
  title: string;
  years: number[];
}

interface MobilePhaseDropdownProps {
  phases: Phase[];
  activePhase: number;
  onPhaseSelect: (phaseIndex: number) => void;
}

export default function MobilePhaseDropdown({
  phases,
  activePhase,
  onPhaseSelect,
}: MobilePhaseDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePhaseClick = (i: number) => {
    onPhaseSelect(i);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gradient-orange-3 rounded-lg hover:border-orange-500 transition-colors"
      >
        <BodyText1 className="text-white">
          {phases[activePhase].title}
        </BodyText1>
        <div className="border-1 border-white rounded-full p-1">
             <ChevronDown
          size={20}
          className={`text-white transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-lg z-50">
          {phases.map((phase, i) => (
            <button
              key={i}
              onClick={() => handlePhaseClick(i)}
              className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors ${
                activePhase === i
                  ? "bg-gradient-orange-3 text-white"
                  : "text-gray-700"
              } ${i === 0 ? "rounded-t-lg" : ""} ${
                i === phases.length - 1 ? "rounded-b-lg" : "border-b border-gray-100"
              }`}
            >
              {phase.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}