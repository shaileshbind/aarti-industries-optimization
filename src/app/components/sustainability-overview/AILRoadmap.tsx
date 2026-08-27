"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BodyText2, H2, SubH2, SubH3 } from "../Typography2";
import { AILRoadmapData } from "@/app/types/sustainability.type";
import {useMatchMedia} from "@/app/hooks/useMatchMedia";

const AILRoadmap = ({ data }: AILRoadmapData) => {
  const { sectionTitle, leftSection, rightSection } = data;
  const [active, setActive] = useState(0);
  const isMobile = useMatchMedia("(max-width: 768px)");
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

  const animateImageTransition = useCallback(
    (newIndex: number) => {
      const prev = prevIndexRef.current;
      if (newIndex === prev) return;

      const incoming = imageRefs.current[newIndex];
      const outgoing = imageRefs.current[prev];
      if (!incoming || !outgoing) return;

      const goingDown = newIndex > prev;

      gsap.to(outgoing, {
        clipPath: goingDown
          ? "inset(0% 0% 100% 0%)"
          : "inset(100% 0% 0% 0%)",
        duration: 0.6,
        ease: "power2.in",
      });

      gsap.fromTo(
        incoming,
        {
          clipPath: goingDown
            ? "inset(100% 0% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power2.out",
        },
      );

      prevIndexRef.current = newIndex;
    },
    [],
  );

  // GSAP scroll animation
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const star = starRef.current;
    const line = lineRef.current;
    const container = scrollContainerRef.current;

    if (!wrapper || !star || !line || !container) return;

    // Using rAF instead of setTimeout reduces "start" lag on mobile.
    const rafId = requestAnimationFrame(() => {
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

        const totalItems = positions.length;
        if (totalItems < 2) return;

        gsap.set(star, { y: positions[0] });
        gsap.set(line, { height: positions[0] });

        const scrollPerGap = isMobile ? 500 : 1000;
        const totalScroll = (totalItems - 1) * scrollPerGap;
        const snapIncrement = 1 / (totalItems - 1);

        const snapPoints: number[] = [];
        for (let i = 0; i < totalItems; i++) {
          snapPoints.push(i * snapIncrement);
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "ailRoadmapTrigger11",
            trigger: wrapper,
            start: "top top",
            end: `+=${totalScroll}`,
            scrub: isMobile ? 0.3 : true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            snap: {
              snapTo: snapPoints,
              duration: { min: 0.15, max: 0.35 },
              delay: isMobile ? 0 : 0.05,
              ease: "power1.inOut",
            },
            onUpdate: () => {
              const starY = gsap.getProperty(star, "y") as number;
              const minGap = positions.length > 1
                ? Math.min(...positions.slice(1).map((p, i) => Math.abs(p - positions[i])))
                : 1;
              const threshold = minGap * 0.15;

              let nearestIndex = 0;
              let nearestDist = Math.abs(starY - positions[0]);
              for (let i = 1; i < totalItems; i++) {
                const d = Math.abs(starY - positions[i]);
                if (d < nearestDist) {
                  nearestDist = d;
                  nearestIndex = i;
                }
              }

              if (nearestDist < threshold && nearestIndex !== prevIndexRef.current) {
                setActive(nearestIndex);
                animateImageTransition(nearestIndex);
              }
            },
          },
        });

        for (let i = 1; i < totalItems; i++) {
          const startTime = (i - 1) * snapIncrement;
          tl.to(star, { y: positions[i], duration: snapIncrement, ease: "none" }, startTime);
          tl.to(line, { height: positions[i], duration: snapIncrement, ease: "none" }, startTime);
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      gsapContextRef.current?.revert();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, [animateImageTransition, isMobile]);

  // Memoized ref callback
  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  return (
    <>
      <div
        ref={wrapperRef}
        className="w-full h-screen md:h-[60vh] lg:h-screen relative"
      >
        {/* Background Images with clip-path animation */}
        {leftSection && leftSection?.length > 0 && (
          <div className="absolute inset-0 z-0">
            {/* Keep a constant dark background so clip-path transitions don't reveal the white page */}
            <div className="absolute inset-0 bg-black/40 lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0)_70%)]" />
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
                    <div className="absolute inset-0 bg-black/40 lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0)_70%)]" />
                  </div>
                ),
            )}
          </div>
        )}
        <div className="w-full h-full absolute z-2">
          <div className="relative w-full h-full">
            <div className="h-full w-px bg-gray-300/30 absolute left-[90px]" />
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
                className="w-px bg-white/60 absolute left-[50px]"
                style={{ height: "0px" }}
              />
              <div
                ref={starRef}
                className="absolute left-[51px] min-w-[20px] ml-[-10px]"
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
                      <SubH2 className="text-white mt-[-3px] font-alte-hans">
                        {items.title}
                      </SubH2>
                      <BodyText2
                        className={`mt-[2px] text-white transition-opacity duration-300 max-w-[unset] md:max-w-[300px] xl:max-w-[350px] font-roboto pt-1 font-normal ${
                          index === active ? "opacity-90" : "opacity-0"
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
              <div className="hidden lg:block overflow-hidden absolute opacity-90 rounded-[14px] w-[300px] lg:w-[500px] h-auto bottom-[60px] right-[60px] p-[24px]">
                <Image
                  src="/images/sustainability/grey-bg.png"
                  alt="img"
                  fill
                  className="object-cover z-[-2]"
                />
                {rightSectionData.heading && (
                  <SubH3 className="text-white md:text-[16px]! lg:text-[20px]!">
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
            <div className="block lg:hidden absolute w-full h-auto bottom-0">
              {rightSectionData && (
                <div className=" bg-[#102533] absolute left-0 w-full px-[24px] py-[40px] z-10">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AILRoadmap;
