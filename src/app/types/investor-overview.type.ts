import { ButtonProps, ImageProps } from "./global.type";

export type InvestorBannerProps = {
  data: {
    sectionTitle?: string;
    title?: string;
    description?: string;
    ctaButton?: ButtonProps;
    image: ImageProps;
    mobImage: ImageProps;
  };
};
export type InvestorsBlueProps = {
  data: {
    reports?: {
      id?: number;
      heading?: string;
      link?: string;
      file?: {
        id?: number;
        url?: string;
      };
    }[];
  };
};

export type InvestorPeopleProps = {
  data: {
    title?: string;
    testimonials?: {
      id?: number;
      designation?: string;
      name?: string;
      testimonialText?: string;
      image?: ImageProps;
      mobImage?: ImageProps;
    }[];
  };
};

export type InvestorQuarterlyProps = {
  data: {
    title?: string;
    description?: string;
    card?: {
      id?: number;
      title?: string;
      value?: string;
      description?: string;
    }[];
  };
};

export type InvestorContactProps = {
  data: {
    sectionTitle?: string;
    image?: ImageProps;
    mobImage?: ImageProps;
    investor_contacts?: {
      id?: number;
      tag?: string;
      name?: string;
      address?: string;
      mobile?: string;
      email?: string;
      fax?: string;
      website?: string;
    }[];
  };
};

export type InvestorHeadlines = {
  data: {
    sectionTitle?: string;
    pressRelease?: {
      title?: string;
      press_releases?: {
        id?: number;
        report?: {
          id?: number;
          heading?: string;
          link?: string;
          file?: {
            url?: string;
          };
        }[];
      }[];
      ctaButton?: {
        id?: number;
        title?: string;
        externalLink?: string;
      };
    };
    mediaCoverage?: {
      title?: string;
      ctaButton?: {
        id?: number;
        title?: string;
        externalLink?: string;
      }[]
    };
  };
};

export type InvestorKeyProps = {
  data: {
    leftSection?: {
      title?: string;
      content?: {
        id?: number;
        heading?: string;
        link?: string;
        file?: {
          id?: number;
          url?: string;
        };
      }[];
    };
    rightSection?: {
      title?: string;
      content?: {
        id?: number;
        category?: string;
        years?: string[];
        values?: string[];
      }[];
    };
  };
};
export type InvestorExpProps = {
  data: {
    id?: number;
    exploreMore: {
      id?: number;
      title?: string;
      ctaButton?: ButtonProps[];
    }[];
  };
};
