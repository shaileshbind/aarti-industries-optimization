import React from "react";
import CampusBanner from "../components/cdmo/CDMOBanner";
import CampusInfo from "../components/home/FrameworkForged";
import FosteringSafe from "../components/home/FosteringSafe";
import GloballyCertified from "../components/GloballyCertified";
import WhoExp from "../components/who-we-are/WhoExp";
import { getData } from "@/_lib/getData.fetch";

export const dynamic = "force-dynamic";

const Page = async () => {
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  const data = {
    "__component": "campus.campus-layout",
    "id": 1,
    "section_one": {
      "id": 1,
      "sectionTitle": "CAMPUS",
      "title": "Shaping Careers For Success",
      "description": "At AIL, people are at the heart of everything we do. Guided by our purpose, we believe that when our people thrive, the organization flourishes. We empower bright minds with opportunities to learn, grow, and lead from within.",
      "image": {
        "id": 140,
        "documentId": "ogj9c3cqadn8w9bjen4ha2ba",
        "name": "product 1.png",
        "alternativeText": null,
        "caption": null,
        "width": 819,
        "height": 680,
        "formats": {
          "small": {
            "ext": ".png",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/small_product_1_d70b78dffe.png",
            "hash": "small_product_1_d70b78dffe",
            "mime": "image/png",
            "name": "small_product 1.png",
            "path": null,
            "size": 525.72,
            "width": 500,
            "height": 415,
            "sizeInBytes": 525718,
            "isUrlSigned": true
          },
          "medium": {
            "ext": ".png",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/medium_product_1_d70b78dffe.png",
            "hash": "medium_product_1_d70b78dffe",
            "mime": "image/png",
            "name": "medium_product 1.png",
            "path": null,
            "size": 1109.92,
            "width": 750,
            "height": 623,
            "sizeInBytes": 1109922,
            "isUrlSigned": true
          },
          "thumbnail": {
            "ext": ".png",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/thumbnail_product_1_d70b78dffe.png",
            "hash": "thumbnail_product_1_d70b78dffe",
            "mime": "image/png",
            "name": "thumbnail_product 1.png",
            "path": null,
            "size": 82.13,
            "width": 188,
            "height": 156,
            "sizeInBytes": 82126,
            "isUrlSigned": true
          }
        },
        "hash": "product_1_d70b78dffe",
        "ext": ".png",
        "mime": "image/png",
        "size": 307.02,
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_d70b78dffe.png",
        "previewUrl": null,
        "provider": "aws-s3",
        "provider_metadata": null,
        "folderPath": "/11",
        "createdAt": "2025-10-31T07:04:57.802Z",
        "updatedAt": "2025-10-31T07:57:20.359Z",
        "publishedAt": "2025-10-31T07:04:57.803Z",
        "locale": null,
        "isUrlSigned": true
      },
      "mobImage": {
        "id": 140,
        "documentId": "ogj9c3cqadn8w9bjen4ha2ba",
        "name": "product 1.png",
        "alternativeText": null,
        "caption": null,
        "width": 819,
        "height": 680,
        "formats": {
          "small": {
            "ext": ".png",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/small_product_1_d70b78dffe.png",
            "hash": "small_product_1_d70b78dffe",
            "mime": "image/png",
            "name": "small_product 1.png",
            "path": null,
            "size": 525.72,
            "width": 500,
            "height": 415,
            "sizeInBytes": 525718,
            "isUrlSigned": true
          },
          "medium": {
            "ext": ".png",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/medium_product_1_d70b78dffe.png",
            "hash": "medium_product_1_d70b78dffe",
            "mime": "image/png",
            "name": "medium_product 1.png",
            "path": null,
            "size": 1109.92,
            "width": 750,
            "height": 623,
            "sizeInBytes": 1109922,
            "isUrlSigned": true
          },
          "thumbnail": {
            "ext": ".png",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/thumbnail_product_1_d70b78dffe.png",
            "hash": "thumbnail_product_1_d70b78dffe",
            "mime": "image/png",
            "name": "thumbnail_product 1.png",
            "path": null,
            "size": 82.13,
            "width": 188,
            "height": 156,
            "sizeInBytes": 82126,
            "isUrlSigned": true
          }
        },
        "hash": "product_1_d70b78dffe",
        "ext": ".png",
        "mime": "image/png",
        "size": 307.02,
        "url": "https://d2sslj1veyp2s3.cloudfront.net/product_1_d70b78dffe.png",
        "previewUrl": null,
        "provider": "aws-s3",
        "provider_metadata": null,
        "folderPath": "/11",
        "createdAt": "2025-10-31T07:04:57.802Z",
        "updatedAt": "2025-10-31T07:57:20.359Z",
        "publishedAt": "2025-10-31T07:04:57.803Z",
        "locale": null,
        "isUrlSigned": true
      },
      "ctaButton": {
        "id": 363,
        "title": "Talk to a CDMO Specialist",
        "link": "#"
      }
    },
    "section_two": {
      "id": 1,
      "title": "Campus Flagship Programmes",
      "card": [
        {
          "id": 67,
          "title": "AOTP- Aarti Officers Trainee Programme",
          "description": "Through this flagship programme, fresh graduates from India’s leading technical colleges are hired and groomed for future roles. They join operations teams across different zones, bringing in expertise from diverse fields such as chemical, mechanical, electrical, instrumentation, civil, industrial safety, and environment.",
          "image": {
            "id": 141,
            "documentId": "bso3z314cbey54sj6hn6e8gj",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/6d4cc1b2b90fc510e8c6b8cec5ef678f44e306fa_bc6b46fb92.jpg",
            "alternativeText": null,
            "mime": "image/jpeg",
            "ext": ".jpg",
            "isUrlSigned": false
          },
          "ctaButton": {
            "id": 118,
            "title": "Partner With Us",
            "link": "#"
          }
        },
        {
          "id": 154,
          "title": "R&D & Innovation",
          "description": "At our two advanced R&D centres with over 250 scientists, we drive the development of new molecules, process innovation, and scale-up engineering. From piloting and validation to commercialising, we ensure speed, efficiency and global compliance in every solution we deliver. \n",
          "image": {
            "id": 117,
            "documentId": "vn47i3w623tztjf1wz7pgffb",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/1c3b1e0ca1ccb553c68c32ff1c0fc8eaaba13b84_e7f497d06d.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          },
          "ctaButton": {
            "id": 239,
            "title": "Partner With Us",
            "link": "#"
          }
        },
        {
          "id": 1060,
          "title": "Aarti Mahasuper; Crop Nutrition Solutions for Farmers",
          "description": "Aarti Mahasuper brings our legacy-rich agrochemical expertise in crop nutrition products directly to farmers, helping to improve yields, protect soil health, and support agriculture. Expertise trusted by global agrochemical leaders, Aarti Mahasuper represents our commitment to making chemistries accessible to everyday growers. ",
          "image": {
            "id": 116,
            "documentId": "j4ob4nhwjjaf1c9coscctkli",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/b0f5d1f71d18d0d3adc2b4ab9f61a40549c773be_d3aeeb7dae.jpg",
            "alternativeText": null,
            "mime": "image/jpeg",
            "ext": ".jpg",
            "isUrlSigned": false
          },
          "ctaButton": {
            "id": 1088,
            "title": "Explore Aarti Mahasuper ",
            "link": "#"
          }
        }
      ],

    },
    "section_three": {
      "id": 1,
      "title": "Careers with Us",
      "description": "We invite you to be a part of an organization that fosters an environment that celebrates internal talent and nurtures potential at every stage. With a People First approach, we value your contributions and well-being, by crafting a tailored rewards framework. Life at Aarti awaits you.",
      "ctaButton": {
        "id": 105,
        "title": "See Open Roles",
        "link": "#"
      },


    },
    "section_four": {
      "id": 222,
      "images": [
        {
          "id": 1,
          "sequence": 1,
          "image": {
            "id": 23,
            "documentId": "cr3upw769d4uvgqjmgdkgprv",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/3341d70f5ae9c706706c62e05b56990fd52b90a7_13fd831eea.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 2,
          "sequence": 2,
          "image": {
            "id": 24,
            "documentId": "hlpsy2ofaid4bofxwvypg1ou",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/2067bacf35b11fbbcd6442c77c70dd8b3708cdae_26eb1fba6d.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 3,
          "sequence": 3,
          "image": {
            "id": 22,
            "documentId": "hqf5iuer11hix3kaz0vfxvo1",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/0444f82762ae85bc5ade3001bfd37ed901b5eb70_b9bb773b1b.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 4,
          "sequence": 4,
          "image": {
            "id": 26,
            "documentId": "gcn82r5qkmlk76zcx1uf1cyh",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/9b9ed047758c752f80a07a80ce764d39f6daa0c2_3fac0d7606.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 5,
          "sequence": 5,
          "image": {
            "id": 25,
            "documentId": "c14hhwcwqhp2h4veolaijw63",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/227e7d05c28b822cec9b4c8027b1f1d80b06cc09_c66702fddb.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 6,
          "sequence": 6,
          "image": {
            "id": 27,
            "documentId": "rv7p1syjua0jn3fmpa5jihb4",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/c31078bde34111767e4d8ac334306aeb4e9dbdb0_adb2b0b2cb.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 7,
          "sequence": 7,
          "image": {
            "id": 21,
            "documentId": "wl3nce49p3c8u0l8cdiztrlk",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/b4cb5e5926813a8c9b92b72082a069d28d849fa0_84d6b041ed.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 8,
          "sequence": 8,
          "image": {
            "id": 20,
            "documentId": "s3kuoou96l8wouveefwo3u6p",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/8d32f3bb51875f553c4c9bfbcf0f3b26ff072cdc_e9ea9703c5.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 73,
          "sequence": 9,
          "image": {
            "id": 50,
            "documentId": "plu8ecp9yuuchku4dvt5ew5j",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/27173747501061ffb0ebe7d32ae6b48f60ea670a_987a6b7cd7.jpg",
            "alternativeText": null,
            "mime": "image/jpeg",
            "ext": ".jpg",
            "isUrlSigned": false
          }
        },
        {
          "id": 74,
          "sequence": 10,
          "image": {
            "id": 130,
            "documentId": "uicalav4fy9ooxlizt3yn9jf",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            "alternativeText": null,
            "mime": "image/jpeg",
            "ext": ".jpg",
            "isUrlSigned": false
          }
        },
        {
          "id": 75,
          "sequence": 11,
          "image": {
            "id": 115,
            "documentId": "hmhbwmiy27cfszfn8nq6dcir",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/9296f7c7a78a4600f23f41aeb0164dcfa0e7da3c_d8dd51adac.jpg",
            "alternativeText": null,
            "mime": "image/jpeg",
            "ext": ".jpg",
            "isUrlSigned": false
          }
        },
        {
          "id": 76,
          "sequence": 12,
          "image": {
            "id": 141,
            "documentId": "bso3z314cbey54sj6hn6e8gj",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/6d4cc1b2b90fc510e8c6b8cec5ef678f44e306fa_bc6b46fb92.jpg",
            "alternativeText": null,
            "mime": "image/jpeg",
            "ext": ".jpg",
            "isUrlSigned": false
          }
        },
        {
          "id": 77,
          "sequence": 13,
          "image": {
            "id": 105,
            "documentId": "vdw97g5rtcl960nmvsehwkp8",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/ff0630e46f09557f8618d1c062f37cc77f1d0b43_06db4d613b.jpg",
            "alternativeText": null,
            "mime": "image/jpeg",
            "ext": ".jpg",
            "isUrlSigned": false
          }
        },
        {
          "id": 78,
          "sequence": 14,
          "image": {
            "id": 45,
            "documentId": "jx1f0wt42pbortnntgyfwga4",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/Safety_89bec518ab.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 79,
          "sequence": 15,
          "image": {
            "id": 44,
            "documentId": "ewf5asiy6zqhs50fazn8byr0",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/Rectangle_28305_2adb9a2a10.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        },
        {
          "id": 80,
          "sequence": 16,
          "image": {
            "id": 43,
            "documentId": "vmnbojpp3u8yiplek8paz19b",
            "url": "https://d2sslj1veyp2s3.cloudfront.net/Rectangle_28231_e0b569a7fb.png",
            "alternativeText": null,
            "mime": "image/png",
            "ext": ".png",
            "isUrlSigned": false
          }
        }
      ]
    },
    "section_five": {
      "id": 6,
      "ExlporeCard": [
        {
          "id": 29,
          "title": "Looking for R&D Solutions? ",
          "ctaButton": [
            {
              "id": 678,
              "title": "Inquire Now",
              "link": "#"
            }
          ]
        },
        {
          "id": 30,
          "title": "Keep Exploring",
            "ctaButton": [
            {
              "id": 679,
              "title": "Product Portfolio",
              "link": "#"
            },
            {
              "id": 680,
              "title": "Partner with us",
              "link": "#"
            }
          ]
        }
      ]
    }


  }
  // const data = await getPageData("/pages/by-slug/cdmo");
  // const globallyCertifiedData = await getData(
  //   "/globally-certified-datas?populate=*"
  // );

  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five
  } = data;
  console.log(data);

  return (
    <div>
      {section_one && <CampusBanner data={section_one} />}

      {section_two &&
        <div className="container !pt-50">
          <CampusInfo data={section_two} layout="imgLeftContentRight" />
        </div>

      }
      {section_three && <FosteringSafe data={section_three} imgArr={section_four} />}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_five && <WhoExp data={section_five} />}
    </div>
  );
};

export default Page;
