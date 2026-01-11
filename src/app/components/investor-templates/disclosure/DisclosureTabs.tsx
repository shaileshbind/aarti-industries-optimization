"use client";
import { DisclosureTabsProps } from "@/app/types/disclosure.type";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function DisclosureTabs({ categories }: DisclosureTabsProps) {
  const pathname = usePathname();
  const router = useRouter();

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
    <div className="bg-[#002F50] flex md:justify-center gap-6 !py-5 overflow-x-auto px-7">
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
