import React from "react";
import CampusBanner from "../components/cdmo/CDMOBanner";
import CampusInfo from "../components/home/FrameworkForged";
import GloballyCertified from "../components/GloballyCertified";
import WhoExp from "../components/who-we-are/WhoExp";
import { getData } from "@/_lib/getData.fetch";
import { getPageData } from "@/_lib/pageData.fetch";
import ThePeople from "../components/ThePeople";
import ImageGallery from "../components/ImageGallery";
export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getPageData("/pages/by-slug/campus-opportunities");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  const section_sixData = {
    title: "From The People of Aarti Industries",
    people: [
      {
        id: 1,
        name: "Shri Renil R. Gogri",
        designation: "Vice Chairman",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/images/shrirenil.png",
      },
    {
    id: 1,
    name: "Shri Renil R. Gogri",
    designation: "Vice Chairman",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/shrirenil.png",
    url: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Shri Renil R. Gogri",
    designation: "Vice Chairman",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/shrirenil.png",
    url: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Shri Renil R. Gogri",
    designation: "Vice Chairman",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/shrirenil.png",
    url: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Shri Renil R. Gogri",
    designation: "Vice Chairman",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/shrirenil.png",
  },
  ]
  };
  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    // section_sixData
  } = data;

  return (
    <div>
      {section_one && <CampusBanner data={section_one} />}
      {section_two &&
        <div className="container !pt-20 lg:!pt-50">
          <CampusInfo data={section_two} layout="imgLeftContentRight" />
        </div>
      }
      {section_three && <ImageGallery data={section_three} imgArr={section_three} />}
      {section_four && <ThePeople data={section_four} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_five && <WhoExp data={section_five} />}
    </div>
  );
};

export default Page;
