"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BodyText2, H2, SubH2, SubH3 } from "../Typography2";
import { AILRoadmapData } from "@/app/types/sustainability.type";

gsap.registerPlugin(ScrollTrigger);

const AILRoadmap = ({ data }: AILRoadmapData) => {
  const { sectionTitle, leftSection, rightSection } = data;
  const [active, setActive] = useState(0);

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const gsapContextRef = useRef<gsap.Context | null>(null);
  const prevIndexRef = useRef(0);

  // Memoize right section data
  const rightSectionData = useMemo(() => rightSection?.[0], [rightSection]);

  // 🔹 Animation function for image transition (same as InvestingInPotential)
  const animateImageTransition = useCallback(
    (newIndex: number, direction: number) => {
      const incoming = imageRefs.current[newIndex];
      const outgoing = imageRefs.current[prevIndexRef.current];

      if (newIndex === prevIndexRef.current || !incoming || !outgoing) return;

      // Animate outgoing image
      gsap.to(outgoing, {
        clipPath:
          direction > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
        duration: 0.6,
        ease: "power2.in",
      });

      // Animate incoming image
      gsap.fromTo(
        incoming,
        {
          clipPath:
            direction > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power2.out",
        }
      );

      prevIndexRef.current = newIndex;
    },
    []
  );

  // GSAP scroll animation
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const star = starRef.current;
    const line = lineRef.current;
    const container = scrollContainerRef.current;

    if (!wrapper || !star || !line || !container) return;

    const timeoutId = setTimeout(() => {
      // Initialize clip paths
      imageRefs.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, {
            clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          });
        }
      });

      gsapContextRef.current = gsap.context(() => {
        const containerTop = container.getBoundingClientRect().top;

        const positions = itemRefs.current.map((ref) => {
          if (!ref) return 0;
          const rect = ref.getBoundingClientRect();
          return rect.top - containerTop;
        });

        gsap.set(star, { y: 0 });
        gsap.set(line, { height: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "ailRoadmapTrigger11",
            trigger: wrapper,
            start: "top top",
            end: "+=1500",
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: (self) => {
              const starRect = star.getBoundingClientRect();
              const starY = starRect.top + window.scrollY;
              let activeIndex: number | null = null;

              for (let i = 0; i < itemRefs.current.length; i++) {
                const item = itemRefs.current[i];
                if (!item) continue;

                const rect = item.getBoundingClientRect();
                const itemTop = rect.top + window.scrollY;
                const itemBottom = rect.bottom + window.scrollY;

                if (starY >= itemTop && starY <= itemBottom) {
                  activeIndex = i;
                  break;
                }
              }

              if (
                activeIndex !== null &&
                activeIndex !== prevIndexRef.current
              ) {
                setActive(activeIndex);
                animateImageTransition(activeIndex, self.direction);
              }
            },
            onLeave: () => {
              requestAnimationFrame(() => {
                ScrollTrigger.refresh();
              });
            },
            onEnterBack: () => {
              requestAnimationFrame(() => {
                ScrollTrigger.refresh();
              });
            },
          },
        });

        positions.forEach((pos, index) => {
          const time = index * 0.25;
          tl.to(star, { y: pos, ease: "none" }, time);
          tl.to(line, { height: pos, ease: "none" }, time);
        });
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      gsapContextRef.current?.revert();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, [animateImageTransition]);

  // Memoized ref callback
  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      itemRefs.current[index] = el;
    },
    []
  );

  return (
    <>
      <div ref={wrapperRef} className="w-full h-screen relative">
        {/* Background Images with clip-path animation */}
        {leftSection && leftSection?.length > 0 && (
          <div className="absolute inset-0 z-[0]">
            {leftSection?.map(
              (item, index) =>
                item?.image?.url && (
                  <div
                    key={`image-${index}`}
                    ref={(el) => {
                      if (el) imageRefs.current[index] = el;
                    }}
                    className="absolute inset-0"
                    style={{ zIndex: active === index ? 2 : 1 }}
                  >
                    <Image
                      src={item?.image?.url}
                      alt={
                        item?.image?.alternativeText ||
                        `Roadmap image ${index + 1}`
                      }
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0)_70%)]" />
                  </div>
                )
            )}
          </div>
        )}
        <div className="w-full h-full absolute z-[2]">
          <div className="relative w-full h-full">
            <div className="h-full w-[1px] bg-gray-300/30 absolute left-[90px]" />
            {sectionTitle && (
              <H2 className="text-white left-[120px] mt-[100px] xl:mt-[120px] absolute mr-[20px] lg:mr-[20px]">
                {sectionTitle}
              </H2>
            )}
            <div
              ref={scrollContainerRef}
              className="mt-[200px] absolute left-[40px]"
            >
              <div
                ref={lineRef}
                className="w-[1px] bg-white absolute left-[50px]"
                style={{ height: "0px" }}
              />
              <div
                ref={starRef}
                className="absolute left-[50px] min-w-[20px] ml-[-10px]"
              >
                <Image
                  src="/images/home/star-white.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
              </div>
              <div className="grid row-cols-4 items-start gap-y-[40px] xl:gap-y-[25px]">
                {leftSection?.map((items, index) => (
                  <div
                    key={items.id}
                    ref={setItemRef(index)}
                    className="flex gap-x-[70px] items-start mr-[20px] lg:mr-[unset]"
                  >
                    <BodyText2 className="text-white">{`0${
                      index + 1
                    }`}</BodyText2>
                    <div>
                      <SubH2 className="text-white mt-[-3px]">
                        {items.title}
                      </SubH2>
                      <BodyText2
                        className={`mt-[2px] text-white transition-opacity duration-300 max-w-[unset] md:max-w-[300px] xl:max-w-[350px] ${
                          index === active ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {items.description}
                      </BodyText2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop grey box */}
            {rightSectionData && (
              <div className="hidden lg:block overflow-hidden absolute rounded-[14px] w-[300px] lg:w-[500px] h-auto bottom-[60px] right-[60px] p-[24px]">
                <Image src="/images/sustainability/grey-bg.png" alt="img" fill className="object-cover z-[-2]" />
                {rightSectionData.heading && (
                  <SubH3 className="text-white">
                    {rightSectionData.heading}
                  </SubH3>
                )}
                <div className="mt-[16px]">
                  {rightSectionData.bulletPoints?.map((items) => (
                    <div
                      key={items?.id}
                      className="flex gap-4 mb-2 items-start"
                    >
                      {items?.bulletImg ? (
                        <Image
                          src={items?.bulletImg}
                          alt="star"
                          width={12}
                          height={12}
                          className="mt-[6px]"
                        />
                      ) : (
                        <Image
                          src="/images/home/star-white.svg"
                          alt="star"
                          width={12}
                          height={12}
                          className="mt-[6px]"
                        />
                      )}
                      <BodyText2 className="text-white">
                        {items?.title}
                      </BodyText2>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Mobile grey box - Inside pinned section */}
            <div className="block lg:hidden absolute w-[100%] h-auto bottom-0">
              {rightSectionData && (
                <div className=" bg-[#102533] absolute  left-0 w-full p-[24px] z-10">
                  {rightSectionData.heading && (
                    <SubH3 className="text-white">
                      {rightSectionData.heading}
                    </SubH3>
                  )}
                  <div className="mt-[16px]">
                    {rightSectionData.bulletPoints?.map((items) => (
                      <div
                        key={items?.id}
                        className="flex gap-4 mb-2 items-center"
                      >
                        {items?.bulletImg ? (
                          <Image
                            src={items?.bulletImg}
                            alt="star"
                            width={12}
                            height={12}
                            className="mt-[6px]"
                          />
                        ) : (
                          <Image
                            src="/images/home/star-white.svg"
                            alt="star"
                            width={12}
                            height={12}
                            className="mt-[6px]"
                          />
                        )}
                        <BodyText2 className="text-white">
                          {items?.title}
                        </BodyText2>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AILRoadmap;
