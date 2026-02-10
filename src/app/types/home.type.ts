import { ButtonProps, ImageProps, ValueProps } from "./global.type";

export type ButtonHomeProps = {
  title?: string;
  link?: {
    link?: string;
    target?: string;
  };
  externalLink?: string;
  hasExternalLink?: "true" | "false";
};

export type HomeHeroProps = {
  data: {
    banner: {
      card: {
        title: string;
        description: string;
        image: ImageProps;
        mobImage: ImageProps;
        bannerVideo: {
          url: string;
          alternativeText: string;
        };
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
  showBottomLine?: boolean;
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
      link: string;
    }[];
  }[];
  sectionFiveTitle?: string;
};

export type FosteringSafeProps = {
  data?: {
    title?: string;
    description?: string;
    ctaButton?: ButtonProps;
  };
  imgArr?: {
    images?: {
      image?: ImageProps;
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
      BulletPoints: {
        title: string;
      }[];
      ctaButton: ButtonProps;
    }[];
  };
};

export type LatestAtAartiProps = {
  data: {
    sectionTitle?: string;
    //api fallback mapping type
    annualReports?: {
      reportLayout?: {
        reports?: {
          id?: number;
          heading?: string;
          date?: string;
          link?: string;
          description?: string;
          thumbnailImageDesktop?: ImageProps;
          file?: { url?: string };
        }[];
      }[];
    }[];
    card?: {
      id?: number;
      news?: {
        id?: number;
        category?: string;
        ctaButton?: ButtonProps;
        news?: {
          id?: string;
          newsDescription?: string;
          date?: string;
          link?: string;
          image?: ImageProps;
          mobImage?: ImageProps;
          ctaButton?: ButtonHomeProps;
        }[];
      };
      report_and_publication?: {
        id?: number;
        category?: string;
        ctaButton?: ButtonProps;
        annual_reports?: {
          reportLayout?: {
            reports?: {
              id?: number;
              heading?: string;
              date?: string;
              description?: string;
              link?: string;
              thumbnailImageDesktop?: ImageProps;
              file?: { url?: string };
            }[];
          }[];
        }[];
      };
      events?: {
        id?: number;
        category?: string;
        ctaButton?: ButtonProps;
        events?: {
          id?: string;
          description?: string;
          date?: string;
          link?: string;
          image?: ImageProps;
          mobImage?: ImageProps;
          ctaButton?: ButtonHomeProps;
        };
      };
    };
  };
};

export type LatestAtAartiPropsAPI = {
  data?: {
    annualReports?: {
      reportLayout?: {
        reports?: {
          id?: number;
          heading?: string;
          date?: string;
          link?: string;
          description?: string;
          thumbnailImageDesktop?: ImageProps;
          file?: { url?: string };
        }[];
      }[];
    }[];
    news?: {
      id?: string;
      newsDescription?: string;
      date?: string;
      link?: string;
      image?: ImageProps;
      mobImage?: ImageProps;
      ctaButton?: ButtonHomeProps;
    }[];
    events?: {
      id?: string;
      description?: string;
      date?: string;
      link?: string;
      image?: ImageProps;
      mobImage?: ImageProps;
      ctaButton?: ButtonHomeProps;
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
    ctaButton: ButtonProps;
  };
  titleClassName?: string;
  src?: string;
  className?: string;
};

export type HomeExploreProps = {
  data: {
    title?: string;
    ctaButton?: ButtonProps[];
    formTitle?: string;
  }[];
};