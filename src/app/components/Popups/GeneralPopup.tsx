import React from "react";
import Popup from "../Popup";
import GeneralForm from "../forms/GeneralForm";

type GeneralPopupProps = {
  setshowGeneralPopup: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  document?: string;
};

export default function GeneralPopup({
  setshowGeneralPopup,
  isOpen,
  document,
}: GeneralPopupProps) {
  return (
    <div>
      <Popup onOverlayClick={() => setshowGeneralPopup(false)} isOpen={isOpen}>
        <GeneralForm
          setshowGeneralPopup={setshowGeneralPopup}
          document={document}
        />
      </Popup>
    </div>
  );
}
