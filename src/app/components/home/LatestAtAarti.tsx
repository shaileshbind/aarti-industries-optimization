"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { H2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import DateCard from "../cards/DateCard";
import { LatestAtAartiProps, ButtonHomeProps } from "@/app/types/home.type";
import { ButtonProps, ImageProps } from "@/app/types/global.type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatDate } from "../../../../utils/formatDate";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";
import { fetchNews } from "@/_lib/fetchNews";

gsap.registerPlugin(ScrollTrigger);

type PostContent = {
  id?: string;
  description?: string;
  newsDescription?: string;
  date?: string;
  link?: string;
  image?: ImageProps;
  mobImage?: ImageProps;
  ctaButton?: ButtonProps;
};

type NormalizedCard = {
  id?: number | string;
  type?: "news" | "reports" | "events";
  category?: string;
  postContent?: PostContent[];
  ctaButton?: ButtonProps;
};

const LatestAtAarti: React.FC<LatestAtAartiProps> = ({ data }) => {
  const { sectionTitle, card } = data;
  const toArray = <T,>(value?: T | T[]) =>
    Array.isArray(value) ? value : value ? [value] : [];
  const resolveLink = (button?: ButtonHomeProps | ButtonProps) =>
    button?.hasExternalLink === "true"
      ? button?.externalLink
      : button?.link?.link;
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
        card?.report_and_publication && {
          id: card.report_and_publication.id ?? "reports",
          type: "reports",
          category: card.report_and_publication.category ?? "Reports",
          postContent: toArray(
            card.report_and_publication.reports_and_publications,
          ).map((item) => ({
            ...item,
            link: resolveLink(item.ctaButton),
          })),
          ctaButton: card.report_and_publication.ctaButton,
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
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [, setIsMobile] = useState<boolean>(false);
  const [eventsFeedData, setEventsFeedData] = useState<unknown>(null);
  const hasFetchedEventsFeed = useRef(false);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const missingTabs = {
    news: toArray(card?.news?.news).length === 0,
    reports:
      toArray(card?.report_and_publication?.reports_and_publications).length ===
      0,
    events: toArray(card?.events?.events).length === 0,
  };
  const shouldFetchEventsFeed =
    !card || missingTabs.news || missingTabs.reports || missingTabs.events;

  const getFallbackPostContent = (
    feedData: unknown,
    type?: NormalizedCard["type"],
  ): PostContent[] => {
    if (!feedData || !type) return [];
    const data = feedData as Record<string, unknown>;
    const root = (data.data ?? data) as Record<string, unknown>;
    const raw =
      type === "news"
        ? root.news ?? root.news_and_media ?? root.newsAndMedia
        : type === "reports"
          ? root.reports ??
            root.reports_and_publications ??
            root.report_and_publication
          : root.events ?? root.events_and_exhibitions;
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
    const reportsPosts = getFallbackPostContent(feedData, "reports");
    const eventsPosts = getFallbackPostContent(feedData, "events");
    return [
      newsPosts.length > 0 && {
        id: "news",
        type: "news",
        category: "News",
        postContent: newsPosts,
      },
      reportsPosts.length > 0 && {
        id: "reports",
        type: "reports",
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

  const fallbackCards = eventsFeedData
    ? buildFallbackCards(eventsFeedData)
    : [];

  const displayCards = (() => {
    if (cards.length === 0) return fallbackCards;

    const updated = cards.map((item) => {
      const needsFallback =
        (item.type === "news" && missingTabs.news) ||
        (item.type === "reports" && missingTabs.reports) ||
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
        (fallback.type === "reports" && missingTabs.reports) ||
        (fallback.type === "events" && missingTabs.events);
      if (needsFallback && !hasType.has(fallback.type)) {
        updated.push(fallback);
      }
    });

    return updated;
  })();

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!shouldFetchEventsFeed || eventsFeedData || hasFetchedEventsFeed.current) {
      return;
    }
    const eventsFeedUrl = "/api/events/feed";
    const fetchEventsFeed = async () => {
      hasFetchedEventsFeed.current = true;
      const data = await fetchNews(eventsFeedUrl);
      setEventsFeedData(data);
    };
    fetchEventsFeed();
  }, [shouldFetchEventsFeed, eventsFeedData, missingTabs]);

  useEffect(() => {
    let tabsAnim: gsap.core.Tween | undefined;
    if (latestAtAartiRef.current) {
      tabsAnim = gsap.fromTo(
        latestAtAartiRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
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

  const handleTabClick = (index: number) => {
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
  };

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
  const currentCard = displayCards[activeTab];
  const postsContent: PostContent[] = Array.isArray(currentCard?.postContent)
    ? currentCard.postContent
    : currentCard?.postContent
      ? [currentCard.postContent]
      : [];
  const postsCount = postsContent.length;
 
  return (
    <div className="w-full my-24 lg:my-[100px]" ref={latestAtAartiRef}>
      <FadeInReveal delay={0.6}>
        <div className="flex justify-between gap-6 items-center px-[20px] lg:px-[60px]">
          {sectionTitle && (
            <div className="max-w-[100%] md:max-w-fit">
              <H2 className="text-blue-200">{sectionTitle}</H2>
            </div>
          )}

        </div>
      </FadeInReveal>

      <div className="mt-[18px] md:mt-[30px] w-full ">
        {hasCards && (
          <FadeInReveal delay={0.6}>
            <div className="px-[20px] lg:px-[60px]">
              <div className="flex items-center justify-between gap-6">
                <div className="max-w-[100%] md:max-w-fit overflow-x-auto">
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
                          <div
                            key={`${item.id ?? item.category ?? "tab"}-${index}`}
                            ref={(el) => {
                              if (el) {
                                tabRefs.current[index] = el;
                              }
                            }}
                            onClick={() => handleTabClick(index)}
                            className={`text-grey-400 cursor-pointer  md:text-[14px] text-[12px] font-alte-hans py-[10px]  md:px-[24px] px-[12px] rounded-[40px] relative z-10 transition-all ${
                              activeTab === index
                                ? "text-white"
                                : "hover:bg-grey-200"
                            }`}
                          >
                            {item.category}
                          </div>
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
          <FadeInReveal delay={0.6}>
            <div className="mt-[52px]" ref={cardsWrapRef}>
              <Swiper
                key={activeTab}
                spaceBetween={24}
                slidesPerView={1.5}
                breakpoints={{
                  1024: { slidesPerView: 4 },
                  600: { slidesPerView: 2.2 },
                }}
                modules={[Pagination, Mousewheel]}
                direction="horizontal"
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true,
                }}
                pagination={{
                  el: ".home-latest-at-swiper",
                  type: "progressbar",
                }}
                className=" w-full !px-[20px] lg:!px-[60px]"
              >
                {postsContent.map((item, index) => (
                  <SwiperSlide key={item?.id || index}>
                    <div className="date-card-anim">
                      <DateCard
                        imageSrc={item?.image?.url}
                        date={formatDate(item?.date || "")}
                        desc={item?.description}
                        link={item?.link}
                        animate={Boolean(item?.link)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="relative h-[1px] mx-[20px] lg:mx-[60px] mt-[30px]">
              <div className="home-latest-at-swiper !pb-0 absolute inset-0 !h-[1.5px]" />
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
              useTargetBlank={currentCard?.ctaButton?.hasExternalLink === "true"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestAtAarti;
