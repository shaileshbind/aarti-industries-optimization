export type SitemapMenuItem = {
  id?: number;
  category?: string;
  subMenu?: {
    id?: number;
    title?: string;
    externalLink?: string;
    item?: {
      id?: number;
      subMenuTitle?: string;
      externalLink?: string;
      cta_link?: {
        link?: string;
      };
    }[];
  }[];
};

export type SitemapMenuData = SitemapMenuItem[];

