"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    let running = true;

    // Defer heavy library loading until after first paint
    Promise.all([import("lenis"), import("gsap/ScrollTrigger")]).then(
      ([lenisModule, stModule]) => {
        if (!running || !contentRef.current) return;

        const Lenis = lenisModule.default;
        const { ScrollTrigger } = stModule;

        const lenis = new Lenis({
          duration: 1.3,
          syncTouch: true,
          orientation: "vertical",
          content: contentRef.current,
        });
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        function raf(time: number) {
          if (!running) return;
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      },
    );

    return () => {
      running = false;
      lenisRef.current?.destroy();
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