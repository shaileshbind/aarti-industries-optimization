"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BodyText2, H2 } from "../Typography2";
import DesktopMapSvgClient from "../global-reach/DesktopMapSvgClient";
import Image from "next/image";
import { useMargin } from "@/app/contexts/MarginContext";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

const HomeMap = () => {
  const [activeBlip, setActiveBlip] = useState(4);
  const { marginBottom } = useMargin();
  const sectionRef = useRef<HTMLDivElement>(null);
  // gr-map-m.svg is 430KB over the wire (1.1MB raw) and next/image does not
  // optimize SVGs, so it passes straight through. It is the single largest
  // asset on the homepage -- 23% of total bytes -- for a below-the-fold map
  // that only renders under lg. `loading="lazy"` did not help: Chrome's lazy
  // threshold on a slow connection is thousands of px, so it was fetched
  // inside the LCP window anyway.
  //
  // The observer watches sectionRef, not the image's own wrapper: that wrapper
  // is `lg:hidden`, so at desktop widths it is display:none and an observer on
  // it cannot fire reliably. Pairing an always-rendered target with the same
  // breakpoint the wrapper uses keeps the two independent -- and it means the
  // desktop build never mounts the mobile image at all, rather than relying on
  // CSS to hide something already downloaded.
  const isMobileMap = useMatchMedia("(max-width: 1023px)");
  const [mapNear, setMapNear] = useState(false);
  const mobileStatsData = [
    { id: 0, percent: "46%", title: "India" },
    { id: 1, percent: "23%", title: "Middle East" },
    { id: 2, percent: "18%", title: "North America" },
    { id: 3, percent: "4%", title: "Europe" },
    { id: 4, percent: "6%", title: "Rest of Asia" },
    { id: 5, percent: "3%", title: "Rest of the world" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const els = document.querySelectorAll(".hideinnextsection");
    if (!els.length || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: `bottom  bottom+500px`,
        end: `bottom bottom`,
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      els,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -100, duration: 0.4 },
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !isMobileMap || mapNear) return;

    const reveal = () => setMapNear(true);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);

    // Belt and braces. The observer is the desirable path -- a visitor who
    // never scrolls this far never pays for the map at all -- but if it were
    // ever not to fire, the section would render empty, and a missing map is a
    // far worse outcome than a late one. This fallback keeps the image out of
    // the LCP window either way, which is the whole point of the change.
    const t = setTimeout(reveal, 4000);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [isMobileMap, mapNear]);

  return (
    <div
      ref={sectionRef}
      className="w-full relative z-10 bg-white pt-20"
      style={{
        marginTop: marginBottom > 0 ? `${marginBottom + 100}px` : undefined,
      }}
    >
      <div className="container pt-[70px] pb-[70px] lg:pt-[100px] lg:pb-[100px] h-full overflow-hidden">
        <H2 className="max-w-[unset] lg:max-w-[550px] text-center mx-auto mb-[30px] lg:mb-[60px]">
          Growing Across Markets and Beyond Borders
        </H2>
        <div className="relative w-full h-[180px] lg:h-[550px] mb-[50px] lg:mb-[100px] ">
          <div className="w-[100%] h-full mx-auto hidden lg:block relative ">
            <DesktopMapSvgClient
              hoverRestWorld={() => setActiveBlip(0)}
              hoverNorthAmerica={() => setActiveBlip(1)}
              hoverEurope={() => setActiveBlip(2)}
              hoverMiddleE={() => setActiveBlip(3)}
              hoverIndia={() => setActiveBlip(4)}
              hoverAsia={() => setActiveBlip(5)}
              fillRestOfWorld={activeBlip === 0 ? "#898698" : "#E7EBED"}
              fillNorthAmerica={activeBlip === 1 ? "#898698" : "#E7EBED"}
              fillEurope={activeBlip === 2 ? "#898698" : "#E7EBED"}
              fillMiddleEast={activeBlip === 3 ? "#898698" : "#E7EBED"}
              fillIndia={activeBlip === 4 ? "#898698" : "#E7EBED"}
              fillRestOfAsia={activeBlip === 5 ? "#898698" : "#E7EBED"}
              isActive0={activeBlip === 0}
              isActive1={activeBlip === 1}
              isActive2={activeBlip === 2}
              isActive3={activeBlip === 3}
              isActive4={activeBlip === 4}
              isActive5={activeBlip === 5}
            />
          </div>
          {isMobileMap && mapNear && (
            <Image
              src="/images/global-reach/gr-map-m.svg"
              alt="map img"
              fill
              sizes="(max-width: 1023px) 100vw, 0px"
              className="object-contain block lg:hidden"
            />
          )}
          <p className="text-[#002F50] text-xs text-left mt-4 lg:mt-0 md:mb-[52px] lg:block hidden">
            *% indicate revenue breakup by market share.
          </p>
        </div>
        <div className="lg:hidden mt-[40px] grid grid-cols-2 gap-y-[16px] gap-x-[20px] mx-[20px]">
          {mobileStatsData?.map((items) => {
            return (
              <div
                key={items?.id}
                className="border-b border-grey-200 pb-[16px] grid justify-center"
              >
                <H2 className="text-orange-200 text-center">
                  {items?.percent}
                </H2>
                <BodyText2 className="text-center">{items?.title}</BodyText2>
              </div>
            );
          })}
        </div>

        <p className="text-[#002F50] text-xs text-left mt-4 lg:mt-0 md:mb-[52px] lg:hidden block">
          *% indicate revenue breakup by market share.
        </p>
      </div>
    </div>
  );
};

export default HomeMap;
