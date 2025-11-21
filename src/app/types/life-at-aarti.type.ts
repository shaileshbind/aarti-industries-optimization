import { ButtonProps, ImageProps, ValueProps } from "./global.type";

export type LAABannerProps = {
  data: {
    sectionTitle?: string;
    title?: string;
    description?: string;
    ctaButtons: ButtonProps;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type LAAValueProps = {
  data2: {
    title?: string;
    data?: ValueProps[] | undefined;
  };
};

export type LAAVisionProps = {
  data: {
    title?: string;
    images?: {
      leftText?: string;
      rightText?: string;
      leftTop?: ImageProps;
      rightTop?: ImageProps;
      leftBottom?: ImageProps;
      rightBottom?: ImageProps;
    };
    content?: {
      id?: number;
      category?: string;
      card?: {
        id?: number;
        title?: string;
        description?: string;

        image: ImageProps;
        mobImage: ImageProps;

        BulletPoints?: {
          id?: number;
          title?: string;
        }[];
      }[];
    }[];
  };
};

export type LAAEngageProps = {
  data: {
    title?: string;
    description?: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type LAANirvanaProps = {
  title?: string;
  description?: string;
  cards?: {
    id?: number;
    description?: string;
    image?: ImageProps;
    hasGreyBackgroung?: string;
    icon?: ImageProps;
    mobImage?: ImageProps;
    flipImage?: ImageProps;
  }[];
};

export type LAAWorldProps = {
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

export type LAAContactProps = {
  data: {
    title: string;
    ctaButton: ButtonProps;
  };
};

export type LAAMobSliderProps = {
  images?: {
    id?: number;
    sequence?: number;
    image?: ImageProps;
  }[];
};
