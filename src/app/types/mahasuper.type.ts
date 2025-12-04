import { ButtonProps, ImageProps } from "./global.type";

export type MahasuperBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
    btnTitle: string;
    btnLink: string;
  };
};


export type ProductPortfolioProps = {
    data: {
      image: ImageProps;
      mobImage: ImageProps;
      leftSection: {
        title: string;
        ctaButton: ButtonProps;
        description: {
            content: string;
            items: { title: string }[];
        };
        accordion: {
          title: string;
          items: { title: string }[];
        };
      };
       
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
      stats: { id: string | number; value: string; label: string }[];
      ctaLink: string;
      ctaTitle: string;
      image: ImageProps;
    };
  };