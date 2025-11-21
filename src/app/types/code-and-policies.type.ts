import { ImageProps } from "./global.type";

export type CPBannerProps = {
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

export type CPReportProps = {
  data: {
    code_and_policy_reports?: ReportsProps[];
  };
};
