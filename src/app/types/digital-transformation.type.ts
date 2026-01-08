import { ButtonProps, ImageProps } from "./global.type";

export type DigitalBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
    ctaButton?:ButtonProps;
  };
};

export type ScaleUpEngineProps = {
  data: {
    title: string;
    description: string;
    card: {
      id: string | number;
      title: string;
      description: string;
      bottomDescription: string;
      ctaButton: ButtonProps;
      image: ImageProps;
      BulletPoints: {
        title: string;
      }[];
    }[];
  };
};

export type TitleCardsContainerProps = {
  data: {
    title: string;
    card: {
      id: string | number;
      title: string;
      description: string;
      image: ImageProps;
    }[];
  };
};

export type MiddleBannerProps = {
  data: {
    title: string;
    description: string;
    image?: ImageProps;
    mobImage?: ImageProps;
    ctaButton?: ButtonProps;
  };
};

export type CardProps = {
  category: string;
  id: string | number;
  card: {
    id: string | number;
    title: string;
    description: string;
    ctaButton: ButtonProps;
    image: ImageProps;
    BulletPoints: {
      title: string;
    }[];
  }[];
};

export type DrivingCrossFunctionalProps = {
  data: {
    title?: string;
    details: CardProps[];
  };
};

export type ExploreCardsProps = {
  data: {
    title?: string;
    ctaButton?: ButtonProps[];
    formTitle?:string;
  }[];
};
