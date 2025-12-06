"use client";
import React from "react";
import Popup from "../Popup";
import MSDSForm from "../forms/MSDSForm";

type MSDSPopupProps = {
  setshowMSDSPopup: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  document?: string;
};

export default function MSDSPopup({
  setshowMSDSPopup,
  isOpen,
  document,
}: MSDSPopupProps) {
  return (
    <div data-lenis-prevent>
      <Popup onOverlayClick={() => setshowMSDSPopup(false)} isOpen={isOpen}>
        <MSDSForm setshowMSDSPopup={setshowMSDSPopup} document={document} />
      </Popup>
    </div>
  );
}
