import React from "react";
export const dynamic = "force-dynamic";
import PrivacyPolicyBanner from "@/app/components/privacy-policy/privacyPolicyBanner";
import PrivacyPolicyContent from "../components/privacy-policy/PrivacyPolicyContent";
import { getPageData } from "@/_lib/pageData.fetch";


const page = async () => {
    const data = await getPageData("/pages/by-slug/privacy-policy");

    console.log("data", data);

    const BannerData = {
        title: data?.data?.title,
        description: "",
        image: {
            alternativeText: '',
            url: data?.data?.image?.url,
        },
        mobImage: {
            alternativeText: '',
            url: data?.data?.mobImage?.url,
        }
    };

    return (
        <div>
            {BannerData.title ? <PrivacyPolicyBanner data={BannerData} /> : null}

            <PrivacyPolicyContent data={data?.data} />
        </div>
    );
};

export default page;