export interface SimpleListingReport {
  id: number;
  heading: string;
  link: string;
}

export interface SimpleListingLayout {
  __component: "reports.simple-list";
  id: number;
  reports: SimpleListingReport[];
}

export interface SimpleListingProps {
  reportLayout: SimpleListingLayout[];
}