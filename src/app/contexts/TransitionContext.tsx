"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
};

const MAX_BLUR = 8;
const MIN_OPACITY = 0.08;
const LEAVE_DURATION = 0.55;
const ENTER_DURATION = 0.65;

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const isFirstRender = useRef(true);
  const recoverTimer = useRef<number | null>(null);
  const proxy = useRef({ blur: 0, opacity: 1 });
  const activeTween = useRef<gsap.core.Tween | null>(null);

  const applyStyle = useCallback(() => {
    if (!contentRef.current) return;
    const { blur, opacity } = proxy.current;
    contentRef.current.style.filter = blur < 0.05 ? "none" : `blur(${blur}px)`;
    contentRef.current.style.opacity = opacity >= 0.99 ? "" : String(opacity);
  }, []);

  const playLeave = useCallback(
    () =>
      new Promise<void>((resolve) => {
        activeTween.current?.kill();
        proxy.current = { blur: 0, opacity: 1 };
        activeTween.current = gsap.to(proxy.current, {
          blur: MAX_BLUR,
          opacity: MIN_OPACITY,
          duration: LEAVE_DURATION,
          ease: "power2.in",
          onUpdate: applyStyle,
          onComplete: () => {
            activeTween.current = null;
            resolve();
          },
        });
      }),
    [applyStyle],
  );

  const playEnter = useCallback(() => {
    activeTween.current?.kill();
    const progress = proxy.current.blur / MAX_BLUR;
    if (progress < 0.01) {
      proxy.current = { blur: 0, opacity: 1 };
      applyStyle();
      return;
    }
    const duration = Math.max(ENTER_DURATION * progress, 0.35);
    activeTween.current = gsap.to(proxy.current, {
      blur: 0,
      opacity: 1,
      duration,
      ease: "power2.out",
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
    if (recoverTimer.current) {
      window.clearTimeout(recoverTimer.current);
      recoverTimer.current = null;
    }
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      // Double rAF: first frame lets React commit the DOM, second starts the animation
      requestAnimationFrame(() => requestAnimationFrame(() => playEnter()));
    }
  }, [pathname, playEnter]);

  // Kick off the leave animation for internal link clicks.
  //
  // This deliberately does NOT preventDefault. It used to, and then drove the
  // navigation itself via `playLeave().then(() => router.push(href))`, which
  // meant next/link saw defaultPrevented and skipped its own navigation: every
  // internal link waited on a GSAP tween before the URL changed, and a click
  // landing mid-transition fell through to next/link while the pending push
  // later yanked the user back to the earlier href. Letting next/link navigate
  // and animating alongside it keeps the two independent.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor || anchor.target === "_blank") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return;
      }

      // Compare pathnames, so a query string, hash or trailing slash is not
      // mistaken for a different page.
      let target: string;
      try {
        target = new URL(href, window.location.origin).pathname;
      } catch {
        return;
      }
      const strip = (v: string) =>
        v.length > 1 && v.endsWith("/") ? v.slice(0, -1) : v;
      if (strip(target) === strip(pathname)) return;

      // playLeave kills any in-flight tween, so a rapid second click is safe.
      playLeave();

      // Safety net: if the navigation never happens the pathname effect never
      // fires, which would strand the page blurred at 8% opacity.
      if (recoverTimer.current) window.clearTimeout(recoverTimer.current);
      recoverTimer.current = window.setTimeout(() => {
        recoverTimer.current = null;
        if (pathname === prevPathname.current) playEnter();
      }, 1500);
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, playLeave, playEnter]);

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
