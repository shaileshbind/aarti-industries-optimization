import { ImageProps } from "./global.type";

export type CorporateBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
    btnTitle: string;
    btnLink: string;
  };
};

export type OurPhilosophyProps = {
  data: {
    heading: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};


export type PoliciesProps = {
  id?: number;
  policies?: {
    id?: number;
    heading?: string;
    link?: string;
  };
};

export type OurCodeAndPoliciesProps = {
  data: {
    heading: string;
    description: string;
    policies?: PoliciesProps[];
  };
};


export type IndependentDirectorsProps = {
  data: {
    category: string;
    id: string;
    management_boards: {
      id: string;
      name: string;
      image: ImageProps;
      designation: string;
      bio: string;
      mobImage: ImageProps;
    }[];
  }[];
};


// export type IndependentDirectorsProps = {
//   data: {
//     category: string;
//     id: string | number;
//     management_boards: {
//       id: string;
//       name: string;
//       image: ImageProps;
//       designation: string;
//       bio: string;
//       mobImage: ImageProps;
//     }[];
//   }[];
// };

// export type BoardCommitteesProps = {
//   data: {
//     category: string;
//     id: string | number;
//     management_boards: {
//       id: string;
//       name: string;
//       image: ImageProps;
//       designation: string;
//       bio: string;
//       mobImage: ImageProps;
//     }[];
//   }[];
// };