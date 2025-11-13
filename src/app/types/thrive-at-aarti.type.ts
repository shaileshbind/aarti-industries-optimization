import { ButtonProps, ImageProps } from "./global.type";

export type ThriveBannerProps = {
  data: {
    title: string;
    pageHeading: string;
    description: string;
    ctaButton: ButtonProps;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type InvestingInPotentialProps = {
  data: {
    title: string;
    cards: {
      title: string;
      description: string;
      image: ImageProps;
      mobImage: ImageProps;
    }[];
  };
};

export type ComprehensiveCareProps = {
  data: {
    title: string;
    cards: {
      title: string;
      description: string;
      image: ImageProps;
      mobImage: ImageProps;
    }[];
    ctaButton: ButtonProps[];
  };
};
