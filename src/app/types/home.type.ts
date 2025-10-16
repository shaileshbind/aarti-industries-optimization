export type HomeHeroProps = {
  data: {
    banner: {
      card: {
        title: string;
        description: string;
        image: {
          url: string;
          alternativeText: string;
        };
        ctaButton: {
          title: string;
          link: string;
        };
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
    ctaButton: {
      title: string;
      link: string;
    };
  };
};

export type GlobalPartnerProps = {
  data: {
    leftTitle: string;
    righSection: {
      id: string;
      image: {
        url: string;
        alternativeText: string;
      };
      mobImage: {
        url: string;
        alternativeText: string;
      };
      values: {
        value: string;
        description: string;
      }[];
    }[];
  };
};

export type SustainableChemProps = {
  data: {};
};

export type ByUseSectionProps = {
  data: {};
};

export type FosteringSafeProps = {
  data: {};
};

export type FrameworkForgedProps = {
  data: {};
};

export type LatestAtAartiProps = {
  data: {};
};

export type ContactBannerProps = {
  data: {};
};
