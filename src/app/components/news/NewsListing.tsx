"use client";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { fetchNews } from "@/_lib/fetchNews";
import NewsCard from "../cards/NewsCard";
import { ButtonProps, ImageProps } from "@/app/types/global.type";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled } from "@mui/material/styles";
import { formatDate } from "../../../../utils/formatDate";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

const tabs = [
  { id: 0, category: "Interviews", slug: "Interviews" },
  { id: 1, category: "Print Publication", slug: "Print-Publication" },
  // { id: 2, category: "Digital Media Coverage", slug: "Digital-Media-Coverage" },
];

export type Item1 = {
  id?: number;
  tag?: string;
  tagIconDesktop?: ImageProps;
  tagIconMobile?: ImageProps;
  image?: ImageProps;
  mobImage?: ImageProps;
  date?: string;
  newsDescription?: string;
  ctaButton?: ButtonProps;
};

// Custom styled Pagination
const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "#9997A2",
    fontSize: "16px",
    fontWeight: 400,
    border: "none",
    minWidth: "40px",
    height: "40px",
    margin: "0 4px",
    transition: "all 0.3s ease",
    [theme.breakpoints.down("sm")]: {
      minWidth: "32px",
      height: "32px",
      fontSize: "14px",
      margin: "0 2px",
    },
    "&:hover": {
      backgroundColor: "#EFF3F5",
    },
    "&.Mui-selected": {
      backgroundColor: "#EFF3F5",
      color: "#1a1a1a",
      fontWeight: 500,
      "&:hover": {
        backgroundColor: "#EFF3F5",
      },
    },
  },
  "& .MuiPaginationItem-previousNext": {
    color: "#9997A2",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-disabled": {
      opacity: 0.3,
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "32px",
      height: "32px",
    },
  },
  "& .MuiPaginationItem-ellipsis": {
    [theme.breakpoints.down("sm")]: {
      minWidth: "24px",
    },
  },
}));

// Custom arrow components
const PreviousIcon = () => (
  <Image
    src="/images/pagination-arrow.svg"
    alt="arrow"
    width={34}
    height={34}
    className="rotate-180 w-5 h-5 md:w-[34px] md:h-[34px]"
  />
);

const NextIcon = () => (
  <Image
    src="/images/pagination-arrow.svg"
    alt="arrow"
    width={34}
    height={34}
    className="w-5 h-5 md:w-[34px] md:h-[34px]"
  />
);

const NewsCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="rounded-[10px] w-full h-[190px] lg:h-[230px] bg-grey-200" />
    <div className="flex mt-[16px] gap-x-[14px] items-center">
      <div className="h-3 w-20 rounded bg-grey-200" />
      <div className="rounded-full w-[6px] h-[6px] bg-grey-200" />
      <div className="h-3 w-24 rounded bg-grey-200" />
    </div>
    <div className="mt-[8px] space-y-2">
      <div className="h-4 w-full rounded bg-grey-200" />
      <div className="h-4 w-3/4 rounded bg-grey-200" />
    </div>
  </div>
);

const NewsListing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCat, setActiveCat] = useState(tabs[0].slug);
  const [listingData, setListingData] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [, setHasMore] = useState(false);
  const ITEMS_PER_PAGE = 12;
  const scrollInProgressRef = useRef(false);
  const scrollAnimationRef = useRef<gsap.core.Tween | null>(null);
  const lastPageChangeRef = useRef(0);

  // Fetch using fetchNews() on tab change or page change
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        const url = `/api/news?type=${encodeURIComponent(
          activeCat,
        )}&_page=${currentPage}`;
        const data = await fetchNews(url);
        const results = data?.results || [];
        const pagination = data?.pagination || {};

        // Calculate how many items should actually be shown on this page
        let itemsToShow = results;
        if (pagination.total && currentPage && pagination.pageSize) {
          const totalItems = pagination.total;
          const pageSize = pagination.pageSize;
          const itemsShownSoFar = (currentPage - 1) * pageSize;
          const remainingItems = totalItems - itemsShownSoFar;
          const itemsForThisPage = Math.min(remainingItems, pageSize);
          // Slice results to show only what should be on this page
          itemsToShow = results.slice(0, itemsForThisPage);
        }
        setListingData(itemsToShow);
        // Check if there are more pages based on what API returns
        let calculatedTotalPages = currentPage;
        let hasMorePages = false;

        if (pagination) {
          const { pageCount, total } = pagination;
          // Priority 1: Use pageCount from API (most reliable)
          if (pageCount !== undefined && pageCount !== null) {
            calculatedTotalPages = pageCount;
            hasMorePages = currentPage < pageCount;
          }
          // Priority 2: Calculate from total
          else if (total !== undefined && total !== null) {
            calculatedTotalPages = Math.ceil(total / ITEMS_PER_PAGE);
            hasMorePages = currentPage < calculatedTotalPages;
          }
          // Priority 3: Check if current page has full results
          else {
            hasMorePages = itemsToShow.length === ITEMS_PER_PAGE;
            calculatedTotalPages = hasMorePages ? currentPage + 1 : currentPage;
          }
        } else {
          // No pagination object - check if we got a full page
          hasMorePages = itemsToShow.length === ITEMS_PER_PAGE;
          calculatedTotalPages = hasMorePages ? currentPage + 1 : currentPage;
        }

        setTotalPages(calculatedTotalPages);
        setHasMore(hasMorePages);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [activeCat, currentPage]);

  const handleTabClick = (index: number, slug: string) => {
    setActiveTab(index);
    setActiveCat(slug);
    setCurrentPage(1);
    setTotalPages(1);
    setHasMore(false);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastPageChangeRef.current;

    // Debounce: ignore rapid clicks within 300ms
    if (timeSinceLastClick < 300) {
      return;
    }
    lastPageChangeRef.current = now;

    setCurrentPage(page);

    // Cancel any existing scroll animation
    if (scrollAnimationRef.current) {
      scrollAnimationRef.current.kill();
      scrollAnimationRef.current = null;
    }

    // Use GSAP ScrollToPlugin which works with Lenis
    scrollInProgressRef.current = true;
    scrollAnimationRef.current = gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        scrollInProgressRef.current = false;
        scrollAnimationRef.current = null;
      },
      onInterrupt: () => {
        scrollInProgressRef.current = false;
        scrollAnimationRef.current = null;
      },
    });
  };

  // --- Indicator logic unchanged ---
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureIndicator = useCallback(() => {
    const activeButton = tabRefs.current[activeTab];
    if (!activeButton || !containerRef.current) {
      setIndicator((prev) =>
        prev.visible ? { ...prev, visible: false } : prev,
      );
      return;
    }
    const left =
      activeButton.offsetLeft - (containerRef.current.scrollLeft || 0);
    const width = activeButton.offsetWidth;
    setIndicator({ left, width, visible: true });
  }, [activeTab]);

  useEffect(() => {
    measureIndicator();
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current) {
        scrollAnimationRef.current.kill();
        scrollAnimationRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fluid-container py-[50px] pb-[72px] lg:pb-[100px]">
      <div>
        {/* Tabs */}
        <div className="overflow-x-auto w-full ">
          <div className="relative bg-grey-100 rounded-[40px] p-[4px]  whitespace-nowrap w-fit">
            <div
              ref={containerRef}
              className="relative flex gap-x-[14px] z-10 px-1 w-max"
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: indicator.visible ? indicator.left : 0,
                  top: 0,
                  height: "100%",
                  borderRadius: 9999,
                  background: "#F97316",
                  width: indicator.visible ? indicator.width : 0,
                  transition:
                    "left 280ms cubic-bezier(0.4,0,0.2,1), width 280ms cubic-bezier(0.4,0,0.2,1)",
                  zIndex: 0,
                }}
              />
              {tabs.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) {
                      tabRefs.current[index] = el;
                    }
                  }}
                  onClick={() => handleTabClick(index, item.slug)}
                  className={`text-grey-400 cursor-pointer font-alte-hans py-[10px] px-[24px] rounded-[40px] relative z-10 transition-all text-[14px] ${
                    activeTab === index ? "text-white" : "hover:bg-grey-200"
                  }`}
                >
                  {item.category}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Loading Skeletons */}
        {isLoading && (
          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-6 lg:gap-y-[50px]">
            {Array.from({ length: 8 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        )}
        {error && !isLoading && (
          <p className="mt-[40px] text-red-500">Error: {error}</p>
        )}

        {/* Cards */}
        {!isLoading && !error && (
          <>
            {/* <div className="mt-[20px] text-sm text-grey-400">
              Showing {listingData.length} items on page {currentPage}
            </div> */}
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-6 lg:gap-y-[50px]">
              {listingData?.length > 0 ? (
                listingData?.map((item: Item1, index: number) => (
                  <div
                    className="relative"
                    key={`${item?.id || index}-page-${currentPage}`}
                  >
                    <NewsCard
                      imageSrc={item?.image?.url}
                      date={item?.date ? formatDate(item?.date) : " "}
                      desc={item?.newsDescription}
                      link={item?.ctaButton?.externalLink || "#"}
                      animate
                      icon={item?.tagIconDesktop?.url}
                      tag={item?.tag}
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-grey-400">
                  No data found.
                </p>
              )}
            </div>
          </>
        )}
      </div>
      {/* Pagination - Only show if there are results and multiple pages */}
      {!isLoading && listingData.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-[54px]">
          <StyledPagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: PreviousIcon,
                  next: NextIcon,
                }}
                {...item}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default NewsListing;
