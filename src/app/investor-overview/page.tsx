import React from "react";
import InvestorBanner from "../components/investor-overview/InvestorBanner";
import InvestorBlueSection from "../components/investor-overview/InvestorBlueSection";
import InvestorLeaders from "../components/investor-overview/InvestorLeaders";
import QuarterlyHigh from "../components/investor-overview/QuarterlyHigh";
import KeyInvestors from "../components/investor-overview/KeyInvestors";
import InHeadlines from "../components/investor-overview/InHeadlines";
import InvestorContacts from "../components/investor-overview/InvestorContacts";
import InvestorExplore from "../components/investor-overview/InvestorExplore";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";

const leaderData = {
  id: 1,
  title: "A Word From Our Leaders",
  leadersCard: [
    {
      id: 1,
      name: "Manoj Sharma",
      designation: "President and CHRO",
      message:
        "At AIL, we are mindful of the importance of employees in brand-building and organisational sustenance. We offer our employees the best of wages, privileges and benefits as per industry standards. Our employee engagement and assistance programmes enable our employees to develop organisational citizenship and enhanced commitment.",
      image: {
        id: 617,
        url: "https://d2sslj1veyp2s3.cloudfront.net/WPG_00604_69e2de08ec.jpg",
        alternativeText: "img",
      },
      mobImage: {
        id: 617,
        url: "https://d2sslj1veyp2s3.cloudfront.net/WPG_00604_69e2de08ec.jpg",
        alternativeText: "img",
      },
    },
    {
      id: 2,
      name: "Prashant Potnis",
      designation: "Lorem Ipsum",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      image: {
        id: 613,
        url: "https://d2sslj1veyp2s3.cloudfront.net/9_D2_A9847_8e6605c829.webp",
        alternativeText: "img",
      },
      mobImage: {
        id: 613,
        url: "https://d2sslj1veyp2s3.cloudfront.net/9_D2_A9847_8e6605c829.webp",
        alternativeText: "img",
      },
    },
    {
      id: 3,
      name: "Harendrabhai Pandya",
      designation: "Lorem Ipsum",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      image: {
        id: 612,
        url: "https://d2sslj1veyp2s3.cloudfront.net/WPG_00573_1_6a9c6e4bca.webp",
        alternativeText: "img",
      },
      mobImage: {
        id: 612,
        url: "https://d2sslj1veyp2s3.cloudfront.net/WPG_00573_1_6a9c6e4bca.webp",
        alternativeText: "img",
      },
    },
  ],
};

const page = async () => {
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  return (
    <div>
      <InvestorBanner />
      <InvestorBlueSection />
      {leaderData && <InvestorLeaders data={leaderData} />}
      <QuarterlyHigh />
      <KeyInvestors />
      <InHeadlines />
      <InvestorContacts />
      {globallyCertifiedData && (
        <GloballyCertified
          title="Globally Certified"
          itemsData={globallyCertifiedData}
        />
      )}
      <InvestorExplore />
    </div>
  );
};

export default page;
