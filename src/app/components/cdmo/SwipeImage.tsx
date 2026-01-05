"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface SwipeImageProps {
  activeImg: string;
}

const SwipeImage: React.FC<SwipeImageProps> = ({ activeImg }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);
  const [prevImg, setPrevImg] = useState<string | null>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (!activeImg) return;

    // Kill existing animations
    gsap.killTweensOf([currentRef.current, previousRef.current]);

    if (!isFirst.current && prevImg && prevImg !== activeImg) {
      // Set up initial states
      gsap.set(currentRef.current, { opacity: 0, scale: 1.05 });
      gsap.set(previousRef.current, { opacity: 1, scale: 1 });

      // Simple fade + slight zoom animation
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1 },
        onComplete: () => setPrevImg(activeImg),
      });

      tl.to(previousRef.current, { opacity: 0.0, scale: 1.02 }, 0);
      tl.to(currentRef.current, { opacity: 1, scale: 1 }, 0);
    } else {
      // First load (no animation)
      gsap.set(currentRef.current, { opacity: 1, scale: 1 });
      setPrevImg(activeImg);
      isFirst.current = false;
    }
  }, [activeImg, prevImg]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-3xl"
      style={{
        isolation: 'isolate', // Creates stacking context
      }}
    >
      {/* Previous Image */}
      {prevImg && (
        <div
          ref={previousRef}
          className="absolute inset-0 h-full w-full"
          style={{
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            backfaceVisibility: 'hidden', // Firefox fix
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <Image
            src={prevImg}
            fill
            alt="previous"
            className="object-cover"
            style={{
              transform: 'translate3d(0, 0, 0)',
            }}
          />
        </div>
      )}

      {/* Current Image */}
      {activeImg && (
        <div
          ref={currentRef}
          className="absolute inset-0 h-full w-full"
          style={{
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            backfaceVisibility: 'hidden', // Firefox fix
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <Image
            src={activeImg}
            fill
            alt="current"
            className="object-cover"
            style={{
              transform: 'translate3d(0, 0, 0)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SwipeImage;