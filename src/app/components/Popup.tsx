"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";

type PopupProps = {
  children: React.ReactNode;
  onOverlayClick?: () => void;
  isOpen: boolean;
  className?: string;
};

export default function Popup({
  children,
  isOpen,
  className,
  onOverlayClick,
}: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(isOpen);
  const isAnimatingRef = useRef(false);

  // Handle body overflow when popup is open
  useEffect(() => {
    if (isOpen) {
      // Store the original overflow value
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Cleanup: restore original overflow
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

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
    <div data-lenis-prevent className="fixed w-full h-full top-0 left-0 z-50 flex justify-center items-center">
      <div
        ref={overlayRef}
        className="bg-[rgba(0,0,0,0.8)] fixed w-full h-full top-0 left-0"
        onClick={onOverlayClick}
      />
      <div
        ref={popupRef}
        className={clsx(
          `bg-white w-[90%] md:w-[70%] lg:w-[55%] xl:w-[40%] rounded-[20px] p-[20px] md:p-[30px] z-[60] relative`,
          className
        )}
      >
        <div className="absolute right-4 top-6 md:right-8 md:top-8 cursor-pointer hover:rotate-[90deg] transition-all duration-300">
          <CloseIcon onClick={onOverlayClick} />
        </div>
        {children}
      </div>
    </div>
  );
}
