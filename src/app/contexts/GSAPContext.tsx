"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPContextType {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  timeline: gsap.core.Timeline | null;
  createTimeline: () => gsap.core.Timeline;
}

const GSAPContext = createContext<GSAPContextType | null>(null);

export const useGSAP = () => {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error("useGSAP must be used within a GSAPProvider");
  }
  return context;
};

interface GSAPProviderProps {
  children: React.ReactNode;
}

export const GSAPProvider = ({ children }: GSAPProviderProps) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const createTimeline = () => {
    const timeline = gsap.timeline();
    timelineRef.current = timeline;
    return timeline;
  };

  useEffect(() => {
    gsap.ticker.lagSmoothing(500, 33);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const lateRefreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2000);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(refreshTimeout);
      clearTimeout(lateRefreshTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const value: GSAPContextType = {
    gsap,
    ScrollTrigger,
    timeline: timelineRef.current,
    createTimeline,
  };

  return <GSAPContext.Provider value={value}>{children}</GSAPContext.Provider>;
};
