import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { H2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";


const LatestAtAarti = () => {
  const [active, setActive] = useState(0);

  const sliderData = [
    {
      title: "Blogs",
      content: [
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 21, 2025",
          desc: "Tristique nulla sed hac donec nulla habitant facilisi.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 21, 2025",
          desc: "Urna at mi nunc sit cursus eu diam congue.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 21, 2025",
          title: "Lorem ipsum dolor sit amet consectetur.",
          desc: "Sit feugiat vel dictumst consectetur turpis.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 21, 2025",
          title: "Lorem ipsum dolor sit amet consectetur.",
          desc: "Neque cras quis sit mattis fringilla.",
        },
      ],
    },
    {
      title: "Thought Leadership",
      content: [
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 25, 2025",
          title: "Driving innovation in speciality chemicals.",
          desc: "Exploring sustainable practices for future-ready industries.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 25, 2025",
          title: "Leadership perspectives in research & development.",
          desc: "How R&D leaders shape the path to global competitiveness.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 25, 2025",
          title: "The role of collaboration in science & technology.",
          desc: "Building stronger partnerships across industries.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 25, 2025",
          title: "Sustainability in manufacturing.",
          desc: "Balancing growth with environmental responsibility.",
        },
      ],
    },
    {
      title: "News & Media",
      content: [
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 28, 2025",
          title: "Company announces new sustainability targets.",
          desc: "Commitment to reduce carbon emissions by 30% by 2030.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 28, 2025",
          title: "Expansion of manufacturing facilities in Asia.",
          desc: "Boosting capacity to meet growing global demand.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 28, 2025",
          title: "Featured in international trade magazine.",
          desc: "Recognition for leadership in speciality chemicals.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 28, 2025",
          title: "Community engagement initiatives.",
          desc: "Partnering with local schools and universities.",
        },
      ],
    },
    {
      title: "Reports & Publications",
      content: [
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "June 01, 2025",
          title: "Annual Sustainability Report 2025.",
          desc: "Detailed insights on progress towards global goals.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "June 01, 2025",
          title: "Market Trends in Chemical Innovation.",
          desc: "Analysis of emerging technologies and applications.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "June 01, 2025",
          title: "Global Partnerships Report.",
          desc: "Strengthening collaborations across continents.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "June 01, 2025",
          title: "Research & Development Highlights.",
          desc: "Key projects and outcomes from the last year.",
        },
      ],
    },
    {
      title: "Stories from AIL",
      content: [
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "June 05, 2025",
          title: "Employee spotlight: 20 years of dedication.",
          desc: "Celebrating the journey of our long-standing team members.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "June 05, 2025",
          title: "Innovation from within.",
          desc: "How our employees contribute breakthrough ideas daily.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "June 05, 2025",
          title: "Community outreach in rural areas.",
          desc: "Providing resources and support for local development.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "June 05, 2025",
          title: "Diversity and inclusion at AIL.",
          desc: "Fostering a culture of belonging across all teams.",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="mx-[20px] lg:container lg:mx-auto">
        <H2 className="text-blue-200">The Latest at Aarti</H2>
      </div>
      <div className="mt-[18px] md:mt-[28px]">
        {/* Tabs */}
        <div className="lg:container lg:mx-auto w-full overflow-scroll !px-[20px] lg:!px-[unset]">
          <div className="bg-grey-100 rounded-[40px] p-[4px]  flex overflow-x-auto whitespace-nowrap gap-x-[unset] lg:gap-x-[14px] w-fit">
            {sliderData?.map((items: any, index: number) => (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`text-grey-400 font-alte-hans leading-[136%] cursor-pointer py-[10px] lg:py-[12px] px-[12px] lg:px-[24px] rounded-[40px] ${
                  active === index ? "text-white bg-gradient-orange-3" : ""
                }`}
              >
                {items?.title}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[52px] container mx-[unset] lg:mx-auto">
          <Swiper
            spaceBetween={24}
            slidesPerView={1.5}
            breakpoints={{
              1024: { slidesPerView: 4 },
            }}
            modules={[Scrollbar]}
            scrollbar={{ draggable: true }}
            className="home-latest-at-swiper !px-[20px] lg:!px-[unset]"
          >
            {sliderData[active]?.content?.map((item, index) => (
              <SwiperSlide key={index}>
                <Link href={item?.link} target="_blank">
                  <div className="relative rounded-[10px] w-full h-[230px] overflow-hidden">
                    <Image
                      src={item?.img}
                      alt="img"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-[16px] font-roboto text-[14px] leading-[140%] font-normal text-orange-200">
                    {item?.date}
                  </div>
                  <div className="mt-[8px] font-roboto text-[16px] leading-[156%] font-normal text-grey-400">
                    {item?.desc}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LatestAtAarti;
