"use client";
import React, { useEffect, useRef, useState } from "react";
import { PodcastListingProps, Podcast, PodcastApiItem } from "@/app/types/events-and-webinars.type";
import { ImageProps } from "@/app/types/global.type";
import PodcastCard from "./PodcastCard";
import FeaturedPodcastCard from "./FeaturedPodcastCard";
import { H2 } from "../Typography2";
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

// Custom arrow components
const PreviousIcon = () => (
  <Image
    src="/images/chevron-right-orange.svg"
    alt="arrow"
    width={34}
    height={34}
    className="rotate-180 w-5 h-5 md:w-[34px] md:h-[34px]"
  />
);

const NextIcon = () => (
  <Image
    src="/images/chevron-right-orange.svg"
    alt="arrow"
    width={34}
    height={34}
    className="rotate-270 w-5 h-5 md:w-[34px] md:h-[34px]"
  />
);

// Helper function to transform image to match ImageProps format
const transformImage = (img: ImageProps | null) => {
  if (!img) return { url: "", alternativeText: "" };
  return {
    url: img.url || "",
    alternativeText: img.alternativeText || ""
  };
};

// Helper function to transform API podcast data to component format
const transformPodcastData = (apiPodcast: PodcastApiItem | Podcast): Podcast | null => {
  if (!apiPodcast) return null;
  
  // If it's already a Podcast type (from old format), return as is
  if ('image' in apiPodcast && apiPodcast.image && 'url' in apiPodcast.image && typeof apiPodcast.image.url === 'string') {
    return apiPodcast as Podcast;
  }
  
  // Otherwise, it's PodcastApiItem, transform it
  const item = apiPodcast as PodcastApiItem;
  return {
    title: item.title || "",
    episodeNumber: item.episodeNumber,
    episodeLabel: item.episodeLabel,
    duration: item.duration,
    date: item.date,
    speakerInfo: item.speakerInfo,
    image: transformImage(item.image),
    mobImage: transformImage(item.mobImage || item.image),
    ctaButton: item.ctaButton ? {
      title: item.ctaButton.title,
      link: item.ctaButton.link,
      externalLink: item.ctaButton.hasExternalLink == "true" ? item.ctaButton.externalLink : item.ctaButton.link?.link,
      hasExternalLink: item.ctaButton.hasExternalLink
    } : undefined
  };
};

const PodcastListing = ({ data, podcastsData }: PodcastListingProps) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  
  // Check if podcastsData is in the new API format (pressData) or old format (data.podcasts)
  // getData returns the array directly, so check if it's already an array first
  let podcastsArray: (PodcastApiItem | Podcast)[] = [];
  
  if (Array.isArray(podcastsData)) {
    // getData returns array directly
    podcastsArray = podcastsData;
  } else if (podcastsData && 'pressData' in podcastsData) {
    // Wrapped in pressData (from getPageData)
    podcastsArray = podcastsData.pressData?.data || [];
  } else if (podcastsData && 'data' in podcastsData && podcastsData.data) {
    // Old format with data.podcasts
    podcastsArray = podcastsData.data.podcasts || [];
  }
  
  console.log("podcastsData::::", podcastsData);
  console.log("podcastsArray::::", podcastsArray);
  
  // Calculate total pages based on podcasts count (excluding featured podcast)
  useEffect(() => {
    if (podcastsArray && podcastsArray.length > 0) {
      // Exclude the first podcast (featured) from pagination
      const podcastsForPagination = podcastsArray.length > 1 ? podcastsArray.slice(1) : [];
      const total = Math.ceil(podcastsForPagination.length / itemsPerPage);
      setTotalPages(total || 1);
    } else {
      setTotalPages(1);
    }
  }, [podcastsArray, itemsPerPage]);

  // Reset to page 1 if current page is out of bounds when totalPages changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    // Scroll to top of content
    if (cardsWrapRef.current) {
      cardsWrapRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Get paginated podcasts - useMemo to prevent unnecessary recalculations
  // Exclude the first podcast (featured) from pagination
  const paginatedPodcasts = React.useMemo((): Podcast[] => {
    if (!podcastsArray || podcastsArray.length === 0) return [];
    // Exclude the first podcast (featured) from the list
    const podcastsForPagination = podcastsArray.length > 1 ? podcastsArray.slice(1) : [];
    if (podcastsForPagination.length === 0) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, podcastsForPagination.length);
    const sliced = podcastsForPagination.slice(startIndex, endIndex);
    // Transform API data to component format and filter out nulls
    return sliced.map(transformPodcastData).filter((podcast: Podcast | null): podcast is Podcast => podcast !== null);
  }, [podcastsArray, currentPage, itemsPerPage]);

  // Get featured podcast (first podcast from the list)
  const featuredPodcast = podcastsArray && podcastsArray.length > 0 
    ? transformPodcastData(podcastsArray[0]) 
    : null;

  return (
    <section className="py-[40px] lg:py-[60px]">
        <div className="container">
            <H2 className=" mb-[30px]">{data?.title}</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                {featuredPodcast && (
                  <FeaturedPodcastCard podcast={featuredPodcast} />
                )}
              </div>
              <div className="col-span-1">
                <div 
                  className="flex flex-col gap-4"
                  ref={cardsWrapRef}
                >
                  {paginatedPodcasts.map((podcast: Podcast, index: number) => (
                    <PodcastCard 
                      key={`podcast-${currentPage}-${index}-${podcast?.title || index}`} 
                      podcast={podcast} 
                    />
                  ))}
                </div>
                {paginatedPodcasts.length > 0 && podcastsArray && podcastsArray.length > 1 && totalPages > 1 && (
              <div className="flex justify-end mt-[20px]">
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
            </div>
           
        </div>
    </section>
  );
};

export default PodcastListing;
