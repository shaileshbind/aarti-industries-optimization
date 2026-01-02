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
  useMemo,
} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import { PressReleaseYearListingProps } from "@/app/types/press-release.type";
import { useRouter, useSearchParams } from "next/navigation";
import { BodyText2, BodyText3, SubH1 } from "../Typography2";
import Button from "../Button";
import Link from "next/link";
import { formatDate } from "../../../../utils/formatDate";

export type PressItem = {
  id?: number;
  heading?: string;
  link?: string;
  date?: string;
  slug?: string;
  shortDescription?: string;
  file?: {
    id?: number;
    url?: string;
  };
};

type YearValue =
  | PressItem[]
  | {
      report?: PressItem[];
      [k: string]: unknown;
    }
  | null
  | undefined;

export default function PressReleaseYearListing({
  latestReleases = [],
  yearAndPressReleases,
}: PressReleaseYearListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeYear, setActiveYear] = useState<string>("");
  const [dropdownClicked, setDropdownClicked] = useState<boolean>(false);

  // Convert object keys -> year tabs
  const yearsList = useMemo(() => {
    if (!yearAndPressReleases) return [];
    return Object.keys(yearAndPressReleases);
  }, [yearAndPressReleases]);

  // Initialize active year
  useEffect(() => {
    if (!yearsList.length) return;
    const urlYear = searchParams.get("year");
    const firstYear = yearsList[0];
    const targetYear =
      urlYear && yearsList.includes(urlYear) ? urlYear : firstYear;

    setActiveYear(targetYear);
    setDropdownClicked(false);
  }, [yearsList, searchParams]);

  // Safely derive array of press releases for activeYear
  const currentPressReleases: PressItem[] = useMemo(() => {
    if (!activeYear || !yearAndPressReleases) return [];
    const val = yearAndPressReleases[
      activeYear as keyof typeof yearAndPressReleases
    ] as YearValue;
    // If it's already an array, return a shallow copy
    if (Array.isArray(val)) {
      return val.slice();
    }
    // If it's an object with report array
    if (
      val &&
      typeof val === "object" &&
      "report" in val &&
      Array.isArray(val.report)
    ) {
      return val.report.slice();
    }
    // Unexpected shape -> empty
    return [];
  }, [activeYear, yearAndPressReleases]);

  // Refs for underline animation
  const yearsRowRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const measure = useCallback(
    (year: string = activeYear) => {
      const row = yearsRowRef.current;
      const item = itemRefs.current.get(year);
      if (!row || !item) {
        setUnderline({ left: 0, width: 0 });
        return;
      }
      const rowRect = row.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const left = itemRect.left - rowRect.left;
      const width = Math.round(itemRect.width);

      setUnderline({ left: Math.round(left), width });
    },
    [activeYear]
  );

  useLayoutEffect(() => {
    measure(activeYear);

    const onResize = () => measure(activeYear);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeYear, measure]);

  // Tab click handler
  const handleYearClick = (year: string) => {
    setActiveYear(year);
    setDropdownClicked(false);
    requestAnimationFrame(() => measure(year));
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", year);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Archive dropdown change
  const handleArchiveChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Archive" || selectedValue === "Past years") {
      setActiveYear(yearsList[0] || "");
      setDropdownClicked(false);
    } else {
      setActiveYear(selectedValue);
      setDropdownClicked(true);
    }
  };

  return (
    <div className="fluid-container pt-10 pb-10 md:pb-[80px]">
      <div className="lg:flex justify-between gap-8">
        {/* Left Sidebar - Latest Release */}
        {latestReleases && latestReleases.length > 0 && (
          <div className="w-full lg:w-[20%] mb-8 lg:mb-0">
            <SubH1 className="mt-4 mb-8">Latest Release</SubH1>
            <div className="flex flex-col gap-[30px]">
              {latestReleases.slice(0, 2).map((item, index) => (
                <div key={`latest_${index}`} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    {item?.date && (
                      <BodyText3 className="text-[#9997A2]">
                        {formatDate(item?.date)}
                      </BodyText3>
                    )}
                    <BodyText2 className="text-[#10456A] text-base leading-[1.54]">
                      {item?.shortDescription}
                    </BodyText2>
                  </div>
                  {item?.file?.url && (
                    <Button
                      title="Download PDF"
                      secondary
                      href={item.file.url}
                    />
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
            {yearsList.length > 0 && (
              <div
                ref={yearsRowRef}
                className="flex gap-x-8 lg:gap-x-[54px] relative pb-3"
              >
                {yearsList.slice(0, 4).map((year) => (
                  <div
                    key={year}
                    ref={(el) => {
                      if (el) {
                        itemRefs.current.set(year, el);
                      } else {
                        itemRefs.current.delete(year);
                      }
                    }}
                    onClick={() => handleYearClick(year)}
                    className="cursor-pointer"
                  >
                    <p
                      className={clsx(
                        "text-base",
                        year === activeYear
                          ? "text-[#002F50]"
                          : "text-[#4C5861]"
                      )}
                    >
                      {year}
                    </p>
                  </div>
                ))}
                {/* Animated underline */}
                {!dropdownClicked && (
                  <div
                    className="absolute bottom-0 h-[2px] bg-[#DC4C03] md:bg-[#002F50] transition-all duration-300 ease-out rounded-[20px]"
                    style={{
                      width: `${underline.width}px`,
                      transform: `translateX(${underline.left}px)`,
                    }}
                    aria-hidden
                  />
                )}
              </div>
            )}

            {/* Archive dropdown - Desktop */}
            {yearsList.length > 4 && (
              <div className="w-[100px] hidden md:flex items-center gap-2">
                <FormControl variant="standard" fullWidth>
                  <Select
                    sx={{ "&::before": { borderBottom: "none" } }}
                    labelId="archiveYear-label"
                    id="archiveYear-select"
                    value={dropdownClicked ? activeYear : "Archive"}
                    label="archiveYear"
                    onChange={handleArchiveChange}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    <MenuItem value={"Archive"}>Archive</MenuItem>
                    {yearsList.slice(4).map((y) => (
                      <MenuItem value={y} key={`archive_${y}`}>
                        {y}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>

          {/* Press Release list */}
          <div
            className="mt-6 lg:mt-10 lg:max-h-[60vh] overflow-x-hidden lg:overflow-y-auto scrollbar lg:pr-4"
            data-lenis-prevent
          >
            {/* Desktop - show all */}
            <div className="hidden lg:block">
              {currentPressReleases.map((item) => (
                <div
                  key={item?.id ?? `${item?.heading}-${Math.random()}`}
                  className="border-b border-[#E1E1E1] py-4 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-[6px] flex-1">
                    <Link
                      href={`/press-releases/${item?.slug}`}
                      target="_blank"
                    >
                      <p className="text-[#0F3557] text-lg leading-[1.6]">
                        {item?.heading}
                      </p>
                    </Link>
                    {item?.date && (
                      <p className="text-[#9997A2] text-sm leading-[1.4]">
                        {formatDate(item?.date)}
                      </p>
                    )}
                  </div>
                  {item?.file?.url && (
                    <a
                      href={item.file.url}
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
              {currentPressReleases.length === 0 && (
                <p className="text-center text-[#4C5861] py-8">
                  No press releases available
                </p>
              )}
            </div>

            {/* Mobile - show all */}
            <div className="block lg:hidden">
              {currentPressReleases.map((item) => (
                <div
                  key={item?.id ?? `${item?.heading}-${Math.random()}`}
                  className="border-b border-[#E1E1E1] py-4 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-[6px] flex-1 pr-4">
                    <Link
                      href={`/press-releases/${item?.slug}`}
                      target="_blank"
                    >
                      <p className="text-[#0F3557] text-lg leading-[1.6]">
                        {item?.heading}
                      </p>
                    </Link>
                    {item?.date && (
                      <p className="text-[#9997A2] text-sm leading-[1.4]">
                        {formatDate(item?.date)}
                      </p>
                    )}
                  </div>
                  {item?.file?.url && (
                    <a
                      href={item.file.url}
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
              {currentPressReleases.length === 0 && (
                <p className="text-center text-[#4C5861] py-8">
                  No press releases available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Archive dropdown - Mobile */}
        {yearsList.length > 4 && (
          <div className="mt-10 block md:hidden">
            <FormControl fullWidth>
              <Select
                sx={{
                  backgroundColor: "#F7F9FA",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
                labelId="archiveYear-label-mobile"
                id="archiveYear-select-mobile"
                value={dropdownClicked ? activeYear : "Past years"}
                label="archiveYear"
                onChange={handleArchiveChange}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value={"Past years"}>Past years</MenuItem>
                {yearsList.slice(4).map((y) => (
                  <MenuItem value={y} key={`mobile_archive_${y}`}>
                    {y}
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
