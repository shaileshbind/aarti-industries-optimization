import { ImageProps } from "./global.type";

export type MediaBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type CorporateVideoProps = {};

export type PhotosProps = {};

export type LogosProps = {};

export type BrndGuidelinesProps = {};

export type BrochuresProps = {};

export type DownloadCardProps = {
  src: string;
  className?: string;
};
