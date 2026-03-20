"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";

interface LenisContextType {
  stopLenis: () => void;
  startLenis: () => void;
  resizeLenis: () => void;
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
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let running = true;

    Promise.all([import("lenis"), import("gsap/ScrollTrigger")]).then(
      ([lenisModule, stModule]) => {
        if (!running) return;

        const Lenis = lenisModule.default;
        const { ScrollTrigger } = stModule;

        const lenis = new Lenis({
          duration: 1.3,
          syncTouch: true,
          orientation: "vertical",
        });
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        // Every time ScrollTrigger recalculates (e.g. after pin spacers
        // change the document height), tell Lenis to re-measure its
        // scroll limits so the scrollbar can reach the true bottom.
        const onSTRefresh = () => lenis.resize();
        ScrollTrigger.addEventListener("refresh", onSTRefresh);
        cleanupRef.current = () => {
          ScrollTrigger.removeEventListener("refresh", onSTRefresh);
        };

        requestAnimationFrame(() => {
          if (running) ScrollTrigger.refresh();
        });

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
      cleanupRef.current?.();
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

  const resizeLenis = useCallback(() => {
    lenisRef.current?.resize();
  }, []);

  return (
    <LenisContext.Provider value={{ stopLenis, startLenis, resizeLenis }}>
      {children}
    </LenisContext.Provider>
  );
};