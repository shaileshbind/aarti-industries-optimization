"use client";
import React, { useEffect, useRef, useState } from "react";
import { BodyText2, H2, SubH1, SubH2 } from "../Typography2";
import "swiper/css";
import "swiper/css/effect-fade";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import FaqAccordion from "../FaqAccordian";
import clsxN from "../../../../utils/clsxN";
import Button from "../Button";

const EnvResp = () => {
  const envData = [
    {
      id: "0",
      category: "Energy Conservation",
      card: [
        {
          id: "0",
          description:
            "We optimise energy use through efficiency-driven processes and reduced reliance on fossil fuels. Our IT-based Energy Management System (EnMS) enables smarter monitoring, control, and conservation, ensuring robust and sustainable energy practices.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          ctaButton: {
            id: "0",
            title: "View our Energy Policy",
            link: "#",
          },
          target:
            "Reduce specific energy consumption by 20% from baseline year of FY 20 by FY28",
          performance: [
            { id: 0, title: "13.2 MW Renewable Energy (RE) commissioned" },
            {
              id: 1,
              title: "Phase 2 - 25.7 MW Hybrid RE (Solar and Hybrid) approved",
            },
            { id: 2, title: "5.0 million kWh saved" },
            {
              id: 3,
              title: "Specific energy use decreased by 7% to 7.8 GJ/MT",
            },
          ],
          icons: [
            { id: 0, image: "/images/environment/e-icon1.png" },
            {
              id: 1,
              image: "/images/environment/e-icon2.png",
            },
            { id: 2, image: "/images/environment/e-icon3.png" },
          ],
          info: [
            { id: 0, title: "Material Topic", desc: "Energy Management" },
            { id: 1, title: "Capital Impacted ", desc: "Natural capital" },
          ],
        },
      ],
    },
    {
      id: "1",
      category: "Carbon Emission Reduction",
      card: [
        {
          id: "0",
          description:
            "We optimise energy use through efficiency-driven processes and reduced reliance on fossil fuels. Our IT-based Energy Management System (EnMS) enables smarter monitoring, control, and conservation, ensuring robust and sustainable energy practices.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/f34139832fdbac8aafd0fd32cb136fb0c6f39af6_1dd4b9dcf3.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/f34139832fdbac8aafd0fd32cb136fb0c6f39af6_1dd4b9dcf3.jpg",
            alternativeText: "",
          },
          ctaButton: {
            id: "0",
            title: "View our Energy Policy",
            link: "#",
          },
          target:
            "Reduce specific energy consumption by 20% from baseline year of FY 20 by FY28",
          performance: [
            { id: 0, title: "13.2 MW Renewable Energy (RE) commissioned" },
            {
              id: 1,
              title: "Phase 2 - 25.7 MW Hybrid RE (Solar and Hybrid) approved",
            },
            { id: 2, title: "5.0 million kWh saved" },
            {
              id: 3,
              title: "Specific energy use decreased by 7% to 7.8 GJ/MT",
            },
          ],
          icons: [
            { id: 0, image: "/images/environment/e-icon1.png" },
            {
              id: 1,
              image: "/images/environment/e-icon2.png",
            },
            { id: 2, image: "/images/environment/e-icon3.png" },
          ],
          info: [
            { id: 0, title: "Material Topic", desc: "Energy Management" },
            { id: 1, title: "Capital Impacted ", desc: "Natural capital" },
          ],
        },
      ],
    },
    {
      id: "2",
      category: "Water Management",
      card: [
        {
          id: "0",
          description:
            "We optimise energy use through efficiency-driven processes and reduced reliance on fossil fuels. Our IT-based Energy Management System (EnMS) enables smarter monitoring, control, and conservation, ensuring robust and sustainable energy practices.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          ctaButton: {
            id: "0",
            title: "View our Energy Policy",
            link: "#",
          },
          target:
            "Reduce specific energy consumption by 20% from baseline year of FY 20 by FY28",
          performance: [
            { id: 0, title: "13.2 MW Renewable Energy (RE) commissioned" },
            {
              id: 1,
              title: "Phase 2 - 25.7 MW Hybrid RE (Solar and Hybrid) approved",
            },
            { id: 2, title: "5.0 million kWh saved" },
            {
              id: 3,
              title: "Specific energy use decreased by 7% to 7.8 GJ/MT",
            },
          ],
          icons: [
            { id: 0, image: "/images/environment/e-icon1.png" },
            {
              id: 1,
              image: "/images/environment/e-icon2.png",
            },
            { id: 2, image: "/images/environment/e-icon3.png" },
          ],
          info: [
            { id: 0, title: "Material Topic", desc: "Energy Management" },
            { id: 1, title: "Capital Impacted ", desc: "Natural capital" },
          ],
        },
      ],
    },
    {
      id: "3",
      category: "Waste Management ",
      card: [
        {
          id: "0",
          description:
            "We optimise energy use through efficiency-driven processes and reduced reliance on fossil fuels. Our IT-based Energy Management System (EnMS) enables smarter monitoring, control, and conservation, ensuring robust and sustainable energy practices.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          ctaButton: {
            id: "0",
            title: "View our Energy Policy",
            link: "#",
          },
          target:
            "Reduce specific energy consumption by 20% from baseline year of FY 20 by FY28",
          performance: [
            { id: 0, title: "13.2 MW Renewable Energy (RE) commissioned" },
            {
              id: 1,
              title: "Phase 2 - 25.7 MW Hybrid RE (Solar and Hybrid) approved",
            },
            { id: 2, title: "5.0 million kWh saved" },
            {
              id: 3,
              title: "Specific energy use decreased by 7% to 7.8 GJ/MT",
            },
          ],
          icons: [
            { id: 0, image: "/images/environment/e-icon1.png" },
            {
              id: 1,
              image: "/images/environment/e-icon2.png",
            },
            { id: 2, image: "/images/environment/e-icon3.png" },
          ],
          info: [
            { id: 0, title: "Material Topic", desc: "Energy Management" },
            { id: 1, title: "Capital Impacted ", desc: "Natural capital" },
          ],
        },
      ],
    },
    {
      id: "4",
      category: "Life Cycle Assessment",
      card: [
        {
          id: "0",
          description:
            "We optimise energy use through efficiency-driven processes and reduced reliance on fossil fuels. Our IT-based Energy Management System (EnMS) enables smarter monitoring, control, and conservation, ensuring robust and sustainable energy practices.",
          image: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          mobImage: {
            url: "https://d2sslj1veyp2s3.cloudfront.net/671cb7c6bf9c6409f68f974cf54da329cc448f26_5c4a034ba0.jpg",
            alternativeText: "",
          },
          ctaButton: {
            id: "0",
            title: "View our Energy Policy",
            link: "#",
          },
          target:
            "Reduce specific energy consumption by 20% from baseline year of FY 20 by FY28",
          performance: [
            { id: 0, title: "13.2 MW Renewable Energy (RE) commissioned" },
            {
              id: 1,
              title: "Phase 2 - 25.7 MW Hybrid RE (Solar and Hybrid) approved",
            },
            { id: 2, title: "5.0 million kWh saved" },
            {
              id: 3,
              title: "Specific energy use decreased by 7% to 7.8 GJ/MT",
            },
          ],
          icons: [
            { id: 0, image: "/images/environment/e-icon1.png" },
            {
              id: 1,
              image: "/images/environment/e-icon2.png",
            },
            { id: 2, image: "/images/environment/e-icon3.png" },
          ],
          info: [
            { id: 0, title: "Material Topic", desc: "Energy Management" },
            { id: 1, title: "Capital Impacted ", desc: "Natural capital" },
          ],
        },
      ],
    },
  ];
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startProgress = () => {
    // Cancel any existing animation
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    setProgress(0);
    startTimeRef.current = performance.now();

    const duration = 10000;

    const animate = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressPercent);

      if (progressPercent < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Move to next slide
        const nextIndex = (active + 1) % envData.length;
        setActive(nextIndex);
        setExpanded(`panel${nextIndex}`);
        if (swiperRef.current) {
          swiperRef.current.slideToLoop(nextIndex);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  // Start autoplay on mount and when active changes
  useEffect(() => {
    startProgress();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [active, envData?.length, startProgress]);

  // Handle tab click
  const handleTabClick = (index: number) => {
    if (index === active) return;

    // Cancel current animation
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    setActive(index);
    setExpanded(`panel${index}`);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
    // Progress will restart via useEffect
  };

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      const panelIndex = parseInt(panel.replace("panel", ""));
      if (isExpanded) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        setActive(panelIndex);
        setExpanded(panel);
      }
    };
  return (
    <div className="my-[50px] lg:my-[100px] container mx-[auto]">
      <H2 className="max-w-[760px] ">
        Towards Responsible Chemistry: Reducing Impact, Creating Value
      </H2>
      {/* Desktop */}
      <div className=" my-[70px] lg:my-[120px] hidden lg:grid grid-cols-[25%_1fr] gap-x-[60px]">
        {/* Tabs */}
        {envData?.length > 0 && (
          <div className="mt-[14px]">
            {envData?.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleTabClick(index)}
                className="relative border-b border-transparent cursor-pointer group"
              >
                <SubH2
                  className={clsxN(
                    `${
                      index === active ? "text-orange-200" : "text-grey-300"
                    } py-[20px] relative z-10 transition-colors duration-300 group-hover:text-orange-200`
                  )}
                >
                  {item?.category}
                </SubH2>

                {/* Grey line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />

                {/* Orange progress bar only for active tab */}
                {index === active && (
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                    style={{
                      width: `${progress}%`,
                      transition: "none", // Remove transition to prevent glitches
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="relative">
          <div className="relative h-[330px] w-[full]">
            <div className="absolute right-0 top-0 w-full h-[330px] rounded-[20px] overflow-hidden">
              <Image
                src={envData[active]?.card[0]?.image.url}
                alt={
                  envData[active]?.card[0].image.alternativeText
                    ? envData[active]?.card[0].image.alternativeText
                    : "img"
                }
                fill
                className="absolute object-cover object-top opacity-20"
              />
              <Image
                src={envData[active]?.card[0].image.url}
                alt={envData[active]?.card[0].image.alternativeText || "img"}
                width={500}
                height={548}
                className="absolute object-cover object-top h-[calc(100%-64px)] w-[calc(100%-58px)]"
              />
              <Image
                src="/images/home/star-white.svg"
                alt="star"
                width={50}
                height={50}
                className="absolute bottom-[39.5px] z-10 right-[33.5px] w-[42px] lg:w-[50px]"
              />
              <div className="absolute min-h-screen bg-white w-[1px] right-[58px]" />
              <div className="absolute w-full bg-white bottom-[64px] h-[1px]" />
            </div>
          </div>
          <div className="mt-[30px]">
            <BodyText2>{envData?.[active]?.card[0]?.description}</BodyText2>
            <div className="flex gap-x-[60px] mt-[30px]">
              <div>
                <BodyText2>SDGs at play </BodyText2>
                <div className="flex gap-x-[40px] mt-[10px] mb-[30px]">
                  {envData[active]?.card[0]?.icons?.map((items) => {
                    return (
                      <Image
                        key={items?.id}
                        src={items?.image}
                        alt="icon"
                        width={64}
                        height={64}
                        className="objcect-cover"
                      />
                    );
                  })}
                </div>
                {envData[active]?.card[0]?.info.map((item) => {
                  return (
                    <div key={item?.id} className="mb-[30px]">
                      <BodyText2 className="text-grey-300">
                        {item?.title}
                      </BodyText2>
                      <BodyText2>{item?.desc}</BodyText2>
                    </div>
                  );
                })}
              </div>
              <div>
                <BodyText2>Target</BodyText2>
                <BodyText2 className="text-grey-300">
                  {envData[active]?.card[0]?.target}
                </BodyText2>
                <BodyText2 className="mt-[30px] mb-[12px]">
                  Performance
                </BodyText2>
                {envData[active]?.card[0]?.performance.map((item) => {
                  return (
                    <div key={item?.id} className="mb-[10px] flex gap-x-[10px]">
                      <Image
                        src="/images/star-orange.svg"
                        alt="icon"
                        width={14}
                        height={14}
                      />
                      <BodyText2>{item?.title}</BodyText2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
           <Button
          secondary
          href={envData[active]?.card[0]?.ctaButton?.link}
          title={envData[active]?.card[0]?.ctaButton?.title}
          className="mt-[12px]"
        />
        </div>
       
      </div>
      {/* Mobile Accordion */}
      {envData?.length > 0 && (
        <div className="block lg:hidden w-full py-[30px]">
          {envData?.map((item, index) => (
            <div key={item.id} className="relative">
              <FaqAccordion
                faqTitle={
                  <SubH1
                    className={
                      expanded === `panel${index}`
                        ? "text-orange-100"
                        : "text-gray-300"
                    }
                  >
                    {item.category}
                  </SubH1>
                }
                faqContent={
                  <div className="mt-[20px] mb-[30px]">
                    {item?.card?.[0] && (
                      <>
                        <div className="relative w-full h-[300px] rounded-[14px] overflow-hidden">
                          <div className="absolute right-0 top-0 w-full h-[300px] rounded-[14px] overflow-hidden">
                            <Image
                              src={item.card[0].image.url}
                              alt={item.card[0].image.alternativeText || "img"}
                              fill
                              className="absolute object-cover opacity-40"
                            />
                            <Image
                              src={item.card[0].image.url}
                              alt={item.card[0].image.alternativeText || "img"}
                              width={500}
                              height={300}
                              className="absolute object-cover h-[calc(100%-39px)] w-[calc(100%-66px)]"
                            />
                            <Image
                              src="/images/home/star-white.svg"
                              alt="star"
                              width={36}
                              height={36}
                              className="absolute bottom-[22px] z-10 right-[48px] w-[36px]"
                            />
                            <div className="absolute min-h-screen bg-white w-[1px] right-[66px]" />
                            <div className="absolute w-full bg-white bottom-[39px] h-[1px]" />
                          </div>
                        </div>
                        {item?.card[0]?.description && (
                          <BodyText2 className="mt-[20px]">
                            {item.card[0].description}
                          </BodyText2>
                        )}
                        <div className="mt-[28px]">
                          <BodyText2>SDGs at play </BodyText2>
                          <div className="flex gap-x-[12px] mt-[10px] mb-[28px]">
                            {envData[active]?.card[0]?.icons?.map((items) => {
                              return (
                                <Image
                                  key={items?.id}
                                  src={items?.image}
                                  alt="icon"
                                  width={50}
                                  height={50}
                                  className="objcect-cover"
                                />
                              );
                            })}
                          </div>
                          <div className="flex gap-x-[30px]">
                            {envData[active]?.card[0]?.info.map((item) => {
                              return (
                                <div key={item?.id}>
                                  <BodyText2 className="text-grey-300">
                                    {item?.title}
                                  </BodyText2>
                                  <BodyText2>{item?.desc}</BodyText2>
                                </div>
                              );
                            })}
                          </div>
                          <BodyText2 className="mt-[28px]">Target</BodyText2>
                          <BodyText2 className="text-grey-300">
                            {envData[active]?.card[0]?.target}
                          </BodyText2>
                          <BodyText2 className="mt-[28px]">
                            Performance
                          </BodyText2>
                          {envData[active]?.card[0]?.performance.map((item) => {
                            return (
                              <div
                                key={item?.id}
                                className="mb-[10px] flex gap-x-[10px]"
                              >
                                <Image
                                  src="/images/star-orange.svg"
                                  alt="icon"
                                  width={14}
                                  height={14}
                                />
                                <BodyText2>{item?.title}</BodyText2>
                              </div>
                            );
                          })}
                          <Button
                            secondary
                            href={envData[active]?.card[0]?.ctaButton?.link}
                            title={envData[active]?.card[0]?.ctaButton?.title}
                            className="mt-[12px]"
                          />
                        </div>
                      </>
                    )}
                  </div>
                }
                showIcon
                expanded={expanded === `panel${index}`}
                handleChange={handleChange(`panel${index}`)}
              />
              {/* Grey line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />
              {/* Orange progress bar only for active accordion */}
              {index === active && (
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                  style={{
                    width: `${progress}%`,
                    transition: "none",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnvResp;
