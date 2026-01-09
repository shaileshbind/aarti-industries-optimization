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
    // Initialize Lenis Smooth Scroll with optimal settings for smooth scrolling
    const lenis = new Lenis({
      duration: 1.3,
      autoRaf: true
    });
    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger - update on scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Use requestAnimationFrame for smooth Lenis updates
    // This is the recommended approach by Lenis
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Configure GSAP ticker for better performance
    gsap.ticker.lagSmoothing(200);

    // Refresh ScrollTrigger after DOM is ready
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Refresh ScrollTrigger on window resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      // Clean up
      clearTimeout(refreshTimeout);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
      // Clean up ScrollTrigger instances
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
