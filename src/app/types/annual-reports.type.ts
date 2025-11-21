import { ImageProps } from "./global.type";

export type AnnualRBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type AnnualRProps = {
  data: {
    annual_reports?: {
      id?: number;
      annual_reports?: {
        id?: number;
        heading?: string;
        link?: string;
      };
    }[];
  };
};