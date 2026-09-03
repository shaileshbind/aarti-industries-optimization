"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { H2 } from "../Typography2";
// import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/pagination";
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";
import DateCard from "../cards/DateCard";
import { LatestAtAartiProps, ButtonHomeProps } from "@/app/types/home.type";
import { ButtonProps, ImageProps } from "@/app/types/global.type";
import gsap from "gsap";
import { formatDate } from "../../../../utils/formatDate";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";
import { fetchNews } from "@/_lib/fetchNews";
import { useLenis } from "@/app/contexts/LenisContext";
import type { Swiper as SwiperType } from "swiper";

type PostContent = {
  id?: string | number;
  description?: string;
  newsDescription?: string;
  date?: string;
  end_date?: string;
  link?: string;
  image?: ImageProps;
  mobImage?: ImageProps;
  ctaButton?: ButtonProps;
};

type ReportItem = {
  id?: number | string;
  heading?: string;
  description?: string;
  date?: string;
  link?: string;
  thumbnailImageDesktop?: ImageProps;
  file?: { url?: string };
};

type ReportLayout = {
  reports?: ReportItem[];
};

type AnnualReportBlock = {
  reportLayout?: {
    reports?: ReportItem[];
  }[];
};

type ReportContainer = {
  reportLayout?: ReportLayout[];
  annual_reports?: AnnualReportBlock | AnnualReportBlock[];
};

type NormalizedCard = {
  id?: number | string;
  type?: "news" | "annualReports" | "events";
  category?: string;
  postContent?: PostContent[];
  ctaButton?: ButtonProps;
};

const TabButton = React.memo(function TabButton({
  active,
  label,
  onClick,
  tabRef,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  tabRef?: (node: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={tabRef}
      onClick={onClick}
      className={`text-grey-400 cursor-pointer  md:text-[14px] text-[12px] font-alte-hans py-[10px]  md:px-[24px] px-[12px] rounded-[40px] relative z-10 transition-all ${
        active ? "text-white" : "hover:bg-grey-200"
      }`}
    >
      {label}
    </div>
  );
});

const SliderCard = React.memo(function SliderCard({
  item,
  currentCardType,
  dateText,
}: {
  item: PostContent;
  currentCardType?: NormalizedCard["type"];
  dateText: string;
}) {
  return (
    <div className="date-card-anim">
      <DateCard
        imageSrc={item?.image?.url}
        date={dateText}
        desc={item?.description}
        link={item?.link}
        animate={Boolean(item?.link)}
        showStatusTag={currentCardType === "events"}
      />
    </div>
  );
});

const LatestAtAarti: React.FC<LatestAtAartiProps> = ({ data }) => {
  const { sectionTitle, card } = data;
  const isDesktopPointer = useMatchMedia("(pointer: fine)");
  const { stopLenis, startLenis } = useLenis();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lenisStoppedRef = useRef(false);

  const handleSliderTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleSliderTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current || lenisStoppedRef.current) return;
      const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
      if (dx > dy && dx > 10) {
        stopLenis();
        lenisStoppedRef.current = true;
      }
    },
    [stopLenis],
  );

  const handleSliderTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    if (lenisStoppedRef.current) {
      startLenis();
      lenisStoppedRef.current = false;
    }
  }, [startLenis]);
  const toArray = <T,>(value?: T | T[]) =>
    Array.isArray(value) ? value : value ? [value] : [];
  const resolveLink = (button?: ButtonHomeProps | ButtonProps) =>
    button?.hasExternalLink === "true"
      ? button?.externalLink
      : button?.link?.link;

  const mapReportToPostContent = (report: ReportItem): PostContent => ({
    id: report?.id,
    description: report?.heading,
    date: report?.date,
    link: report?.link ?? report?.file?.url,
    image: report?.thumbnailImageDesktop,
  });

  const normalizeReports = (
    reportsAndPublications?: ReportContainer[] | ReportContainer,
  ): PostContent[] => {
    const containers = toArray(reportsAndPublications);
    const fromAnnualReports = containers.flatMap((container) =>
      toArray(container?.annual_reports).flatMap((annualReportBlock) =>
        toArray(annualReportBlock?.reportLayout).flatMap((layout) =>
          toArray(layout?.reports).map(mapReportToPostContent),
        ),
      ),
    );
    if (fromAnnualReports.length > 0) return fromAnnualReports.slice(0, 4);
    const fromLayouts = containers.flatMap((container) =>
      toArray(container?.reportLayout).flatMap((layout) =>
        toArray(layout?.reports).map(mapReportToPostContent),
      ),
    );
    return fromLayouts.length > 0 ? fromLayouts.slice(0, 4) : [];
  };

  const reportPub = card?.report_and_publication;
  const reportPubRoot = Array.isArray(reportPub) ? reportPub[0] : reportPub;
  const sectionNineRaw = (() => {
    if (
      reportPubRoot &&
      "reports_and_publications" in reportPubRoot &&
      reportPubRoot.reports_and_publications
    )
      return reportPubRoot.reports_and_publications;
    if (Array.isArray(reportPub)) return reportPub;
    return reportPub ?? undefined;
  })();
  const fromSectionNine = normalizeReports(
    sectionNineRaw as ReportContainer | ReportContainer[] | undefined,
  );
  const dataRoot = data as Record<string, unknown>;
  const apiAnnualReports =
    data?.annualReports ??
    (dataRoot?.data && typeof dataRoot.data === "object"
      ? (dataRoot.data as Record<string, unknown>)?.annualReports
      : undefined);
  const rawReportsData =
    fromSectionNine.length > 0
      ? sectionNineRaw
      : toArray(apiAnnualReports).length > 0
        ? (toArray(apiAnnualReports) as ReportContainer[])
        : sectionNineRaw;

  const reportsPostContent = normalizeReports(
    rawReportsData as ReportContainer | ReportContainer[] | undefined,
  );

  const cards: NormalizedCard[] = Array.isArray(card)
    ? (card as NormalizedCard[])
    : ([
        card?.news && {
          id: card.news.id ?? "news",
          type: "news",
          category: card.news.category ?? "News",
          postContent: toArray(card.news.news).map((item) => ({
            ...item,
            description: item.newsDescription,
            link: resolveLink(item.ctaButton),
          })),
          ctaButton: card.news.ctaButton,
        },
        reportPub && {
          id: reportPubRoot?.id ?? "annualReports",
          type: "annualReports",
          category: reportPubRoot?.category ?? "Reports",
          postContent: reportsPostContent,
          ctaButton: reportPubRoot?.ctaButton,
        },
        card?.events && {
          id: card.events.id ?? "events",
          type: "events",
          category: card.events.category ?? "Events",
          postContent: toArray(card.events.events).map((item) => ({
            ...item,
            link: resolveLink(item.ctaButton),
          })),
          ctaButton: card.events.ctaButton,
        },
      ].filter(Boolean) as NormalizedCard[]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const latestAtAartiRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  // const [, setIsMobile] = useState<boolean>(false);
  // Deliberately fetched client-side at idle: embedding this feed in the RSC
  // payload was tried and added +14KB gzipped to the critical HTML.
  const [eventsFeedData, setEventsFeedData] = useState<unknown>(null);
  const hasFetchedEventsFeed = useRef(false);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const missingTabs = useMemo(
    () => ({
      news: toArray(card?.news?.news).length === 0,
      reports: reportsPostContent.length === 0,
      events: toArray(card?.events?.events).length === 0,
    }),
    [card, reportsPostContent.length],
  );
  const shouldFetchEventsFeed = useMemo(
    () =>
      !card || missingTabs.news || missingTabs.reports || missingTabs.events,
    [card, missingTabs],
  );

  const getFallbackPostContent = (
    feedData: unknown,
    type?: NormalizedCard["type"],
  ): PostContent[] => {
    if (!feedData || !type) return [];
    const data = feedData as Record<string, unknown>;
    const root = (data.data ?? data) as Record<string, unknown>;
    const raw =
      type === "news"
        ? (root.news ?? root.news_and_media ?? root.newsAndMedia)
        : type === "annualReports"
          ? (root.annualReports ??
            root.annual_reports ??
            root.reports_and_publications ??
            root.report_and_publication)
          : (root.events ?? root.events_and_exhibitions);
    if (type === "annualReports") {
      return normalizeReports(raw as ReportContainer | ReportContainer[]);
    }
    const items = toArray(raw as PostContent | PostContent[]);
    return items.map((item) => {
      if (type === "news") {
        const newsDescription = item.newsDescription;
        return {
          ...item,
          newsDescription,
          description: newsDescription,
          link: item.link ?? resolveLink(item.ctaButton),
        };
      }
      return {
        ...item,
        description: item.description,
        link: item.link ?? resolveLink(item.ctaButton),
      };
    });
  };

  const buildFallbackCards = (feedData: unknown): NormalizedCard[] => {
    const newsPosts = getFallbackPostContent(feedData, "news");
    const reportsPosts = getFallbackPostContent(feedData, "annualReports");
    const eventsPosts = getFallbackPostContent(feedData, "events");
    return [
      newsPosts.length > 0 && {
        id: "news",
        type: "news",
        category: "News",
        postContent: newsPosts,
      },
      reportsPosts.length > 0 && {
        id: "annualReports",
        type: "annualReports",
        category: "Reports",
        postContent: reportsPosts,
      },
      eventsPosts.length > 0 && {
        id: "events",
        type: "events",
        category: "Events",
        postContent: eventsPosts,
      },
    ].filter(Boolean) as NormalizedCard[];
  };

  const fallbackCards = useMemo(
    () => (eventsFeedData ? buildFallbackCards(eventsFeedData) : []),
    [eventsFeedData],
  );

  const displayCards = useMemo(() => {
    if (cards.length === 0) return fallbackCards;

    const updated = cards.map((item) => {
      const needsFallback =
        (item.type === "news" && missingTabs.news) ||
        (item.type === "annualReports" && missingTabs.reports) ||
        (item.type === "events" && missingTabs.events);
      if (!needsFallback) return item;
      const fallbackPostContent = getFallbackPostContent(
        eventsFeedData,
        item.type,
      );
      return fallbackPostContent.length > 0
        ? { ...item, postContent: fallbackPostContent }
        : item;
    });

    const hasType = new Set(updated.map((item) => item.type));
    fallbackCards.forEach((fallback) => {
      if (!fallback.type) return;
      const needsFallback =
        (fallback.type === "news" && missingTabs.news) ||
        (fallback.type === "annualReports" && missingTabs.reports) ||
        (fallback.type === "events" && missingTabs.events);
      if (needsFallback && !hasType.has(fallback.type)) {
        updated.push(fallback);
      }
    });

    return updated;
  }, [cards, fallbackCards, eventsFeedData, missingTabs]);

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
    if (activeTab >= displayCards.length && displayCards.length > 0) {
      setActiveTab(0);
    }
  }, [activeTab, displayCards.length]);

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth < 1024);
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (
      !shouldFetchEventsFeed ||
      eventsFeedData ||
      hasFetchedEventsFeed.current
    ) {
      return;
    }
    const eventsFeedUrl = "/api/events/feed";
    const fetchEventsFeed = async () => {
      hasFetchedEventsFeed.current = true;
      const data = await fetchNews(eventsFeedUrl);
      setEventsFeedData(data);
    };
    // This section sits far below the fold, but the fetch fired during
    // hydration and pulled ~148KB at High priority while the hero was still
    // painting. Defer to an idle slot.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => fetchEventsFeed(), { timeout: 3000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(fetchEventsFeed, 1500);
    return () => clearTimeout(t);
  }, [shouldFetchEventsFeed, eventsFeedData, missingTabs]);

  useEffect(() => {
    let tabsAnim: gsap.core.Tween | undefined;
    if (latestAtAartiRef.current) {
      tabsAnim = gsap.fromTo(
        latestAtAartiRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: latestAtAartiRef.current,
            start: "top 87%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    return () => {
      if (tabsAnim && tabsAnim.scrollTrigger) tabsAnim.scrollTrigger.kill();
      if (tabsAnim) tabsAnim.kill();
    };
  }, []);

  const startAutoplayIfInView = useCallback(() => {
    const swiper = swiperRef.current;
    const section = latestAtAartiRef.current;
    if (!swiper?.autoplay || !section) return;
    const rect = section.getBoundingClientRect();
    const isInViewport =
      rect.top < window.innerHeight * 0.8 &&
      rect.bottom > window.innerHeight * 0.2;
    if (isInViewport && !swiper.autoplay.running) swiper.autoplay.start();
  }, []);

  // Intersection Observer: start/stop autoplay by visibility. Read swiper from ref so it works after mount.
  useEffect(() => {
    const section = latestAtAartiRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const swiper = swiperRef.current;
        if (!swiper?.autoplay) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!swiper.autoplay.running) swiper.autoplay.start();
          } else {
            if (swiper.autoplay.running) swiper.autoplay.stop();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // When tab changes, Swiper remounts (new key). Start autoplay if section is still in view.
  useEffect(() => {
    const id = requestAnimationFrame(() => startAutoplayIfInView());
    return () => cancelAnimationFrame(id);
  }, [activeTab, startAutoplayIfInView]);

  const handleTabClick = useCallback((index: number) => {
    if (!cardsWrapRef.current) {
      setActiveTab(index);
      return;
    }

    const cards = cardsWrapRef.current.querySelectorAll(".date-card-anim");
    if (!cards || cards.length === 0) {
      setActiveTab(index);
      return;
    }

    if (switchAnimRef.current) {
      switchAnimRef.current.kill();
      switchAnimRef.current = null;
    }

    gsap.set(cards, { transformOrigin: "50% 50%" });
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => {
        setActiveTab(index);
      },
    });
    tl.to(cards, { translateY: "100%", duration: 0.2, stagger: 0.05 });
    switchAnimRef.current = tl;
  }, []);

  useEffect(() => {
    if (!cardsWrapRef.current) return;
    const cards = cardsWrapRef.current.querySelectorAll(".date-card-anim");
    if (!cards || cards.length === 0) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    gsap.set(cards, { transformOrigin: "50% 50%", translateY: "100%" });
    tl.to(cards, { translateY: "0%", duration: 0.3, stagger: 0.05 });

    return () => {
      tl.kill();
    };
  }, [activeTab]);

  const hasCards = displayCards.length > 0;
  if (!sectionTitle && !hasCards) {
    return null;
  }
  const currentCard = useMemo(
    () => displayCards[activeTab],
    [activeTab, displayCards],
  );
  const postsContent = useMemo<PostContent[]>(() => {
    if (Array.isArray(currentCard?.postContent)) {
      return currentCard.postContent;
    }
    return currentCard?.postContent ? [currentCard.postContent] : [];
  }, [currentCard]);
  const postsCount = postsContent.length;

  return (
    <div className="w-full my-24 lg:my-[100px]" ref={latestAtAartiRef}>
      <FadeInReveal>
        <div className="flex justify-between gap-6 items-center px-[20px] lg:px-[60px]">
          {sectionTitle && (
            <div className="max-w-full md:max-w-fit">
              <H2 className="text-blue-200">{sectionTitle}</H2>
            </div>
          )}
        </div>
      </FadeInReveal>

      <div className="mt-[18px] md:mt-[30px] w-full ">
        {hasCards && (
          <FadeInReveal>
            <div className="px-[20px] lg:px-[60px]">
              <div className="flex items-center justify-between gap-6">
                <div className="max-w-full md:max-w-fit overflow-x-auto">
                  <div className=" w-full ">
                    <div className="relative bg-grey-100 rounded-[40px] p-[4px]  whitespace-nowrap w-fit">
                      <div
                        ref={containerRef}
                        className="relative flex gap-x-[5px] md:gap-x-[10px] z-10 px-1 w-max"
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
                        {displayCards.map((item, index) => (
                          <TabButton
                            key={`${item.id ?? item.category ?? "tab"}-${index}`}
                            active={activeTab === index}
                            label={item.category ?? ""}
                            onClick={() => handleTabClick(index)}
                            tabRef={(el) => {
                              tabRefs.current[index] = el;
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {hasCards &&
                  (currentCard?.ctaButton?.externalLink ||
                    currentCard?.ctaButton?.link?.link) && (
                    <div className="hidden lg:block">
                      <Button
                        title={currentCard?.ctaButton?.title ?? ""}
                        href={
                          currentCard?.ctaButton?.hasExternalLink == "true"
                            ? currentCard?.ctaButton?.externalLink
                            : currentCard?.ctaButton?.link?.link
                        }
                        useTargetBlank={
                          currentCard?.ctaButton?.hasExternalLink === "true"
                        }
                      />
                    </div>
                  )}
              </div>
            </div>
          </FadeInReveal>
        )}
        {postsCount > 0 && (
          <FadeInReveal>
            <div
              className="mt-[52px]"
              ref={cardsWrapRef}
              onTouchStart={handleSliderTouchStart}
              onTouchMove={handleSliderTouchMove}
              onTouchEnd={handleSliderTouchEnd}
            >
              <Swiper
                key={`${activeTab}-${isDesktopPointer}`}
                spaceBetween={24}
                slidesPerView={1.5}
                breakpoints={{
                  1024: { slidesPerView: 4 },
                  600: { slidesPerView: 2.2 },
                }}
                modules={[
                  Pagination,
                  Autoplay,
                  ...(isDesktopPointer ? [Mousewheel] : []),
                ]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  if (swiper.autoplay) swiper.autoplay.stop();
                }}
                direction="horizontal"
                {...(isDesktopPointer && {
                  mousewheel: {
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                  },
                })}
                pagination={{
                  el: ".home-latest-at-swiper",
                  type: "progressbar",
                }}
                className=" w-full px-[20px]! lg:px-[60px]!"
              >
                {postsContent.map((item, index) => {
                  const dateText = item?.end_date
                    ? `${item?.date ? formatDate(item?.date) : ""} - ${formatDate(item?.end_date)}`
                    : item?.date
                      ? formatDate(item?.date)
                      : "";

                  return (
                    <SwiperSlide key={item?.id || index}>
                      <SliderCard
                        item={item}
                        currentCardType={currentCard?.type}
                        dateText={dateText}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="relative h-px mx-[20px] lg:mx-[60px] mt-[30px]">
              <div className="home-latest-at-swiper pb-0! absolute inset-0 h-[1.5px]!" />
            </div>
          </FadeInReveal>
        )}

        {hasCards &&
          (currentCard?.ctaButton?.externalLink ||
            currentCard?.ctaButton?.link?.link) && (
            <div className="flex lg:hidden justify-center mt-10">
              <Button
                title={currentCard?.ctaButton?.title ?? ""}
                href={
                  currentCard?.ctaButton?.hasExternalLink == "true"
                    ? currentCard?.ctaButton?.externalLink
                    : currentCard?.ctaButton?.link?.link
                }
                useTargetBlank={
                  currentCard?.ctaButton?.hasExternalLink === "true"
                }
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default LatestAtAarti;
