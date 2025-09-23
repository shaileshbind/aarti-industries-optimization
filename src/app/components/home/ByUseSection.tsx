import React, { useState, useRef } from "react";
import Image from "next/image";
import { BodyText2, SubH1, SubH2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Button from "../Button";
import gsap from "gsap";

const ByUseSection = () => {
  const [active, setActive] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const contentRef = useRef(null);
  const swiperRef = useRef(null);

  const sliderData = [
    {
      id: 0,
      title: "By End Use",
      heading: "Chemistry That Powers Industries",
      desc: "lorem ipsum",
      btn: "Check Industries",
      link: "#",
      content: [
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 21, 2025",
          title: "Pigments",
          desc: "Tristique nulla sed hac donec nulla habitant facilisi.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 21, 2025",
          title: "Dyes",
          desc: "Urna at mi nunc sit cursus eu diam congue.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 21, 2025",
          title: "Dyes & Pigments",
          desc: "Sit feugiat vel dictumst consectetur turpis.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 21, 2025",
          title: "Lorem ipsum ",
          desc: "Neque cras quis sit mattis fringilla.",
        },
      ],
    },
    {
      id: 1,
      title: "By Chemistry",
      heading: "Chemistry That Powers",
      desc: "lorem ipsum",
      btn: "Check Chemicals",
      link: "#",
      content: [
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 25, 2025",
          title: "Driving",
          desc: "Exploring sustainable practices for future-ready industries.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 25, 2025",
          title: "Leadership ",
          desc: "How R&D leaders shape the path to global competitiveness.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 25, 2025",
          title: "The role ",
          desc: "Building stronger partnerships across industries.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 25, 2025",
          title: "Sustainability ",
          desc: "Balancing growth with environmental responsibility.",
        },
      ],
    },
    {
      id: 2,
      title: "By Value Chain",
      heading: "Chemistry That Values",
      desc: "lorem ipsum",
      btn: "Discover our Industry Solutions",
      link: "#",
      content: [
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 28, 2025",
          title: "Company ",
          desc: "Commitment to reduce carbon emissions by 30% by 2030.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 28, 2025",
          title: "Expansion",
          desc: "Boosting capacity to meet growing global demand.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 28, 2025",
          title: "Featured ",
          desc: "Recognition for leadership in speciality chemicals.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 28, 2025",
          title: "Community",
          desc: "Partnering with local schools and universities.",
        },
      ],
    },
  ];

  const handleTabClick = (index: number) => {
    // Prevent multiple clicks during transition
    if (index === active || isTransitioning) return;

    setIsTransitioning(true);

    if (contentRef.current) {
      const tl = gsap.timeline();
      tl.to(contentRef.current, {
        duration: 0.3,
        opacity: 0,
        ease: "power2.in",
      })
        .call(() => {
          // Update state in the middle of animation
          setActive(index);
          setActiveIndex(0);
        })
        .to(contentRef.current, {
          duration: 0.3,
          opacity: 1,
          ease: "power2.out",
          onComplete: () => {
            setIsTransitioning(false);
          },
        });
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Tabs */}
      <div className="lg:container lg:mx-auto w-full overflow-x-auto px-5 lg:px-0">
        <div className="flex overflow-x-auto whitespace-nowrap gap-x-6 lg:gap-x-[72px] w-fit min-w-full lg:min-w-0">
          {sliderData?.map((items, index) => (
            <div
              key={items?.id}
              onClick={() => handleTabClick(index)}
              className={`text-grey-300 font-alte-hans leading-[136%] text-[32px] lg:text-[44px] cursor-pointer flex-shrink-0 transition-all duration-300 ease-out ${
                active === index ? "text-orange-200" : ""
              } ${isTransitioning ? "pointer-events-none" : ""}`}
            >
              {items?.title}
            </div>
          ))}
        </div>
      </div>
      {/* Content Section */}
      <div ref={contentRef} className="mt-[40px] lg:mt-[62px]">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Content - Contained */}
          <div className="px-5 lg:pl-[5rem] lg:pr-8 lg:w-[450px] xl:w-[500px] flex-shrink-0 mb-8 lg:mb-0">
            <SubH1 className="text-blue-200">
              {sliderData[active]?.heading}
            </SubH1>
            <BodyText2 className="text-grey-400 mt-[10px] mb-[24px] lg:mb-[36px]">
              {sliderData[active]?.desc}
            </BodyText2>
            <Button
              secondary
              href={sliderData[active]?.link}
              title={sliderData[active]?.btn}
            />
          </div>
          {/* Right Swiper - Full Width to Edge */}
          <div className="flex-1 min-w-0 mt-[42px] lg:mt-[0px] pl-[20px] lg:pl-[unset]">
            <div className="relative">
              <Swiper
                key={`swiper-${active}`}
                ref={swiperRef}
                spaceBetween={14}
                slidesPerView={1.2}
                breakpoints={{
                  1024: {
                    slidesPerView: 2.2,
                    spaceBetween: 24,
                  },
                }}
                modules={[Pagination, Navigation]}
                navigation={{
                  prevEl: ".swiper-button-prev-useBySection",
                  nextEl: ".swiper-button-next-useBySection",
                }}
                pagination={{
                  el: ".home-by-use-section-swiper",
                  type: "progressbar",
                }}
                className="w-full !pr-5 lg:!pr-0"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                observer={true}
                observeParents={true}
              >
                {sliderData[active]?.content?.map((item, index) => (
                  <SwiperSlide key={`${active}-${index}`}>
                    <div className="relative rounded-[20px] w-full h-[280px] sm:h-[320px] lg:h-[355px] bg-[#EFF3F5] mr-5 lg:mr-0">
                      <SubH2 className="text-blue-200 py-[24px] px-[26px]">
                        {item?.title}
                      </SubH2>
                      <div className="absolute bottom-0 w-full h-[200px] sm:h-[240px] lg:h-[272px]">
                        <Image
                          src={item?.img}
                          alt={item?.title}
                          fill
                          className="rounded-b-[20px] object-cover object-top"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="relative py-[30px]">
                <div className="hidden lg:flex w-fit gap-3 mt-8 px-5 lg:px-0 absolute bottom-[15px] right-[100px]">
                  <button
                    className={`swiper-button-prev-useBySection transition-opacity ${
                      activeIndex > 0
                        ? "cursor-pointer opacity-100"
                        : "pointer-events-none opacity-30"
                    }`}
                    aria-label="Previous slide"
                  >
                    <Image
                      src="/images/home/chevron-right-orange.svg"
                      alt="Previous"
                      width={34}
                      height={34}
                      className="rotate-180"
                    />
                  </button>
                  <button
                    className={`swiper-button-next-useBySection transition-opacity ${
                      activeIndex < sliderData[active]?.content?.length - 2
                        ? "cursor-pointer opacity-100"
                        : "pointer-events-none opacity-30"
                    }`}
                    aria-label="Next slide"
                  >
                    <Image
                      src="/images/home/chevron-right-orange.svg"
                      alt="Next"
                      width={34}
                      height={34}
                    />
                  </button>
                </div>
                <div className="home-by-use-section-swiper mt-4 bottom-6 h-[2px] mx-[20px] lg:mx-[unset] max-w-[100%] lg:max-w-[75%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByUseSection;
