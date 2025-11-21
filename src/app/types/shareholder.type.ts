import { ImageProps } from "./global.type";

export type ShareHolderBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type ReportsProps = {
  year: string;
  report: {
    id: string;
    heading: string;
    link: string;
  }[];
};

export type TabsYearsContainerProps = {
  data: {
    type: string;
    reports: ReportsProps[];
  }[];
};
