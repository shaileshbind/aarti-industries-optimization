import { ButtonProps, ImageProps } from "./global.type";

export type MahasuperBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
    formTitle?:string;
    ctaButton?:ButtonProps;
  };
};

export type ProductPortfolioProps = {
  data: {
    image: ImageProps;
    mobImage: ImageProps;
    cardSectionOneTitle: string;
    cardSectionOneDescription: string;
    cardSectionTwoTitle: string;
    cardSectionTwoDescription: string;
    cardSectionOne: {
      id: string | number;
      title: string;
      description: string;
    }[];
    cardSectionTwo: {
      id: string | number;
      title: string;
      description: string;
    }[];
  };
};

export type CategoryProductsProps = {
  data: {
    title: string;
    card: {
      id: string | number;
      title: string;
      description: string;
      image: ImageProps;
      mobImage: ImageProps;
    }[];
  };
};

export type EmpoweringFarmersProps = {
  data: {
    title: string;
    description: string;
    states: { id: string | number; title: string }[];
    subtitle: string;
    stats: { id: string | number; value: string; description: string }[];
    ctaLink: string;
    ctaTitle: string;
    image: ImageProps;
    bottomText?: string;
  };
};
