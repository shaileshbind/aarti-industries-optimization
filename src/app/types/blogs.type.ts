import { ImageProps } from "./global.type";

export type BlogBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};
