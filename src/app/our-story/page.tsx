import React from 'react'
import HeroBanner from '../components/our-story/HeroBanner'
import AboutCompany from '../components/our-story/AboutCompany'
import TimeLine from '../components/our-story/TimeLine'
import GlobalInnovation from '../components/our-story/GlobalInnovation'
import GloballyCertified from '../components/GloballyCertified'

function page() {
    return (
        <>
            <HeroBanner
                tag="Our Story"
                title="Rooted in Excellence, Driven By Chemistry"
                image="/images/our-story/our-story-banner.png"
            />

            <AboutCompany />

            <TimeLine />

            <GlobalInnovation />

            <GloballyCertified
                title="Globally Certified"
                itemsData={[
                    {
                        id: 0,
                        title: "Ecovadis Gold Rating",
                        imgSrc: "/images/award1.png",
                    },
                    { id: 1, title: "CDP A rating", imgSrc: "/images/award2.png" },
                    { id: 2, title: "ISO 27001:2022", imgSrc: "/images/award3.png" },
                ]}
            />
        </>
    )
}

export default page