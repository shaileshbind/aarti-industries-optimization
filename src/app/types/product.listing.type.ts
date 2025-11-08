interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  isUrlSigned: boolean;
}

interface ImageFormats {
  large?: ImageFormat;
  medium?: ImageFormat;
  small?: ImageFormat;
  thumbnail?: ImageFormat;
}

interface BannerImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  url: string;
  mime: string;
  size: number;
  ext: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isUrlSigned: boolean;
}

interface BannerData {
  id: number;
  title: string;
  description: string;
  image: BannerImage;
  mobImage: BannerImage;
}

export interface BannerProps {
  data: BannerData;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export interface ProductSubCategory {
  id: number;
  subCategory: string;
  slug: string;
}

interface CatagoriesData {
  productCategory: string;
  slug: string;
  product_sub_categories: ProductSubCategory[];
}

export interface ProductFilterProps {
  catagoriesData: CatagoriesData[];
}

export interface ProductWrapperProps {
  section_one: BannerData;
  product_categories: CatagoriesData[];
}

export interface ProductFilterListProps extends ProductFilterProps {
  searchQuery?: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export type SearchBarProps = {
  onSearch: (q: string) => void;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};
