"use client";
import { DisclosureTabsProps } from "@/app/types/disclosure.type";
import clsx from "clsx";
import { useLenis } from "@/app/contexts/LenisContext";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, type TouchEvent as ReactTouchEvent } from "react";

export default function DisclosureTabs({ categories }: DisclosureTabsProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isMobileTouch = useMatchMedia("(pointer: coarse)");
  const { stopLenis, startLenis } = useLenis();

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lenisStoppedRef = useRef(false);

  const handleTabsTouchStart = useCallback(
    (e: ReactTouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    },
    [],
  );

  const handleTabsTouchMove = useCallback(
    (e: ReactTouchEvent) => {
      if (!isMobileTouch) return;
      if (!touchStartRef.current || lenisStoppedRef.current) return;

      const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);

      // If user is clearly swiping horizontally inside the scroller,
      // stop Lenis so it doesn't fight native horizontal scrolling.
      if (dx > dy && dx > 10) {
        stopLenis();
        lenisStoppedRef.current = true;
      }
    },
    [isMobileTouch, stopLenis],
  );

  const handleTabsTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    if (lenisStoppedRef.current) {
      startLenis();
      lenisStoppedRef.current = false;
    }
  }, [startLenis]);

  // Sort categories so that any category starting with "disclosure" comes first
  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    
    const disclosureCategory = categories.find((cat) =>
      cat.category?.toLowerCase().startsWith("disclosure")
    );
    const otherCategories = categories.filter(
      (cat) => !cat.category?.toLowerCase().startsWith("disclosure")
    );

    return disclosureCategory
      ? [disclosureCategory, ...otherCategories]
      : categories;
  }, [categories]);

  return (
    <div
      className="bg-[#002F50] flex md:justify-center gap-6 py-5! overflow-x-auto px-7"
      data-lenis-prevent
      onTouchStart={handleTabsTouchStart}
      onTouchMove={handleTabsTouchMove}
      onTouchEnd={handleTabsTouchEnd}
      onTouchCancel={handleTabsTouchEnd}
    >
      {sortedCategories?.map((item, index) => (
        <div
          key={`top_category_${index}`}
          className={clsx(
            `border-r-[#10456A] cursor-pointer transition-all duration-300`,
            index === sortedCategories.length - 1 ? "border-r-0" : "border-r-2 pr-6 ",
          )}
          onClick={() => router.push(item?.slug)}
        >
          <p
            className={clsx(
              "text-base whitespace-nowrap",
              pathname?.split("/").pop() === item?.slug
                ? "text-[#FFF]"
                : "text-[#9997A2]",
            )}
          >
            {item?.category}
          </p>
        </div>
      ))}
    </div>
  );
}
