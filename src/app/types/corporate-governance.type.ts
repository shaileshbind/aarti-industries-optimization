import { ReportsProps } from "./annual-reports.type";
import { ImageProps } from "./global.type";

export type CorporateBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
    btnTitle: string;
    btnLink: string;
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
    ctaButton1: {
      title: string;
      link: {
        link: string;
      };
    };
  };
};

export type LeaderProps = {
  id: number | string;
  image: ImageProps;
  mobImage: ImageProps;
  name: string;
  bio: string;
  designation: string;
};

export type IndependentDirectorsProps = {
  data: {
    committee: {
      title: string;
      committees: LeaderProps[];
    };
    independentDirectors: {
      title: string;
      independent_directors: LeaderProps[];
    };
  };
};
