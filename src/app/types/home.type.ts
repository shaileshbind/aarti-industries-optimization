import { ButtonProps, ImageProps, ValueProps } from "./global.type";

export type HomeHeroProps = {
  data: {
    banner: {
      card: {
        title: string;
        description: string;
        image: ImageProps;
        ctaButton: ButtonProps;
      }[];
      category: string;
    }[];
  };
};

export type FourtyYearsProps = {
  data: {
    sectionTitle: string;
    description: string;
    title: string;
    ctaButton: ButtonProps;
  };
};

export type GlobalPartnerProps = {
  data: {
    leftTitle: string;
    righSection: ValueProps[];
  };
};

export type SustainableChemProps = {
  data: {
    leftText: string;
    rightText: string;
    images: ImageProps[];
    mainSection: {
      id: string | number;
      category: string;
      description: string;
      values: {
        value: string;
        description: string;
      }[];
      image: ImageProps;
      mobImage: ImageProps;
      ctaButton: ButtonProps;
    }[];
  };
};

export type ByUseSectionProps = {
  data: {
    title: string;
    description: string;
    category: string;
    id: string;
    ctaButton: ButtonProps;
    card: {
      title: string;
      image: ImageProps;
    }[];
  }[];
};

export type FosteringSafeProps = {
  data: {
    title: string;
    description: string;
    ctaButton: ButtonProps;
  };
  imgArr: {
    images: {
      image: ImageProps;
    }[];
  };
};

export type FrameworkForgedProps = {
  data: {
    title: string;
    card: {
      id: string | number;
      title: string;
      description: string;
      image: ImageProps;
    }[];
    partnerWithUsCta: ButtonProps;
  };
};

export type LatestAtAartiProps = {
  data: {
    sectionTitle: string;
    card: {
      category: string;
      post_category: {
        id: string;
        name: string;
        slug: string;
        posts: {
          id: string;
          title: string;
          slug: string;
          description: string;
          image: ImageProps;
          mobImage: ImageProps;
        }[];
      };
    }[];
  };
};

export type CategoryDataProps = {
  image: { url: string };
  title: string;
  description: string;
  slug: string;
}[];

export type ContactBannerProps = {
  data: {
    title: string;
    ctaButton: ButtonProps[];
  }[];
};
