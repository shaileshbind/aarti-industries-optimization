"use client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import clsx from "clsx";
import React, { useLayoutEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ReportsProps, TabsYearsContainerProps } from "@/app/types/shareholder.type";
import OrangeTabCard from "../cards/OrangeTabCard";
import Button from "../Button";

export default function TabsYearsContainer({ data }: TabsYearsContainerProps) {
  const [activeTab, setactiveTab] = useState<number>(0);
  const [activeData, setactiveData] = useState<ReportsProps[]>(data?.[0]?.reports);
  const [activeYear, setactiveYear] = useState<string | number>(
    data?.[0]?.reports?.[0]?.year
  );
  const [activeDropdownTab, setactiveDropdownTab] = useState<string>(
    data?.[0]?.type
  );
  const [dropdownClicked, setdropdownClicked] = useState<boolean>(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState<number>(5);

  // refs
  const yearsRowRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

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

  // Handler for Archive year dropdown (Desktop & Mobile)
  const handleArchiveChange = (event: SelectChangeEvent<string | number>) => {
    setactiveYear(event.target.value);
    setdropdownClicked(true);
  };

  // Handler for Mobile Tabs Dropdown
  const handleMobileTabChange = (event: SelectChangeEvent<string | number>) => {
    const selectedType = event.target.value as string;
    setactiveDropdownTab(selectedType);

    // Find the corresponding tab index and update data
    const tabIndex = data?.findIndex((item) => item?.type === selectedType);
    if (tabIndex !== -1 && tabIndex !== undefined) {
      setactiveTab(tabIndex);
      setactiveData(data?.[tabIndex]?.reports);
      setactiveYear(data?.[tabIndex]?.reports?.[0]?.year);
      setdropdownClicked(false);
      setMobileVisibleCount(5); // Reset count when tab changes
    }
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

  // Get current reports based on active year
  const currentReports = activeData?.find(
    (item) => item.year === activeYear
  )?.report;

  return (
    <div className="fluid-container pt-10 pb-10 md:pb-[80px] lg:flex justify-between">
      {/* Tabs - Desktop */}
      {data?.length > 0 && (
        <div className="w-[20%] hidden lg:block">
          {data?.map((item, index) => (
            <div
              className={clsx(
                `py-5 px-2 border-b-2 border-b-[#E1E1E1] transition-all duration-500 cursor-pointer`,
                activeTab === index ? "text-[#002F50]" : "text-[#9997A2]"
              )}
              key={"tab_" + index}
              onClick={() => {
                setactiveTab(index);
                setactiveData(item?.reports);
                setactiveYear(item?.reports?.[0]?.year);
                setdropdownClicked(false);
                setMobileVisibleCount(5); // Reset count when tab changes
              }}
            >
              <p className="text-lg">{item?.type}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs - Mobile */}
      <div className="block lg:hidden mb-6">
        <FormControl fullWidth>
          <Select
            sx={mobStyles}
            MenuProps={menuProps}
            labelId="activeDropdownTab-label"
            id="activeDropdownTab-select"
            value={activeDropdownTab}
            label="activeDropdownTab"
            onChange={handleMobileTabChange}
            IconComponent={KeyboardArrowDownIcon}
          >
            {data?.map((item, index) => (
              <MenuItem key={"dropdown_tab_" + index} value={item?.type}>
                {item?.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Years */}
      <div className="lg:p-10 lg:bg-[#F7F9FA] w-full lg:w-[75%] rounded-[12px] relative">
        <div className="flex w-full border-b-2 border-b-[#E1E1E1] justify-between">
          {activeData?.length > 0 && (
            <div
              ref={yearsRowRef}
              className="flex gap-x-8 lg:gap-x-[54px] relative pb-3"
            >
              {activeData?.slice(0, 4)?.map((item, index) => (
                <div
                  key={"item_" + index}
                  ref={(el) => {
                    if (el) {
                      itemRefs.current.set(item?.year, el);
                    }
                  }}
                  onClick={() => {
                    setactiveYear(item?.year);
                    setdropdownClicked(false);
                    setMobileVisibleCount(5); // Reset count when year changes
                    requestAnimationFrame(() => measure(item?.year));
                  }}
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

              {/* Animated underline (single element) */}
              {!dropdownClicked && (
                <div
                  className="absolute bottom-0 h-[2px] bg-[#002F50] transition-all duration-300 ease-out"
                  style={{
                    width: `${underline.width + 5}px`,
                    transform: `translateX(${underline.left}px)`,
                  }}
                  aria-hidden
                />
              )}
            </div>
          )}

          {/* Desktop */}
          {activeData?.length > 4 && (
            <div className="w-[100px] hidden md:block">
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

                  {activeData?.slice(4)?.map((items, index2) => (
                    <MenuItem value={items?.year} key={"archive_" + index2}>
                      {items?.year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
        </div>

        {/* list */}
        <div className="mt-6 lg:mt-10 lg:max-h-[60vh] overflow-x-hidden lg:overflow-y-auto scrollbar lg:pr-4">
          {/* Desktop - show all */}
          <div className="hidden lg:block">
            {currentReports?.map((item) => (
              <div className="md:pb-4" key={item.id}>
                <OrangeTabCard
                  title={item?.heading}
                  link={item?.link}
                  scale={false}
                />
              </div>
            ))}
          </div>

          {/* Mobile - show limited with pagination */}
          <div className="block lg:hidden">
            {currentReports?.slice(0, mobileVisibleCount)?.map((item) => (
              <div className="md:pb-4" key={item.id}>
                <OrangeTabCard
                  title={item?.heading}
                  link={item?.link}
                  scale={false}
                />
              </div>
            ))}
          </div>

          {/* View More Button - Only show on mobile if there are more items */}
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

      {/* Mobile */}
      {activeData?.length > 4 && (
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
              {activeData?.slice(4)?.map((items, index2) => (
                <MenuItem value={items?.year} key={"mobile_archive_" + index2}>
                  {items?.year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}
