"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "../SearchBar";
import { BodyText1, H1, SubH1 } from "../Typography2";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import clsxN from "../../../../utils/clsxN";
import SmoothScrollContainer from "../SmoothScrollContainer";
import { useLenis } from "@/app/contexts/LenisContext";

interface SuggestionItem {
  id: string;
  title: string;
  url: string;
  searchUrl: string;
  highlightedTitle: string;
  snippet: string;
  _category?: string;
}

interface SearchApiResponse {
  query: string;
  suggestions: Record<string, SuggestionItem[]>;
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

function cleanSnippetHtml(snippet: string) {
  return snippet
    .replace(/https?:\/\/\S+/g, "")
    .replace(/<(?!\/?mark\b)[^>]*>/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function SearchResultCard({
  item,
  link,
}: {
  item: SuggestionItem;
  link: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cleanSnippet = item.snippet ? cleanSnippetHtml(item.snippet) : "";

  return (
    <Link
      href={link}
      className={clsxN(
        "duration-800 flex relative items-center justify-between border-b-2 py-4 lg:px-4 border-transparent min-w-full w-full md:w-auto cursor-pointer",
        isHovered
          ? "bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] text-white rounded-lg px-2"
          : "bg-white border-gray-200",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        {item.title && (
          <BodyText1
            className={clsxN(
              "text-sm lg:text-lg font-medium pr-4 capitalize",
              isHovered ? "text-white" : "text-blue-200",
            )}
          >
            {item.title}
          </BodyText1>
        )}
        {cleanSnippet && (
          <p
            className={clsxN(
              "text-xs lg:text-sm line-clamp-2 pr-4 [&_mark]:bg-[#F36633] [&_mark]:text-white [&_mark]:rounded-sm",
              isHovered ? "text-white/80 [&_mark]:bg-white/20" : "text-gray-500",
            )}
            dangerouslySetInnerHTML={{ __html: cleanSnippet }}
          />
        )}
      </div>
      <div className="flex items-center space-x-4 shrink-0">
        <div
          className={clsxN(
            "w-8 h-8 flex items-center justify-center border rounded-[18px] pointer-events-none relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full",
            isHovered
              ? "border-white text-white"
              : "border-orange-800 text-orange-800",
          )}
        >
          <div className="w-[20px] h-[20px] relative overflow-hidden">
            <Image
              src={
                isHovered
                  ? "/images/arrow-up-right-w.svg"
                  : "/images/arrow-up-right-o.svg"
              }
              alt="redirect icon"
              fill
              className={clsxN(
                "absolute transition-transform duration-500 ease-in-out",
                isHovered
                  ? "translate-x-[187.5%] -translate-y-[187.5%]"
                  : "translate-x-0 translate-y-0",
              )}
            />
            <Image
              src="/images/arrow-up-right-w.svg"
              alt="redirect icon secondary"
              fill
              className={clsxN(
                "absolute transition-transform duration-500 ease-in-out",
                isHovered
                  ? "translate-x-0 translate-y-0"
                  : "-translate-x-[187.5%] translate-y-[187.5%]",
              )}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { scrollTo } = useLenis();
  const urlSearchValue = searchParams.get("search") || "";
  const urlPage = parseInt(searchParams.get("page") || "1");

  const [searchValue, setSearchValue] = useState(urlSearchValue);
  const [searchedData, setSearchedData] = useState<SearchApiResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allResults = useMemo(() => {
    if (!searchedData?.suggestions) return [];
    return Object.entries(searchedData.suggestions).flatMap(
      ([category, items]) => items.map((item) => ({ ...item, _category: category })),
    );
  }, [searchedData]);

  const totalResults = allResults.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const currentPage = Math.min(urlPage, totalPages || 1);
  const paginatedResults = allResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const fetchAutocomplete = useCallback(async (query: string) => {
    if (!query.trim() || query.trim().length < 2) {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/search/autocomplete?q=${encodeURIComponent(query)}`,
      );
      const json = await response.json();
      const result = json?.data;
      const words: string[] = Array.isArray(result?.words) ? result.words : [];
      setAutocompleteResults(words);
      setShowAutocomplete(words.length > 0);
    } catch {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    }
  }, []);

  const debouncedAutocomplete = useCallback(
    (query: string) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => fetchAutocomplete(query), 300);
    },
    [fetchAutocomplete],
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAutocompleteSelect = (word: string) => {
    setSearchValue(word);
    setShowAutocomplete(false);
    setAutocompleteResults([]);
    router.push(
      `/search-results?search=${encodeURIComponent(word.trim())}&page=1`,
    );
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setShowAutocomplete(false);
    if (!searchValue.trim()) {
      setSearchedData(null);
      setHasSearched(false);
      router.push("/search-results");
      return;
    }
    router.push(
      `/search-results?search=${encodeURIComponent(searchValue.trim())}&page=1`,
    );
  };

  const getUrl = (item: SuggestionItem) => {
    const rawUrl = item.searchUrl || item.url || "";
    if (!rawUrl) return "/";
    let path = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
    if (item._category === "blogs" && !path.startsWith("/blogs")) {
      path = `/blogs${path}`;
    }
    const query = searchedData?.query || urlSearchValue;
    return query ? `${path}?highlight=${encodeURIComponent(query)}` : path;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setSearchedData(null);
      setHasSearched(false);
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    } else {
      debouncedAutocomplete(value);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    router.push(
      `/search-results?search=${encodeURIComponent(searchValue)}&page=${page}`,
    );
    scrollTo(0, { duration: 0.8 });
  };

  const getSearchedData = async (query: string) => {
    if (!query.trim()) {
      setSearchedData(null);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      setSearchedData(data?.data);
    } catch {
      setSearchedData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (urlSearchValue) {
      setSearchValue(urlSearchValue);
      getSearchedData(urlSearchValue);
      scrollTo(0, { immediate: true });
    } else {
      setSearchedData(null);
      setHasSearched(false);
    }
  }, [urlSearchValue, scrollTo]);

  const hasResults = totalResults > 0;

  return (
    <>
      <div className="flex flex-col gap-4 py-10 md:pb-20 md:pt-30">
        <SubH1 className="text-blue-200 font-medium lg:text-[30px]!">
          Search
        </SubH1>
        <div ref={autocompleteRef} className="relative max-w-full md:max-w-[560px]">
          <SearchBar
            value={searchValue}
            onChange={handleChange}
            handleSearch={handleSearch}
            placeholder="Find products, reports & more"
            headerSearch={true}
            className="border-2 border-[#E1E1E1] !shadow-none max-w-full md:max-w-[560px]"
          />
          {showAutocomplete && autocompleteResults.length > 0 && (
            <SmoothScrollContainer className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E1E1E1] rounded-lg shadow-lg z-50 max-h-[240px] overflow-y-auto scrollbar">
              <ul>
                {autocompleteResults.map((word, idx) => (
                  <li
                    key={`${word}-${idx}`}
                    className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-[#FFF3ED] hover:text-[#F36633] transition-colors"
                    onMouseDown={() => handleAutocompleteSelect(word)}
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </SmoothScrollContainer>
          )}
        </div>

        {hasResults && !isLoading && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-[#F36633] text-sm md:text-base">
              Showing {totalResults} {totalResults === 1 ? "result" : "results"}{" "}
              for &apos;{searchedData?.query}&apos;
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 pb-20">
        {isLoading && (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-gray-200 py-4 lg:px-4 animate-pulse"
              >
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="h-5 w-2/5 bg-gray-200 rounded" />
                  <div className="h-3.5 w-4/5 bg-gray-100 rounded" />
                  <div className="h-3.5 w-3/5 bg-gray-100 rounded" />
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
              </div>
            ))}
          </div>
        )}

        {!isLoading &&
          hasResults &&
          paginatedResults.map((item) => (
            <SearchResultCard
              key={item.id}
              item={item}
              link={getUrl(item)}
            />
          ))}

        {!isLoading && hasSearched && !hasResults && (
          <H1
            className="text-center w-full py-10 text-[20px] md:text-[24px] xl:text-[30px] leading-[140%]"
          >
            No results found for &apos;{searchValue}&apos;.
          </H1>
        )}

        {/* Show pagination only if there are results and more than 1 page */}
        {!isLoading && hasResults && totalPages > 1 && (
          <div className="flex justify-center mt-8 mb-4">
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
    </>
  );
}
