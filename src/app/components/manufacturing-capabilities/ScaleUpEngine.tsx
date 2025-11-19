"use client";
import React, { useRef, useState } from "react";
import { H3, SubH3 } from "../Typography2";
import { FadeInReveal } from "../ScrollReveal";
import Image from "next/image";
import Button from "../Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { Swiper as SwiperType } from "swiper";
import MainAccordion from "../Accordion";

export default function ScaleUpEngine() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [expanded, setExpanded] = useState<number>(0);

  const cards = [
    {
      title: "Pilot Plant & Technology Innovation Centre:",
      description:
        "Our Pilot Plant & Technology Innovation Centre is fully operational, enabling innovation to become manufacturable. Serving as a vital bridge between concept and commercialisation, this facility is actively scaling up innovative technologies while simultaneously driving continuous process optimisation. Equipped with 50-1,000 L reactors and advanced process control systems, the AIL pilot plant enables:",
      list: [
        {
          title: "Process optimisation and Technology scale-up",
        },
        {
          title: "Process optimisation and Technology scale-up",
        },
        {
          title: "Process optimisation and Technology scale-up",
        },
        {
          title: "Process optimisation and Technology scale-up",
        },
        {
          title: "Process optimisation and Technology scale-up",
        },
      ],
      image: {
        url: "/images/cdmo/cdmo-green-banner.png",
        alternativeText: "",
      },
      sub_description:
        "At AIL Pilot Plant, every validated process is documented, digitally transferred, and ready for MPP scale-up, ensuring continuity and minimising re-engineering at commercial scale.",
      ctaButton: {
        title: "Connect for Pilot Evaluation",
        link: "#",
      },
    },
    {
      title: "Pilot Plant & Technology Innovation Centre:",
      description:
        "Our Pilot Plant & Technology Innovation Centre is fully operational, enabling innovation to become manufacturable. Serving as a vital bridge between concept and commercialisation, this facility is actively scaling up innovative technologies while simultaneously driving continuous process optimisation. Equipped with 50-1,000 L reactors and advanced process control systems, the AIL pilot plant enables:",
      list: [
        {
          title: "Design-of-Experiments and kinetic modelling",
        },
        {
          title: "Design-of-Experiments and kinetic modelling",
        },
        {
          title: "Design-of-Experiments and kinetic modelling",
        },
        {
          title: "Design-of-Experiments and kinetic modelling",
        },
        {
          title: "Design-of-Experiments and kinetic modelling",
        },
      ],
      image: {
        url: "/images/cdmo/cdmo-driving-banner.png",
        alternativeText: "",
      },
      sub_description:
        "At AIL Pilot Plant, every validated process is documented, digitally transferred, and ready for MPP scale-up, ensuring continuity and minimising re-engineering at commercial scale.",
      ctaButton: {
        title: "Connect for Pilot Evaluation",
        link: "#",
      },
    },
  ];

  return (
    <div className="fluid-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-[60px]">
        <H3 className="max-w-[424px]">
          Inside Jhagadia: AIL's Scale-Up Engine
        </H3>

        <p className="text-sm md:text-base xl:max-w-[536px]">
          AIL's new complex (Zone IV) is a 95-acre greenfield manufacturing hub
          designed for speed, sustainability, safety, scalability and continuous
          technology transfer. The combination enables AIL to achieve shorter
          commercialisation timelines, greater reproducibility, and reduced
          transition risks for complex speciality molecules.
        </p>
      </div>

      {/* Desktop */}
      <div className="mt-[60px] hidden lg:block">
        {/* Arrows */}
        <div className="flex justify-between items-center w-[45%]">
          <p className="text-[#DC4C03]">{`0${activeIndex + 1} - 0${
            cards?.length
          }`}</p>

          <div className="flex items-center gap-4">
            <Image
              src={"/images/arrow-up-right-o.svg"}
              alt={"prev"}
              width={24}
              height={24}
              className={`rotate-225 cursor-pointer ${
                activeIndex + 1 === 1 && "opacity-40"
              }`}
              onClick={() => swiperRef.current?.slidePrev()} // ⬅️ GO PREV
            />

            {/* RIGHT ARROW */}
            <Image
              src={"/images/arrow-up-right-o.svg"}
              alt={"next"}
              width={24}
              height={24}
              className={`rotate-45 cursor-pointer ${
                activeIndex + 1 === cards?.length && "opacity-40"
              }`}
              onClick={() => swiperRef.current?.slideNext()} // ⬅️ GO NEXT
            />
          </div>
        </div>

        {/* Swiper */}
        <div className="grid grid-cols-2 gap-[60px]">
          <Swiper
            effect="fade"
            speed={800}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full h-full cursor-grab"
          >
            {cards?.map((item, index) => (
              <SwiperSlide key={"card_" + index}>
                <div>
                  <SubH3 className="pt-6 pb-3">{item?.title}</SubH3>

                  <p className="text-sm md:text-base">{item?.description}</p>

                  <div className="flex flex-col gap-2 mt-3">
                    {item?.list?.map((item, index) => (
                      <div className="flex gap-2" key={"pointers_" + index}>
                        <Image
                          src={"/images/star-orange.svg"}
                          alt={"star"}
                          className="object-cover object-top"
                          width={20}
                          height={20}
                        />
                        <p>{item?.title}</p>
                      </div>
                    ))}

                    <p className="text-sm md:text-base py-5">
                      {item?.description}
                    </p>

                    <Button
                      secondary
                      title={item?.ctaButton?.title}
                      href={item?.ctaButton?.link}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <FadeInReveal>
            <div className="relative min-h-[520px] h-full rounded-[16px] overflow-hidden">
              <div className="absolute right-0 top-0 w-full min-h-[520px] rounded-[20px] overflow-hidden">
                <Image
                  src="/images/home/star-white.svg"
                  alt="star"
                  width={50}
                  height={50}
                  className="absolute -top-[24px] z-10 right-[96px] w-[42px] lg:w-[50px]"
                />
                <Image
                  src={cards?.[activeIndex]?.image?.url}
                  alt={cards?.[activeIndex]?.image?.alternativeText || "banner"}
                  fill
                  className="absolute object-cover opacity-40 blur-sm transition-opacity duration-700"
                />
                <Image
                  src={cards?.[activeIndex]?.image?.url}
                  alt={cards?.[activeIndex]?.image?.alternativeText || "banner"}
                  width={500}
                  height={548}
                  className="absolute object-cover h-[calc(100%-84px)] w-[calc(100%-120px)] transition-opacity duration-700"
                />
                <Image
                  src="/images/home/star-white.svg"
                  alt="star"
                  width={50}
                  height={50}
                  className="absolute bottom-[60px] z-10 right-[96px] w-[42px] lg:w-[50px]"
                />
                <div className="absolute min-h-screen bg-white w-[1px] right-[120px]" />
                <div className="absolute w-full bg-white bottom-[84px] h-[1px]" />
              </div>
            </div>
          </FadeInReveal>
        </div>
      </div>

      {/* Mobile */}
      <div className="block lg:hidden mt-[14px]">
        {cards?.map((item, index) => (
          <MainAccordion
            expanded={expanded === index}
            icon={
              expanded === index ? (
                <Image
                  src="/images/accordian-down.svg"
                  alt="star"
                  width={26}
                  height={26}
                />
              ) : (
                <Image
                  src="/images/accordian-down.svg"
                  alt="star"
                  width={26}
                  height={26}
                />
              )
            }
            onChange={() => setExpanded(index)}
            showIcon
            title={
              <h2
                className={`text-lg text-[#002F50] opacity-40 ${
                  expanded === index && "opacity-100 text-[#DC4C03]"
                }`}
              >
                {item?.title}
              </h2>
            }
          >
            <div className="relative min-h-[300px] h-full rounded-[16px] overflow-hidden">
              <div className="absolute right-0 top-0 w-full min-h-[300px] rounded-[20px] overflow-hidden">
                <Image
                  src="/images/home/star-white.svg"
                  alt="star"
                  width={50}
                  height={50}
                  className="absolute -top-[24px] z-10 right-[60px] w-[42px] lg:w-[50px]"
                />

                <Image
                  src={item?.image?.url}
                  alt={item?.image?.alternativeText || "banner"}
                  fill
                  className="absolute object-cover opacity-40 blur-sm transition-opacity duration-700"
                />
                <Image
                  src={item?.image?.url}
                  alt={item?.image?.alternativeText || "banner"}
                  width={500}
                  height={548}
                  className="absolute object-cover h-[calc(100%-50px)] w-[calc(100%-80px)] transition-opacity duration-700"
                />
                <Image
                  src="/images/home/star-white.svg"
                  alt="star"
                  width={50}
                  height={50}
                  className="absolute bottom-[30px] z-10 right-[60px] w-[42px] lg:w-[50px]"
                />
                <div className="absolute min-h-screen bg-white w-[1px] right-[80px]" />
                <div className="absolute w-full bg-white bottom-[50px] h-[1px]" />
              </div>
            </div>

            <div className="pt-5">
              <p className="text-sm md:text-base">{item?.description}</p>

              <div className="flex flex-col gap-2 mt-3">
                {item?.list?.map((item, index) => (
                  <div
                    className="flex gap-2 items-baseline"
                    key={"pointers_" + index}
                  >
                    <Image
                      src={"/images/star-orange.svg"}
                      alt={"star"}
                      className="object-cover object-top w-[14px] h-[14px]"
                      width={14}
                      height={14}
                    />
                    <p className="w-[96%]">{item?.title}</p>
                  </div>
                ))}

                <p className="text-sm md:text-base py-5">{item?.description}</p>

                <Button
                  secondary
                  title={item?.ctaButton?.title}
                  href={item?.ctaButton?.link}
                />
              </div>
            </div>
          </MainAccordion>
        ))}
      </div>
    </div>
  );
}
