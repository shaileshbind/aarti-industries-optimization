"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { BodyText2, H3, SubH2 } from "../Typography2";
import MainAccordion from "../Accordion";
import Image from "next/image";
import { KeyRawMaterialsProps } from "@/app/types/supply-chain.type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/app/contexts/LenisContext";

export default function KeyRawMaterials({ data }: KeyRawMaterialsProps) {
  const { title, description, raw_materials } = data;

  const [expanded, setexpanded] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollTo: lenisScrollTo } = useLenis();
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const getHeaderOffset = () => {
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-height");
    return (parseInt(val, 10) || 80) + 5;
  };
  const clearPendingTimers = () => {
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
      expandTimerRef.current = null;
    }
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
  };

  const mobileScrollAndExpand = useCallback(
    (panelIndex: number) => {
      clearPendingTimers();
      setexpanded(-1);

      collapseTimerRef.current = setTimeout(() => {
        const el = accordionRefs.current[panelIndex];
        if (el) {
          const offset = getHeaderOffset();
          lenisScrollTo(el, {
            offset: -offset,
            duration: 0.8,
          });
        }
        expandTimerRef.current = setTimeout(() => {
          setexpanded(panelIndex);
          expandTimerRef.current = null;
        }, 100);
        collapseTimerRef.current = null;
      }, 350);
    },
    [lenisScrollTo],
  );

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    // Media query for large screens (Tailwind's lg breakpoint = 1024px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Only create ScrollTrigger on desktop
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 120px",
        end: "bottom center",
        pin: stickyRef.current,
        pinSpacing: false,
        markers: false, // Set to true for debugging
      });
    });

    return () => {
      mm.revert(); // Clean up all matchMedia instances
    };
  }, [raw_materials]);

  return (
    <div ref={containerRef} className="lg:flex justify-between fluid-container">
      <div ref={stickyRef} className="lg:w-[40%]">
        {title && <H3>{title}</H3>}

        {description && (
          <BodyText2 className="pt-4 lg:pt-7">{description}</BodyText2>
        )}
      </div>

      {raw_materials?.length > 0 && (
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          {raw_materials?.map((item, index) => (
            <div key={"accordion_wrap_" + index} className="relative" ref={(el) => { accordionRefs.current[index] = el; }}>
            <MainAccordion
              key={"accordion" + index}
              expanded={expanded === index}
              onChange={() => {
                if (isMobile) {
                  mobileScrollAndExpand(index);
                } else {
                  setexpanded(index);
                }
              }}
              borderBottom={
                index === raw_materials?.length - 1
                  ? "none"
                  : "1px solid #e8e8e8"
              }
              icon={
                <Image
                  src={"/images/accordian-down.svg"}
                  alt="arrow"
                  width={26}
                  height={26}
                />
              }
              title={
                <SubH2 className={`text-lg md:text-2xl text-[#002F50] `}>
                  {item?.productName}
                </SubH2>
              }
            >
              <div className="border-[1px] rounded-[20px] overflow-hidden border-[#e8e8e8] ">
                <div className="flex py-[18px] px-5 even:bg-[#F7F9FA] border-b border-[#e8e8e8]">
                  <p className="text-[#002F50] w-[60%]">Technical Name:</p>
                  <p className="text-[#4C5861]">{item?.productName || "-"}</p>
                </div>
                <div className="flex py-[18px] px-5 even:bg-[#F7F9FA] border-b border-[#e8e8e8]">
                  <p className="text-[#002F50] w-[60%]">CAS No.:</p>
                  <p className="text-[#4C5861]">{item?.casNo || "-"}</p>
                </div>
                <div className="flex py-[18px] px-5 even:bg-[#F7F9FA] border-b border-[#e8e8e8]">
                  <p className="text-[#002F50] w-[60%]">Molecular Formula:</p>
                  <p className="text-[#4C5861]">{item?.moducularName || "-"}</p>
                </div>
                <div className="flex py-[18px] px-5 even:bg-[#F7F9FA] ">
                  <p className="text-[#002F50] w-[60%]">
                    Packaging Material Requirement:
                  </p>
                  <p className="text-[#4C5861]">
                    {item?.materialRequirement || "-"}
                  </p>
                </div>
              </div>
            </MainAccordion>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
