"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { BodyText3 } from "../Typography2";
import Image from "next/image";

interface Phase {
  title: string;
  years: number[];
}

interface TimelineProps {
  phases: Phase[];
  onYearChange?: (year: number) => void;
  onPhaseChange?: (phase: number) => void;
  activePhase?: number;
  activeYear?: number;
  onPhaseClick?: (phaseIndex: number) => void;
  onYearClick?: (year: number) => void;
}

export default function MainTimeline({
  onYearChange,
  onPhaseChange,
  phases,
  activePhase: externalActivePhase,
  activeYear: externalActiveYear,
  onPhaseClick: externalPhaseClick,
  onYearClick: externalYearClick
}: TimelineProps) {
  // Use external state if provided, otherwise maintain internal state
  const [internalActivePhase, setInternalActivePhase] = useState(0);
  const [internalActiveYear, setInternalActiveYear] = useState(phases[0].years[0]);

  const activePhase = externalActivePhase ?? internalActivePhase;
  const activeYear = externalActiveYear ?? internalActiveYear;

  const phaseRefs = useRef<HTMLDivElement[]>([]);
  const dotRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (onYearChange) {
      onYearChange(activeYear);
    }
  }, [activeYear, onYearChange]);

  useEffect(() => {
    if (onPhaseChange) {
      onPhaseChange(activePhase);
    }
  }, [activePhase, onPhaseChange]);

  useEffect(() => {
    gsap.to(phaseRefs.current, {
      flex: (i) => (i === activePhase ? 2 : 1),
      duration: 0.6,
      ease: "power2.out",
    });
  }, [activePhase]);

  useEffect(() => {
    dotRefs.current.forEach((dot, year) => {
      if (year === activeYear) {
        gsap.to(dot, { scale: 1.2, backgroundColor: "#F36633", duration: 0.3 });
      } else {
        gsap.to(dot, { scale: 1, backgroundColor: "#94a3b8", duration: 0.3 });
      }
    });
  }, [activeYear]);

  const handlePhaseClick = (i: number) => {
    if (externalPhaseClick) {
      externalPhaseClick(i);
    } else {
      setInternalActivePhase(i);
      setInternalActiveYear(phases[i].years[0]);
    }
  };

  const handleYearClick = (year: number) => {
    if (externalYearClick) {
      externalYearClick(year);
    } else {
      setInternalActiveYear(year);
    }
  };

  const handleNext = () => {
    const currentPhase = phases[activePhase];
    const currentIndex = currentPhase.years.indexOf(activeYear);

    if (currentIndex < currentPhase.years.length - 1) {
      handleYearClick(currentPhase.years[currentIndex + 1]);
    } else if (activePhase < phases.length - 1) {
      const newPhase = activePhase + 1;
      if (externalPhaseClick) {
        externalPhaseClick(newPhase);
        if (externalYearClick) {
          externalYearClick(phases[newPhase].years[0]);
        }
      } else {
        setInternalActivePhase(newPhase);
        setInternalActiveYear(phases[newPhase].years[0]);
      }
    }
  };

  const handlePrev = () => {
    const currentPhase = phases[activePhase];
    const currentIndex = currentPhase.years.indexOf(activeYear);

    if (currentIndex > 0) {
      handleYearClick(currentPhase.years[currentIndex - 1]);
    } else if (activePhase > 0) {
      const newPhase = activePhase - 1;
      const prevPhaseYears = phases[newPhase].years;
      if (externalPhaseClick) {
        externalPhaseClick(newPhase);
        if (externalYearClick) {
          externalYearClick(prevPhaseYears[prevPhaseYears.length - 1]);
        }
      } else {
        setInternalActivePhase(newPhase);
        setInternalActiveYear(prevPhaseYears[prevPhaseYears.length - 1]);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Mobile View - Timeline Only (Dropdown will be in parent) */}
      <div className="md:hidden flex items-center justify-center w-full max-w-md mx-auto mt-8">
        {/* Mobile Timeline - Single Phase */}
        <div className="flex-1 relative">
          <div className="relative w-full flex justify-between items-center px-4">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-300 -translate-y-1/2" />

            {phases[activePhase].years.map((year) => (
              <div
                key={year}
                ref={(el) => {
                  if (el) dotRefs.current.set(year, el);
                }}
                onClick={() => handleYearClick(year)}
                className="relative z-10 w-3 h-3 rounded-full bg-slate-400 cursor-pointer"
              >
                <BodyText3
                  className={`absolute top-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap ${activeYear === year ? "text-orange-600 font-medium" : "text-gray-600"
                    }`}
                >
                  {year}
                </BodyText3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View - Original Layout */}
      <div className="hidden md:flex items-end justify-center w-full gap-3 px-4 py-16 overflow-hidden">
        {/* Timeline */}
        <div className="flex w-full max-full mx-6 transition-all">
          {phases.map((phase, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) phaseRefs.current[i] = el;
              }}
              onClick={() => handlePhaseClick(i)}
              className={`flex flex-col items-center justify-center relative cursor-pointer transition-all duration-500 ${activePhase === i ? " text-gray-900" : " text-gray-400"
                }`}
            >
              <BodyText3
                className={`mb-2 pb-5 ${activePhase === i ? "text-gray-800" : "text-gray-400"
                  }`}
              >
                {phase.title}
              </BodyText3>

              <div
                className={`relative w-full flex justify-between items-center 
                ${i === 0
                    ? "pr-7"
                    : i === phases.length - 1
                      ? "pl-7"
                      : "px-7"
                  }`}
              >
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-300 -translate-y-1/2" />

                {phase.years.map((year) => (
                  <div
                    key={year}
                    ref={(el) => {
                      if (el) dotRefs.current.set(year, el);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePhaseClick(i);
                      handleYearClick(year);
                    }}
                    className="relative z-10 w-2.5 h-2.5 rounded-full bg-slate-400 cursor-pointer"
                  >
                    {/* YEAR LABEL: smooth fade */}
                    <BodyText3
                      className={
                        "absolute top-6 left-1/2 transform -translate-x-1/2 text-xs" +
                        "transition-opacity duration-700 ease-out " +
                        (activePhase === i
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-2 pointer-events-none") +
                        (activeYear === year ? " text-orange-100" : " text-[##8B97AF")
                      }
                    >
                      {year}
                    </BodyText3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Navigation Arrows */}
        <button
          onClick={handlePrev}
          disabled={activePhase === 0 && activeYear === phases[0].years[0]}
          className="disabled:opacity-40"
        >
          <Image
            src="/images/home/chevron-right-orange.svg"
            alt="prev"
            width={34}
            height={34}
            className={`-rotate-180 swiper-button-prev transition-opacity`}
          />
        </button>

        <button
          onClick={handleNext}
          disabled={
            activePhase === phases.length - 1 &&
            activeYear === phases[phases.length - 1].years.slice(-1)[0]
          }
          className="disabled:opacity-40"
        >
          <Image
            src="/images/home/chevron-right-orange.svg"
            alt="next"
            width={34}
            height={34}
          />
        </button>
      </div>
    </div>
  );
}

