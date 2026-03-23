"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
};

const MAX_BLUR = 6;
const MIN_OPACITY = 0.15;
const LEAVE_DURATION = 0.3;
const ENTER_DURATION = 0.3;

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const prevPathname = useRef(pathname);
  const isFirstRender = useRef(true);
  const isTransitioning = useRef(false);
  const proxy = useRef({ blur: 0, opacity: 1 });
  const activeTween = useRef<gsap.core.Tween | null>(null);

  const applyStyle = useCallback(() => {
    if (!contentRef.current) return;
    const { blur, opacity } = proxy.current;
    contentRef.current.style.filter = blur < 0.05 ? "none" : `blur(${blur}px)`;
    contentRef.current.style.opacity = opacity >= 0.99 ? "" : String(opacity);
  }, []);

  const playLeave = useCallback(() => {
    activeTween.current?.kill();
    proxy.current = { blur: 0, opacity: 1 };
    activeTween.current = gsap.to(proxy.current, {
      blur: MAX_BLUR,
      opacity: MIN_OPACITY,
      duration: LEAVE_DURATION,
      ease: "sine.in",
      onUpdate: applyStyle,
      onComplete: () => { activeTween.current = null; },
    });
  }, [applyStyle]);

  const playEnter = useCallback(() => {
    activeTween.current?.kill();
    const progress = proxy.current.blur / MAX_BLUR;
    if (progress < 0.01) {
      proxy.current = { blur: 0, opacity: 1 };
      applyStyle();
      return;
    }
    const duration = Math.max(ENTER_DURATION * progress, 0.15);
    activeTween.current = gsap.to(proxy.current, {
      blur: 0,
      opacity: 1,
      duration,
      ease: "sine.out",
      onUpdate: applyStyle,
      onComplete: () => {
        proxy.current = { blur: 0, opacity: 1 };
        applyStyle();
        activeTween.current = null;
      },
    });
  }, [applyStyle]);

  // When pathname changes, the new page has mounted -- start unblurring
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      isTransitioning.current = false;
      // Double rAF: first frame lets React commit the DOM, second starts the animation
      requestAnimationFrame(() => requestAnimationFrame(() => playEnter()));
    }
  }, [pathname, playEnter]);

  // Global click interceptor for internal <a> links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href === "#" ||
        anchor.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
      ) {
        return;
      }

      if (href === pathname || isTransitioning.current) return;

      e.preventDefault();
      isTransitioning.current = true;

      // Start blur and navigate simultaneously -- no waiting
      playLeave();
      router.push(href);
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, playLeave, router]);

  return (
    <TransitionContext.Provider value={{ contentRef }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const { contentRef } = useTransition();
  return <div ref={contentRef}>{children}</div>;
}
