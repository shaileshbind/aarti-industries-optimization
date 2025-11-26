import { ImageProps } from "./global.type";

export type AnnualRBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type ReportItemProps = {
  id?: number;
  heading?: string;
  link?: string;
};

export type ReportsProps = {
  id?: number;
  reportLayout?: {
    id?: number;
    reports?: ReportItemProps[];
  }[];
};

export type DynamicReportsData = {
  [key: string]: ReportsProps[];
};

export type AnnualRProps = {
  data: {
    annual_reports?: ReportsProps[];
  };
};
