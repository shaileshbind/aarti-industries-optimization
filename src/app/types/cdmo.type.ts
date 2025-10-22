import { ButtonProps, ImageProps } from "./global.type";

export type CDMOBannerProps = {
  data: {
    title: string;
    sectionTitle: string;
    description: string;
    ctaButton: ButtonProps;
    image: ImageProps;
  };
};

export type CDMOPartnerProps = {
  data: {
    description: string;
    card: {
      title: string;
      image: ImageProps;
      description: string;
    }[];
  };
};

export type CDMODrivingProps = {
  data: {
    image: ImageProps;
    mobImage: ImageProps;
    leftSection: {
      title: string;
      ctaButton: ButtonProps;
      description: string;
    };
    righSection: {
      values: {
        value: string;
        description: string;
      }[];
    };
  };
};

export type CDMOE2EProps = {
  data: {
    title: string;
    description: string;
    content: {
      category: string;
      id: string;
      card: {
        title: string;
        BulletPoints: {
          title: string;
        }[];
        image: ImageProps;
      }[];
    }[];
  };
};

export type CDMOSplchemProps = {
  data: {
    sectionTitle: string;
    cards: {
      title: string;
      image: ImageProps;
    }[];
  };
};

export type CDMOSafegreenProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
  }[];
};

export type GloballyCertifiedProps = {
  data: {};
};

export type CDMOExpProps = {
  data: {};
};
