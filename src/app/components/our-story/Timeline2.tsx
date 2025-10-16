"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";


const phases = [
  {
    title: "Laying the Roots (1984–2012)",
    years: [1984, 1986, 1990, 1992, 1997, 2004, 2011],
  },
  {
    title: "Sustained Growth (2013–2018)",
    years: [2013, 2014, 2015, 2016, 2018],
  },
  {
    title: "Branching into the Future (2019–2025)",
    years: [2019, 2020, 2021, 2023, 2025],
  },
];

export default function Timeline() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeYear, setActiveYear] = useState(2004);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<HTMLDivElement[]>([]);

  // Animate dots & active indicator
  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current.querySelectorAll(".dot"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activePhase]);

  useEffect(() => {
    dotRefs.current.forEach((dot) => {
      if (Number(dot.dataset.year) === activeYear) {
        gsap.to(dot, { scale: 1.3, backgroundColor: "#f97316", duration: 0.3 });
      } else {
        gsap.to(dot, { scale: 1, backgroundColor: "#94a3b8", duration: 0.3 });
      }
    });
  }, [activeYear]);

  const handleNext = () => {
    if (activePhase < phases.length - 1) {
      gsap.to(lineRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          setActivePhase((p) => p + 1);
          gsap.fromTo(
            lineRef.current,
            { x: "100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 0.4 }
          );
        },
      });
    }
  };

  const handlePrev = () => {
    if (activePhase > 0) {
      gsap.to(lineRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          setActivePhase((p) => p - 1);
          gsap.fromTo(
            lineRef.current,
            { x: "-100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 0.4 }
          );
        },
      });
    }
  };

  const phase = phases[activePhase];

  return (
    <div className="flex items-center justify-center w-full px-4 py-8 bg-white overflow-hidden">
      <button
        onClick={handlePrev}
        disabled={activePhase === 0}
        className="p-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="w-full max-w-4xl px-8">
        <h2 className="text-sm font-medium text-gray-600 mb-4 text-center">
          {phase.title}
        </h2>

        <div className="relative flex items-center justify-between" ref={lineRef}>
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-300 -translate-y-1/2"></div>

          {phase.years.map((year, idx) => (
            <div
              key={year}
              data-year={year}
              ref={(el) => {
                if (el) dotRefs.current[idx] = el;
              }}
              onClick={() => setActiveYear(year)}
              className={`dot relative z-10 w-2.5 h-2.5 rounded-full bg-slate-400 cursor-pointer transition-colors`}
            >
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">
                {year}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={activePhase === phases.length - 1}
        className="p-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
