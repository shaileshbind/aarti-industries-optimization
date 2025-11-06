"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

type PopupProps = {
  children: React.ReactNode;
  onOverlayClick?: () => void;
  isOpen: boolean;
};

export default function Popup({
  children,
  isOpen,
  onOverlayClick,
}: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(isOpen);
  const isAnimatingRef = useRef(false);

  useLayoutEffect(() => {
    // Prevent multiple animations from running simultaneously
    if (isAnimatingRef.current) {
      gsap.killTweensOf([popupRef.current, overlayRef.current]);
    }

    if (isOpen) {
      setIsVisible(true);
      isAnimatingRef.current = true;

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (popupRef.current && overlayRef.current) {
          // Animate overlay
          gsap.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
          );

          // Animate popup
          gsap.fromTo(
            popupRef.current,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
              onComplete: () => {
                isAnimatingRef.current = false;
              },
            }
          );
        }
      });
    } else if (isVisible) {
      isAnimatingRef.current = true;

      if (popupRef.current && overlayRef.current) {
        // Animate overlay out
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });

        // Animate popup out
        gsap.to(popupRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            setIsVisible(false);
            isAnimatingRef.current = false;
          },
        });
      } else {
        // Fallback if refs aren't available
        setIsVisible(false);
        isAnimatingRef.current = false;
      }
    }

    // Cleanup function
    return () => {
      gsap.killTweensOf([popupRef.current, overlayRef.current]);
    };
  }, [isOpen, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed w-full h-full top-0 left-0 z-50 flex justify-center items-center">
      <div
        ref={overlayRef}
        className="bg-[rgba(0,0,0,0.8)] fixed w-full h-full top-0 left-0"
        onClick={onOverlayClick}
      />
      <div
        ref={popupRef}
        className="bg-white w-[90%] lg:w-[70%] xl:w-1/2 rounded-[20px] p-5 md:p-[30px] z-[60]"
      >
        {children}
      </div>
    </div>
  );
}
