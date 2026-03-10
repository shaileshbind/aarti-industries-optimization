"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";
// import { createPortal } from "react-dom";
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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const lenis = new Lenis({
      duration: 1.3,
      syncTouch: true,
      orientation: "vertical",
      // Transform this div instead of <html>, so position:fixed elements
      // outside this div are not affected by Lenis's syncTouch transform.
      content: contentRef.current,
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
      <div ref={contentRef}>
        {children}
      </div>
    </LenisContext.Provider>
  );
};
