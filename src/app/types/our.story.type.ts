import { ButtonProps, ImageProps } from "./global.type";

export type OurStoryHeroProps = {
  data: {
    id: number;
    sectionTitle: string;
    title: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type AboutCompanyProps = {
  data: {
    id: number;
    sectionTitle: string;
    description: string;
    ctaButton: ButtonProps;
  };
};

export type GlobalInnovationProps = {
  data: {
    id: number;
    title: string;
    focusSectionTitle?: string | null;
    description?: string | null;
    image?: ImageProps | null;
    ctaButton?: ButtonProps | null;
    mobImage?: ImageProps | null;
    focus_item: {
      order: string;
      id: number;
      description: string;
    }[];
    sectionTitle?:string;
    formTitle?:string;
  };
  useBulletes?: boolean;
};

export interface TimelineMilestone {
  id: number;
  year: string;
  title: string;
  description: string | null;
  note: string | null;
}

interface Milestone {
  id: number;
  name: string;
  date_range: string;
  images: ImageProps[];
  timeline_milestones: TimelineMilestone[];
}

export interface TimelineData {
  data: {
    id: number;
    sectionTitle: string;
    milestone: Milestone[];
  };
}


export type OurExpProps = {
  data: {
    title: string;
    ctaButton: ButtonProps[];
    formTitle?:string;
  }[];
};