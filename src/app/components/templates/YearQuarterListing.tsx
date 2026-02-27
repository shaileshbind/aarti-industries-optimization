"use client";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import clsx from "clsx";
import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OrangeTabCard from "../cards/OrangeTabCard";
import Button from "../Button";
import { YearQuarterListingProps } from "@/app/types/year-quarter-listing.type";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchNews } from "@/_lib/fetchNews";
import type { Quarter } from "@/app/types/shareholder.type";

function isPressReleasesSubCategory(subCat: string): boolean {
  return subCat?.toLowerCase().replace(/\s+/g, " ").trim() === "press releases";
}

function buildPressReleasesYearAndQuarter(
  data: Record<string, { items?: unknown[] }> | null,
): { year: string | number; quarter: Quarter[] }[] {
  if (!data || typeof data !== "object") return [];
  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));
  const result: { year: string | number; quarter: Quarter[] }[] = [];

  for (const year of years) {
    const yearData = data[year];
    const items = yearData?.items;
    if (!Array.isArray(items)) continue;

    const quarters: Quarter[] = [];
    let quarterId = 0;

    for (const item of items) {
      const report = (item as { report?: unknown[] })?.report;
      if (!Array.isArray(report)) continue;
      for (const qBlock of report) {
        const q = qBlock as { id?: number; quarter?: string; report?: unknown[] };
        const entries = q?.report;
        if (!Array.isArray(entries)) continue;
        const reports = entries.map((e: unknown) => {
          const entry = e as {
            id?: number;
            heading?: string;
            slug?: string | null;
            link?: string | null;
            file?: { url?: string };
          };
          const link = entry?.file?.url ?? entry?.link ?? "";
          return {
            id: entry.id ?? entry.heading ?? 0,
            heading: entry.heading ?? "",
            link,
            ...(entry?.file?.url && { file: { url: entry.file.url } }),
          };
        });
        quarters.push({
          id: q.id ?? ++quarterId,
          quarter: q.quarter ?? "",
          financial_year: null,
          report: reports,
        });
      }
    }

    if (quarters.length > 0) result.push({ year, quarter: quarters });
  }

  return result;
}

export default function YearQuarterListing({
  reportLayout,
  showFinancialYear = false,
}: YearQuarterListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get subCategory from URL or use first one as default
  const urlSubCategory = searchParams.get("subCategory");
  const defaultSubCategory =
    urlSubCategory || reportLayout?.[0]?.subCategory || "";

  const [activeSubCategory, setActiveSubCategory] =
    useState<string>(defaultSubCategory);
  const [activeYear, setActiveYear] = useState<string | number>(
    reportLayout?.[0]?.yearAndQuarter?.[0]?.year || "",
  );
  const [dropdownClicked, setDropdownClicked] = useState<boolean>(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState<number>(5);

  const [pressReleasesYearAndQuarter, setPressReleasesYearAndQuarter] =
    useState<{ year: string | number; quarter: Quarter[] }[] | null>(null);

  // refs
  const yearsRowRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  // Fetch press releases from /api/press when Press Releases subcategory is selected
  useEffect(() => {
    if (!isPressReleasesSubCategory(activeSubCategory)) {
      setPressReleasesYearAndQuarter(null);
      return;
    }
    let cancelled = false;
    const load = async () => {
      const data = await fetchNews("/api/press");
      if (cancelled) return;
      setPressReleasesYearAndQuarter(buildPressReleasesYearAndQuarter(data));
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [activeSubCategory]);

  // Update activeSubCategory when URL changes
  useEffect(() => {
    if (!reportLayout || reportLayout.length === 0) return;

    const urlSubCat = searchParams.get("subCategory");
    const targetSubCategory = urlSubCat || reportLayout[0]?.subCategory || "";

    // Find the matching subcategory
    const matchingSubCategory = reportLayout.find(
      (item) => item.subCategory === targetSubCategory,
    );

    if (matchingSubCategory) {
      setActiveSubCategory(targetSubCategory);
      const firstYear = matchingSubCategory.yearAndQuarter?.[0]?.year || "";
      setActiveYear(firstYear);
      setDropdownClicked(false);
      setMobileVisibleCount(5);
    } else if (reportLayout[0]) {
      // Fallback to first subcategory if URL param doesn't match
      setActiveSubCategory(reportLayout[0].subCategory);
      setActiveYear(reportLayout[0].yearAndQuarter?.[0]?.year || "");
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
        maxWidth: "calc(100vw - 56px)",
      },
    },
  };

  const menuItemStyles = {
    whiteSpace: "normal",
    wordWrap: "break-word",
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

  // Get current subcategory data; when Press Releases, use /api/press data
  const currentSubCategory = reportLayout?.find(
    (item) => item.subCategory === activeSubCategory,
  );
  const formatYearForDisplay = useCallback(
    (y: string | number) => {
      if (y === undefined || y === null) return "";
      return isPressReleasesSubCategory(activeSubCategory) ? `FY ${y}` : String(y);
    },
    [activeSubCategory],
  );
  const yearAndQuarter = useMemo(() => {
    if (isPressReleasesSubCategory(activeSubCategory) && pressReleasesYearAndQuarter?.length) {
      return pressReleasesYearAndQuarter;
    }
    return currentSubCategory?.yearAndQuarter || [];
  }, [
    activeSubCategory,
    pressReleasesYearAndQuarter,
    currentSubCategory?.yearAndQuarter,
  ]);

  // When press releases API data loads, set active year to first year if current year not in list
  useEffect(() => {
    if (
      isPressReleasesSubCategory(activeSubCategory) &&
      pressReleasesYearAndQuarter?.length &&
      !pressReleasesYearAndQuarter.some((y) => String(y.year) === String(activeYear))
    ) {
      setActiveYear(pressReleasesYearAndQuarter[0]?.year ?? "");
    }
  }, [activeSubCategory, pressReleasesYearAndQuarter, activeYear]);

  // Sort Q4 first -----> Q1
  const quarterSortOrder = (q: Quarter) => {
    const match = String(q?.quarter ?? "").match(/Q(\d)/i);
    return match ? Number(match[1]) : 0;
  };

  const currentYearData = yearAndQuarter?.find(
    (item) => item.year === activeYear,
  );
  const quarters = currentYearData?.quarter
    ? [...currentYearData.quarter].sort(
        (a, b) => quarterSortOrder(b) - quarterSortOrder(a),
      )
    : [];

  // Handler for Archive year dropdown
  const handleArchiveChange = (event: SelectChangeEvent<string | number>) => {
    const selectedValue = event.target.value;

    // If "Archive" or "Past years" is selected, reset to first year
    if (selectedValue === "Archive" || selectedValue === "Past years") {
      setActiveYear(yearAndQuarter?.[0]?.year || "");
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
      (item) => item.subCategory === subCat,
    );
    const firstYear = newSubCategory?.yearAndQuarter?.[0];
    setActiveYear(firstYear?.year || "");
    setDropdownClicked(false);
    setMobileVisibleCount(5);

    // Update URL with query parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("subCategory", subCat);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // helper to measure active item relative to yearsRowRef
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
    [activeYear],
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
                  : "text-[#9997A2] hover:text-[#002F50]",
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
              sx={{
                ...mobStyles,
                "& .MuiSelect-select": {
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                },
              }}
              MenuProps={menuProps}
              value={activeSubCategory}
              onChange={(e) => handleSubCategoryClick(e.target.value as string)}
              IconComponent={KeyboardArrowDownIcon}
            >
              {reportLayout?.map((subCat, idx) => (
                <MenuItem
                  key={`mobile_subcat_${idx}`}
                  value={subCat.subCategory}
                  sx={menuItemStyles}
                >
                  {subCat.subCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Years and Reports Section */}
        <div className="lg:p-10 lg:bg-[#F7F9FA] lg:w-[75%] w-full rounded-[12px] relative">
          {/* Years Row */}
          <div className="flex w-full border-b-2 border-b-[#E1E1E1] justify-between">
            {yearAndQuarter?.length > 0 && (
              <div
                ref={yearsRowRef}
                className="flex gap-x-8 lg:gap-x-[54px] relative pb-3"
              >
                {yearAndQuarter?.slice(0, 4)?.map((item, index) => (
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
                          : "text-[#4C5861]",
                      )}
                    >
                      {formatYearForDisplay(item?.year)}
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
            {yearAndQuarter?.length > 4 && (
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
                    {yearAndQuarter?.slice(4)?.map((items, index2) => (
                      <MenuItem value={items?.year} key={`archive_${index2}`}>
                        {formatYearForDisplay(items?.year)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>

          {/* Report list - All quarters displayed in reverse order */}
          <div className="mt-6 lg:mt-10 lg:max-h-[60vh] overflow-x-hidden lg:overflow-y-auto scrollbar lg:pr-4">
            {quarters?.length > 0 ? (
              quarters.map((quarterItem, qIdx) => (
                <div
                  key={`quarter_section_${qIdx}`}
                  className="mb-7 lg:mb-6 last:mb-0 xl:flex items-baseline"
                >
                  {/* Quarter Header */}
                  <div
                    className={clsx(
                      `xl:mb-4 xl:pb-2`,
                      !showFinancialYear
                        ? `w-full xl:w-[10%]`
                        : ` w-full xl:w-[15%]`,
                    )}
                  >
                    <h3 className="text-sm xl:text-base text-[#4C5861]">
                      {quarterItem.quarter}
                      {/* {showFinancialYear && quarterItem?.financial_year?.year?.replace("-", " ")} */}
                    </h3>
                  </div>

                  {/* Desktop - show all reports for this quarter */}
                  <div
                    className={clsx(
                      `hidden lg:block`,
                      !showFinancialYear
                        ? ` w-full xl:w-[90%]`
                        : ` w-full xl:w-[85%]`,
                    )}
                  >
                    {quarterItem.report?.map((item) => (
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
                    {(!quarterItem.report ||
                      quarterItem.report.length === 0) && (
                      <p className="text-[#9997A2] text-sm">
                        No reports available for this quarter
                      </p>
                    )}
                  </div>

                  {/* Mobile - show limited with pagination per quarter */}
                  <div className="block lg:hidden w-full">
                    {quarterItem.report
                      ?.slice(0, mobileVisibleCount)
                      ?.map((item) => (
                        <div className="lg:pb-4" key={item.id}>
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

                    {(!quarterItem.report ||
                      quarterItem.report.length === 0) && (
                      <p className="text-[#9997A2] text-sm">
                        No reports available for this quarter
                      </p>
                    )}

                    {/* View More Button per quarter */}
                    {quarterItem.report &&
                      quarterItem.report.length > mobileVisibleCount && (
                        <div
                          className="flex justify-center mt-4"
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
              ))
            ) : (
              <p className="text-center text-[#4C5861]">
                No quarters available
              </p>
            )}
          </div>
        </div>

        {/* Archive dropdown - Mobile */}
        {yearAndQuarter?.length > 4 && (
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
                {yearAndQuarter?.slice(4)?.map((items, index2) => (
                  <MenuItem
                    value={items?.year}
                    key={`mobile_archive_${index2}`}
                  >
                    {formatYearForDisplay(items?.year)}
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
