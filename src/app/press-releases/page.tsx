import React from 'react'
import PressReleaseBanner from '../components/press-releases/PressReleaseBanner'
import PressReleaseYearListing from '../components/press-releases/PressReleaseYearListing'
import { YearAndPressReleaseLayout, PressReleaseItem } from '../types/press-release.type'

const page = () => {
    const section_one ={
        title: "Press Releases",
        // description: "Press Releases",
        image: {
            url: "/images/press-releases-banner.jpg",
            alt: "Press Releases"
        },
        mobImage: {
            url: "/images/press-releases-banner.jpg",
            alt: "Press Releases"
        }
    }

    // Sample data - replace with actual API data
    const latestReleases: PressReleaseItem[] = [
        {
            id: 1,
            title: "Press Release on DCM Shriram and Aarti Industries long-term strategic partnership on chlorine supply",
            date: "May 18, 2023",
            pdfLink: "#"
        },
        {
            id: 2,
            title: "Press Release on DCM Shriram and Aarti Industries long-term strategic partnership on chlorine supply",
            date: "May 18, 2023",
            pdfLink: "#"
        }
    ]

    const yearAndPressReleases: YearAndPressReleaseLayout[] = [
        {
            id: 1,
            year: 2025,
            pressReleases: [
                {
                    id: 1,
                    title: "Press Release Q2 FY 26",
                    date: "May 18, 2023",
                    pdfLink: "#"
                },
                {
                    id: 2,
                    title: "Press Release on DCM Shriram and Aarti Industries long-term strategic partnership on chlorine supply",
                    date: "May 18, 2023",
                    pdfLink: "#"
                },
                {
                    id: 3,
                    title: "Press Release Q1 FY 26",
                    date: "May 18, 2023",
                    pdfLink: "#"
                },
                {
                    id: 4,
                    title: "Press Release as on 29.01.2025",
                    date: "May 18, 2023",
                    pdfLink: "#"
                },
                {
                    id: 5,
                    title: "Aarti Industries And Deepak Fertilisers Signs A Binding Term-Sheet",
                    date: "May 18, 2023",
                    pdfLink: "#"
                }
            ]
        },
        {
            id: 2,
            year: 2024,
            pressReleases: []
        },
        {
            id: 3,
            year: 2023,
            pressReleases: []
        },
        {
            id: 4,
            year: 2022,
            pressReleases: []
        },
        {
            id: 5,
            year: 2021,
            pressReleases: []
        }
    ]

  return (
    <div>
        <PressReleaseBanner data={section_one} />
        <PressReleaseYearListing 
            yearAndPressReleases={yearAndPressReleases}
            latestReleases={latestReleases}
        />
    </div>
  )
}

export default page