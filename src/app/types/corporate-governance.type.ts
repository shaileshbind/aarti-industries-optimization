import { ReportsProps } from "./annual-reports.type";
import { ButtonProps, ImageProps } from "./global.type";

export type CorporateBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
    ctaButton: ButtonProps;
  };
};

export type OurPhilosophyProps = {
  data: {
    heading: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type OurCodeAndPoliciesProps = {
  data: {
    title: string;
    sectionTitle: string;
    code_and_policy_reports?: ReportsProps[];
    ctaButton: ButtonProps;
  };
};

export type LeaderProps = {
  id?: number;
  name?: string;
  designation?: string;
};

export type IndependentDirectorsProps = {
  data: {
    committee?: {
      id?: number;
      committeenName?: string;
      members: LeaderProps[];
    }[];
    independentDirectors: {
      title: string;
      independent_directors: LeaderProps[];
    };
  };
};
