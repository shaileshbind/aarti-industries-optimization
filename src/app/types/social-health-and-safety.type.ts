
import { ButtonProps, ImageProps } from "./global.type";

export type SocialHealthAndSafetyBannerProps = {
  data: {
    tag: string;
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
    ctaButton: ButtonProps;
  };
};

export type OurResponsibilityProps = {
  data: {
    title: string;
    leftSection: {
        id: string | number;
        title: string;
        description: string;
    }[];
    rightSection: {
        id: string | number;
        title: string;
        description: string;
    }[];
  };
};
export type DrivingEmpowermentProps = {
  data: {
    heading?: string;
    cards: DrivingTabsSectionProps[] | {
      id: string | number;
      title: string;
      description: string;
      bottomDescription?: string | null;
      BulletPoints: {
        id: string | number;
        title: string;
      }[];
      image: ImageProps;
      mobImage: ImageProps | null;
      ctaButton: ButtonProps | null;
    }[];
  };
};
 
export type EducationDevelopmentProps = {
  data: {
    title: string;
    cards: {
      id: string | number;
      title: string;
      description: string;
      image: ImageProps;
      mobImage: ImageProps;
      bulletPointsTitle: string;
      bulletPoints?: {
        title?: string;
      }[];
      BulletPoints?: {
        title?: string;
      }[];
    }[];
     
  };
};
export type ImpactStoriesSliderProps = {
  data: {
    title: string;
    stories: {
      id: string | number;
      title: string;
      description: string;
      image: ImageProps;
      items: {
        id: string | number;
        title: string;
        description: string;
      }[];
      
    }[];
  };
};

export type DrivingTabsSectionProps = {
  heading?: string;
  id: string | number;
  cards: {
    id: string | number;
    title: string;
    description: string;
    ctaButton: ButtonProps | null;
    image: ImageProps;
    BulletPoints: {
      id?: string | number;
      title: string;
    }[];
  }[];
};

export type GridCardsSocialProps = {
  data: {
    description: string;
    title?: string;
    cards: {
      title: string;
    }[];
  };
  headingClassName?: string;
};

export type SocialExploreProps = {
  data: {
    exploreMore: {
      title: string;
      ctaButton: ButtonProps[];
      formTitle?:string;
    }[];
  };
};