"use client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import clsx from "clsx";
import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OrangeTabCard from "../cards/OrangeTabCard";
import Button from "../Button";
import { YearAndListingProps } from "@/app/types/year-and-listing.type";
import { useRouter, useSearchParams } from "next/navigation";

export default function YearAndListing({ reportLayout }: YearAndListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeSubCategory, setActiveSubCategory] = useState<string>("");
  const [activeYear, setActiveYear] = useState<string | number>("");
  const [dropdownClicked, setDropdownClicked] = useState<boolean>(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState<number>(5);

  // refs
  const yearsRowRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  // Initialize state when reportLayout is available or when URL changes
  useEffect(() => {
    if (!reportLayout || reportLayout.length === 0) return;

    const urlSubCat = searchParams.get("subCategory");
    const targetSubCategory = urlSubCat || reportLayout[0]?.subCategory || "";

    // Find the matching subcategory
    const matchingSubCategory = reportLayout.find(
      (item) => item.subCategory === targetSubCategory
    );

    if (matchingSubCategory) {
      setActiveSubCategory(targetSubCategory);
      const firstYear = matchingSubCategory.yearAndReport?.[0]?.year || "";
      setActiveYear(firstYear);
      setDropdownClicked(false);
      setMobileVisibleCount(5);
    } else if (reportLayout[0]) {
      // Fallback to first subcategory if URL param doesn't match
      setActiveSubCategory(reportLayout[0].subCategory);
      setActiveYear(reportLayout[0].yearAndReport?.[0]?.year || "");
      setDropdownClicked(false);
      setMobileVisibleCount(5);
    }
  }, [searchParams, reportLayout]);

  const styles = {
    "&::before": { borderBottom: "none" },
    "&::after": { borderBottom: "none" },
    "&:hover:not(.Mui-disabled)::before": {
      borderBottom: "none",
    },
  };

  const menuProps = {
    PaperProps: {
      sx: {
        borderRadius: "8px",
      },
    },
  };

  const mobStyles = {
    backgroundColor: "#F7F9FA",
    borderRadius: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  // Get current subcategory data
  const currentSubCategory = reportLayout?.find(
    (item) => item.subCategory === activeSubCategory
  );
  const yearAndReport = currentSubCategory?.yearAndReport || [];

  // Get current reports based on active year
  const currentReports = yearAndReport?.find(
    (item) => item.year === activeYear
  )?.report;

  // Handler for Archive year dropdown
  const handleArchiveChange = (event: SelectChangeEvent<string | number>) => {
    const selectedValue = event.target.value;

    // If "Archive" or "Past years" is selected, reset to first year
    if (selectedValue === "Archive" || selectedValue === "Past years") {
      setActiveYear(yearAndReport?.[0]?.year || "");
      setDropdownClicked(false);
    } else {
      setActiveYear(selectedValue);
      setDropdownClicked(true);
    }

    setMobileVisibleCount(5);
  };

  // Handler for subcategory selection - UPDATED
  const handleSubCategoryClick = (subCat: string) => {
    setActiveSubCategory(subCat);
    const newSubCategory = reportLayout?.find(
      (item) => item.subCategory === subCat
    );
    setActiveYear(newSubCategory?.yearAndReport?.[0]?.year || "");
    setDropdownClicked(false);
    setMobileVisibleCount(5);

    // Update URL with query parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("subCategory", subCat);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // // helper to measure active item relative to yearsRowRef
  const measure = useCallback(
    (year: string | number = activeYear) => {
      const row = yearsRowRef.current;
      const item = itemRefs.current.get(year);
      if (!row || !item) return;

      const rowRect = row.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      const left = itemRect.left - rowRect.left;
      const width = Math.round(itemRect.width);

      setUnderline({ left: Math.round(left), width });
    },
    [activeYear]
  );

  // measure after layout and when activeYear changes
  useLayoutEffect(() => {
    measure(activeYear);

    const onResize = () => measure(activeYear);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeYear, measure]);

  return (
    <div>
      <div className="fluid-container pt-6 md:pt-10 pb-10 md:pb-[80px] lg:flex justify-between">
        {/* Left Sidebar - Subcategories (Desktop) */}
        <div className="w-[20%] hidden lg:block">
          {reportLayout?.map((subCat, idx) => (
            <div
              key={`subcat_${idx}`}
              className={clsx(
                `py-5 px-2 border-b-2 border-b-[#E1E1E1] cursor-pointer text-base transition-all duration-300`,
                activeSubCategory === subCat.subCategory
                  ? "text-[#002F50]"
                  : "text-[#9997A2] hover:text-[#002F50]"
              )}
              onClick={() => handleSubCategoryClick(subCat.subCategory)}
            >
              {subCat.subCategory}
            </div>
          ))}
        </div>

        {/* Subcategory dropdown for mobile */}
        <div className="block lg:hidden mb-6">
          <FormControl fullWidth>
            <Select
              sx={mobStyles}
              MenuProps={menuProps}
              value={activeSubCategory}
              onChange={(e) => handleSubCategoryClick(e.target.value as string)}
              IconComponent={KeyboardArrowDownIcon}
            >
              {reportLayout?.map((subCat, idx) => (
                <MenuItem
                  key={`mobile_subcat_${idx}`}
                  value={subCat.subCategory}
                >
                  {subCat.subCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Years and Reports Section */}
        <div className="lg:p-10 lg:bg-[#F7F9FA] lg:w-[75%] w-full rounded-[12px] relative">
          <div className="flex w-full border-b-2 border-b-[#E1E1E1] justify-between">
            {yearAndReport?.length > 0 && (
              <div
                ref={yearsRowRef}
                className="flex gap-x-8 lg:gap-x-[54px] relative pb-3"
              >
                {yearAndReport?.slice(0, 4)?.map((item, index) => (
                  <div
                    key={`item_${index}`}
                    ref={(el) => {
                      if (el) {
                        itemRefs.current.set(item?.year, el);
                      }
                    }}
                    onClick={() => {
                      setActiveYear(item?.year);
                      setDropdownClicked(false);
                      setMobileVisibleCount(5);
                      requestAnimationFrame(() => measure(item?.year));
                    }}
                    className="cursor-pointer"
                  >
                    <p
                      className={clsx(
                        "text-base",
                        item?.year === activeYear
                          ? "text-[#002F50]"
                          : "text-[#4C5861]"
                      )}
                    >
                      {item?.year}
                    </p>
                  </div>
                ))}

                {/* Animated underline */}
                {!dropdownClicked && (
                  <div
                    className="absolute -bottom-[1.5px] h-[2px] bg-[#DC4C03] lg:bg-[#002F50] transition-all duration-300 ease-out"
                    style={{
                      width: `${underline.width + 5}px`,
                      transform: `translateX(${underline.left}px)`,
                    }}
                    aria-hidden
                  />
                )}
              </div>
            )}

            {/* Archive dropdown - Desktop */}
            {yearAndReport?.length > 4 && (
              <div className="w-[90px] hidden md:block">
                <FormControl variant="standard" fullWidth>
                  <Select
                    sx={styles}
                    MenuProps={menuProps}
                    labelId="archiveYear-label"
                    id="archiveYear-select"
                    value={dropdownClicked ? activeYear : "Archive"}
                    label="archiveYear"
                    onChange={handleArchiveChange}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    <MenuItem value={"Archive"}>Archive</MenuItem>
                    {yearAndReport?.slice(4)?.map((items, index2) => (
                      <MenuItem value={items?.year} key={`archive_${index2}`}>
                        {items?.year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>

          {/* Report list */}
          <div
            className="mt-6 lg:mt-10 lg:max-h-[60vh] overflow-x-hidden lg:overflow-y-auto scrollbar lg:pr-4"
            data-lenis-prevent
          >
            {/* Desktop - show all */}
            <div className="hidden lg:block">
              {currentReports?.map((item) => (
                <div className="md:pb-4" key={item.id}>
                  <OrangeTabCard
                    title={item?.heading}
                    link={
                      item?.link
                        ? item?.link
                        : item?.file?.url
                        ? item?.file?.url
                        : ""
                    }
                    scale={false}
                  />
                </div>
              ))}
              {(!currentReports || currentReports.length === 0) && (
                <p className="text-center text-[#4C5861]">
                  No reports available
                </p>
              )}
            </div>

            {/* Mobile - show limited with pagination */}
            <div className="block lg:hidden">
              {currentReports?.slice(0, mobileVisibleCount)?.map((item) => (
                <div className="md:pb-4" key={item.id}>
                  <OrangeTabCard
                    title={item?.heading}
                    link={
                      item?.link
                        ? item?.link
                        : item?.file?.url
                        ? item?.file?.url
                        : ""
                    }
                    scale={false}
                  />
                </div>
              ))}
              {(!currentReports || currentReports.length === 0) && (
                <p className="text-center text-[#4C5861]">
                  No reports available
                </p>
              )}
            </div>

            {/* View More Button */}
            {currentReports && currentReports?.length > mobileVisibleCount && (
              <div
                className="flex justify-center lg:hidden mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileVisibleCount((prevCount) => prevCount + 5);
                }}
              >
                <Button secondary title="View more" />
              </div>
            )}
          </div>
        </div>

        {/* Archive dropdown - Mobile */}
        {yearAndReport?.length > 4 && (
          <div className="mt-10 block md:hidden">
            <FormControl fullWidth>
              <Select
                sx={{
                  ...mobStyles,
                  backgroundColor: "#EFF3F5",
                }}
                MenuProps={menuProps}
                labelId="archiveYear-label-mobile"
                id="archiveYear-select-mobile"
                value={dropdownClicked ? activeYear : "Past years"}
                label="archiveYear"
                onChange={handleArchiveChange}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value={"Past years"}>Past years</MenuItem>
                {yearAndReport?.slice(4)?.map((items, index2) => (
                  <MenuItem
                    value={items?.year}
                    key={`mobile_archive_${index2}`}
                  >
                    {items?.year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </div>
    </div>
  );
}
