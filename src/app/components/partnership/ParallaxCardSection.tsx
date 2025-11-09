"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInReveal, WordReveal } from "../ScrollReveal";
import { BodyText2, H3, SubH1 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import Image from "next/image";
import Button from "../Button";
import MainAccordion from "../Accordion";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ParallaxCardSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const bottomLeftImageRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);
  const stickyImageRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number>(0);

  const accordionData = [
    {
      title: "Joint Ventures",
      description:
        "Joint Ventures allow AIL and its partners to co-invest in infrastructure, technologies or the new product, aligning capabilities to unlock innovation and market expansion.",
      list: [
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
      ],
      subDescription:
        "ReAarti JV - A Joint Venture focused on chemical recycling and circular economy solutions. This Partnership integrates AIL'’'s process expertise with innovative recycling technology to convert plastic waste into valuable chemical feedstock, advancing India'’'s sustainability goals.",
      ctaButton: {
        title: "Connect for a Joint Venture",
        link: "#",
      },
    },
    {
      title: "Manufacturing Partnerships (Contract Manufacturing)",
      description:
        "Manufacturing Partnerships (Contract Manufacturing) allow AIL and its partners to co-invest in infrastructure, technologies or the new product, aligning capabilities to unlock innovation and market expansion.",
      list: [
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
      ],
      subDescription:
        "ReAarti JV - A Joint Venture focused on chemical recycling and circular economy solutions. This Partnership integrates AIL'’'s process expertise with innovative recycling technology to convert plastic waste into valuable chemical feedstock, advancing India'’'s sustainability goals.",
      ctaButton: {
        title: "Connect for a Joint Venture",
        link: "#",
      },
    },
    {
      title: "Sourcing Partnerships",
      description:
        "Sourcing Partnerships allow AIL and its partners to co-invest in infrastructure, technologies or the new product, aligning capabilities to unlock innovation and market expansion.",
      list: [
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
      ],
      subDescription:
        "ReAarti JV - A Joint Venture focused on chemical recycling and circular economy solutions. This Partnership integrates AIL'’'s process expertise with innovative recycling technology to convert plastic waste into valuable chemical feedstock, advancing India'’'s sustainability goals.",
      ctaButton: {
        title: "Connect for a Joint Venture",
        link: "#",
      },
    },
    {
      title: "New Product Development (NPD)- Where ideas become molecules",
      description:
        "New Product Development (NPD)- Where ideas become molecules allow AIL and its partners to co-invest in infrastructure, technologies or the new product, aligning capabilities to unlock innovation and market expansion.",
      list: [
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
      ],
      subDescription:
        "ReAarti JV - A Joint Venture focused on chemical recycling and circular economy solutions. This Partnership integrates AIL'’'s process expertise with innovative recycling technology to convert plastic waste into valuable chemical feedstock, advancing India'’'s sustainability goals.",
      ctaButton: {
        title: "Connect for a Joint Venture",
        link: "#",
      },
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left image parallax
      gsap.to(leftImageRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Right image parallax
      gsap.to(rightImageRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Bottom left image parallax
      gsap.to(bottomLeftImageRef.current, {
        y: -180,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Calculate the distance between bottom image and sticky image
      const calculateDistance = () => {
        if (bottomImageRef.current && stickyImageRef.current) {
          const bottomRect = bottomImageRef.current.getBoundingClientRect();
          const stickyRect = stickyImageRef.current.getBoundingClientRect();
          return stickyRect.top - bottomRect.top + 120;
        }
        return 600; // fallback
      };

      // Use matchMedia for responsive scale values
      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1025px)",
          isTablet: "(max-width: 1024px)",
        },
        (context) => {
          //   const { isDesktop, isTablet } = context.conditions as any;

          // Bottom image moving to sticky position with crossfade
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stickyImageRef.current,
              start: "top bottom",
              end: "top 24%",
              scrub: 1,
            },
          });

          // Move bottom image DOWN to sticky position with responsive scale
          tl.to(
            bottomImageRef.current,
            {
              y: calculateDistance,
              ease: "none",
              scale: 1.9,
              x: 50,
            },
            0
          )
            .to(
              bottomImageRef.current,
              {
                opacity: 0,
                ease: "none",
              },
              0.6
            )
            .to(
              stickyImageRef.current,
              {
                opacity: 1,
                ease: "none",
              },
              0.6
            );
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div ref={containerRef} className="pt-[160px]">
      <div>
        <div className="flex gap-12 justify-between">
          <div ref={leftImageRef} className="w-[284px] h-[275px]">
            <Image
              src={"/images/partnership/leftImage.png"}
              alt="banner"
              width={284}
              height={275}
              className="w-full h-full"
            />
          </div>

          <WordReveal
            stagger={0.1}
            fromY={10}
            duration={3}
            className="w-[70%] text-center"
          >
            <AnimatedText>
              <SubH1 className="text-blue-200">
                {
                  "Aarti Industries (AIL), with over 40 years of experience, is a leading Indian custom chemical manufacturer. We partner with global speciality chemical leaders through strategic alliances and partnerships, contract manufacturing, new product development, or contract research. We are evolving beyond traditional outsourcing to co-create new chemistries, accelerate market access, and drive sustainable growth through flexible partnerships. AIL provides flexible, customised models that combine chemical expertise, scale, quality, sustainability, and innovation."
                }
              </SubH1>
            </AnimatedText>
          </WordReveal>

          <div ref={rightImageRef} className="w-[236px] h-[216px]">
            <Image
              src={"/images/partnership/rightImage.png"}
              alt="banner"
              width={236}
              height={216}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="flex justify-around mt-[66px]">
          <div ref={bottomLeftImageRef} className="w-[274px] h-[198px]">
            <Image
              src={"/images/partnership/bottomImage.png"}
              alt="banner"
              width={274}
              height={198}
              className="w-full h-full"
            />
          </div>

          <div ref={bottomImageRef} className="w-[355px] h-[256px]">
            <Image
              src={"/images/partnership/bottomImage.png"}
              alt="banner"
              width={355}
              height={256}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="grid grid-cols-2 gap-[86px] pt-[110px] pl-[60px]">
        <div className="">
          <FadeInReveal>
            <H3>
              From innovation to scale, we offer multiple ways to collaborate.
            </H3>

            <p>
              A long-term collaboration platform that creates shared business
              value through strategic alliances and partnerships to generate
              long-term value for its partners, offering multiple collaboration
              formats
            </p>
          </FadeInReveal>

          <FadeInReveal className="pt-18">
            {accordionData?.map((item, index) => (
              <MainAccordion
                key={`accordion-${index}`}
                expanded={expanded === index}
                onChange={() => setExpanded(index)}
                title={
                  <h2 className="text-xl text-[#002F50]">{item?.title}</h2>
                }
              >
                <div>
                  <BodyText2 className="pb-4 ">{item?.description}</BodyText2>

                  <div className="flex flex-col gap-2">
                    {item?.list?.map((item, index) => (
                      <div key={"list_" + index} className="flex gap-2">
                        <Image
                          src={"/images/star-orange.svg"}
                          alt="banner"
                          width={20}
                          height={20}
                        />
                        <BodyText2>{item?.title}</BodyText2>
                      </div>
                    ))}
                  </div>

                  <BodyText2 className="text-[#3A3F42] py-5">
                    {item?.subDescription}
                  </BodyText2>

                  <Button
                    secondary
                    title={item?.ctaButton?.title}
                    href={item?.ctaButton?.link}
                    className=" mb-2"
                  />
                </div>
              </MainAccordion>
            ))}
          </FadeInReveal>
        </div>

        {/* Sticky Image */}
        <div className="pr-[20px] lg:pr-0 mt-10 lg:mt-0 ">
          <div className="order-1 lg:order-2  h-[317px] lg:h-[640px] w-full overflow-hidden sticky top-[100px]">
            <div
              ref={stickyImageRef}
              className={`absolute right-0 top-0 min-h-[317px] lg:min-h-[568px] w-[100%] lg:w-full rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] opacity-0`}
            >
              <Image
                src={"/images/partnership/stickyBanner.png"}
                alt={"banner"}
                fill
                className="absolute object-cover opacity-40 rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-[unset] "
              />

              <Image
                src={"/images/partnership/stickyBanner.png"}
                alt={"banner"}
                width={500}
                height={548}
                className="absolute object-cover rounded-tl-[20px] lg:rounded-tl-[30px]  h-[calc(100%-71px)] lg:h-[calc(100%-93px)] w-[calc(100%-71px)] lg:w-[calc(100%-210px)]"
              />
              <Image
                src="/images/home/star-white.svg"
                alt="img"
                width={72}
                height={72}
                className="absolute top-[-36px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
              />
              <Image
                src="/images/home/star-white.svg"
                alt="img"
                width={72}
                height={72}
                className="absolute bottom-[50px] lg:bottom-[57px] z-10 right-[50px] lg:right-[174px] w-[42px] lg:w-[72px]"
              />
              <div className="absolute min-h-screen bg-white w-[1px] right-[71px] lg:right-[209.5px]" />
              <div className="absolute w-full bg-white bottom-[71px] lg:bottom-[92.5px] h-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
