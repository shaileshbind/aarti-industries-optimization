import { ButtonProps, ImageProps } from "./global.type";

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
      };
    }[];
  };
};

export type ExploreProps = {
  data: {
    exploreMore: {
      title: string;
      ctaButton: ButtonProps[];
    }[];
  };
};
