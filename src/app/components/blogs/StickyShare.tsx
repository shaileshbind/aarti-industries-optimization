"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Share from "./Share";
import CopyLink from "./CopyLink";

gsap.registerPlugin(ScrollTrigger);

interface StickyShareProps {
  title?: string;
}

export default function StickyShare({ title }: StickyShareProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find the parent flex container
    const parentContainer = containerRef.current.closest(".md\\:flex");
    if (!parentContainer) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: parentContainer, // Pin relative to parent container
        start: "top top+=96", // Start pinning when parent reaches this point
        end: () => {
          // Calculate end based on parent height minus pinned element height
          const parentHeight = (parentContainer as HTMLElement).offsetHeight;
          const pinnedHeight = containerRef.current!.offsetHeight;
          return `+=${parentHeight - pinnedHeight - 50}`;
        },
        pin: containerRef.current, // Pin this specific element
        pinSpacing: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mt-6 md:mt-10">
      <p className="text-[#002F50] text-base pb-4">{title}</p>
      <div className="flex gap-4 items-start">
        <Share />
        <CopyLink />
      </div>
    </div>
  );
}
