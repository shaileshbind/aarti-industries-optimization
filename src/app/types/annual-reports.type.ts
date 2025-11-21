import { ImageProps } from "./global.type";

export type AnnualRBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type ReportsProps = {
  id?: number;
  reports?: {
    id?: number;
    heading?: string;
    link?: string;
  };
};

export type AnnualRProps = {
  data: {
    annual_reports?: ReportsProps[];
  };
};
