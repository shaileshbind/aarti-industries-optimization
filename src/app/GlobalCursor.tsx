"use client";
import { useState, useEffect } from "react";

let setGlobalCursor: (config: {
  visible: boolean;
  title?: string;
  color?: string;
}) => void = () => {};

export const useCustomCursor = () => {
  return {
    show: (title?: string, color?: string) =>
      setGlobalCursor({ visible: true, title, color }),
    hide: () => setGlobalCursor({ visible: false }),
  };
};

export const GlobalCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isDesktop]);

  useEffect(() => {
    setGlobalCursor = ({
      visible,
      title,
    }: {
      visible: boolean;
      title?: string;
      color?: string;
    }) => {
      if (isDesktop) {
        setVisible(visible);
        setTitle(title || null);
        document.body.style.cursor = visible ? "none" : "default";
      }
    };
  }, [isDesktop]);

  // Don't render anything until after hydration and only on desktop
  if (!isMounted || !isDesktop) return null;

  if (!visible) return null;

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y,
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
