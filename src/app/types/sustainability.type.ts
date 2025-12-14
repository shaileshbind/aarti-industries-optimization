import { ButtonProps, ImageProps, ValueProps } from "./global.type";

export type SusBannerProps = {
  data: {
    title: string;
    sectionTitle: string;
    description: string;
    ctaButton: ButtonProps;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type SusCoreData = {
  data: {
    sectionTitle?: string;
    leftImage?: ImageProps;
    rightSection?: ValueProps[];
  };
};

export type AILRoadmapData = {
  data: {
    sectionTitle?: string;
    leftSection?: {
      id?: number;
      title?: string;
      description?: string;
      image?: ImageProps;
      mobImage?: ImageProps;
    }[];
    rightSection?: {
      id?: number;
      heading?: string;
      bulletPoints?: {
        id?: number;
        title?: string;
        bulletImg?:string;
      }[];
    }[];
  };
};

export type RespGrowthProps = {
  data: {
    leftText: string;
    rightText: string;
    images: ImageProps[];
    mainSection: {
      id: string | number;
      category: string;
      description: string;
      values: {
        value: string;
        description: string;
      }[];
      image: ImageProps;
      mobImage: ImageProps;
      ctaButton: ButtonProps;
    }[];
  };
};