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
  const committees = [
    {
      committee: "Audit Committee",
      members: [
        {
          name: "Ashok Kumar Barat",
          role1: "Independent Director",
          role2: null,
        },
        {
          name: "Rajendra Vallabhaji Gogri",
          role1: "Chairman and Managing Director",
          role2: null,
        },
        {
          name: "Rashesh Chandrakant Gogri",
          role1: "Vice Chairman and Managing Director",
          role2: null,
        },
        {
          name: "Lalitkumar Shantaram Naik",
          role1: "Independent Director",
          role2: null,
        },
        {
          name: "Shekhar Shreedhar Khanolkar",
          role1: "Independent Director",
          role2: null,
        },
        {
          name: "Nikhil Jaysinh Bhatia",
          role1: "Independent Director",
          role2: null,
        },
      ],
    },
    {
      committee: "Nomination & Remuneration Committee",
      members: [
        {
          name: "Aniruddha Bhalchandra Pandit",
          role1: "Independent Director",
          role2: null,
        },
        {
          name: "Rajendra Gogri",
          role1: "Chairman and Managing Director",
          role2: null,
        },
        {
          name: "Belur Krishna Murthy Sethuram",
          role1: "Independent Director",
          role2: null,
        },
        {
          name: "Rupa Devi Singh",
          role1: "Independent Director",
          role2: null,
        },
      ],
    },
    {
      committee: "CSR Committee",
      members: [
        {
          name: "Hetal Gogri Gala",
          role1: "Non-Executive and Non-Independent Director",
          role2: null,
        },
        {
          name: "Rupa Devi Singh",
          role1: "Independent Director",
          role2: null,
        },
        {
          name: "Ajay Kumar Gupta",
          role1: "Executive Director and CMO",
          role2: null,
        },
      ],
    },
    {
      committee: "Stakeholders’ Relationship Committee",
      members: [
        {
          name: "Hetal Gogri Gala",
          role1: "Non-Executive and Non-Independent Director",
          role2: null,
        },
        {
          name: "Aniruddha Bhalchandra Pandit",
          role1: "Independent Director",
          role2: null,
        },
        {
          name: "Rajendra Vallabhaji Gogri",
          role1: "Chairman and Managing Director",
          role2: null,
        },
        {
          name: "Rashesh Chandrakant Gogri",
          role1: "Vice Chairman and Managing Director",
          role2: null,
        },
        {
          name: "Manoj Mulji Chheda",
          role1: "Executive Directors",
          role2: null,
        },
      ],
    },
    {
      committee: "Risk Management Committee",
      members: [
        {
          name: "Rajendra Vallabhaji Gogri",
          role1: "Chairman and Managing Director",
          role2: null,
        },
        {
          name: "Rashesh Chandrakant Gogri",
          role1: "Vice Chairman and Managing Director",
          role2: null,
        },
        {
          name: "Hetal Gogri Gala",
          role1: "Non-Executive and Non-Independent Director",
          role2: null,
        },
        {
          name: "Renil Rajendra Gogri",
          role1: "Vice Chairman and Executive Director",
          role2: null,
        },
        {
          name: "Suyog Kalyanji Kotecha",
          role1: "CEO and Executive Director",
          role2: null,
        },
        {
          name: "Belur Krishna Murthy Sethuram",
          role1: "Independent Director",
          role2: null,
        },
        {
          name: "Ajay Kumar Gupta",
          role1: "Executive Director and CMO",
          role2: null,
        },
        {
          name: "Manoj Mulji Chheda",
          role1: "Executive Directors",
          role2: null,
        },
      ],
    },
    {
      committee: "Finance & Investment Committee",
      members: [
        {
          name: "Rajendra Vallabhaji Gogri",
          role1: "Chairman and Managing Director",
          role2: null,
        },
        {
          name: "Rashesh Chandrakant Gogri",
          role1: "Vice Chairman and Managing Director",
          role2: null,
        },
        {
          name: "Renil Rajendra Gogri",
          role1: "Vice Chairman and Executive Director",
          role2: null,
        },
        {
          name: "Manoj Mulji Chheda",
          role1: "Executive Directors",
          role2: null,
        },
        {
          name: "Suyog Kalyanji Kotecha",
          role1: "CEO and Executive Director",
          role2: null,
        },
        {
          name: "Ajay Kumar Gupta",
          role1: "Executive Director and CMO",
          role2: null,
        },
        {
          name: "Hetal Gogri Gala",
          role1: "Non-Executive and Non-Independent Director",
          role2: null,
        },
      ],
    },
  ];

  // Transform data structure to match MeetMinds component expectations
  const tabs = [
    {
      category: data?.independentDirectors?.title || "Independent Directors",
      meetMindsData: {
        sectionTitle:
          data?.independentDirectors?.title || "Independent Directors",
        management_boards:
          data?.independentDirectors?.independent_directors?.map((item) => ({
            ...item,
            id: String(item.id), // Ensure id exists
          })) || [],
      },
    },
    {
      category: data?.committee?.title || "Committees",
      meetMindsData: {
        sectionTitle: data?.committee?.title || "Committees",
        management_boards:
          data?.committee?.committees?.map((item) => ({
            ...item,
            id: String(item.id), // Ensure id exists
          })) || [],
      },
    },
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
          tabs?.[active] && (
            <MeetMinds
              data={tabs[active]?.meetMindsData}
              hideTitle={true}
              progressClassName="leader-section-swiper-2"
              navigationNextClass="swiper-button-next-leaderSection-2"
              navigationPrevClass="swiper-button-prev-leaderSection-2"
            />
          )
        ) : (
          <div className="fluid-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mt-10 pb-[52px] lg:pb-[140px]">
            {committees?.map((item, index) => (
              <div
                key={"committee_" + index}
                className="border-[1px] bg-[#EFF3F5] border-grey-200 rounded-[20px] p-4 md:p-6"
              >
                <BodyText1 className="text-[#002F50] text-[16px] xl:text-[18px]">
                  {item?.committee}
                </BodyText1>

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
                        {member?.role1 && (
                          <BodyText3 className="py-1 text-[#9997A2]">
                            {member?.role1}{" "}
                            {member?.role2 && <span>,</span>}{" "}
                          </BodyText3>
                        )}

                        {member?.role2 && (
                          <BodyText3 className="text-[#9997A2]">
                            {member?.role2}
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
