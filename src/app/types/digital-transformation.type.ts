import { ButtonProps, ImageProps } from "./global.type";

export type DigitalBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type MiddleBannerProps = {
  data: {
    title: string;
    description: string;
    image?: ImageProps;
    mobImage?: ImageProps;
    ctaButton?: ButtonProps;
  };
};

export type CardProps = {
  category: string;
  id: string | number;
  card: {
    id: string | number;
    title: string;
    description: string;
    ctaButton: ButtonProps;
    image: ImageProps;
  }[];
};

export type DrivingCrossFunctionalProps = {
  data: {
    details: CardProps[];
  };
};

export type CDMOExpProps = {
  data: {
    title: string;
    ctaButton: ButtonProps[];
  }[];
};
