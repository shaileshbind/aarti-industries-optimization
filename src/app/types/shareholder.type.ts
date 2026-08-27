import { ImageProps } from "./global.type";

export type ShareHolderBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

// Common Report type used across all templates
export type Report = {
  id: string | number;
  heading: string;
  link: string;
  date?: string;
  file?: { url: string };
};

export type SimpleListLayout = {
  __component: "reports.simple-list";
  id: number;
  reports: Report[];
};

// Simple List Layout
export type SubCategoryWithReportLayout = {
  __component: "reports.sub-category-with-report";
  id: number;
  subCategory: string;
  reports: {
    id: number;
    reports: Report[];
  }[];
};

// Year and Report Layout
export type YearAndReportLayout = {
  __component: "reports.sub-year-and-report";
  id: number;
  subCategory: string;
  yearAndReport: {
    id: number;
    year: string | number;
    report: Report[];
  }[];
};

// Sub-category with CKEditor HTML content
export type SubCategoryWithCkLayout = {
  __component: "reports.sub-category-with-ck";
  id: number;
  subCategory: string;
  content?: string;
};

// Year and Quarter Layout
export type FinancialYear = {
  id: number;
  documentId: string;
  year: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
};

export type Quarter = {
  id: number;
  quarter: string;
  financial_year: FinancialYear | null;
  report: Report[];
};

export type YearAndQuarterLayout = {
  __component: "reports.sub-year-and-quarter";
  id: number;
  subCategory: string;
  yearAndQuarter: {
    id: number;
    year: string | number;
    quarter: Quarter[];
  }[];
};

// Contact Details Layout
export type ContactDetailsLayout = {
  __component: "reports.contact-details";
  id?: number;
  category?: string;
  subCategory?: string;
  contactDetails?: ContactDetailsRawEntry[];
  address?: ContactDetailsRawEntry;
};

// Union type for all possible report layouts
export type ReportLayout =
  | SubCategoryWithReportLayout
  | SubCategoryWithCkLayout
  | YearAndReportLayout
  | YearAndQuarterLayout
  | SimpleListLayout
  | ContactDetailsLayout;

/** Single contact entry from API (reports.contact-details) – tag, name, address, mobileNo, location */
export type ContactDetailsRawEntry = {
  id?: number;
  tag?: string | null;
  name?: string | null;
  address?: string | null;
  mobileNo?: string | null;
  location?: string | null;
  [key: string]: unknown;
};

export type ContactDetailsLayoutItem = {
  category: string;
  contact: ContactDetailsRawEntry | null | undefined;
};

/** Raw reportLayout item from API (_component: "reports.contact-details") */
export type ContactDetailsRawItem = {
  id?: number;
  _component?: string;
  category?: string;
  subCategory?: string;
  contactDetails?: ContactDetailsRawEntry[];
  address?: ContactDetailsRawEntry; // legacy single object
};

export type ContactDetailsTabData = {
  category: string;
  reportLayout: ContactDetailsRawItem[];
};

// Main container props
export type TabsYearsContainerProps = {
  data: {
    id: number;
    documentId: string;
    category: string;
    reportLayout: ReportLayout[];
  }[];
};

