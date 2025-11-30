"use client";
import React, { useEffect, useRef, useState } from "react";
import Tabs from "../Tabs";
import DateCard from "../cards/DateCard";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled } from "@mui/material/styles";
import Image from "next/image";

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

// Custom arrow components (you can replace these with your own SVGs)
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

export default function BlogAndCaseStudies({ data }: any) {
  const tabs = data?.card || [];

  const [active, setActive] = useState(tabs?.[0]?.post_category?.slug || "");
  const [activeIndex, setactiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, [activeIndex]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Add your pagination logic here
  };

  return (
    <div className="fluid-container">
      <Tabs
        tabs={tabs as unknown as Parameters<typeof Tabs>[0]["tabs"]}
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
        {[...Array(12)]?.map((_, index) => (
          <div key={"item_" + index} className="relative">
            <DateCard
              imageSrc={"/images/home/blog1.png"}
              date={"May 21, 2025"}
              desc={
                "Lorem ipsum dolor sit amet consectetur. Tristique nulla sed hac donec nulla habitant facilisi."
              }
              link={"/blogs/16"}
              animate
              useTargetBlank={false}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-[54px]">
        <StyledPagination
          count={10}
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
    </div>
  );
}
