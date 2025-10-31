import React from "react";
import { H2 } from "../Typography2";
import TabsAutoplaySection from "../sections/TabsAutoplaySection";
import { FadeInRevealBlur } from "../ScrollReveal";

const OurPortfolio = () => {
  const rdSafetyData = [
    {
      id: "291",
      category: "Dyes and Pigments",
      card: [
        {
          id: "648",
          title: "Adding colour, responsibly.",
          description:
            "AIL is a trusted supplier of dye and pigment intermediates used in textiles, coatings, plastics, inks, and cosmetics. With global demand shifting towards eco-friendly, high-performance colourants, Aarti Industries is leading the way with sustainable intermediates that strike a balance between performance and compliance. Aarti Industries brings decades of leadership in colour chemistry, offering a globally competitive portfolio that helps customers transition towards sustainable and high-performance dyes and pigments.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          BulletPoints: [],
          ctaButton: {
            id: "886",
            title: "View our Dyes and Pigments Solutions",
            link: "#",
          },
        },
      ],
    },
    {
      id: "316",
      category: "Pharmaceuticals & Healthcare",
      card: [
        {
          id: "823",
          title: "Advancing Treatments, Enabling Global Well-being",
          description:
            "We manufacture high-quality pharma intermediates that form the backbone of active pharmaceutical ingredients (APIs). Trusted by global innovators and Indian leaders alike, AIL supports the world's healthcare ecosystem with compliant, scalable, and customisable solutions. With proven regulatory expertise, global quality systems and reliable large-scale supply, AIL is a partner of choice for Pharma majors worldwide, bringing Indian reliability with international credibility.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          BulletPoints: [],
          ctaButton: {
            id: "878",
            title: "Explore our Pharma Portfolio",
            link: "#",
          },
        },
      ],
    },
    {
      id: "317",
      category: "Agrochemicals",
      card: [
        {
          id: "824",
          title: "Securing food and crop systems through chemistry",
          description:
            "AIL intermediates power herbicides, fungicides, and insecticides that help farmers improve yield and protect crops from stress. As agriculture shifts toward biocontrols and precision farming, Aarti Industries partners with leading global agrochemical companies to co-create sustainable, compliant, and effective solutions. Backed by strong babckward integration and deep chemistry expertise, AIL delivers consistent quality scale, supporting global players and local innovators in strengthening food security.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          BulletPoints: [],
          ctaButton: {
            id: "879",
            title: "See our Agrochemical Intermediates",
            link: "#",
          },
        },
      ],
    },
    {
      id: "318",
      category: "Polymers and Plasticisers",
      card: [
        {
          id: "825",
          title: "Enabling everyday flexibility and durability",
          description:
            "Polymers and plasticisers are the backbone of end-use sectors. From packaging and construction to automotive and consumer goods, AIL polymer additives and plasticisers enhance durability, flexibility, and performance. As industries embrace lightweight and recycled materials, Aarti Industries supports global leaders with innovative, sustainable intermediates. By combining our scale, integration and innovation, AIL supplies polymer solutions that meet global standards, while aligning with sustainability goals across the packaging and consumer goods industries.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          BulletPoints: [],
          ctaButton: {
            id: "880",
            title: "Discover our Polymer and Plasticiser Portfolio",
            link: "#",
          },
        },
      ],
    },
    {
      id: "319",
      category: "Refinery and Oil‑Field Chemicals",
      card: [
        {
          id: "826",
          title: "Keeping energy flowing, sustainably",
          description:
            "Our portfolio includes corrosion inhibitors, demulsifiers, and scale control agents, all of which are essential for both upstream and downstream oil operations. With global demand tied to energy transitions, Aarti delivers reliable, compliant solutions that strike a balance between performance and evolving environmental regulations. With proven expertise in handling hazardous chemistries and a strong compliance track record, AIL supports global refiners and oilfield service companies as a trusted partner from India with international credibility.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          BulletPoints: [],
          ctaButton: {
            id: "881",
            title: "Explore our Oilfield and Refinery Portfolio",
            link: "#",
          },
        },
      ],
    },
    {
      id: "320",
      category: "Speciality Chemicals",
      card: [
        {
          id: "827",
          title: "Customised solutions for complex challenges",
          description:
            "AIL supply a wide range of high-value speciality formulations, adhesives, catalysts, surfactants, coatings, UV absorbers, and electronic-grade intermediates. Our ability to deliver customisation at scale makes us the strategic partner of choice for niche applications across industries. Backed by decades of R&D and one of India's most diversified speciality chemicals portfolio, AIL uniquely combines customisation with backward integration, giving our partners a reliable, scalable edge that few global or indian peers can match.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          BulletPoints: [],
          ctaButton: {
            id: "882",
            title: "Partner for our Speciality Solutions",
            link: "#",
          },
        },
      ],
    },
    {
      id: "321",
      category: "Consumer Care & FMCG",
      card: [
        {
          id: "828",
          title: "Chemistry behind everyday essentials",
          description:
            "Our intermediates are used in personal care, cleaning, and household products, supporting FMCG companies in delivering safety, convenience, and performance. As consumers demand eco-friendly and dermatologically safe products, Aarti Industries enables FMCG giants to transition to sustainable alternatives.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          BulletPoints: [],
          ctaButton: {
            id: "883",
            title: "View End-Use Product Portfolio",
            link: "#",
          },
        },
      ],
    },
    {
      id: "322",
      category: "UV Absorbers",
      card: [
        {
          id: "830",
          title: "Protecting products from invisible damage",
          description:
            "AIL manufactures UV absorber intermediates that enhance the life and durability of plastics, coatings, textiles, and personal care products by shielding them from harmful ultraviolet radiation. With growing awareness of UV damage, demand is rising in the automotive, packaging, and skincare industries. Aarti Industry is among the few Indian manufacturers with the capability to scale UV absorber intermediates globally, ensuring compliance and performance in demanding end-use applications.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          BulletPoints: [],
          ctaButton: {
            id: "884",
            title: "Explore AIL UV Absorber Portfolio",
            link: "#",
          },
        },
      ],
    },
    {
      id: "323",
      category: "Fertilisers",
      card: [
        {
          id: "831",
          title: "Feeding the world responsibly",
          description:
            "AIL supplies intermediates used in the production of fertilisers, ammonia, nitrogen, phosphate, and potash, which are critical for modern agriculture. With the industry shifting towards green and low-carbon fertiliser production, we support this transition with sustainable chemistries. Our long-standing expertise in nitrogen-based chemistries and reliable supply capability make Aarti Industries a strategic partner for fertiliser producers in India and beyond.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          BulletPoints: [],
          ctaButton: {
            id: "885",
            title: "Explore our Fertiliser Range",
            link: "#",
          },
        },
      ],
    },
  ];

  return (
    <div className="my-[50px] lg:my-[100px]">
      <FadeInRevealBlur>
        <H2 className="mx-[20px] lg:mx-[60px]">
          Our Diverse Industry Portfolio
        </H2>
      </FadeInRevealBlur>
      <div className="mt-[50px]">
        <TabsAutoplaySection
          data={rdSafetyData}
          tabClass="!text-[16px]"
          starImgEffect
        />
      </div>
    </div>
  );
};

export default OurPortfolio;
