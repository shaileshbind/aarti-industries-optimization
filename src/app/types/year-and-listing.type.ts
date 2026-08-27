import {
  YearAndReportLayout,
  SubCategoryWithCkLayout,
} from "./shareholder.type";

export type YearAndListingLayout = YearAndReportLayout | SubCategoryWithCkLayout;

export interface YearAndListingProps {
  reportLayout: YearAndListingLayout[];
}

// Re-export for convenience
export type { YearAndReportLayout as YearAndListingSubCategory } from "./shareholder.type";
