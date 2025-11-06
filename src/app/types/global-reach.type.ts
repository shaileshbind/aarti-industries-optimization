import { ButtonProps, ImageProps, ValueProps } from "./global.type";

export type GRBannerProps = {
  data: {
    heading?: string;
    sectionTitle?: string;
    description?: string;
    ctaButton?: ButtonProps;
    image?: ImageProps;
    mobImage?: ImageProps;
  };
};

export type GRInfoProps = {
  data: {
    description?: string;
    content: {
      id?: number;
      mobImag: ImageProps;
      image: ImageProps;
      values: ValueProps[];
    }[];
  };
};

export type GRMapsProps = {
  data: {
    sectionTitle?: string;
    title?: string;
    description?: string;
    ctaButton?: ButtonProps;
  };
};

export type GRExpProps = {
  data: {
    id?: number;
    exploreMore: {
      id?: number;
      title?: string;
      ctaButton?: ButtonProps[];
    }[];
  };
};
