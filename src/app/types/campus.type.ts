import { ButtonProps, ImageProps } from "./global.type";

export type CampusBannerProps = {
  data: {
    title: string;
    sectionTitle: string;
    description: string;
    ctaButton: ButtonProps;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type CampusFlagshipProps = {
  data: {
    sectionTitle: string;
    title: string;
    card: {
      id: string | number;
      title: string;
      description: string;
      image: ImageProps;
    }[];
    partnerWithUsCta: ButtonProps;
  };
};

export type CampusExpProps = {
  data: {
    title?: string;
    ctaButton?: ButtonProps[];
    formTitle?:string;
  }[];
};
