"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { BodyText1, BodyText2, H2, H3 } from "../Typography2";
import Chip from "../cards/Chip";
import FaqAccordion from "../FaqAccordian";
import Image from "next/image";
import { FadeInRevealBlur } from "../ScrollReveal";

const RDDiverseChem = () => {
  const chemData = [
    {
      id: 0,
      title: "New Chemistries",
      products: [
        {
          id: 0,
          heading: "Pilot Scale Chemistries",
          list: [
            { id: 0, title: "Grignard" },
            { id: 1, title: "Nitrilation" },
            { id: 2, title: "Condensation" },
            { id: 3, title: "Photo Chlorination" },
            { id: 4, title: "Hydrolysis" },
            { id: 5, title: "Sandmeyer" },
            { id: 6, title: "Balz-Schiemann" },
            { id: 7, title: "Isomerization" },
            { id: 8, title: "AHF" },
            { id: 9, title: "Polymerization" },
          ],
        },
        {
          id: 1,
          heading: "Lab Scale Chemistries",
          list: [
            { id: 0, title: "Denitromethoxylation" },
            { id: 1, title: "Vilsmeier-Haack Reaction" },
            { id: 2, title: "Flow Chemistry" },
            { id: 3, title: "Carboxylation" },
            { id: 4, title: "Benzidline Rearrangement" },
            { id: 5, title: "Hofmann" },
            { id: 6, title: "Vapoor-phase Nitration" },
            { id: 7, title: "Etherification" },
            { id: 8, title: "Acylation" },
          ],
        },
      ],
    },
    {
      id: 1,
      title: "Existing Chemistries",
      products: [
        {
          id: 0,
          heading: "",
          list: [
            { id: 0, title: "Hydrogenation" },
            { id: 1, title: "Nitration" },
            { id: 2, title: "Ammonolysis" },
            { id: 3, title: "Chlorination" },
            { id: 4, title: "Ethylation" },
            { id: 5, title: "Halex Chemistry" },
            { id: 6, title: "Estorification" },
            { id: 7, title: "Methylation" },
            { id: 8, title: "Dehalo hydrogenation" },
            { id: 9, title: "Diazotization" },
          ],
        },
      ],
    },
  ];
  const [swapped, setSwapped] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>("panel0");
  const gridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    gsap.to(gridRef.current, {
      gridTemplateColumns: swapped ? "375px 1fr" : "1fr 375px",
      duration: 0.9,
      ease: "power2.inOut",
    });
  }, [swapped]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="pt-[150px] pb-[50px] lg:py-[100px] mx-[20px] lg:mx-[60px]">
       <FadeInRevealBlur>
      <div className="w-full grid lg:grid-cols-[40%_1fr] gap-y-[10px] gap-x-[50px] ">
        <div>
          <H2>Diverse Chemistries, Distinctive Solutions</H2>
        </div>
        <div>
          <BodyText1>
            Our expertise spans diverse chemistries from existing core
            chemistries processes to new emerging chemistries like vapour phase,
            photochemistry, and fluorination. With a focus on process
            intensification and scale-up engineering, we deliver customised,
            market-ready solutions with speed, precision, and sustainability.
          </BodyText1>
        </div>
      </div>
      </FadeInRevealBlur>
      <div className="hidden lg:block">
        <div
          ref={gridRef}
          className="mt-[44px] h-[600px] grid grid-cols-[1fr_375px] gap-x-[20px] w-full overflow-hidden"
        >
          <div
            className={`w-full rounded-[20px] p-[40px] border border-orange-100 h-[600px] ${
              swapped ? "grid content-between" : ""
            } `}
          >
            <H3>{chemData[0]?.title}</H3>
            <div className={`mt-[30px] ${swapped ? "hidden" : "block"}`}>
              <BodyText1>{chemData[0]?.products[0]?.heading}</BodyText1>
              <div className="mt-[14px] flex flex-wrap gap-[12px]">
                {chemData[0]?.products[0]?.list?.map((items) => (
                  <Chip
                    key={items.id}
                    title={items.title}
                    imageSrc="/images/rd/chemical-1.svg"
                  />
                ))}
              </div>
            </div>
            <div className={`mt-[36px] ${swapped ? "hidden" : "block"}`}>
              <BodyText1>{chemData[0]?.products[1]?.heading}</BodyText1>
              <div className="mt-[14px] flex flex-wrap gap-[12px]">
                {chemData[0]?.products[1]?.list.map((items) => (
                  <Chip
                    key={items.id}
                    title={items.title}
                    imageSrc="/images/rd/chemical-1.svg"
                  />
                ))}
              </div>
            </div>
            <div
              className={`${
                swapped ? "block" : "hidden"
              } mt-[14px] flex flex-wrap gap-[12px]`}
            >
              {chemData[0]?.products[0]?.list?.slice(0, 4)?.map((items) => (
                <Chip key={items.id} title={items.title} />
              ))}
              <div
                onClick={() => setSwapped(!swapped)}
                className="bg-[#eff3f5] px-[18px] py-[8px] rounded-[40px] cursor-pointer"
              >
                <BodyText2>View 16 more</BodyText2>
              </div>
            </div>
          </div>
          <div
            className={`w-full rounded-[20px] p-[40px] bg-gradient-orange-1 h-[600px] ${
              swapped ? "" : "grid content-between"
            } orange-card`}
          >
            <H3 className="text-white">{chemData[1]?.title}</H3>
            <div
              className={`${
                swapped ? "mt-[30px]" : "mt-[unset]"
              } flex flex-wrap gap-[12px]`}
            >
              {(!swapped
                ? chemData[1]?.products[0]?.list?.slice(0, 4)
                : chemData[1]?.products[0]?.list
              ).map((items) => (
                <Chip key={items.id} title={items.title} transparent />
              ))}

              {!swapped && (
                <div
                  onClick={() => setSwapped(!swapped)}
                  className="bg-white/10 px-[18px] py-[8px] rounded-[40px] cursor-pointer"
                >
                  <BodyText2 className="text-white">View 6 more</BodyText2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[30px] block lg:hidden">
        {chemData.map((items, index) => (
          <FaqAccordion
            key={index}
            className="border border-orange-200 !rounded-[14px] mb-[10px]"
            classNameTitle={`${
              expanded === `panel${index}`
                ? "!p-[20px]"
                : "bg-gradient-orange-1 !rounded-[14px] !p-[20px]"
            }`}
            faqTitle={
              <H3
                className={`${
                  expanded === `panel${index}` ? "text-blue-200" : "text-white"
                }`}
              >
                {items.title}
              </H3>
            }
            faqContent={
              <div className="px-[20px]">
                {items.products.map((p) => (
                  <div key={p.id} className="mb-[30px]">
                    {p.heading && <BodyText1>{p.heading}</BodyText1>}
                    <div className="mt-[20px] flex flex-wrap gap-[10px]">
                      {p.list.map((l) => (
                        <Chip
                          key={l.id}
                          title={l.title}
                          imageSrc="/images/rd/chemical-1.svg"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            }
            showIcon
            iconProp={
              expanded === `panel${index}` ? (
                <Image
                  src="/images/accordian-down.svg"
                  alt="img"
                  width={28}
                  height={28}
                />
              ) : (
                <Image
                  src="/images/accordian-down-white.svg"
                  alt="img"
                  width={28}
                  height={28}
                />
              )
            }
            expanded={expanded === `panel${index}`}
            handleChange={handleChange(`panel${index}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RDDiverseChem;
