"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        "fixed bottom-20 md:bottom-28 right-4 md:right-10 z-[9999]",
        "transition-all duration-500 ease-in-out",
        "w-12 h-12 md:w-[54px] md:h-[54px]",
        "flex items-center justify-center",
        "bg-transparent border-none cursor-pointer p-0",
        "hover:scale-105 hover:rotate-0",
        // Smooth appearance/disappearance
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      )}
      style={{ zIndex: 9999 }}
      aria-label="top"
      type="button"
    >
      <Image
        src={"/images/bottom-top.svg"}
        alt="Scroll to top"
        width={54}
        height={54}
        className="w-full h-full pointer-events-none"
      />
    </button>
  );
}
