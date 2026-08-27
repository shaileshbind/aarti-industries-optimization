"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  scale?: number; // how much to scale on scroll (default 1.1)
  yMove?: number; // how much to move vertically (default 50)
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt = "",
  className = "",
  scale = 1,
  yMove = 180,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { y: -yMove, scale },
        {
          y: yMove,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // when image enters viewport
            end: "bottom top", // when image leaves viewport
            scrub: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scale, yMove]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ willChange: "transform" }}
    >
      <div ref={imgRef} className="w-full h-full relative">
        <Image src={src} alt={alt || "banner"} className="object-cover" priority fill sizes="100vw" />
      </div>
    </div>
  );
};

export default ParallaxImage;
