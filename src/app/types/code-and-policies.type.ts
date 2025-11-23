import { ImageProps } from "./global.type";

export type CPBannerProps = {
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

export type CPReportProps = {
  data: {
    code_and_policy_reports?: ReportsProps[];
  };
};
