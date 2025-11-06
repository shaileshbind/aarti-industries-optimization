"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Mount the popup
      if (popupRef.current) {
        // Scale-in animation
        gsap.fromTo(
          popupRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          }
        );
      }
    } else {
      if (popupRef.current) {
        // Scale-out animation
        gsap.to(popupRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => setIsVisible(false), // Unmount after animation
        });
      }
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed w-full h-full top-0 left-0 z-50 flex justify-center items-center">
      <div
        className="bg-[rgba(0,0,0,0.6)] fixed w-full h-full top-0 left-0"
        onClick={onOverlayClick}
      />
      <div
        ref={popupRef}
        className="bg-white w-[90%] lg:w-1/2 rounded-[20px] p-5 md:p-[30px] z-[60]"
      >
        {children}
      </div>
    </div>
  );
}
