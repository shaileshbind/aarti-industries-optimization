import { ImageProps } from "./global.type";

export type BlogBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

export type LatestBlogProps = {
  data: {
    data: {
      thumbnailImageDesktop: ImageProps;
      thumbnailImageMobile: ImageProps;
      title: string;
      date: string;
      slug: string;
      excerpt: string;
    }[];
    meta: {
      pagination: {
        page: number;
        pageCount: number;
        pageSize: number;
        total: number;
      };
    };
  };

  section_two: {
    latestBlogTitle: string;
    ctaTitle: string;
  };
};

export type BlogInnerProps = {
  params: { blogInner: string };
};

export type CaseStuydInnerProps = {
  params: { caseStudyInner: string };
};

export type PointerProps = {
  title: string;
  description: string;
};

export type RelatedBogsProps = {
  thumbnailImageDesktop: { url: string };
  date: string;
  excerpt: string;
  slug: string;
  title?: string;
};

export type BlogDataProps = {
  thumbnailImageDesktop: { url: string };
  date: string;
  excerpt: string;
  slug: string;
  id: string | number;
  title?: string;
};

export type BlogAndCaseStudiesProps = {
  data: {
    toggleTabs: {
      title: string;
      id: string | number;
    }[];
  };
  lastestBlogId: string;
};
