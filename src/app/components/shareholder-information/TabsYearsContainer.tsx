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
import ProductList from "../products/ProdutList";
import { TabsYearsContainerProps } from "@/app/types/shareholder.type";

export default function TabsYearsContainer({ data }: TabsYearsContainerProps) {
  const [activeTab, setactiveTab] = useState<number>(0);
  const [activeData, setactiveData] = useState(data?.[0]?.reports);
  const [activeYear, setactiveYear] = useState<string | number>(
    data?.[0]?.reports?.[0]?.year
  );
  const [activeDropdownTab, setactiveDropdownTab] = useState(
    "Shareholding Pattern"
  );
  const [dropdownClicked, setdropdownClicked] = useState(false);

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
    backgroundColor: "#EFF3F5",
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

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    setactiveYear(event.target.value);
    setdropdownClicked(true);
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
            onChange={handleChange}
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
                  onChange={handleChange}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem value={"Archive"} selected>
                    Archive
                  </MenuItem>

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
          {activeData
            ?.find((item: any) => item.year === activeYear)
            ?.report?.map((item: any) => (
              <div className="md:pb-4" key={item.id}>
                <ProductList
                  title={item.heading}
                  link={item.link}
                  secondary={item.secondary}
                  scale={false}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="mt-10 block md:hidden">
        <FormControl fullWidth>
          <Select
            sx={mobStyles}
            MenuProps={menuProps}
            labelId="archiveYear-label"
            id="archiveYear-select"
            value={activeYear}
            label="archiveYear"
            onChange={handleChange}
            IconComponent={KeyboardArrowDownIcon}
          >
            <MenuItem value={"Archive"} selected>
              Past years
            </MenuItem>
            {activeData?.slice(4)?.map((items, index2) => (
              <MenuItem value={items?.year} key={"mobile_archive_" + index2}>
                {items?.year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
