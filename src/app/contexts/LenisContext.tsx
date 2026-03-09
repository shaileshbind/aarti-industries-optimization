"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisContextType {
  stopLenis: () => void;
  startLenis: () => void;
}

const LenisContext = createContext<LenisContextType | null>(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context;
};

interface LenisProviderProps {
  children: React.ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      syncTouch: true,
      orientation: "vertical",
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    let running = true;
    function raf(time: number) {
      if (!running) return;
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      running = false;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const stopLenis = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const startLenis = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <LenisContext.Provider value={{ stopLenis, startLenis }}>
      {children}
    </LenisContext.Provider>
  );
};
