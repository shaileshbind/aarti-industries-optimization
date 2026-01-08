import { ButtonProps, ImageProps } from "./global.type";

export type AartiAdvantageBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type AilEdgeProps = {
  data: {
    heading: string;
    cards: {
      title: string;
      image: ImageProps;
    }[];
  };
};

export type AdvExploreProps = {
  data: {
    exploreMore: {
      title?: string;
      ctaButton?: ButtonProps[];
      formTitle?:string;
    };
  }[];
};
