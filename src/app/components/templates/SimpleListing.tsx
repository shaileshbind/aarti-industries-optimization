"use client";
import { useState, useEffect } from "react";
import OrangeTabCard from "../cards/OrangeTabCard";
import Button from "../Button";
import clsx from "clsx";
import { FormControl, MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SimpleListingProps } from "@/app/types/simple-listing.type";
import { useRouter, useSearchParams } from "next/navigation";

export default function SimpleListing({ reportLayout }: SimpleListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mobileVisibleCount, setMobileVisibleCount] = useState<number>(5);
  const [activeSubCategory, setActiveSubCategory] = useState<string>("");

  // Initialize from URL or default to first subcategory
  useEffect(() => {
    if (!reportLayout || reportLayout.length === 0) return;

    const urlSubCat = searchParams.get("subCategory");
    const targetSubCategory = urlSubCat || reportLayout[0]?.subCategory || "";

    const matchingSubCategory = reportLayout.find(
      (item) => item.subCategory === targetSubCategory,
    );

    if (matchingSubCategory) {
      setActiveSubCategory(targetSubCategory);
      setMobileVisibleCount(5);
    } else if (reportLayout[0]) {
      setActiveSubCategory(reportLayout[0].subCategory);
      setMobileVisibleCount(5);
    }
  }, [searchParams, reportLayout]);

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

  const menuProps = {
    PaperProps: {
      sx: {
        borderRadius: "8px",
      },
    },
  };

  // Handler for subcategory selection
  const handleSubCategoryClick = (subCat: string) => {
    setActiveSubCategory(subCat);
    setMobileVisibleCount(5);

    // Update URL with query parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("subCategory", subCat);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Get current subcategory data
  const currentSubCategory = reportLayout?.find(
    (item) => item.subCategory === activeSubCategory,
  );

  // Flatten all reports from the current subcategory
  const allReports =
    currentSubCategory?.reports?.flatMap(
      (reportGroup) => reportGroup.reports,
    ) || [];

  return (
    <div className="fluid-container pt-6 md:pt-10 pb-10 md:pb-[80px] lg:flex justify-between">
      {/* Left Sidebar - Subcategories (Desktop) */}
      {reportLayout?.length > 0 && (
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
      )}

      {/* Subcategory dropdown for mobile */}
      {reportLayout?.length > 0 && (
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
      )}

      {/* Reports Section */}
      <div
        className={clsx(
          "lg:p-10 lg:bg-[#F7F9FA] w-full rounded-[12px]",
          reportLayout?.length > 0 ? "lg:w-[75%]" : "lg:w-full",
        )}
      >
        {/* Report list */}
        <div
          className="lg:max-h-[60vh] overflow-x-hidden lg:overflow-y-auto scrollbar lg:pr-4"
          data-lenis-prevent
        >
          {/* Desktop - show all */}
          <div className="hidden lg:block">
            {allReports?.map((item) => (
              <div className="pb-4" key={item.id}>
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
            {allReports.length === 0 && (
              <p className="text-center text-[#4C5861]">No reports available</p>
            )}
          </div>

          {/* Mobile - show limited with pagination */}
          <div className="block lg:hidden">
            {allReports?.slice(0, mobileVisibleCount)?.map((item) => (
              <div className="pb-4" key={item.id}>
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
            {allReports.length === 0 && (
              <p className="text-center text-[#4C5861]">No reports available</p>
            )}
          </div>

          {/* View More Button */}
          {allReports && allReports.length > mobileVisibleCount && (
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
    </div>
  );
}
