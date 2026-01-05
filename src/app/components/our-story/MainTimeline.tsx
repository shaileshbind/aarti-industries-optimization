"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { BodyText2, BodyText3 } from "../Typography2";
import Image from "next/image";

interface Phase {
  title: string;
  years: string[];
}

interface TimelineProps {
  phases: Phase[];
  onYearChange?: (year: string) => void;
  onPhaseChange?: (phase: number) => void;
  activePhase?: number;
  activeYear?: string;
  onPhaseClick?: (phaseIndex: number) => void;
  onYearClick?: (year: string) => void;
}

export default function MainTimeline({
  onYearChange,
  onPhaseChange,
  phases,
  activePhase: externalActivePhase,
  activeYear: externalActiveYear,
  onPhaseClick: externalPhaseClick,
  onYearClick: externalYearClick,
}: TimelineProps) {
  // Updated: internal state handles strings
  const [internalActivePhase, setInternalActivePhase] = useState(0);
  const [internalActiveYear, setInternalActiveYear] = useState<string>(
    phases[0].years[0]
  );

  const activePhase = externalActivePhase ?? internalActivePhase;
  const activeYear = externalActiveYear ?? internalActiveYear;

  const phaseRefs = useRef<HTMLDivElement[]>([]);
  const dotRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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
        gsap.to(dot, { scale: 1.2, duration: 0.3 });
      } else {
        gsap.to(dot, { scale: 1, duration: 0.3 });
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

  const handleYearClick = (year: string) => {
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
      <div className="flex lg:hidden items-center justify-center w-full max-w-md mx-auto h-[100px]">
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
                className={`relative transition-all duration-300 z-10 w-1.5 h-1.5 rounded-full cursor-pointer bg-gray-200 `}
              >
                <div
                  className={`absolute inset-0 h-4 w-4 top-[-13px] !z-50 -left-[12px] transform translate-x-1/2 translate-y-1/2 rounded-full bg-center bg-cover transition-opacity duration-300
                      ${activeYear === year ? "opacity-100 bg-white/0" : "opacity-0"}
                    `}
                  style={{ backgroundImage: "url('/images/star-orange.svg')" }}
                ></div>
                <BodyText3
                  className={`absolute top-6 left-1/2 transform -translate-x-1/2 !text-xs transition-all duration-300 ${
                    activeYear === year
                      ? "text-orange-600 font-medium scale-120"
                      : "text-gray-600"
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
      <div className="flex items-end justify-start md:justify-center w-full gap-3 md:px-4 pt-6 md:py-16 overflow-hidden">
        {/* Timeline */}
        <div className="hidden lg:flex w-full max-full mx-6 transition-all">
          {phases.map((phase, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) phaseRefs.current[i] = el;
              }}
              onClick={() => handlePhaseClick(i)}
              className={`flex flex-col ml-1 justify-center relative cursor-pointer items-start transition-all duration-500 ${
                activePhase === i ? " text-gray-900" : " text-gray-400"
              }`}
            >
              <BodyText2
                className={`mb-2 pb-5 ${
                  activePhase === i ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {phase.title}
              </BodyText2>

              <div
                className={`relative w-full flex justify-between items-center 
                ${i === 0 ? "pr-0" : "pl-14"} 
                ${activePhase === i ? "!pl-0" : "z-10"}
                ${activePhase > 0 && activePhase === i + 1 ? "!pr-14" : "z-10"}
                `}
              >
                <div
                  className={`absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 ${
                    activePhase === i ? " bg-slate-400/80" : " bg-gray-200"
                  } `}
                />

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
                    className={`relative z-30 w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300
                      ${
                        activePhase === i
                          ? activeYear === year
                            ? "!bg-transparent"
                            : "bg-gray-400"
                          : "bg-gray-200/80"
                      }
                    `}
                  >
                    <div
                      className={`absolute inset-0 h-3 w-3 top-[-10px] !z-50 left-[-9px] transform translate-x-1/2 translate-y-1/2 rounded-full bg-center bg-cover transition-opacity duration-300
                      ${activeYear === year ? "opacity-100 bg-white/0" : "opacity-0"}
                    `}
                      style={{
                        backgroundImage: "url('/images/star-orange.svg')",
                      }}
                    ></div>
                    {/* YEAR LABEL: smooth fade */}
                    <BodyText3
                      className={
                        "absolute top-6 left-1/2 transform -translate-x-1/2 text-xs" +
                        "transition-opacity duration-700 ease-out " +
                        (activePhase === i
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-2 pointer-events-none") +
                        (activeYear === year
                          ? " text-orange-100"
                          : " text-[#8B97AF")
                      }
                    >
                      {year}
                      <span className="absolute left-0 bottom-0 w-full h-[50px] cursor-pointer"></span>
                    </BodyText3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="flex items-center gap-4 lg:-mb-[10px] relative z-[1]">
          <button
            onClick={handlePrev}
            disabled={activePhase === 0 && activeYear === phases[0].years[0]}
            className="disabled:opacity-40 cursor-pointer"
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
            className="disabled:opacity-40 cursor-pointer"
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
    </div>
  );
}