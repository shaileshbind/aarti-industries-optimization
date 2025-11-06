import { ButtonProps, ImageProps } from "./global.type";

export type EnvBannerProps = {
  data: {
    title?: string;
    sectionTitle?: string;
    image?: ImageProps;
    mobImage?: ImageProps;
  };
};

export type EnvInfoProps = {
  data: {
    heading: string;
    leftText: string;
    righText: string;
    card: {
      id?: number;
      value?: string;
      description?: string;
      image?: ImageProps;
      mobImage?: ImageProps;
    }[];
  };
};

export type EnvStrongProps = {
  data: {
    title: string;
    description: string;
    image?: ImageProps;
    mobImage?: ImageProps;
    ctaButton?: ButtonProps;
  };
};

export type EnvRespChemProps = {
  data: {
    title: string;
    cardWithCategory: {
      id?: number;
      category?: string;
      content?: {
        id?: number;
        description?: string;
        image?: {
          id?: number;
          url: string;
          alternativeText: string;
        };
        mobImage?: ImageProps;
        ctaButton?: ButtonProps;
        content?: {
          id?: number;
          sdgPlay?: {
            sdgPlayTitle?: string;
            images?: {
              id?: number;
              url?: string;
              alternativeText?: string;
            }[]
          }
          materialTopics?: {
            id?: number;
            label?: string;
            value?: string;
          };
          capitalImpacted?: {
            id?: number;
            title?: string;
            value?: string;
          };
          target?: {
            id?: number;
            label?: string;
            value?: string;
          };
          performance?: {
            id?: number;
            label?: string;
            bulletPoints?: {
              id?: number;
              title?: string;
            }[];
          };
        }[]
      }
    }[];
  };
};

export type EnvLifeProps = {
  data: {
    sectionTitle: string;
    post_categories: {
      posts: {
        id: number;
        title: string;
        slug: string;
        description: string;
        image: ImageProps;
        mobImage: ImageProps;
      }[];
    }[];
  };
};

export type EnvExpProps = {
  data: {
    title: string;
  };
};
