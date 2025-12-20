"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { SubH1 } from "../Typography2";
import { useRouter, useSearchParams } from "next/navigation";
import OrangeTabCard from "../cards/OrangeTabCard";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";

interface HitProps {
  title: string;
  slug: string;
  searchUrl: string;
  type: string;
  productName?: string;
  category?: string;
  _index?: string;
}

interface SearchDataProps {
  hits: HitProps[];
  totalResults: number;
  query: string;
  page: number;
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

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

const ITEMS_PER_PAGE = 8;

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSearchValue = searchParams.get("search") || "";
  const urlPage = parseInt(searchParams.get("page") || "1");
  const urlLimit = parseInt(
    searchParams.get("limit") || String(ITEMS_PER_PAGE)
  );

  const [searchValue, setSearchValue] = useState(urlSearchValue);
  const [searchedData, setsearchedData] = useState<SearchDataProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [limit, setLimit] = useState(urlLimit);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchValue.trim()) {
      setsearchedData(null);
      setHasSearched(false);
      router.push("/search-results");
      return;
    }
    // Reset to page 1 on new search
    router.push(
      `/search-results?search=${encodeURIComponent(
        searchValue.trim()
      )}&page=1&limit=${limit}`
    );
  };

  const getUrl = (hit: HitProps) => {
    console.log(hit);
    if (hit?._index === "products") return `/products/${hit.slug}`;
    if (hit?._index === "disclosures_reports")
      return `/investors/disclosures/${hit.slug}`;
    if (hit?.type === "case-study") return `/case-studies/${hit.slug}`;
    if (hit?.type === "blog") return `/blogs/${hit.slug}`;
    if (hit?.type === "blog") return `/blogs/${hit.slug}`;
    if (hit?.slug === "sustainability-report") return `/sustainability-report`;

    return `/${hit?.searchUrl}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // Clear results when search is empty
    if (!value.trim()) {
      setsearchedData(null);
      setHasSearched(false);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    // Update URL with new page number
    router.push(
      `/search-results?search=${encodeURIComponent(
        searchValue
      )}&page=${page}&limit=${limit}`
    );
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSearchedData = async (
    query: string,
    page: number = 1,
    limit: number = ITEMS_PER_PAGE
  ) => {
    if (!query.trim()) {
      setsearchedData(null);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setsearchedData(data?.data);
    } catch {
      setsearchedData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when URL search parameter, page, or limit changes
  useEffect(() => {
    if (urlSearchValue) {
      setSearchValue(urlSearchValue);
      setLimit(urlLimit);
      getSearchedData(urlSearchValue, urlPage, urlLimit);
    } else {
      // Clear results if no search value
      setsearchedData(null);
      setHasSearched(false);
    }
  }, [urlSearchValue, urlPage, urlLimit]);

  // Calculate if there are any results
  const hasResults = searchedData && searchedData?.hits?.length > 0;

  return (
    <>
      <div className="flex flex-col gap-4 py-10 md:pb-20 md:pt-30">
        <SubH1 className="text-blue-200 font-medium lg:!text-[30px]">
          Search
        </SubH1>
        <SearchBar
          value={searchValue}
          onChange={handleChange}
          handleSearch={handleSearch}
          placeholder="Search..."
          headerSearch={true}
          className="border-[2px] border-[#E1E1E1] !shadow-none max-w-full md:max-w-[560px]"
        />

        {hasResults && !isLoading && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-[#F36633] text-sm md:text-base">
              Showing {searchedData?.totalResults}{" "}
              {searchedData?.totalResults === 1 ? "result" : "results"} for
              &apos;{searchedData?.query}&apos;
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 pb-20">
        {isLoading && (
          <SubH1 className="text-center w-full py-10">Searching...</SubH1>
        )}

        {!isLoading &&
          hasResults &&
          searchedData?.hits?.map((hit, resultIndex) => (
            <OrangeTabCard
              key={`result-${searchedData.page}-${resultIndex}`}
              title={hit?.title || hit?.productName || hit?.category || ""}
              link={getUrl(hit)}
              useTargetBlank={false}
              titleClassName="capitalize"
            />
          ))}

        {!isLoading && hasSearched && !hasResults && (
          <SubH1 className="text-center w-full py-10">
            No results found for &apos;{searchValue}&apos;.
          </SubH1>
        )}

        {/* Show pagination only if there are results and more than 1 page */}
        {!isLoading &&
          hasResults &&
          searchedData &&
          searchedData.totalPages > 1 && (
            <div className="flex justify-center mt-8 mb-4">
              <StyledPagination
                count={searchedData.totalPages}
                page={searchedData.page}
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
    </>
  );
}
