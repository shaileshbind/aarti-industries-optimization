interface DocumentItem {
  id: number;
  documentName: string;
  link: string | null;
}

interface ApplicationItem {
  id: number;
  application: string;
}

interface ProductDetails {
  casNo?: string;
  abbreviation?: string;
  iupacName?: string;
  chemicalFormula?: string;
  chemistries?: string;
  packSize?: string;
  commonName?: string;
  productForm?: string | null;
  documentSection?: {
    sectionTitle?: string;
    documents?: DocumentItem[];
  };
  application?: ApplicationItem[];
}

interface ProductImageProps {
    id: number,
    name: string;
    alternativeText: string;
    width: number,
    height: number,
    ext: string;
    mime: string;
    size: number;
    url: string;
}

export interface ProductData {
  id: number;
  slug?: string;
  productName?: string;
  description?: string;
  productImage?: ProductImageProps;
  productMobImage?: string | null;
  productDetails?: ProductDetails;
}

export interface RelatedProduct {
  id: number;
  productName: string;
  pdfLink: string;
  slug: string;
}
