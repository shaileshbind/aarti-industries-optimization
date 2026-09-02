"use client";
import { useState, useEffect, useRef } from "react";

let setGlobalCursor: (config: {
  visible: boolean;
  title?: string;
  color?: string;
}) => void = () => {};

// Stable identities. Returning a fresh object here made `show`/`hide` change on
// every render, which turns any `[show]`/`[hide]` dependency array into an
// infinite update loop. These read `setGlobalCursor` at call time, so
// reassignment from the provider still works.
const cursorApi = {
  show: (title?: string, color?: string) =>
    setGlobalCursor({ visible: true, title, color }),
  hide: () => setGlobalCursor({ visible: false }),
};

export const useCustomCursor = () => cursorApi;

export const GlobalCursor = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const lastConfig = useRef<{ visible: boolean; title: string | null }>({
    visible: false,
    title: null,
  });

  useEffect(() => {
    setIsMounted(true);

    // Check if device is desktop (has mouse capability)
    const checkIsDesktop = () => {
      const isDesktopDevice = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      setIsDesktop(isDesktopDevice);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const place = () => {
    const el = boxRef.current;
    if (el) {
      el.style.transform = `translate3d(${posRef.current.x - 30}px, ${
        posRef.current.y + 30
      }px, 0)`;
    }
  };

  // Pointer position is presentational, not state. Keeping it in useState meant
  // a new object per mousemove, so this component re-rendered 60+ times a
  // second and fed the "Maximum update depth exceeded" cascade. Writing it
  // straight to the node costs zero React renders.
  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      place();
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop]);

  // Position it the moment it appears, before the first mousemove lands.
  useEffect(() => {
    if (visible) place();
  }, [visible]);

  useEffect(() => {
    setGlobalCursor = ({
      visible,
      title,
    }: {
      visible: boolean;
      title?: string;
      color?: string;
    }) => {
      if (!isDesktop) return;

      // Idempotent: CustomCursorTrigger calls show() from onMouseMove, so this
      // fires continuously with identical arguments. Bail unless something
      // actually changed, otherwise every pixel of movement queues state
      // updates and a document.body style write.
      const nextTitle = title || null;
      const prev = lastConfig.current;
      if (prev.visible === visible && prev.title === nextTitle) return;
      lastConfig.current = { visible, title: nextTitle };

      setVisible(visible);
      setTitle(nextTitle);
      document.body.style.cursor = visible ? "pointer" : "";
    };

    return () => {
      setGlobalCursor = () => {};
      document.body.style.cursor = "";
    };
  }, [isDesktop]);

  // Don't render anything until after hydration and only on desktop
  if (!isMounted || !isDesktop) return null;

  if (!visible) return null;

  return (
    <div
      ref={boxRef}
      className="fixed left-0 top-0 z-9999"
      style={{
        // Prevent this floating cursor from capturing pointer events,
        // which can cause underlying elements to receive `mouseLeave`.
        pointerEvents: "none",
        transform: `translate3d(${posRef.current.x - 30}px, ${
          posRef.current.y + 30
        }px, 0)`,
      }}
    >
      {title && (
        <div className="absolute left-6 top-0 whitespace-nowrap bg-gradient-orange-1 animate-fade-in text-white px-[22px] py-[13px] rounded-[6px] text-[16px] font-medium">
          {title}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
