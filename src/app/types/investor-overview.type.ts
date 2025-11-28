import { ButtonProps , ImageProps} from "./global.type";

export type InvestorWorldProps = {
  data: {
    title?: string;
    leadersCard?: {
      id?: number;
      designation?: string;
      name?: string;
      message?: string;
      image?: ImageProps;
      mobImage?: ImageProps;
    }[];
  };
};


export type InvestorExpProps = {
  data: {
    id?: number;
    exploreMore: {
      id?: number;
      title?: string;
      ctaButton?: ButtonProps[];
    }[];
  };
};
