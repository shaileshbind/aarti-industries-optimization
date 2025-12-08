import { ButtonProps, ImageProps } from "./global.type";

export type OurStoryHeroProps = {
    data: {
        id: number;
        sectionTitle: string;
        title: string;
        image: ImageProps;
        mobImage: ImageProps;
    };
};

export type AboutCompanyProps = {
    data: {
        id: number;
        sectionTitle: string;
        description: string;
        ctaButton: ButtonProps;
    };
};

export type GlobalInnovationProps = {
    data: {
        id: number;
        title: string;
        focusSectionTitle?: string | null;
        image?: ImageProps | null;
        mobImage?: ImageProps | null;
        focus_item: {
            order: string;
            id: number;
            description: string;
        }[];
    }
}

export interface TimelineMilestone {
    id: number;
    year: string;
    title: string;
    description: string | null;
}

interface Milestone {
    id: number;
    name: string;
    date_range: string;
    timeline_milestones: TimelineMilestone[];
}

export interface TimelineData {
    data: {
        id: number;
        sectionTitle: string;
        milestone: Milestone[];
    }
}