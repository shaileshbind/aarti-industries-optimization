"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import clsx from "clsx";
import React, { useLayoutEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductList from "../products/ProdutList";

export default function TabsYearsContainer() {
  const [activeTab, setactiveTab] = useState<number>(0);
  const [activeYear, setactiveYear] = useState<number>(0);
  const [archiveYear, setarchiveYear] = useState<string | number>("Archive");
  const [activeDropdownTab, setactiveDropdownTab] = useState(
    "Shareholding Pattern"
  );

  const years = ["2025", "2024", "2024", "2023"];
  const policiesList = [
    {
      id: 1,
      title: "Shareholding pattern as on 30.09.2025",
      link: "/code-and-policies",
      secondary: true,
    },
    {
      id: 2,
      title: "Shareholding pattern as on 30.09.2025",
      link: "/code-and-policies",
      secondary: true,
    },
    {
      id: 3,
      title: "Shareholding pattern as on 30.09.2025",
      link: "/code-and-policies",
      secondary: true,
    },
    {
      id: 4,
      title: "Shareholding pattern as on 30.09.2025",
      link: "/code-and-policies",
      secondary: true,
    },
    {
      id: 5,
      title: "Shareholding pattern as on 30.09.2025",
      link: "/code-and-policies",
      secondary: true,
    },
    {
      id: 6,
      title: "Shareholding pattern as on 30.09.2025",
      link: "/code-and-policies",
      secondary: true,
    },
  ];

  // refs
  const yearsRowRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const styles = {
    "&::before": { borderBottom: "none" }, // default line
    "&::after": { borderBottom: "none" }, // active line
    "&:hover:not(.Mui-disabled)::before": {
      borderBottom: "none",
    },
  };

  const mobStyles = {
    backgroundColor: "#EFF3F5",
    borderRadius: "10px",

    // remove borders
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
    setarchiveYear(event.target.value);
  };

  // helper to measure active item relative to yearsRowRef
  const measure = (index = activeYear) => {
    const row = yearsRowRef.current;
    const item = itemRefs.current[index];
    if (!row || !item) return;

    const rowRect = row.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const left = itemRect.left - rowRect.left; // px from left of row
    const width = Math.round(itemRect.width);

    setUnderline({ left: Math.round(left), width });
  };

  // measure after layout and when activeYear changes
  useLayoutEffect(() => {
    measure(activeYear);

    // re-measure on resize so underline stays in place responsively
    const onResize = () => measure(activeYear);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeYear]);

  return (
    <div className="fluid-container pt-10 pb-10 md:pb-[80px] lg:flex justify-between">
      {/* Tabs - Desktop */}
      <div className="w-[20%] hidden lg:block">
        {[...Array(4)]?.map((item, index) => (
          <div
            className={clsx(
              `py-5 px-2 border-b-2 border-b-[#E1E1E1] transition-all duration-500 cursor-pointer`,
              activeTab === index ? "text-[#002F50]" : "text-[#9997A2]"
            )}
            key={"tab_" + index}
            onClick={() => setactiveTab(index)}
          >
            <p className="text-lg">Shareholding Pattern</p>
          </div>
        ))}
      </div>

      {/* Tabs - Mobile */}
      <div className="block lg:hidden mb-6">
        <FormControl fullWidth>
          <Select
            sx={mobStyles}
            labelId="activeDropdownTab-label"
            id="activeDropdownTab-select"
            value={activeDropdownTab}
            label="activeDropdownTab"
            onChange={handleChange}
            IconComponent={KeyboardArrowDownIcon}
          >
            {[...Array(4)]?.map((item, index) => (
              <MenuItem value={"Shareholding Pattern"} selected>
                Shareholding Pattern
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Years */}
      <div className="lg:p-10 lg:bg-[#F7F9FA] w-full lg:w-[75%] rounded-[12px] relative">
        <div className="flex w-full border-b-2 border-b-[#E1E1E1] justify-between">
          <div
            ref={yearsRowRef}
            className="flex gap-x-8 lg:gap-x-[54px] relative pb-3"
          >
            {years.map((item, index) => (
              <div
                key={"item_" + index}
                ref={(el) => {
                  if (el) {
                    itemRefs.current[index] = el;
                  }
                }}
                onClick={() => {
                  setactiveYear(index);
                  requestAnimationFrame(() => measure(index));
                }}
                className="cursor-pointer"
              >
                <p
                  className={clsx(
                    "text-base",
                    index === activeYear
                      ? "text-[#002F50] font-semibold"
                      : "text-[#4C5861]"
                  )}
                >
                  {item}
                </p>
              </div>
            ))}

            {/* Animated underline (single element) */}
            <div
              className="absolute bottom-0 h-[2px] bg-[#002F50] transition-all duration-300 ease-out"
              style={{
                width: `${underline.width + 5}px`,
                transform: `translateX(${underline.left}px)`,
              }}
              aria-hidden
            />
          </div>

          {/* Desktop */}
          <div className="w-[100px] hidden md:block">
            <FormControl variant="standard" fullWidth>
              <Select
                sx={styles}
                labelId="archiveYear-label"
                id="archiveYear-select"
                value={archiveYear}
                label="archiveYear"
                onChange={handleChange}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value={"Archive"} selected>
                  Archive
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* list */}
        <div className="mt-6 lg:mt-10 lg:max-h-[60vh] overflow-x-hidden lg:overflow-y-auto scrollbar lg:pr-4">
          {policiesList?.map((policy: any) => (
            <div className="md:pb-4">
              <ProductList
                key={policy.id}
                title={policy.title}
                link={policy.link}
                secondary={policy.secondary}
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
            labelId="archiveYear-label"
            id="archiveYear-select"
            value={archiveYear}
            label="archiveYear"
            onChange={handleChange}
            IconComponent={KeyboardArrowDownIcon}
          >
            <MenuItem value={"Archive"} selected>
              Past years
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
