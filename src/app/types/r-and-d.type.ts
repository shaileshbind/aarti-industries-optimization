import { ButtonProps, ImageProps, ValueProps } from "./global.type";

export type RDHeroBannerProps = {
  data: {
    title: string;
    pageHeading: string;
    description: string;
    ctaButton: ButtonProps;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type RDInfoProps = {
  data: {
    description: string;
    valuesCard: ValueProps[];
    rightSectionImage: ImageProps;
  };
  showLine?: boolean;
};

export type RDInnovatingChemProps = {
  data: {
    heading: string;
    cards: {
      id: string;
      title: string;
      description: string;
      image: ImageProps;
    }[];
  };
};

export type RDAnalyticalExcProps = {
  data: {
    leftText: string;
    rightText: string;
    image: ImageProps;
  };
  sliderData: {
    details: {
      title: string;
      id: string;
      description: string;
      ctaButton: ButtonProps;
      image: ImageProps;
      BulletPoints: {
        title: string;
        id: string;
      }[];
    }[];
  };
};

export type RDDiverseChemProps = {
  data: {
    title: string;
    description: string;
  };
  data2: {
    newChemistries: {
      heading: string;
      content: {
        id: string;
        heading: string;
        cards: {
          id: string;
          title: string;
          image?: ImageProps;
          mobImage?: ImageProps;
        }[];
      }[];
    };
    existingChemistries: {
      heading: string;
      content: {
        id: string;
        heading: string;
        cards: {
          id: string;
          title: string;
          image?: ImageProps;
          mobImage?: ImageProps;
        }[];
      }[];
    };
  };
};

export type RDCardProps = {
  category: string;
  id: string | number;
  card: {
    id: string | number;
    title: string;
    description: string;
    ctaButton: ButtonProps;
    image: ImageProps;
    BulletPoints: {
      title: string;
    }[];
  }[];
};

export type RDSafetyProps = {
  data: {
    details: RDCardProps[];
  };
};

export type RDExploreProps = {
  data: {
    exploreMore: {
      title: string;
      ctaButton: ButtonProps[];
    };
  }[];
};
