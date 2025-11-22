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
};

// Simple List Layout (for General category)
export type SimpleListingLayout = {
  __component: "reports.simple-list";
  id: number;
  reports: Report[];
};

// Year and Report Layout (for Others category)
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

// Year and Quarter Layout (for IEPF category)
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

// Union type for all possible report layouts
export type ReportLayout =
  | SimpleListingLayout
  | YearAndReportLayout
  | YearAndQuarterLayout;

// Main container props
export type TabsYearsContainerProps = {
  data: {
    id: number;
    documentId: string;
    category: string;
    reportLayout: ReportLayout[];
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
    locale?: string | null;
  }[];
};

// Legacy type for backwards compatibility (deprecated)
export type ReportsProps = YearAndReportLayout;