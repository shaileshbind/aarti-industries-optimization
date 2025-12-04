import React from "react";
import MahasuperBanner from "../components/mahasuper/MahasuperBanner";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import SEO from "@/app/components/SEO";
import DetailsContainer from "@/app/components/mahasuper/DetailsContainer";
import ProductPortfolio from "@/app/components/mahasuper/ProductPortfolio";
import CategoryProducts from "@/app/components/mahasuper/CategoryProducts";    
import EmpoweringFarmers from "@/app/components/mahasuper/EmpoweringFarmers";  
import ContactBanner from "@/app/components/ContactBanner";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/maha-super");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
  } = data?.data;
  const seo = data?.seo;
console.log('mahasuper data', data);
//   const section_one ={
//     "id": 1,
//     "title": "Extending AIL’s Chemistry to the Fields",
     
//     "image": {
//         "id": 642,
//         "documentId": "v25iih5hu635l20pkgqvcofm",
//         "url": "https://d2sslj1veyp2s3.cloudfront.net/DJI_0727_81b2c92961.webp",
//         "alternativeText": null,
//         "mime": "image/webp",
//         "ext": ".webp",
//         "isUrlSigned": false
//     },
//     "mobImage": [
//         {
//             "id": 642,
//             "documentId": "v25iih5hu635l20pkgqvcofm",
//             "url": "https://d2sslj1veyp2s3.cloudfront.net/DJI_0727_81b2c92961.webp",
//             "alternativeText": null,
//             "mime": "image/webp",
//             "ext": ".webp",
//             "isUrlSigned": false
//         }
//     ],
//     btnTitle: "Enquire Now",
//     btnLink: "/",
    
// }
// const section_two ={
//   "id": 2,
//   "description": "Aarti Fertilizers, a division of Aarti Industries Limited (AIL), was established in 2003. The division initially focused on producing Single Super Phosphate (SSP) fertilizers marketed by an external partner. Since 2022, we started in-house marketing of Fertilizers under the “Aarti Mahasuper” brand.",
// }
// const section_three ={
//     "id": 1,
//     "image": {
//         "id": 533,
//         "documentId": "xn8ec9owdk7evy6mjdypful7",
//         "name": "Copy of IMG_0456.JPG",
//         "alternativeText": null,
//         "caption": null,
//         "width": 5472,
//         "height": 3648,
//         "formats": {
//             "large": {
//                 "ext": ".JPG",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/large_Copy_of_IMG_0456_37dc1bd900.JPG",
//                 "hash": "large_Copy_of_IMG_0456_37dc1bd900",
//                 "mime": "image/jpeg",
//                 "name": "large_Copy of IMG_0456.JPG",
//                 "path": null,
//                 "size": 68.46,
//                 "width": 1000,
//                 "height": 667,
//                 "sizeInBytes": 68459,
//                 "isUrlSigned": true
//             },
//             "small": {
//                 "ext": ".JPG",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/small_Copy_of_IMG_0456_37dc1bd900.JPG",
//                 "hash": "small_Copy_of_IMG_0456_37dc1bd900",
//                 "mime": "image/jpeg",
//                 "name": "small_Copy of IMG_0456.JPG",
//                 "path": null,
//                 "size": 25.56,
//                 "width": 500,
//                 "height": 333,
//                 "sizeInBytes": 25560,
//                 "isUrlSigned": true
//             },
//             "medium": {
//                 "ext": ".JPG",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/medium_Copy_of_IMG_0456_37dc1bd900.JPG",
//                 "hash": "medium_Copy_of_IMG_0456_37dc1bd900",
//                 "mime": "image/jpeg",
//                 "name": "medium_Copy of IMG_0456.JPG",
//                 "path": null,
//                 "size": 45.79,
//                 "width": 750,
//                 "height": 500,
//                 "sizeInBytes": 45789,
//                 "isUrlSigned": true
//             },
//             "thumbnail": {
//                 "ext": ".JPG",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/thumbnail_Copy_of_IMG_0456_37dc1bd900.JPG",
//                 "hash": "thumbnail_Copy_of_IMG_0456_37dc1bd900",
//                 "mime": "image/jpeg",
//                 "name": "thumbnail_Copy of IMG_0456.JPG",
//                 "path": null,
//                 "size": 8.93,
//                 "width": 234,
//                 "height": 156,
//                 "sizeInBytes": 8930,
//                 "isUrlSigned": true
//             }
//         },
//         "hash": "Copy_of_IMG_0456_37dc1bd900",
//         "ext": ".JPG",
//         "mime": "image/jpeg",
//         "size": 847.65,
//         "url": "https://d2sslj1veyp2s3.cloudfront.net/Copy_of_IMG_0456_37dc1bd900.JPG",
//         "previewUrl": null,
//         "provider": "aws-s3",
//         "provider_metadata": null,
//         "folderPath": "/",
//         "createdAt": "2025-11-16T18:04:58.255Z",
//         "updatedAt": "2025-11-16T18:04:58.255Z",
//         "publishedAt": "2025-11-16T18:04:58.255Z",
//         "locale": null,
//         "isUrlSigned": true
//     },
//     "mobImage": {
//         "id": 533,
//         "documentId": "xn8ec9owdk7evy6mjdypful7",
//         "name": "Copy of IMG_0456.JPG",
//         "alternativeText": null,
//         "caption": null,
//         "width": 5472,
//         "height": 3648,
//         "formats": {
//             "large": {
//                 "ext": ".JPG",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/large_Copy_of_IMG_0456_37dc1bd900.JPG",
//                 "hash": "large_Copy_of_IMG_0456_37dc1bd900",
//                 "mime": "image/jpeg",
//                 "name": "large_Copy of IMG_0456.JPG",
//                 "path": null,
//                 "size": 68.46,
//                 "width": 1000,
//                 "height": 667,
//                 "sizeInBytes": 68459,
//                 "isUrlSigned": true
//             },
//             "small": {
//                 "ext": ".JPG",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/small_Copy_of_IMG_0456_37dc1bd900.JPG",
//                 "hash": "small_Copy_of_IMG_0456_37dc1bd900",
//                 "mime": "image/jpeg",
//                 "name": "small_Copy of IMG_0456.JPG",
//                 "path": null,
//                 "size": 25.56,
//                 "width": 500,
//                 "height": 333,
//                 "sizeInBytes": 25560,
//                 "isUrlSigned": true
//             },
//             "medium": {
//                 "ext": ".JPG",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/medium_Copy_of_IMG_0456_37dc1bd900.JPG",
//                 "hash": "medium_Copy_of_IMG_0456_37dc1bd900",
//                 "mime": "image/jpeg",
//                 "name": "medium_Copy of IMG_0456.JPG",
//                 "path": null,
//                 "size": 45.79,
//                 "width": 750,
//                 "height": 500,
//                 "sizeInBytes": 45789,
//                 "isUrlSigned": true
//             },
//             "thumbnail": {
//                 "ext": ".JPG",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/thumbnail_Copy_of_IMG_0456_37dc1bd900.JPG",
//                 "hash": "thumbnail_Copy_of_IMG_0456_37dc1bd900",
//                 "mime": "image/jpeg",
//                 "name": "thumbnail_Copy of IMG_0456.JPG",
//                 "path": null,
//                 "size": 8.93,
//                 "width": 234,
//                 "height": 156,
//                 "sizeInBytes": 8930,
//                 "isUrlSigned": true
//             }
//         },
//         "hash": "Copy_of_IMG_0456_37dc1bd900",
//         "ext": ".JPG",
//         "mime": "image/jpeg",
//         "size": 847.65,
//         "url": "https://d2sslj1veyp2s3.cloudfront.net/Copy_of_IMG_0456_37dc1bd900.JPG",
//         "previewUrl": null,
//         "provider": "aws-s3",
//         "provider_metadata": null,
//         "folderPath": "/",
//         "createdAt": "2025-11-16T18:04:58.255Z",
//         "updatedAt": "2025-11-16T18:04:58.255Z",
//         "publishedAt": "2025-11-16T18:04:58.255Z",
//         "locale": null,
//         "isUrlSigned": true
//     },
//     "leftSection": {
//         "id": 1,
//         "title": "Diverse Portfolio, Engineered for Crop Efficiency",
//         "description": {
//             "content": "Aarti Fertilizers manufactures six grades of SSP fertilizers, differentiated by their physical form (powder or granules) and the presence of micronutrients. Our products undergo strict quality testing and are packaged in sturdy bags",
//             "items": [
//                 {
//                     "id": 1,
//                     "title": "GSSP (Granulated Single Super Phosphate)"
//                 },
//                 {
//                     "id": 2,
//                     "title": "PSSP (Powdered Single Super Phosphate)"
//                 },
//                 {
//                     "id": 3,
//                     "title": "Zn-PSSP (Zincated Powdered Single Super Phosphate)"
//                 },
//                 {
//                     "id": 4,
//                     "title": "Zn-GSSP (Zincated Granulated Single Super Phosphate)"
//                 },
//                 {
//                     "id": 5,
//                     "title": "Mahazinbo (Zincated and Boronated Granules of SSP)"
//                 },
//                 {
//                     "id": 6,
//                     "title": "Urea SSP"
//                 }
//             ]
//         },

//         "accordion": {
//             "id": 1,
//             "title": "Additional Fertilizers in our Portfolio",
//             "items": [
//                 {
//                     "id": 118,
//                     "title": "UAN Liquid"
//                 },
//                 {
//                     "id": 121,
//                     "title": "Magnesium Sulphate"
//                 },
//                 {
//                     "id": 122,
//                     "title": "Calcium Nitrate"
//                 },
//                 {
//                     "id": 124,
//                     "title": "Muriate of Potash "
//                 }
//             ]
//         }
//     },
    
// }
// const section_four ={
//     "id": 1,
//     "sectionTitle": "Category products under schedules of FCO",
//     "cards": [
//         {
//             "id": 83,
//             "title": "Granular Single Super Phosphate (GSSP)",
//             "description": "Straight Phosphorus Fertilizers Schedule 1 (Clause 2(h) & (q) Part-A-1(b))",
//             "image": {
//                 "id": 339,
//                 "documentId": "nwconszt3vjczxs6l6x93gqu",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/Circular_Economy_72a55c683c.JPG",
//                 "alternativeText": null,
//                 "mime": "image/jpeg",
//                 "ext": ".JPG",
//                 "isUrlSigned": false
//             }
//         },
//         {
//             "id": 84,
//             "title": "Powdered Single Super Phosphate (PSSP)",
//             "description": "Straight Phosphorus Fertilizers Schedule 1 (Clause 2(h) & (q) Part-A-1(b))",
//             "image": {
//                 "id": 340,
//                 "documentId": "s6gfmj4x6ydz937jhr27wgso",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/Green_Energy_15d5c195a0.JPG",
//                 "alternativeText": null,
//                 "mime": "image/jpeg",
//                 "ext": ".JPG",
//                 "isUrlSigned": false
//             }
//         },
//         {
//             "id": 85,
//             "title": "Zincated - GSSP",
//             "description": "Straight Phosphorus Fertilizers Schedule 1 (Clause 2(h) & (q) Part-A-1(b))",
//             "image": {
//                 "id": 220,
//                 "documentId": "jckc7trhb0jyfhfi4f9rgtad",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/d4df9d9d0579e8e50180823d930994f20e04608f_73eaf72e90.jpg",
//                 "alternativeText": null,
//                 "mime": "image/jpeg",
//                 "ext": ".jpg",
//                 "isUrlSigned": false
//             }
//         },
//         {
//             "id": 86,
//             "title": "Electronics & membranes",
//             "description": "Lorem Ipsum vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestia.",
//             "image": {
//                 "id": 221,
//                 "documentId": "hba8zo3w68msblgvdo9af46b",
//                 "url": "https://d2sslj1veyp2s3.cloudfront.net/1b10650035a994829ce91bb68e2a0204963b0293_390f131eeb.jpg",
//                 "alternativeText": null,
//                 "mime": "image/jpeg",
//                 "ext": ".jpg",
//                 "isUrlSigned": false
//             }
//         }
//     ]
// }
// const section_five =  {
//     title: "Expanding Access, Empowering Farmers",
//     description: "Aarti Fertilizers distributes its products through a strong dealer and retail network. Our products are sold across:",
//     states: [
//       "Maharashtra",
//       "Gujarat",
//       "Karnataka",
//       "Madhya Pradesh"
//     ],
//     subtitle: "Reaching Farmers Through:",
//     stats: [
//       {
//         value: "10,000+",
//         label: "Retail Points"
//       },
//       {
//         value: "400",
//         label: "Dealers"
//       }
//     ],
//     button: {
//       title: "Enquire Now",
//       href: "#"
//     },
//     image: {
//       src: "/images/indiaFarmers.svg",
//       alt: "empowering-farmers",
//       width: 685,
//       height: 779
//     }
//   };
// const section_six ={
//     "id": 1,
//     "title": "Lorem ipsum duis lectus blandit suscipit enim urna.",
//     "ctaButton": {
//         "id": 138,
//         "title": "Enquire Now",
//         "link": "#"
//     }
// }
  return (
    <div>
      <SEO
        title={seo?.title ?? "Mahasuper"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/mahasuper"}
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
      {section_one && <MahasuperBanner data={section_one} />}
      {section_two && <DetailsContainer data={section_two} />}
      {/* {section_two && <EthicsAndCode data={section_two} />} */}
      {/* {section_three && <GlobalInnovation data={section_three} />} */}
      {section_three && <ProductPortfolio data={section_three} />}xw
      {section_four && <CategoryProducts data={section_four} />}
      {section_five && <EmpoweringFarmers data={section_five} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_six && <ContactBanner data={section_six} />}
    </div>
  );
};

export default page;
