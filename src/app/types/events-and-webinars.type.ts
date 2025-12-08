import { ButtonProps, ImageProps } from "./global.type";

export type EventsBannerProps = {
  data: {
    title: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type EventGalleryImage = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  mime: string;
  ext: string;
  isUrlSigned: boolean;
};

export type UpcomingEventData = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  description: string;
  globalTeamCtaTitle: string;
  globalTeamCtaLink: string | null;
  galleryCtaTitle: string;
  galleryCtaLink: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  eventGallery: EventGalleryImage[];
  image: ImageProps | null;
  mobImage: ImageProps | null;
};

export type UpcomingEventsResponse = {
  pressData: {
    data: UpcomingEventData[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
};

export type EventsListingProps = {
  pastEvent?: boolean;
  upcomingEventsData: UpcomingEventData[] | UpcomingEventsResponse | { pressData?: UpcomingEventsResponse['pressData']; data?: UpcomingEventData[] } | null;
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

export type PodcastsResponse = {
  data: {
    title: string;
    podcasts: Podcast[];
  };
};

export type PodcastApiResponse = {
  pressData: {
    data: PodcastApiItem[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
};

export type PodcastApiItem = {
  id: number;
  documentId: string;
  episodeNumber?: string;
  episodeLabel?: string;
  duration?: string;
  date?: string;
  title: string;
  slug: string;
  speakerInfo?: string;
  ctaTitle?: string;
  ctaLink?: string | null;
  externalLink?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ImageProps | null;
  mobImage: ImageProps | null;
  file: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    mime: string;
    ext: string;
    isUrlSigned: boolean;
  } | null;
};

export type Podcast = {
  title: string;
  episodeNumber?: string;
  episodeLabel?: string;
  duration?: string;
  date?: string;
  speakerInfo?: string;
  image: ImageProps;
  mobImage: ImageProps;
  ctaButton?: ButtonProps;
};

export type PodcastListingProps = {
  podcastsData: PodcastApiItem[] | PodcastApiResponse | PodcastsResponse;
  data: {
    title: string;
  };
};