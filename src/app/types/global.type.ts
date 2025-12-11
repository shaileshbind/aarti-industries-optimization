export type ImageProps = {
  url: string;
  alternativeText: string;
};

export type ButtonProps = {
  title: string;
  link?: {
    link: string;
    target: string;
  };
  externalLink?:string;
  hasExternalLink?: "true" | "false";
};

export type ValueProps = {
  value?: string;
  id?: string;
  description?: string;
  image?: ImageProps;
};
