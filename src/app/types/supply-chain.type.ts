import { ButtonProps, ImageProps } from "./global.type";

export type SupplyChainBannerProps = {
  data: {
    title: string;
    description: string;
    ctaButtons: ButtonProps[];
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type SustainabilityTransparancyProps = {
  data: {
    title: string;
    description: string;
    values: {
      value: string;
      description: string;
    }[];
    ctaButton: ButtonProps;
  };
};

export type KeyRawMaterialsProps = {
  data: {
    title: string;
    description: string;
    products: {
      productName: string;
      productDetails: {
        casNo: string;
        chemicalFormula: string;
        commonName: string;
        material: string;
      };
    }[];
  };
};
