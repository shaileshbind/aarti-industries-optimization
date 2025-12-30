import { ReportItemProps } from "./annual-reports.type";
import { ImageProps } from "./global.type";
import { YearAndQuarterLayout } from "./shareholder.type";

export type OrangeCardCategoryListingPageProps = {
  template: string;
};

export type IntimationOfStockExchangeProps = {
  template: string;
};

export type ListingContainerProps = {
  data: {
    banner: {
      title: string;
      description: string;
      image: ImageProps;
      mobImage: ImageProps;
    };
    reportLayout?: Array<{
      reports: ReportItemProps[];
    }>;
  };
  categories: {
    category: string;
    slug: string;
  }[];
};

export type StockExchangeContainerProps = {
  data: {
    banner: {
      title: string;
      description: string;
      image: ImageProps;
      mobImage: ImageProps;
    };
    reportLayout?: YearAndQuarterLayout[];
  };
  categories: {
    category: string;
    slug: string;
  }[];
};

export type DisclosureTabsProps = {
  categories: {
    category: string;
    slug: string;
  }[];
};

export type DisclosureListingPageProps = {
  reports: ReportItemProps[];
};

export type SearchBannerProps = {
  centerText?: boolean;
  leftDesc?: boolean;
  tag?: string;
  title?: string;
  desc?: string;
  btnTitle?: string;
  btnLink?: string;
  image?: string;
  mobImage?: string;
  mobAlt?: string;
  alt?: string;
  fullBg?: boolean;
  secondaryBtnLeftTitle?: string;
  secondaryBtnLeftLink?: string;
  secondaryBtnRightTitle?: string;
  secondaryBtnRightLink?: string;
  placeholder?: string;
  lineClassName?: string;
  bottomMiddleStarClassName?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  showStar3?: boolean;
  showStar2?: boolean;
};
