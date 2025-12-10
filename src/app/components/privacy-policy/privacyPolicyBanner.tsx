import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { ImageProps } from "@/app/types/global.type";

export type PrivacyPolicyProps = {
    data: {
        title: string;
        description: string;
        image: ImageProps;
        mobImage: ImageProps;
    };
};

const PrivacyPolicyBanner: React.FC<PrivacyPolicyProps> = ({ data }) => {
    const { title, description, image, mobImage } = data;

    return (
        <HeroBanner
            title={title}
            desc={description}
            fullBg
            centerText={true}
            image={image?.url}
            mobImage={mobImage?.url}
            alt={image?.alternativeText}
            mobAlt={mobImage?.alternativeText}
            showStar3={false}
        />
    );
};

export default PrivacyPolicyBanner;
