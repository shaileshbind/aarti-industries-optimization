import { ButtonProps, ImageProps, ValueProps } from "./global.type";

export type WhoBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type WhoInfoProps = {
  data: {
    description: string;
    leftSection: string;
    righSection: string;
  };
};

export type WhoCardsProps = {
  data: {
    cards: ValueProps[];
  };
};

export type WhoPrinciplesProps = {
  data: {
    description: string;
    content: { value: string; description: string; id: string }[];
  };
};

export type ManagementBoardProps = {
  id: string;
  name: string;
  image: ImageProps;
  designation: string;
  bio: string;
};

export type MeetMindsProps = {
  hideTitle?: boolean;
  progressClassName?: string;
  navigationNextClass?: string;
  navigationPrevClass?: string;
  data: {
    sectionTitle: string;
    management_boards: ManagementBoardProps[];
  };
};

export type ComplexChemProps = {
  data: {
    sectionTitle: string;
    description?:string;
    content: {
      id: string;
      title: string;
      description: string;
      image: ImageProps;
      mobImage: ImageProps;
    }[];
  };
};

export type ShapedByProps = {
  data: {
    id: string;
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
    ctaButton: ButtonProps;
  };
};

export type IndustryAccoladesProps = {
  data: {
    title: string;
    awards: {
      id: string;
      year: string;
      card: {
        id: string;
        title: string;
        image: ImageProps;
        mobImage: ImageProps;
      }[];
    }[];
  };
};

export type ChemCreatesProps = {
  data: {
    sectionTitle?: string;
    blog_case_studies?: {
      id?: number;
      title?: string;
      slug?: string;
      date?: string;
      thumbnailImageDesktop?:ImageProps;
      thumbnailImageMobile?:ImageProps
    }[];
  };
};

export type WhoExpProps = {
  data: {
    ExlporeCard: {
      title: string;
      ctaButton: ButtonProps[];
      formTitle?:string;
    }[];
  };
};
