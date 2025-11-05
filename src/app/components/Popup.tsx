import React from "react";

type PopupProps = {
  children: React.ReactNode;
  onOverlayClick?: () => void;
};

export default function Popup({ children, onOverlayClick }: PopupProps) {
  return (
    <div className="fixed w-full h-full top-0 left-0 z-50 flex justify-center items-center">
      <div
        className="bg-[rgba(0,0,0,0.6)] fixed w-full h-full top-0 left-0"
        onClick={onOverlayClick}
      />
      <div className="bg-white w-[90%] lg:w-1/2 rounded-[20px] p-5 md:p-[30px] z-[60]">
        {children}
      </div>
    </div>
  );
}
