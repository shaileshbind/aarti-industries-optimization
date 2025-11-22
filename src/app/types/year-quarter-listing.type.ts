import { YearAndQuarterLayout, FinancialYear, Quarter } from "@/app/types/shareholder.type";

export interface YearQuarterListingProps {
  reportLayout: YearAndQuarterLayout[];
}

// Re-export for convenience
export type { 
  YearAndQuarterLayout as YearQuarterListingSubCategory,
  FinancialYear,
  Quarter
} from "@/app/types/shareholder.type";