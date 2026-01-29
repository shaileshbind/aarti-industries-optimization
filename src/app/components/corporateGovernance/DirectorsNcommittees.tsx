"use client";
import React, { useState, useRef, useEffect } from "react";
import { BodyText1, BodyText2, BodyText3, H2 } from "../Typography2";
import { IndependentDirectorsProps } from "@/app/types/corporate-governance.type";
import MeetMinds from "../sections/MeetMinds";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DirectorsNcommittees: React.FC<IndependentDirectorsProps> = ({
  data,
}) => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const switchAnimRef = useRef<gsap.core.Timeline | null>(null);

  // Transform data structure to match MeetMinds component expectations
  const tabs = [
    {
      category: data?.independentDirectors?.title || "Independent Directors",
      meetMindsData: {
        sectionTitle:
          data?.independentDirectors?.title || "Independent Directors",
        management_boards:
          data?.independentDirectors?.independent_directors?.map((item) => ({
            id: String(item?.id ?? ""),
            name: item?.name ?? "",
            designation: item?.designation ?? "",
            image: {
              url: item?.image?.url ?? "",
              alternativeText: item?.image?.alternativeText ?? "",
            },
            bio: item?.bio ?? "",
          })) ?? [],
      },
    },
    ...(data?.committee && data?.committee.length > 0
      ? [
          {
            category: "Committees",
          },
        ]
      : []),
  ];

  const handleTabClick = (index: number) => {
    if (index === active || isTransitioning) return;

    setIsTransitioning(true);

    // If no content container yet, switch immediately
    if (!contentRef.current) {
      setActive(index);
      setIsTransitioning(false);
      return;
    }

    const content = contentRef.current;

    // Kill previous switch animation if running
    if (switchAnimRef.current) {
      switchAnimRef.current.kill();
      switchAnimRef.current = null;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => {
        // After old content fades out, change data
        setActive(index);
      },
    });

    // Fade out content
    if (content) {
      tl.to(content, { opacity: 0, duration: 0.2 }, 0);
    }

    switchAnimRef.current = tl;
  };

  // Reset active tab if second tab is removed
  useEffect(() => {
    if (active >= tabs.length) {
      setActive(0);
    }
  }, [tabs.length, active]);

  // Animate tabs on mount
  useEffect(() => {
    let tabsAnim: gsap.core.Tween | undefined;
    if (tabsRef.current) {
      tabsAnim = gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: tabsRef.current,
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

  // Animate content fade in when active changes
  useEffect(() => {
    const content = contentRef.current;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Fade in content
    if (content) {
      gsap.set(content, { opacity: 0 });
      tl.to(content, { opacity: 1, duration: 0.3 }, 0);
    }

    tl.eventCallback("onComplete", () => {
      setIsTransitioning(false);
    });

    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="w-full mx-auto pt-[72px] lg:pt-30 pb-5">
      <div
        ref={tabsRef}
        className="flex gap-6 md:gap-[50px] md:flex-row items-center px-5 lg:px-[60px]"
      >
        {tabs?.map((item, index) => (
          <div
            key={"tab_" + index}
            onClick={() => handleTabClick(index)}
            className={`text-grey-300 font-alte-hans leading-[136%] text-base md:text-[24px] lg:text-[44px] cursor-pointer transition-all duration-600 ease-out hover:text-orange-200/70 ${
              isTransitioning ? "pointer-events-none" : ""
            }`}
          >
            <H2
              className={`text-[20px] md:text-[36px] xl:text-[44px] ${
                active === index ? "text-[#002F50]" : "text-[#9997A2]"
              }`}
            >
              {item?.category}
            </H2>
          </div>
        ))}
      </div>
      <div ref={contentRef}>
        {active === 0 ? (
          tabs?.[active]?.meetMindsData && (
            <MeetMinds
              data={tabs[active].meetMindsData}
              hideTitle={true}
              progressClassName="leader-section-swiper-2"
              navigationNextClass="swiper-button-next-leaderSection-2"
              navigationPrevClass="swiper-button-prev-leaderSection-2"
            />
          )
        ) : (
          <div className="fluid-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mt-10 pb-[52px] lg:pb-[140px]">
            {data?.committee?.map((item, index) => (
              <div
                key={"committee_" + index}
                className="border-[1px] bg-[#EFF3F5] border-grey-200 rounded-[20px] p-4 md:p-6"
              >
                {item?.committeenName && (
                  <BodyText1 className="text-[#002F50] text-[16px] xl:text-[18px]">
                    {item?.committeenName}
                  </BodyText1>
                )}
                <div className="w-8 h-[2px] bg-[#DC4C03] mt-1 mb-6 md:mb-8"></div>
                <div className="flex flex-col gap-3">
                  {item?.members?.map((member, idx) => (
                    <div key={"member_" + idx}>
                      {member?.name && (
                        <BodyText2 className="text-[#002F50]">
                          {member?.name}
                        </BodyText2>
                      )}
                      <div>
                        {member?.designation && (
                          <BodyText3 className="py-1 text-[#9997A2]">
                            {member?.designation}
                          </BodyText3>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorsNcommittees;
