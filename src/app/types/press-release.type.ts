import { ImageProps } from "./global.type";

export type PressReleaseBannerProps = {
  data: {
    sectionTitle: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

// Press Release Item
export type PressReleaseItem = {
  id: string | number;
  heading?: string;
  shortDescription?: string;
  date?: string;
  link: string;
  slug?: string;
  pdfContent?: string;
  file?: {
    id?: number;
    url?: string;
  };
  financial_year?: {
    id?: number;
    year?: string;
  };
};

// Year and Press Release Layout
export type YearAndPressReleaseLayout = {
  id: number;
  financial_year?: {
    year?: string | number;
  };
  report?: {
    id: number;
    heading: string;
    link: string;
    file?: {
      id?: number;
      url?: string;
    };
  }[];
};

export type PressReleaseYearListingProps = {
  yearAndPressReleases?: unknown;
  latestReleases?: PressReleaseItem[];
};
