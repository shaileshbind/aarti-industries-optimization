import React from "react";
import CodeAndPoliciesBanner from "../components/code-and-policies/code-and-policies-banner";
import PolicyListComponent from "../components/code-and-policies/PolicyList";
export const dynamic = "force-dynamic";

const page = async () => {
    //   const data = await getPageData("/pages/by-slug/ethics");
    //   const globallyCertifiedData = await getData(
    //     "/globally-certified-datas?populate=*"
    //   );
    //   const {
    //     section_one,
    //     section_two,
    //     section_three,
    //     section_four,
    //   } = data;

    const section_one = {
        "id": 1,
        "title": "Code & Policies",
        "description": "We deliver sustainable chemical solutions that power innovation across global industries.",
        "image": {
            "id": 560,
            "documentId": "v9vsi5urwetsioe5jl34slr1",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/DJI_0094_a9bdcf4bc6.jpg",
            "alternativeText": null,
            "mime": "image/jpeg",
            "ext": ".jpg",
            "isUrlSigned": false
        },
        "mobImage": {
            "id": 560,
            "documentId": "v9vsi5urwetsioe5jl34slr1",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/DJI_0094_a9bdcf4bc6.jpg",
            "alternativeText": null,
            "mime": "image/jpeg",
            "ext": ".jpg",
            "isUrlSigned": false
        }
    }

    const policiesList = [

        {
            id: 1,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 2,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 3,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 4,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 5,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 6,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 7,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 8,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 9,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 10,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 11,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },
        {
            id: 12,
            title: "Code & Policies",
            link: "/code-and-policies",
            secondary: true
        },

    ]

    // console.log(data);
    return (
        <div>

            {section_one && <CodeAndPoliciesBanner data={section_one} />}
            <PolicyListComponent policiesList={policiesList} />

        </div>
    );
};

export default page;
