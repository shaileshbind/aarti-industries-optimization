"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { BodyText1, BodyText2, H2, H3 } from "../Typography2";
import Chip from "../cards/Chip";
import FaqAccordion from "../FaqAccordian";
import Image from "next/image";
import { RDDiverseChemProps } from "@/app/types/r-and-d.type";
import { useMargin } from "@/app/contexts/MarginContext";
import { FadeInReveal } from "../ScrollReveal";
const RDDiverseChem: React.FC<RDDiverseChemProps> = ({ data, data2 }) => {
  const { title, description } = data;
  const { newChemistries, existingChemistries } = data2;

  const [swapped, setSwapped] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>("panel0");
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { marginBottom } = useMargin();
  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const children = gridRef.current.children;
    const leftCard = children[0] as HTMLElement;
    const rightCard = children[1] as HTMLElement;
    const containerWidth = gridRef.current.offsetWidth;
    const gap = 20;
    if (swapped) {
      const newLeftWidth = 375;
      const newRightWidth = containerWidth - newLeftWidth - gap;

      gsap.to(leftCard, {
        width: newLeftWidth,
        duration: 0.9,
        ease: "power2.inOut",
      });

      gsap.to(rightCard, {
        width: newRightWidth,
        duration: 0.9,
        ease: "power2.inOut",
      });
    } else {
      const newRightWidth = 375;
      const newLeftWidth = containerWidth - newRightWidth - gap;

      gsap.to(leftCard, {
        width: newLeftWidth,
        duration: 0.9,
        ease: "power2.inOut",
      });

      gsap.to(rightCard, {
        width: newRightWidth,
        duration: 0.9,
        ease: "power2.inOut",
      });
    }
  }, [swapped]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="pt-[72px] md:pt-[0px] lg:pt-[100px] pb-[72px] lg:pb-[unset] mx-[20px] lg:mx-[60px] mt-[100px] md:mt-[0px] lg:mt-[unset] lg:mb-[100px]"
    style={{ marginTop: marginBottom > 0 ? `${marginBottom}px` : undefined }}
    >
      <div className="w-full grid xl:grid-cols-[450px_1fr] gap-y-[10px] gap-x-[100px] ">
        {title && (
          <div>
            <FadeInReveal delay={0.2}>
            <H2>{title}</H2>
            </FadeInReveal>
          </div>
        )}
        <div> <FadeInReveal delay={0.2}>{description && <BodyText1>{description}</BodyText1>}</FadeInReveal></div>
      </div>
      <div className="hidden xl:block">
        <div
          ref={gridRef}
          className="mt-[44px] h-[600px] flex gap-x-[20px] w-full overflow-hidden"
        >
          <div
            className={`w-full rounded-[20px] p-[40px] border border-orange-100 h-[600px] ${
              swapped ? "grid content-between" : ""
            } `}
          >
            {newChemistries?.heading && <H3>{newChemistries?.heading}</H3>}

            {newChemistries?.content?.length > 0 &&
              newChemistries?.content?.map((item, index) => (
                <div
                  className={`mt-[30px] ${swapped ? "hidden" : "block"}`}
                  key={"tab_" + index}
                >
                  {item?.heading && <BodyText1 className="!text-[#10456A]">{item?.heading}</BodyText1>}

                  <div className="mt-[14px] flex flex-wrap gap-[12px]">
                    {item?.cards?.length > 0 &&
                      item?.cards?.map((items) => (
                        <Chip
                          key={items.id}
                          title={items.title}
                          imageSrc={items?.image?.url}
                          imageAlt={items?.image?.alternativeText}
                        />
                      ))}
                  </div>
                </div>
              ))}

            <div
              className={`${
                swapped ? "block" : "hidden"
              } mt-[14px] flex flex-wrap gap-[12px]`}
            >
              {newChemistries?.content?.[0]?.cards
                ?.slice(0, 4)
                ?.map((items) => (
                  <Chip key={items.id} title={items.title} />
                ))}
              <div
                onClick={() => setSwapped(!swapped)}
                className="bg-[#eff3f5] px-[18px] py-[8px] rounded-[40px] cursor-pointer"
              >
                <BodyText2>
                  View{" "}
                  {newChemistries?.content?.[0]?.cards?.length +
                    newChemistries?.content?.[1]?.cards?.length -
                    4}{" "}
                  more
                </BodyText2>
              </div>
            </div>
          </div>

          <div
            className={`w-full rounded-[20px] p-[40px] bg-gradient-orange-1 h-[600px] ${
              swapped ? "" : "grid content-between"
            } orange-card`}
          >
            <H3 className="text-white">{existingChemistries?.heading}</H3>
            <div
              className={`${
                swapped ? "mt-[30px]" : "mt-[unset]"
              } flex flex-wrap gap-[12px]`}
            >
              {(!swapped
                ? existingChemistries?.content?.[0]?.cards?.slice(0, 4)
                : existingChemistries?.content?.[0]?.cards
              )?.map((items) => (
                <Chip key={items.id} title={items.title} transparent />
              ))}

              {!swapped && (
                <div
                  onClick={() => setSwapped(!swapped)}
                  className="bg-white/10 px-[18px] py-[8px] rounded-[40px] cursor-pointer"
                >
                  <BodyText2 className="text-white">
                    View {existingChemistries?.content?.[0]?.cards?.length - 4}{" "}
                    more
                  </BodyText2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="mt-[30px] block xl:hidden">
        {Object?.values(data2)
          ?.slice(1)
          ?.map((items, index) => (
            <FaqAccordion
              key={index}
              className="border border-orange-200 !rounded-[14px] mb-[10px]"
              classNameTitle={`${
                expanded === `panel${index}`
                  ? "!px-[20px] !py-[10px]"
                  : "bg-gradient-orange-1 !rounded-[14px] !px-[20px] !py-[10px]"
              }`}
              faqTitle={
                <H3
                  className={`${
                    expanded === `panel${index}`
                      ? "text-blue-200"
                      : "text-white"
                  }`}
                >
                  {items.heading}
                </H3>
              }
              faqContent={
                items?.content?.length > 0 && (
                  <div className="px-[20px]">
                    {items?.content?.map((p) => (
                      <div key={p?.id} className="mb-[30px]">
                        {p.heading && <BodyText1 className="!text-blue-100">{p.heading}</BodyText1>}

                        {p?.cards?.length > 0 && (
                          <div className="mt-[20px] flex flex-wrap gap-[10px]">
                            {p?.cards?.map((l) => (
                              <Chip
                                key={l.id}
                                title={l.title}
                                imageSrc={l.mobImage?.url}
                                imageAlt={l.mobImage?.alternativeText}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
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
