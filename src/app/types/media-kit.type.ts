import { ImageProps } from "./global.type";

export type MediaBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type VideoProps = {
  video: {
    url: string;
    alternativeText: string;
  };
  videoThumbnail?: ImageProps;
};

export type CardImageProps = {
  title: string;
  imageCards: {
    title: string;
    file: { url: string };
    image: ImageProps;
    mobImage: ImageProps;
    description: string;
  }[];
};

export type CorporateVideoProps = {
  data: {
    sectionVideos: VideoProps[];
    title: string;
  };
};

export type VendorFullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
};

export type PhotosProps = {
  data: {
    sectionImages: CardImageProps[];
  };
};

export type LogosProps = {
  data: {
    sectionImages: CardImageProps[];
  };
};

export type BrandGuidelinesProps = {
  data: {
    sectionImages: CardImageProps[];
  };
};

export type BrochuresProps = {
  data: {
    sectionImages: CardImageProps[];
  };
};

export type DownloadCardProps = {
  src: string;
  className?: string;
  downloadUrl: string;
  filename?: string;
};

export type TabProps = {
  title: string;
  id: string;
};

export type MediaContainerItem = {
  title: string;
  id: string;
  sectionVideos: VideoProps[];
  sectionImages: CardImageProps[];
};

export type MediaContainerProps = {
  data: MediaContainerItem[];
};
