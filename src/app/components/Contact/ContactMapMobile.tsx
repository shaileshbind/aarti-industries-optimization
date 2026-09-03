"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// The CMS map is a 738KB SVG that next/image passes through untouched. Even
// with loading="lazy" it sat inside Chrome's lazy threshold and downloaded
// alongside the LCP image, so mount it only when its box is near the viewport.
// The aspect-ratio box holds the space so nothing shifts when it arrives.
export default function ContactMapMobile({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  return (
    <div ref={ref} className="relative w-full aspect-[1265/623]">
      {near && (
        <Image src={src} alt="img" fill sizes="100vw" className="object-contain" />
      )}
    </div>
  );
}
