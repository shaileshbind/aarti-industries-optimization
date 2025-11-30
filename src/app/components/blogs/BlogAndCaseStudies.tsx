"use client";
import React, { useEffect, useRef, useState } from "react";
import SimpleTabs from "../SimpleTabs";
import DateCard from "../cards/DateCard";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatDate } from "../../../../utils/formatDate";

gsap.registerPlugin(ScrollTrigger);

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
    src="/images/accordian-down.svg"
    alt="arrow"
    width={34}
    height={34}
    className="rotate-90 w-5 h-5 md:w-[34px] md:h-[34px]"
  />
);

const NextIcon = () => (
  <Image
    src="/images/accordian-down.svg"
    alt="arrow"
    width={34}
    height={34}
    className="rotate-270 w-5 h-5 md:w-[34px] md:h-[34px]"
  />
);

// Type mapping for API filter
const getTypeFromSlug = (slug: string): string => {
  const typeMap: { [key: string]: string } = {
    blogs: "blog",
    "case-study": "case-study",
  };
  return typeMap[slug] || slug;
};

export default function BlogAndCaseStudies({ data, lastestBlogId }: any) {
  // Transform data into tabs format similar to MediaContainer
  const tabs =
    data?.toggleTabs?.map((item: any) => ({
      title: item?.title,
      slug: item?.title.toLowerCase().replace(/\s+/g, "-"),
      id: item?.id,
    })) || [];

  const [active, setActive] = useState(tabs?.[0]?.slug || "");
  const [activeIndex, setactiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogData, setBlogData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(false);

  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch blog data
  const fetchBlogData = async (type: string, page: number) => {
    setLoading(true);
    try {
      const typeFilter = getTypeFromSlug(type);
      const apiUrl = `${
        process.env.NEXT_PUBLIC_OTHER_URL
      }/blog-case-studies?sort[0]=date:desc&filters[type][$eq]=${typeFilter}&populate[thumbnailImageDesktop][fields][0]=url&populate[thumbnailImageDesktop][fields][1]=alternativeText&populate[thumbnailImageDesktop][fields][2]=mime&populate[thumbnailImageDesktop][fields][3]=ext&populate[thumbnailImageMobile][fields][0]=url&populate[thumbnailImageMobile][fields][1]=alternativeText&populate[thumbnailImageMobile][fields][2]=mime&populate[thumbnailImageMobile][fields][3]=ext&fields[0]=title&fields[1]=date&fields[2]=type&fields[3]=excerpt&pagination[pageSize]=12&pagination[page]=${page}&fields[4]=slug&status=published${
        typeFilter === "blog"
          ? `&filters[documentId][$ne]=${lastestBlogId || ""}`
          : ""
      }`;

      // Replace with your actual API call
      const response = await fetch(apiUrl);
      const result = await response.json();
      console.log("result", result);

      setBlogData(result.data || []);
      setTotalPages(result.meta?.pagination?.pageCount || 1);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setBlogData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when active tab or page changes
  useEffect(() => {
    if (active) {
      fetchBlogData(active, currentPage);
    }
  }, [active, currentPage]);

  // Reset to page 1 when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeIndex]);

  // Initial animation for the container
  useEffect(() => {
    let containerAnim: gsap.core.Tween | undefined;
    if (containerRef.current) {
      containerAnim = gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 87%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    return () => {
      if (containerAnim && containerAnim.scrollTrigger)
        containerAnim.scrollTrigger.kill();
      if (containerAnim) containerAnim.kill();
    };
  }, []);

  // Handle tab change with animation
  const handleTabChange = (slug: string, index: number) => {
    if (!cardsWrapRef.current) {
      setActive(String(slug));
      setactiveIndex(index);
      return;
    }

    const cards = cardsWrapRef.current.querySelectorAll(".date-card-anim");
    if (!cards || cards.length === 0) {
      setActive(String(slug));
      setactiveIndex(index);
      return;
    }

    // Kill any existing animation
    if (switchAnimRef.current) {
      switchAnimRef.current.kill();
      switchAnimRef.current = null;
    }

    // Animate out, then change state
    gsap.set(cards, { transformOrigin: "50% 50%" });
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => {
        setActive(String(slug));
        setactiveIndex(index);
      },
    });
    tl.to(cards, { scale: 0, duration: 0.2, stagger: 0.05 });
    switchAnimRef.current = tl;
  };

  // Animate in new cards when activeIndex changes
  useEffect(() => {
    if (!cardsWrapRef.current) return;
    const cards = cardsWrapRef.current.querySelectorAll(".date-card-anim");
    if (!cards || cards.length === 0) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    gsap.set(cards, { transformOrigin: "50% 50%", scale: 0 });
    tl.to(cards, { scale: 1, duration: 0.3, stagger: 0.05 });

    return () => {
      tl.kill();
    };
  }, [activeIndex, blogData]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Scroll to top of content
    if (cardsWrapRef.current) {
      cardsWrapRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="fluid-container" ref={containerRef}>
      <SimpleTabs
        tabs={tabs}
        activeId={active}
        onChange={(slug, index) => {
          handleTabChange(slug, index);
        }}
        indicatorColor="var(--gradient-orange-1)"
        innerClassName="rounded-[40px]"
        leftAlign
      />

      <div
        className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-y-14"
        ref={cardsWrapRef}
      >
        {loading ? (
          // Loading state
          [...Array(12)].map((_, index) => (
            <div key={`loading_${index}`} className="relative">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : blogData.length > 0 ? (
          // Render actual blog data
          blogData?.map((item, index) => (
            <div key={item?.id || `item_${index}`} className="relative">
              <DateCard
                imageSrc={item?.thumbnailImageDesktop?.url}
                date={formatDate(item?.date) || ""}
                desc={item?.excerpt}
                link={`/${active === "blogs" ? "blogs" : "case-studies"}/${
                  item?.slug
                }`}
                animate
                useTargetBlank={false}
              />
            </div>
          ))
        ) : (
          // No data state
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              No {active === "blogs" ? "blogs" : "case studies"} found.
            </p>
          </div>
        )}
      </div>

      {!loading && blogData.length > 0 && totalPages > 1 && (
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
}
