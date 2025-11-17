import { ImageProps } from "./global.type";

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
          link?: string;
          item?:{
            id?:number;
            subMenuTitle?:string;
            subMenuLink?:string;
          }[]
        }[];
      }[];
      FollowUs: {
        id?: number;
        icon?: string;
        link?: string;
        image?: ImageProps;
        mobImage?: ImageProps;
      }[]
      Legal: {
        id?: number;
        leftText?: string;
        data: {
          id?: number;
          text?: string;
          link?: string;
        }[]
      };
  };
};
