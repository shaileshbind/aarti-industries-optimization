import { ButtonProps, ImageProps } from "./global.type";

export type IndustryBannerProps = {
  data: {
    title: string;
    sectionTitle: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type IndustryInfoProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type OurPortfolioProps = {
  data: {
    title: string;
    content: {
      category: string;
      id: string | number;
      card: {
        id: string | number;
        title: string;
        description: string;
        image: ImageProps;
        mobImage: ImageProps;
        ctaButton: ButtonProps;
        BulletPoints: {
          title: string;
        }[];
      }[];
    }[];
  };
};

export type IndustryExpProps = {
  data: {
    exploreMore: {
      title?: string;
      ctaButton?: ButtonProps[];
      formTitle?:string;
    }[];
  };
};
