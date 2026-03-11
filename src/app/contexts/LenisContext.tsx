"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";
// import { createPortal } from "react-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisContextType {
  stopLenis: () => void;
  startLenis: () => void;
  scrollTo: (target: number) => void;
}

const LenisContext = createContext<LenisContextType | null>(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context;
};

/**
 * Portal component that renders children OUTSIDE the Lenis content wrapper.
 * Use this for any `position: fixed` elements (header, floating buttons, etc.)
 * to prevent them from being affected by Lenis's syncTouch transform.
 */
// export const LenisFixed = ({ children }: { children: React.ReactNode }) => {
//   const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

//   useEffect(() => {
//     let el = document.getElementById("lenis-fixed-layer");
//     if (!el) {
//       el = document.createElement("div");
//       el.id = "lenis-fixed-layer";
//       document.body.prepend(el);
//     }
//     setPortalTarget(el);
//   }, []);

//   // Before portal is ready (SSR + first client render), render inline.
//   // After useEffect, move to portal. Since elements are position:fixed,
//   // the visual position stays the same — no visible shift.
//   if (!portalTarget) return <>{children}</>;
//   return createPortal(children, portalTarget);
// };

interface LenisProviderProps {
  children: React.ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // No custom `content` element — Lenis defaults to document.documentElement,
    // which is the same node the browser scrollbar measures. Using a wrapper div
    // as the content reference caused a height mismatch (Lenis scroll limit <
    // actual page height), making the footer unreachable via smooth scroll.
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP's ticker so both run in the same animation frame.
    // This eliminates the frame desync that causes scroll jitter when Lenis
    // and GSAP/ScrollTrigger run their own separate rAF loops.
    gsap.ticker.lagSmoothing(0);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
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

  const scrollTo = useCallback((target: number) => {
    lenisRef.current?.scrollTo(target);
  }, []);

  return (
    <LenisContext.Provider value={{ stopLenis, startLenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};

