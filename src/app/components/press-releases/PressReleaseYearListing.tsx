"use client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import clsx from "clsx";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import { PressReleaseYearListingProps } from "@/app/types/press-release.type";
import { useRouter, useSearchParams } from "next/navigation";
import { BodyText2, BodyText3, SubH1, SubH2 } from "../Typography2";
import { BodyText1 } from "../Typography2";
import Button from "../Button";

export default function PressReleaseYearListing({
  yearAndPressReleases,
  latestReleases = [],
}: PressReleaseYearListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeYear, setActiveYear] = useState<string | number>("");
  const [dropdownClicked, setDropdownClicked] = useState<boolean>(false);

  // refs
  const yearsRowRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  // Initialize state when yearAndPressReleases is available or when URL changes
  useEffect(() => {
    if (!yearAndPressReleases || yearAndPressReleases.length === 0) return;

    const urlYear = searchParams.get("year");
    const targetYear = urlYear || yearAndPressReleases[0]?.year || "";

    // Find the matching year
    const matchingYear = yearAndPressReleases.find(
      (item) => String(item.year) === String(targetYear)
    );

    if (matchingYear) {
      setActiveYear(matchingYear.year);
      setDropdownClicked(false);
    } else if (yearAndPressReleases[0]) {
      // Fallback to first year if URL param doesn't match
      setActiveYear(yearAndPressReleases[0].year);
      setDropdownClicked(false);
    }
  }, [searchParams, yearAndPressReleases]);

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

  // Get current press releases based on active year
  const currentPressReleases = yearAndPressReleases?.find(
    (item) => item.year === activeYear
  )?.pressReleases || [];

  // Handler for Archive year dropdown
  const handleArchiveChange = (event: SelectChangeEvent<string | number>) => {
    const selectedValue = event.target.value;

    // If "Archive" or "Past years" is selected, reset to first year
    if (selectedValue === "Archive" || selectedValue === "Past years") {
      setActiveYear(yearAndPressReleases?.[0]?.year || "");
      setDropdownClicked(false);
    } else {
      setActiveYear(selectedValue);
      setDropdownClicked(true);
    }
  };

  // Handler for year selection
  const handleYearClick = (year: string | number) => {
    setActiveYear(year);
    setDropdownClicked(false);
    requestAnimationFrame(() => measure(year));

    // Update URL with query parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", String(year));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // helper to measure active item relative to yearsRowRef
  const measure = (year: string | number = activeYear) => {
    const row = yearsRowRef.current;
    const item = itemRefs.current.get(year);
    if (!row || !item) return;

    const rowRect = row.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const left = itemRect.left - rowRect.left;
    const width = Math.round(itemRect.width);

    setUnderline({ left: Math.round(left), width });
  };

  // measure after layout and when activeYear changes
  useLayoutEffect(() => {
    measure(activeYear);

    const onResize = () => measure(activeYear);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeYear]);

  return (
    <div className="fluid-container pt-10 pb-10 md:pb-[80px]">
      <div className="lg:flex justify-between gap-8">
        {/* Left Sidebar - Latest Release (Desktop) */}
        {latestReleases && latestReleases.length > 0 && (
          <div className="w-full lg:w-[20%] mb-8 lg:mb-0">
            {/* <p className="text-[#002F50] text-[30px] font-['Alte_Haas_Grotesk'] leading-[1.4] mb-8">
              Latest Release
            </p> */}
            <SubH1 className="mt-4 mb-8">Latest Release</SubH1>
            <div className="flex flex-col gap-[30px]">
              {latestReleases.slice(0, 2).map((item, index) => (
                <div key={`latest_${index}`} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <BodyText3
                      className="text-[#9997A2]"
                    >
                      {item.date}
                    </BodyText3>
                    <BodyText2 className="text-[#10456A] text-base leading-[1.54]">
                      {item.title}
                    </BodyText2>
                  </div>
                  {item.pdfLink && (
                        
                        <Button title="Download PDF" secondary={true} />
                       
                  )}
                  {index < latestReleases.slice(0, 2).length - 1 && (
                    <div className="bg-[#D9D9D9] h-px w-full mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Years and Press Releases Section */}
        <div className="lg:p-10 lg:bg-[#F7F9FA] lg:w-[75%] w-full rounded-[12px] relative">
          <div className="flex w-full border-b-2 border-b-[#E1E1E1] justify-between">
            {yearAndPressReleases?.length > 0 && (
              <div
                ref={yearsRowRef}
                className="flex gap-x-8 lg:gap-x-[54px] relative pb-3"
              >
                {yearAndPressReleases?.slice(0, 4)?.map((item, index) => (
                  <div
                    key={`item_${index}`}
                    ref={(el) => {
                      if (el) {
                        itemRefs.current.set(item?.year, el);
                      }
                    }}
                    onClick={() => handleYearClick(item?.year)}
                    className="cursor-pointer"
                  >
                    <p
                      className={clsx(
                        "text-base",
                        item?.year === activeYear
                          ? "text-[#002F50] font-semibold"
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
                    className="absolute bottom-0 h-[2px] bg-[#002F50] transition-all duration-300 ease-out rounded-[20px]"
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
            {yearAndPressReleases?.length > 4 && (
              <div className="w-[100px] hidden md:flex items-center gap-2">
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
                    {yearAndPressReleases?.slice(4)?.map((items, index2) => (
                      <MenuItem value={items?.year} key={`archive_${index2}`}>
                        {items?.year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>

          {/* Press Release list */}
          <div className="mt-6 lg:mt-10 lg:max-h-[60vh] overflow-x-hidden lg:overflow-y-auto scrollbar lg:pr-4">
            {/* Desktop - show all */}
            <div className="hidden lg:block">
              {currentPressReleases?.map((item, index) => (
                <div
                  key={item.id}
                  className="border-b border-[#E1E1E1] py-4 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-[6px] flex-1">
                    <p className="text-[#0F3557] text-lg leading-[1.6]">
                      {item.title}
                    </p>
                    <p className="text-[#9997A2] text-sm leading-[1.4]">
                      {item.date}
                    </p>
                  </div>
                  {item.pdfLink && (
                    <a
                      href={item.pdfLink}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src="/images/pdfIcon.svg"
                        alt="Download PDF"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </a>
                  )}
                </div>
              ))}
              {(!currentPressReleases || currentPressReleases.length === 0) && (
                <p className="text-center text-[#4C5861] py-8">
                  No press releases available
                </p>
              )}
            </div>

            {/* Mobile - show all */}
            <div className="block lg:hidden">
              {currentPressReleases?.map((item, index) => (
                <div
                  key={item.id}
                  className="border-b border-[#E1E1E1] py-4 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-[6px] flex-1 pr-4">
                    <p className="text-[#0F3557] text-lg leading-[1.6]">
                      {item.title}
                    </p>
                    <p className="text-[#9997A2] text-sm leading-[1.4]">
                      {item.date}
                    </p>
                  </div>
                  {item.pdfLink && (
                    <a
                      href={item.pdfLink}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                    >
                      <Image
                        src="/images/download-icon-grey2.svg"
                        alt="Download PDF"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </a>
                  )}
                </div>
              ))}
              {(!currentPressReleases || currentPressReleases.length === 0) && (
                <p className="text-center text-[#4C5861] py-8">
                  No press releases available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Archive dropdown - Mobile */}
        {yearAndPressReleases?.length > 4 && (
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
                {yearAndPressReleases?.slice(4)?.map((items, index2) => (
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

