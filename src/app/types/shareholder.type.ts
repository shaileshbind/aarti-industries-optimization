import { ImageProps } from "./global.type";

export type ShareHolderBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type TabsYearsContainerProps = {
  data: {
    type: string;
    reports: {
      year: string;
      report: {
        heading: string;
        link: string;
      }[];
    }[];
  }[];
};
