import { YearAndReportLayout } from "./shareholder.type";

export interface YearAndListingProps {
  reportLayout: YearAndReportLayout[];
}

// Re-export for convenience
export type { YearAndReportLayout as YearAndListingSubCategory } from "./shareholder.type";