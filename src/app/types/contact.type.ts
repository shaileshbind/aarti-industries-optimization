export type WhereWeOperateDataItem = {
  id: number;
  documentId: string;
  regionName: string;
  officeLabel: string;
  locationName: string | null;
  companyName: string;
  address: string | null;
  mobileNo: string | null;
  googleMapLink: string | null;
  order: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type WhereWeOperateApiResponse = {
  data: WhereWeOperateDataItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type WhereWeOperateProps = {
  data: WhereWeOperateDataItem[] | null;
};

export type AddressCardItem = {
  location: string;
  company: string;
  address: string;
  phone: string;
  url: string;
  registeredOffice: boolean;
  type: string;
};

export type WhereWeOperateTab = {
  id: number;
  category: string;
  post_category: {
    id: number;
    name: string;
    slug: string;
    address: AddressCardItem[];
  };
};


export type ContactBannerImage = {
  url: string;
  alternativeText?: string | null;
};

export type ContactBannerOffice = {
  image: ContactBannerImage;
  officeLabel?: string | null;
  companyName?: string | null;
  address?: string | null;
  mobileNo?: string | null;
  googleMapLink?: string | null;
};

export type ContactBannerProps = {
  data: {
      sectionTitle?: string | null;
      office?: ContactBannerOffice | null;
  } | null;
};
