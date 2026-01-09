import { ButtonProps, ImageProps } from "./global.type";

export type WebinarApiItem = {
  id?: number;
  documentId?: string;
  title: string;
  date?: string;
  image: ImageProps | null;
  mobImage?: ImageProps | null;
  media?: {
    url: string;
    mime?: string;
    alternativeText?: string | null;
  } | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type WebinarsResponse = {
  pressData: {
    data: WebinarApiItem[];
    meta?: {
      pagination?: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
};

export type WhatSetsProps = {
  data: {
    title: string;
    image: ImageProps;
    mobImage: ImageProps;
    ctaButton: ButtonProps;
    cards: {
      id: string | number;
      title: string;
      image: ImageProps;
      mobImage: ImageProps;
    }[];
  };
};

export type VideoScrollBarContainerProps = {
  data: {
    title: string;
    card: {
      title: string;
      date?: string;
      image: ImageProps;
      media: {
        url: string;
        mime?: string;
      };
    }[];
  };
  webinarsData: WebinarApiItem[] | WebinarsResponse;
};

export type ExploreProps = {
  data: {
    exploreMore: {
      title: string;
      ctaButton: ButtonProps[];
      formTitle?: string;
    }[];
  };
};
