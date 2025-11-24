import React from "react";
import Popup from "../Popup";
import GeneralForm from "../forms/GeneralForm";
import { CategorySubcategoryProps } from "@/app/types/product.inner.type";
type GeneralPopupProps = {
  setshowGeneralPopup: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  document?: string;
  categorySubcategoryData?: CategorySubcategoryProps;
  prefillCategory?: string;
  prefillProduct?: string;
  prefillSubCategory?: string;
};

export default function GeneralPopup({
  setshowGeneralPopup,
  isOpen,
  document,
  prefillCategory,
  prefillProduct,
  prefillSubCategory,
}: GeneralPopupProps) {
  return (
    <div>
      <Popup onOverlayClick={() => setshowGeneralPopup(false)} isOpen={isOpen}>
        <GeneralForm
          setshowGeneralPopup={setshowGeneralPopup}
          document={document}
          prefillCategory={prefillCategory}
          prefillProduct={prefillProduct}
          prefillSubCategory={prefillSubCategory}
        />
      </Popup>
    </div>
  );
}
