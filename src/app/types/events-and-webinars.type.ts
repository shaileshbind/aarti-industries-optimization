import { ButtonProps, ImageProps } from "./global.type";

export type EventsBannerProps = {
  data: {
    title: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};
export type EventsListingProps = {
  pastEvent?: boolean;
  data: {
    title: string;
    events: {
      title: string;
      date?: string;
      location?: string;
      description?: string;
      image: ImageProps;
      mobImage: ImageProps;
      ctaButton?: ButtonProps;
    }[];
  };
};
export type PodcastListingProps = {
  data: {
    title: string;
    podcasts: {
      title: string;
      episodeNumber?: string;
      episodeLabel?: string;
      duration?: string;
      date?: string;
      speakerInfo?: string;
      image: ImageProps;
      mobImage: ImageProps;
      ctaButton?: ButtonProps;
    }[];
  };
};