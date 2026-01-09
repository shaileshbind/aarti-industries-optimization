"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when pathname changes
    // Use setTimeout to ensure it runs after the route change is complete
    const timer = setTimeout(() => {
      // Try to scroll the html element (works better with Lenis)
      const htmlElement = document.documentElement;
      if (htmlElement) {
        htmlElement.scrollTop = 0;
      }
      // Also scroll window as fallback
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
