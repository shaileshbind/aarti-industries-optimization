import { SubCategoryWithReportLayout } from "@/app/types/shareholder.type";

export interface SimpleListingProps {
  reportLayout: SubCategoryWithReportLayout[];
}

// Re-export for convenience
export type { SubCategoryWithReportLayout as SimpleListingLayout } from "@/app/types/shareholder.type";
