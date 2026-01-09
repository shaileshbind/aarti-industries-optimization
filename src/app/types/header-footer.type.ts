import { ImageProps } from "./global.type";

export type HeaderProps = {
  data: {
    Logo: {
      link?: string;
      Logo?: ImageProps;
    };
    menu: {
      id?: number;
      menuTitle?: string;
      image?: ImageProps;
      subMenu?: {
        id?: number;
        title?: string;
        item?: {
          id?: number;
          title?: string;
          externalLink?: string | null;
          target?: string;
          cta_link?: {
            id?: number;
            documentId?: string;
            link?: string | null;
            createdAt?: string;
            updatedAt?: string;
            publishedAt?: string | null;
            locale?: string | null;
          } | null;
        }[];
      }[];
    }[];
    ctaButton?: {
      id?: number;
      title?: string;
      link?: string;
      externalLink?: string;
      target?: string;
    };
  };
};
export type FooterProps = {
  data: {
    Logo: {
      link?: string;
      Logo?: ImageProps;
    };
    menu: {
      id?: number;
      category?: string;
      subMenu?: {
        id?: number;
        title?: string;
        externalLink?: string;
        item?: {
          id?: number;
          subMenuTitle?: string;
          externalLink?: string;
          cta_link?: {
            link?: string;
          };
        }[];
      }[];
    }[];
    FollowUs: {
      id?: number;
      icon?: string;
      link?: string;
      image?: ImageProps;
      mobImage?: ImageProps;
    }[];
    Legal: {
      id?: number;
      leftText?: string;
      data: {
        id?: number;
        text?: string;
        link?: string;
      }[];
    };
  };
};
