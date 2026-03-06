"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPContextType {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  timeline: gsap.core.Timeline | null;
  createTimeline: () => gsap.core.Timeline;
  stopLenis: () => void;
  startLenis: () => void;
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
  const lenisRef = useRef<Lenis | null>(null);

  const createTimeline = () => {
    const timeline = gsap.timeline();
    timelineRef.current = timeline;
    return timeline;
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Single unified animation loop: GSAP ticker drives Lenis
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    // ScrollTrigger refresh after components have mounted
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Secondary refresh for late-loading async content (e.g. fetched data that changes page height)
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
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const stopLenis = () => {
    lenisRef.current?.stop();
  };

  const startLenis = () => {
    lenisRef.current?.start();
  };

  const value: GSAPContextType = {
    gsap,
    ScrollTrigger,
    timeline: timelineRef.current,
    createTimeline,
    stopLenis,
    startLenis,
  };

  return <GSAPContext.Provider value={value}>{children}</GSAPContext.Provider>;
};
