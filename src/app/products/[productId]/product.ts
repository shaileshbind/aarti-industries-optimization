/**
 * Product data types and interfaces for the product inner page
 */

// Supporting interface for product specifications
export interface ProductSpecifications {
  casNumber: string;        // e.g., "106-46-7"
  abbreviation: string;     // e.g., "PDCB"
  iupacName: string;       // e.g., "1,4-Dichlorobenzene"
  chemicalFormula: string; // e.g., "C6H4Cl2"
  commonName: string;      // e.g., "-"
  valueChain: string;      // e.g., "Di Chloro Benzene"
}

// Supporting interface for product documents
export interface ProductDocument {
  type: 'TDS' | 'SDS' | 'RDS';
  url?: string;
  available: boolean;
}

// Collection of product documents
export interface ProductDocuments {
  tds?: string; // URL to Technical Data Sheet
  sds?: string; // URL to Safety Data Sheet
  rds?: string; // URL to Regulatory Data Sheet
}

// Supporting interface for chemical structure
export interface ChemicalStructure {
  svgPath?: string;
  imageUrl?: string;
  altText: string;
}

// Main product data interface
export interface ProductData {
  id: string;
  name: string;
  description: string;
  specifications: ProductSpecifications;
  documents: ProductDocuments;
  chemicalStructure?: ChemicalStructure;
  features: string[];
  applications: string[];
}

// Component prop types
export interface ProductPageProps {
  params: {
    productId: string;
  };
}

export interface BreadcrumbProps {
  productName: string;
}

export interface ProductSpecificationsProps {
  specifications: ProductSpecifications;
}

export interface DocumentsSectionProps {
  documents: ProductDocuments;
  productName: string;
}

export interface ChemicalStructureProps {
  structure?: ChemicalStructure;
  chemicalFormula: string;
}

export interface FeaturesApplicationsProps {
  features: string[];
  applications: string[];
}

// API response types
export interface ProductApiResponse {
  success: boolean;
  data?: ProductData;
  error?: string;
}

export interface ProductListApiResponse {
  success: boolean;
  data?: ProductData[];
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error handling types
export interface ProductError {
  code: 'NOT_FOUND' | 'INVALID_ID' | 'SERVER_ERROR' | 'NETWORK_ERROR';
  message: string;
  details?: any;
}

// Loading state types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ProductPageState {
  product?: ProductData;
  loading: LoadingState;
  error?: ProductError;
}