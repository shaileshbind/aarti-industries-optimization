import { ButtonProps, ImageProps } from "./global.type";

export type PartnershipBannerProps = {
  data: {
    title: string;
    ctaButtons: ButtonProps[];
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type ParallaxCardSectionProps = {
  section_two: {
    description: string;
    images: {
      image: ImageProps;
      mobImage: ImageProps;
    }[];
  };
  section_three: {
    heading: string;
    title: string;
    image: ImageProps;
    mobImage: ImageProps;
    accordion: {
      title: string;
      description: string;
      description_two: string;
      ctaButton: ButtonProps;
      bulletPoints: {
        title: string;
      }[];
    }[];
  };
};

export type WhyAartiProps = {
  data: {
    title: string;
    content: {
      title: string;
      description: string;
      image: ImageProps;
      mobImage: ImageProps;
      BulletPoints: {
        title: string;
      }[];
    }[];
  };
};

export type WorksWithPartnersProps = {
  data: {
    sectionTitle: string;
    card: {
      title: string;
      description: string;
    }[];
  };
  className?: string;
};

export type PartneshipExploreProps = {
  data: {
    exploreMore: {
      title: string;
      ctaButton: ButtonProps[];
    };
  }[];
};
