import { ButtonProps } from "./global.type";

export type ExploreProps = {
  data: {
    ExlporeCard: {
      title: string;
      ctaButton: ButtonProps[];
    }[];
  };
};
