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
  const imageRef = useRef<HTMLDivElement>(null);
  const gsapContextRef = useRef<gsap.Context | null>(null);

  // Memoize current image data
  const imageData = useMemo(
    () => leftSection?.[active]?.image,
    [leftSection, active]
  );

  // Memoize right section data
  const rightSectionData = useMemo(() => rightSection?.[0], [rightSection]);

  // GSAP scroll animation
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const star = starRef.current;
    const line = lineRef.current;
    const container = scrollContainerRef.current;
    const image = imageRef.current;

    if (!wrapper || !star || !line || !container || !image) return;

    const timeoutId = setTimeout(() => {
      gsapContextRef.current = gsap.context(() => {
        const containerTop = container.getBoundingClientRect().top;

        const positions = itemRefs.current.map((ref) => {
          if (!ref) return 0;
          const rect = ref.getBoundingClientRect();
          return rect.top - containerTop;
        });

        gsap.set(star, { y: 0 });
        gsap.set(line, { height: 0 });
        gsap.set(image, { y: "0%", opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "ailRoadmapTrigger11",
            trigger: wrapper,
            start: "top top",
            end: "+=2500",
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: () => {
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

              if (activeIndex !== null) {
                setActive((prev) =>
                  prev !== activeIndex ? activeIndex : prev
                );
              }
            },
            onLeave: () => {
              // Refresh other ScrollTriggers after this one completes
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
  }, []);

  // Image swipe animation
  useEffect(() => {
    const container = imageRef.current;
    if (!container) return;

    const currentImage = container.querySelector(".active-img");
    const nextImageData = leftSection?.[active]?.image;
    if (!nextImageData?.url) return;

    const newImage = document.createElement("div");
    newImage.className = "absolute inset-0 new-img";
    Object.assign(newImage.style, {
      backgroundImage: `url(${nextImageData.url})`,
      backgroundSize: "cover",
      backgroundPosition: "top",
      backgroundAttachment: "fixed",
      zIndex: "2",
      // transform: "translateY(100%)",
      opacity: "0",
      height: "0%",
    });
    container.appendChild(newImage);

    gsap.to(newImage, {
      // y: "0%",
      height: "100%",
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        currentImage?.remove();
        newImage.classList.remove("new-img");
        newImage.classList.add("active-img");
      },
    });
  }, [active, leftSection]);

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
        {imageData?.url && (
          <div ref={imageRef} className="absolute inset-0">
            <div
              className="absolute inset-0 active-img"
              style={{
                backgroundImage: `url(${imageData.url})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
              }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="w-full h-full absolute">
          <div className="relative w-full h-full">
            <div className="h-full w-[1px] bg-gray-300/30 absolute left-[90px]" />
            {sectionTitle && (
              <H2 className="text-white left-[120px]  mt-[150px] absolute mr-[20px] lg:mr-[20px]">
                {sectionTitle}
              </H2>
            )}
            <div
              ref={scrollContainerRef}
              className="mt-[250px] absolute left-[40px]"
            >
              <div
                ref={lineRef}
                className="w-[1px] bg-white absolute left-[50px]"
                style={{ height: "0px" }}
              />
              <div ref={starRef} className="absolute left-[50px] min-w-[20px] ml-[-10px]">
                <Image
                  src="/images/home/star-white.svg"
                  alt="star"
                  width={20}
                  height={20}
                  // className="absolute -translate-x-full top-[-5px] "
                />
              </div>
              <div className="grid row-cols-4 items-start gap-y-[20px]">
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
                        className={`mt-[2px] text-white transition-opacity duration-300 ${
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
              <div className="hidden lg:block bg-[#2f404d] absolute rounded-[14px] w-[500px] h-auto bottom-[60px] right-[60px] p-[24px]">
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
                      <Image
                        src="/images/home/star-white.svg"
                        alt="star"
                        width={12}
                        height={12}
                      />
                      <BodyText2 className="text-white">
                        {items?.title}
                      </BodyText2>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Mobile grey box - Inside pinned section */}
            {rightSectionData && (
              <div className="block lg:hidden bg-[#102533] absolute w-[100%] h-auto bottom-[0px] p-[24px] z-10">
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
                      <Image
                        src="/images/home/star-white.svg"
                        alt="star"
                        width={12}
                        height={12}
                      />
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
    </>
  );
};

export default AILRoadmap;
