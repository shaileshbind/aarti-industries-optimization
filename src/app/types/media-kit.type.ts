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
  };
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

export type MediaContainerProps = {
  data: {
    sectionVideos: VideoProps[];
    sectionImages: CardImageProps[];
  }[];
};
