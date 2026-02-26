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
import { PressReleaseYearListingProps } from "@/app/types/press-release.type";
import { useRouter, useSearchParams } from "next/navigation";
import { BodyText2, BodyText3, SubH1 } from "../Typography2";
import Button from "../Button";
import Link from "next/link";
import { formatDate } from "../../../../utils/formatDate";
import { fetchNews } from "@/_lib/fetchNews";

export type PressItem = {
  id?: number;
  heading?: string;
  link?: string;
  date?: string;
  slug?: string;
  shortDescription?: string;
  quarter?: string;
  file?: {
    id?: number;
    url?: string;
  };
};

/* Left section */
type LatestItem = {
  heading?: string;
  date?: string | null;
  ctaButtonUrl?: string | null;
};

function buildFromApiResponse(data: Record<string, { items?: unknown[] }> | null): {
  latestTwo: LatestItem[];
  yearAndPressReleases: Record<string, PressItem[]>;
} {
  const allLatest: LatestItem[] = [];
  const yearAndPressReleases: Record<string, PressItem[]> = {};
  if (!data || typeof data !== "object")
    return { latestTwo: [], yearAndPressReleases };

  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a)); // newest first

  for (const year of years) {
    const yearData = data[year];
    const items = yearData?.items;
    if (!Array.isArray(items)) continue;

    const yearEntries: PressItem[] = [];

    for (const item of items) {
      const report = (item as { report?: unknown[] })?.report;
      if (!Array.isArray(report)) continue;
      for (const quarterBlock of report) {
        const q = quarterBlock as { quarter?: string; report?: unknown[] };
        const entries = q?.report;
        if (!Array.isArray(entries)) continue;
        for (const entry of entries) {
          const e = entry as {
            id?: number;
            heading?: string;
            date?: string | null;
            slug?: string | null;
            link?: string | null;
            file?: { id?: number; url?: string };
          };
          if (!e?.heading) continue;
          const pressItem: PressItem = {
            id: e.id,
            heading: e.heading,
            date: e.date ?? undefined,
            slug: e.slug ?? undefined,
            link: e.link ?? undefined,
            file: e.file,
            quarter: q.quarter,
          };
          yearEntries.push(pressItem);
          allLatest.push({
            heading: e.heading,
            date: e.date ?? null,
            ctaButtonUrl: e?.file?.url ?? e?.link ?? null,
          });
        }
      }
    }
    if (yearEntries.length > 0) yearAndPressReleases[year] = yearEntries;
  }

  const sorted = [...allLatest].sort((a, b) => {
    const tA = a?.date ? new Date(a.date).getTime() : 0;
    const tB = b?.date ? new Date(b.date).getTime() : 0;
    return tB - tA;
  });
  return { latestTwo: sorted.slice(0, 2), yearAndPressReleases };
}

export default function PressReleaseYearListing({
  latestReleases = [],
  yearAndPressReleases: propsYearAndPressReleases,
}: PressReleaseYearListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeYear, setActiveYear] = useState<string>("");
  const [dropdownClicked, setDropdownClicked] = useState<boolean>(false);

  const [apiLatestTwo, setApiLatestTwo] = useState<LatestItem[]>([]);
  const [apiYearAndPressReleases, setApiYearAndPressReleases] = useState<
    Record<string, PressItem[]>
  >({});

  useEffect(() => {
    const load = async () => {
      const data = await fetchNews("/api/press");
      const { latestTwo, yearAndPressReleases } = buildFromApiResponse(data);
      setApiLatestTwo(latestTwo);
      setApiYearAndPressReleases(yearAndPressReleases);
    };
    load();
  }, []);

  // Use API data when available, else fall back to props
  const yearAndPressReleases = useMemo(
    () =>
      Object.keys(apiYearAndPressReleases).length > 0
        ? apiYearAndPressReleases
        : (propsYearAndPressReleases as Record<string, PressItem[]> | undefined) ?? {},
    [apiYearAndPressReleases, propsYearAndPressReleases],
  );
  const latestTwo = useMemo(() => {
    if (apiLatestTwo.length > 0) return apiLatestTwo;
    const byDate = [...latestReleases].sort((a, b) => {
      const tA = a?.date ? new Date(a.date).getTime() : 0;
      const tB = b?.date ? new Date(b.date).getTime() : 0;
      return tB - tA;
    });
    return byDate.slice(0, 2).map((r) => ({
      heading: r.heading ?? r.shortDescription,
      date: r.date ?? null,
      ctaButtonUrl: r?.file?.url ?? r?.link ?? null,
    }));
  }, [apiLatestTwo, latestReleases]);

  // Convert object keys -> year tabs (newest first)
  const yearsList = useMemo(() => {
    if (!yearAndPressReleases || typeof yearAndPressReleases !== "object") return [];
    return Object.keys(yearAndPressReleases).sort((a, b) => Number(b) - Number(a));
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

  // Press releases for the active year, sorted by date (latest first)
  const currentPressReleases: PressItem[] = useMemo(() => {
    if (!activeYear || !yearAndPressReleases) return [];
    const val = yearAndPressReleases[activeYear];
    if (!Array.isArray(val)) return [];
    return [...val].sort((a, b) => {
      const dateA = a?.date ? new Date(a.date).getTime() : 0;
      const dateB = b?.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA; // latest first
    });
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
    [activeYear],
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
        {/* Left Sidebar - Latest */}
        {latestTwo.length > 0 && (
          <div className="w-full lg:w-[20%] mb-8 lg:mb-0">
            <SubH1 className="mt-4 mb-8">Latest Release</SubH1>
            <div className="flex flex-col gap-[30px]">
              {latestTwo.map((item, index) => (
                <div key={`latest_${index}`} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    {item?.date && (
                      <BodyText3 className="text-[#9997A2]">
                        {formatDate(item.date)}
                      </BodyText3>
                    )}
                    <BodyText2 className="text-[#10456A] text-base leading-[1.54]">
                      {item?.heading}
                    </BodyText2>
                  </div>
                  {item?.ctaButtonUrl && (
                    <Button
                      title="Download PDF"
                      secondary
                      href={item.ctaButtonUrl}
                    />
                  )}
                  {index < latestTwo.length - 1 && (
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
                          : "text-[#4C5861]",
                      )}
                    >
                      FY{year}
                    </p>
                  </div>
                ))}
                {/* Animated underline */}
                {!dropdownClicked && (
                  <div
                    className="absolute bottom-[-2] h-[2px] bg-[#DC4C03] md:bg-[#002F50] transition-all duration-300 ease-out rounded-[20px]"
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
                        FY{y}
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
            {/* Desktop  */}
            <div className="hidden lg:block">
              {currentPressReleases.map((item) => (
                <div
                  key={item?.id ?? `${item?.heading}-${item?.date}`}
                  className="border-b border-[#E1E1E1] py-4 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-[6px] flex-1">
                    {/* {item?.quarter && (
                      <p className="text-[#4C5861] text-sm leading-[1.4]">
                        {item.quarter}
                      </p>
                    )} */}
                    {item?.slug ? (
                      <Link
                        href={`/press-releases/${item.slug}`}
                        target="_blank"
                      >
                        <p className="text-[#0F3557] text-lg leading-[1.6]">
                          {item?.heading}
                        </p>
                      </Link>
                    ) : (
                      <p className="text-[#0F3557] text-lg leading-[1.6]">
                        {item?.heading}
                      </p>
                    )}
                    {item?.date && (
                      <p className="text-[#9997A2] text-sm leading-[1.4]">
                        {formatDate(item.date)} 
                      </p>
                    )}
                  </div>
                  {/* {item?.file?.url && (
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
                  )} */}
                </div>
              ))}
              {currentPressReleases.length === 0 && (
                <p className="text-center text-[#4C5861] py-8">
                  No press releases available
                </p>
              )}
            </div>

            {/* Mobile */}
            <div className="block lg:hidden">
              {currentPressReleases.map((item) => (
                <div
                  key={item?.id ?? `${item?.heading}-${item?.date}`}
                  className="border-b border-[#E1E1E1] py-4 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-[6px] flex-1 pr-4">
                    {/* {item?.quarter && (
                      <p className="text-[#4C5861] text-sm leading-[1.4]">
                        {item.quarter}
                      </p>
                    )} */}
                    {item?.slug ? (
                      <Link
                        href={`/press-releases/${item.slug}`}
                        target="_blank"
                      >
                        <p className="text-[#0F3557] text-lg leading-[1.6]">
                          {item?.heading}
                        </p>
                      </Link>
                    ) : (
                      <p className="text-[#0F3557] text-lg leading-[1.6]">
                        {item?.heading}
                      </p>
                    )}
                    {item?.date && (
                      <p className="text-[#9997A2] text-sm leading-[1.4]">
                        {formatDate(item.date)}
                      </p>
                    )}
                  </div>
                  {/* {item?.file?.url && (
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
                  )} */}
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
