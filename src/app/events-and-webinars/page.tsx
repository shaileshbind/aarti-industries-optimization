import React from "react";
import { getData } from "@/_lib/getData.fetch";
import EventsBanner from "../components/events-and-webinars/eventsBanner";
import EventsListing from "../components/events-and-webinars/EventsListing";
import SEO from "../components/SEO";
import { getPageData } from "@/_lib/pageData.fetch";
import PodcastListing from "../components/events-and-webinars/PodcastListing";
import VideoScrollBarContainer from "../components/manufacturing-capabilities/VideoScrollBarContainer";
import GloballyCertified from "../components/GloballyCertified";
import ContactBanner from "../components/ContactBanner";
import { EventsBannerProps, EventsListingProps, PodcastListingProps } from "@/app/types/events-and-webinars.type";

export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getPageData("/pages/by-slug/media-kit");

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  const { 
    // section_one, 
    // section_two, 
    // section_three 
    } = data?.data;
  const seo = data?.seo;
  const section_one = {
    "id": 30,
    "title": "Events & Webinars",
    "description": null,
    "image": {
        "id": 669,
        "documentId": "sth4mywhz8zwzm3f0dmrp5hl",
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "",
        "mime": "image/png",
        "ext": ".png",
        "isUrlSigned": false
    },
    "mobImage": {
        "id": 669,
        "documentId": "sth4mywhz8zwzm3f0dmrp5hl",
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "",
        "mime": "image/png",
        "ext": ".png",
        "isUrlSigned": false
    }
}
const section_two = {
  "id": 30,
  "title": "Upcoming Events",
  "description": null,
  "events": [
    {
      "title": "ChemSpec Europe 2026",
      "date": "May 21, 2025",
      "location": "Messe Frankfurt, Germany",
      "description": "Visit us to explore our advanced portfolio in specialty chemicals, intermediates, and strategic partnership solutions.",
      "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Meet Our Global Team",
        "link": "https://www.aarti-industries.com/events-and-webinars",
        "externalLink": "false"
      }
    },
    {
      "title": "ChemSpec Europe 2026",
      "date": "May 21, 2025",
      "location": "Messe Frankfurt, Germany",
      "description": "Visit us to explore our advanced portfolio in specialty chemicals, intermediates, and strategic partnership solutions.",
      "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Scientists in Laboratory"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Scientists in Laboratory"
      },
      "ctaButton": {
        "title": "Meet Our Global Team",
        "link": "https://www.aarti-industries.com/events-and-webinars",
        "externalLink": "false"
      }
    },
    {
      "title": "ChemSpec Europe 2026",
      "date": "May 21, 2025",
      "location": "Messe Frankfurt, Germany",
      "description": "Visit us to explore our advanced portfolio in specialty chemicals, intermediates, and strategic partnership solutions.",
      "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Scientist with Test Tubes"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Scientist with Test Tubes"
      },
      "ctaButton": {
        "title": "Meet Our Global Team",
        "link": "https://www.aarti-industries.com/events-and-webinars",
        "externalLink": "false"
      }
    }
  ]
}
const section_three = {
  "id": 33,
  "title": "Aarti Insights Podcast",
  "description": null,
  "podcasts": [
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "Building Safer, Smarter, Future-Ready Plants",
      "speakerInfo": "Jitesh Palan, Safety Excellence Head, Aarti Industries",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/building-safer-smarter-future-ready-plants",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "Specialty Chemicals - India's Global Opportunity",
      "speakerInfo": "Pankaj Mehta, Corporate Relations & Strategy Head",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/specialty-chemicals-indias-global-opportunity",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "The Right Chemistry for a Sustainable World",
      "speakerInfo": "Hosted by the Aarti Leadership Team",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/the-right-chemistry-for-a-sustainable-world",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "The Right Chemistry for a Sustainable World",
      "speakerInfo": "Hosted by the Aarti Leadership Team",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/the-right-chemistry-for-a-sustainable-world",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "The Right Chemistry for a Sustainable World",
      "speakerInfo": "Hosted by the Aarti Leadership Team",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/the-right-chemistry-for-a-sustainable-world",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "The Right Chemistry for a Sustainable World",
      "speakerInfo": "Hosted by the Aarti Leadership Team",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/the-right-chemistry-for-a-sustainable-world",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "The Right Chemistry for a Sustainable World",
      "speakerInfo": "Hosted by the Aarti Leadership Team",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/the-right-chemistry-for-a-sustainable-world",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "The Right Chemistry for a Sustainable World",
      "speakerInfo": "Hosted by the Aarti Leadership Team",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/the-right-chemistry-for-a-sustainable-world",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "The Right Chemistry for a Sustainable World",
      "speakerInfo": "Hosted by the Aarti Leadership Team",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/the-right-chemistry-for-a-sustainable-world",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "The Right Chemistry for a Sustainable World",
      "speakerInfo": "Hosted by the Aarti Leadership Team",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/the-right-chemistry-for-a-sustainable-world",
        "externalLink": "false"
      }
    },
    {
      "episodeNumber": "3",
      "episodeLabel": "Podcast Ep 3",
      "duration": "31:33",
      "date": "May 21, 2025",
      "title": "The Right Chemistry for a Sustainable World",
      "speakerInfo": "Hosted by the Aarti Leadership Team",
          "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
      },
      "ctaButton": {
        "title": "Listen Now",
        "link": "https://www.aarti-industries.com/podcasts/the-right-chemistry-for-a-sustainable-world",
        "externalLink": "false"
      }
    },
      
  ]
}

const section_four = {
    "id": 1,
    "title": "Aarti Insight Webinars",
    "card": [
        {
            "id": 1,
            "title": "Step inside the spaces where precision meets performance",
            "date": "May 21, 2025",
            "media": {
                "id": 574,
                "documentId": "bvugfy1t2wtyl3ext2il81tt",
                "url": "https://d2sslj1veyp2s3.cloudfront.net/VIDEO_2021_04_02_21_16_13_CL_3_INTERNAL_USE_9de7c2063c.mp4",
                "alternativeText": null,
                "mime": "video/mp4",
                "ext": ".mp4",
                "isUrlSigned": false
            },
            "image": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
              "mobImage": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
        },
        {
            "id": 2,
            "title": "Step inside the spaces where precision meets performance",
            "date": "May 21, 2025",
            "media": {
                "id": 574,
                "documentId": "bvugfy1t2wtyl3ext2il81tt",
                "url": "https://d2sslj1veyp2s3.cloudfront.net/VIDEO_2021_04_02_21_16_13_CL_3_INTERNAL_USE_9de7c2063c.mp4",
                "alternativeText": null,
                "mime": "video/mp4",
                "ext": ".mp4",
                "isUrlSigned": false
            },
            "image": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
              "mobImage": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
        },
        {
            "id": 3,
            "title": "Step inside the spaces where precision meets performance",
            "date": "May 21, 2025",
            "media": {
                "id": 574,
                "documentId": "bvugfy1t2wtyl3ext2il81tt",
                "url": "https://d2sslj1veyp2s3.cloudfront.net/VIDEO_2021_04_02_21_16_13_CL_3_INTERNAL_USE_9de7c2063c.mp4",
                "alternativeText": null,
                "mime": "video/mp4",
                "ext": ".mp4",
                "isUrlSigned": false
            },
            "image": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
              "mobImage": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
        },
        
        {
            "id": 4,
            "title": "Step inside the spaces where precision meets performance",
            "date": "May 21, 2025",
            "media": {
                "id": 574,
                "documentId": "bvugfy1t2wtyl3ext2il81tt",
                "url": "https://d2sslj1veyp2s3.cloudfront.net/VIDEO_2021_04_02_21_16_13_CL_3_INTERNAL_USE_9de7c2063c.mp4",
                "alternativeText": null,
                "mime": "video/mp4",
                "ext": ".mp4",
                "isUrlSigned": false
            },
            "image": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
              "mobImage": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
        },
        {
            "id": 5,
            "title": "Step inside the spaces where precision meets performance",
            "date": "May 21, 2025",
            "media": {
                "id": 574,
                "documentId": "bvugfy1t2wtyl3ext2il81tt",
                "url": "https://d2sslj1veyp2s3.cloudfront.net/VIDEO_2021_04_02_21_16_13_CL_3_INTERNAL_USE_9de7c2063c.mp4",
                "alternativeText": null,
                "mime": "video/mp4",
                "ext": ".mp4",
                "isUrlSigned": false
            },
            "image": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
              "mobImage": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
        },
        {
            "id": 6,
            "title": "Step inside the spaces where precision meets performance",
            "date": "May 21, 2025",
            "media": {
                "id": 574,
                "documentId": "bvugfy1t2wtyl3ext2il81tt",
                "url": "https://d2sslj1veyp2s3.cloudfront.net/VIDEO_2021_04_02_21_16_13_CL_3_INTERNAL_USE_9de7c2063c.mp4",
                "alternativeText": null,
                "mime": "video/mp4",
                "ext": ".mp4",
                "isUrlSigned": false
            },
            "image": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
              "mobImage": {
                "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
                "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
              },
        },
    ]
}
const section_five = {
  "id": 34,
  "title": "Past Events",
  "description": null,
  "events": [
    {
      "title": "ChemSpec Europe 2026",
      "date": "19-21 June 2025",
      "location": "Messe Frankfurt, Germany",
      "description":"Visit us to explore our advanced portfolio in specialty chemicals, intermediates, and strategic partnership solutions.",
      "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "A close-up of a person's hands, gloved in black, using a bright yellow spray bottle to mist green leafy plants."
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "A close-up of a person's hands, gloved in black, using a bright yellow spray bottle to mist green leafy plants."
      },
      "ctaButton": {
        "title": "View Gallery",
        "link": "https://www.aarti-industries.com/events-and-webinars/chemspec-europe-2026",
        "externalLink": "false"
      },
      "gallery": [
        {
          "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
          "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
        },
        {
          "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
          "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
        },
        {
          "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
          "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
        },
        {
          "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
          "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
        },
        {
          "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
          "alternativeText": "ChemSpec Europe 2026 Event - Team in Lab Coats"
        }
      ]
    },
    {
      "title": "India Chem 2024",
      "date": "3-5 October 2024",
      "location": "Mumbai, India",
      "description":"Visit us to explore our advanced portfolio in specialty chemicals, intermediates, and strategic partnership solutions.",
      "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "A group of approximately ten individuals, likely scientists or industry professionals, standing together. They are all wearing white lab coats, face masks, face shields, and blue surgical gloves."
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "A group of approximately ten individuals, likely scientists or industry professionals, standing together. They are all wearing white lab coats, face masks, face shields, and blue surgical gloves."
      },
      "ctaButton": {
        "title": "View Gallery",
        "link": "https://www.aarti-industries.com/events-and-webinars/india-chem-2024",
        "externalLink": "false"
      }
    },
    {
      "title": "CPHI Worldwide 2024",
      "date": "May 21, 2025",
      "location": "Messe Frankfurt, Germany",
      "description":"Visit us to explore our advanced portfolio in specialty chemicals, intermediates, and strategic partnership solutions.",
      "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "Two scientists in a lab setting. A woman on the left, wearing safety glasses and blue gloves, is writing on a clipboard. A man on the right, also in safety glasses and blue gloves, is holding and examining a test tube."
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "Two scientists in a lab setting. A woman on the left, wearing safety glasses and blue gloves, is writing on a clipboard. A man on the right, also in safety glasses and blue gloves, is holding and examining a test tube."
      },
      "ctaButton": {
        "title": "View Gallery",
        "link": "https://www.aarti-industries.com/events-and-webinars/cphi-worldwide-2024",
        "externalLink": "false"
      }
    },
    {
      "title": "ChemSpec Europe 2026",
      "date": "May 21, 2025",
      "location": "Messe Frankfurt, Germany",
      "description":"Visit us to explore our advanced portfolio in specialty chemicals, intermediates, and strategic partnership solutions.",
      "image": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "Two scientists in a laboratory. The foreground shows a man in safety glasses and blue gloves holding a test tube with a blue liquid, focusing intently on it."
      },
      "mobImage": {
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_3aa8c1804e.png",
        "alternativeText": "Two scientists in a laboratory. The foreground shows a man in safety glasses and blue gloves holding a test tube with a blue liquid, focusing intently on it."
      },
      "ctaButton": {
        "title": "View Gallery",
        "link": "https://www.aarti-industries.com/events-and-webinars/chemspec-europe-2026",
        "externalLink": "false"
      }
    }
  ]
}
const section_six = {
    "id": 4,
    "title": "Partner with a Responsible Chemical Leader",
    "ctaButton": {
        "id": 3523,
        "title": "Contact Us",
        "link": ""
    }
}
  return (
    <div>
      <SEO
        title={seo?.title ?? "Events & Webinars"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/events-and-webinars"}
        robots={seo?.robots ?? "index, follow"}
        ogURL={seo?.ogURL}
        ogImg={seo?.ogImg?.url}
        ogTitle={seo?.ogTitle}
        ogDesc={seo?.ogDesc}
        twtUrl={seo?.twtUrl}
        twtImg={seo?.twtImg?.url}
        twtTitle={seo?.twtTitle}
        twtDesc={seo?.twtDesc}
        schemaData={seo?.schemaData}
      />

      {section_one && <EventsBanner data={section_one as EventsBannerProps['data']} />}  
      {section_two && <EventsListing data={section_two as EventsListingProps['data']} />}
      {section_three && <PodcastListing data={section_three as PodcastListingProps['data']} />}
      {section_four && (
        <div className="py-[40px] lg:py-[60px]">
          <VideoScrollBarContainer data={section_four} />
        </div>
      )}
      {section_five && <EventsListing data={section_five as EventsListingProps['data']} pastEvent={true} />}
      
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_six && <ContactBanner data={section_six} />} 
    </div>
  );
}
