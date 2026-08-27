"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { BodyText1, BodyText2, H2, SubH2 } from "../Typography2";
import ParallaxImage from "../ParallaxImage";
import { CDMODrivingProps } from "@/app/types/cdmo.type";
import { FadeInGroup, FadeInReveal } from "../ScrollReveal";
import Button from "../Button";
import SmoothScrollContainer from "../SmoothScrollContainer";

// Component for animated counter value
interface CounterValueProps {
  value: string;
  duration?: number;
  className?: string;
}

const CounterValue: React.FC<CounterValueProps> = ({
  value,
  duration = 2000,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const hasAnimatedRef = useRef<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimatedRef.current) return;

    // Extract numeric value and suffix from the string
    const match = value.match(/^([\d,]+\.?\d*)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const numericStr = match[1].replace(/,/g, "");
    const suffix = match[2] || "";
    const targetValue = parseFloat(numericStr);

    if (isNaN(targetValue)) {
      setDisplayValue(value);
      return;
    }

    // Set initial display with suffix if present
    if (suffix) {
      setDisplayValue("0" + suffix);
    }

    // Intersection Observer to trigger animation when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            observer.disconnect();

            // Animate the counter
            let startTime: number | null = null;
            const startValue = 0;

            const animate = (currentTime: number) => {
              if (startTime === null) {
                startTime = currentTime;
              }

              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function (ease-out)
              const easeOut = 1 - Math.pow(1 - progress, 3);

              const currentValue = startValue + (targetValue - startValue) * easeOut;

              // Format the number (preserve decimals if original had them)
              const formattedValue = numericStr.includes(".")
                ? currentValue.toFixed(1)
                : Math.floor(currentValue).toString();

              // Add back commas for thousands
              const formattedWithCommas = formattedValue.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ",",
              );

              setDisplayValue(formattedWithCommas + suffix);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                // Ensure final value is exact
                const finalFormatted = numericStr.includes(".")
                  ? targetValue.toFixed(1)
                  : Math.floor(targetValue).toString();
                const finalWithCommas = finalFormatted.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ",",
                );
                setDisplayValue(finalWithCommas + suffix);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: "0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
};

const CDMODriving: React.FC<CDMODrivingProps> = ({ data }) => {
  const { image, leftSection, righSection } = data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="h-auto lg:h-full lg:py-[100px] py-[50px] relative">
      <div className="lg:absolute top-0 left-0 w-full h-full">
        {image?.url && (
          <Image
            src={image?.url}
            alt={image?.alternativeText || "banner"}
            width={1440}
            height={849}
            className="block lg:hidden lg:w-full h-full object-cover z-0 w-[calc(100%-40px)] mx-auto lg:px-0 rounded-[14px] lg:rounded-[0px]"
          />
        )}

        {image?.url && (
          <ParallaxImage
            src={image?.url}
            alt={image?.alternativeText || "banner"}
            className="hidden lg:block w-full h-full object-cover z-0 px-[20px] lg:px-0 rounded-[50px] lg:rounded-[0px]"
          />
        )}
      </div>

      <div className="  lg:px-14 mb-0 lg:mt-60 z-10 w-full flex lg:flex-row flex-col justify-between container">
        <FadeInReveal
          delay={0.2}
          className="w-full lg:w-[63%] bg-white rounded-3xl relative "
        >
          {/* Main Content Section - Always Visible */}
          <div className="lg:pt-[40px] lg:pb-[85px] pt-7  flex flex-col">
            {leftSection?.title && (
              <H2 className="lg:w-[85%] w-full pb-4 md:px-[20px] lg:px-[42px]">
                {leftSection?.title}
              </H2>
            )}

            {leftSection?.description && (
              <BodyText1 className="pb-7 md:px-[20px] lg:px-[42px]">
                {leftSection?.description}
              </BodyText1>
            )}

            {leftSection?.ctaButton?.title && (
              <Button
                title={leftSection?.ctaButton?.title}
                href={
                  leftSection?.ctaButton?.hasExternalLink == "true"
                    ? leftSection?.ctaButton?.externalLink
                    : leftSection?.ctaButton?.link?.link
                }
                useTargetBlank={
                  leftSection?.ctaButton?.hasExternalLink === "true"
                }
                secondary
                className="md:mx-[20px] lg:mx-[42px] mb-[40px]"
              />
            )}

            <div
              className={`hidden lg:block absolute bottom-0  w-full transition-all duration-700 bg-gradient-orange-3 overflow-hidden ${
                isOpen ? "rounded-2xl h-full" : "rounded-b-3xl h-[76px]"
              }`}
            >
              {/* Accordion Header - Always Visible */}
              {leftSection?.accordion?.title && (
                <button
                  onClick={toggleAccordion}
                  className="w-full py-5 px-[42px] flex justify-between items-center cursor-pointer relative z-10"
                >
                  <SubH2 className="text-white">
                    {leftSection?.accordion?.title}
                  </SubH2>
                  <span
                    className={`text-white text-3xl font-light transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              )}
              {isOpen && (
                <Image
                  src="/images/home/flower-t.svg"
                  alt="img"
                  width={245}
                  height={245}
                  className="absolute bottom-[-35px] md:bottom-[-40px] -right-[30px] md:-right-[50px] w-[245px] h-[245px]"
                />
              )}
              {/* Accordion Content - Collapsible */}
              {leftSection?.accordion?.items?.length > 0 && (
                <SmoothScrollContainer
                  className={`transition-all duration-700 ease-in-out h-[calc(100%-84px)]  overflow-scroll scrollbar-style relative`}
                >
                  {/* <Image
                    src="/images/home/flower-t.svg"
                    alt="img"
                    width={245}
                    height={245}
                    className="absolute bottom-[-35px] md:bottom-[-40px] -right-[30px] md:-right-[50px] w-[245px] h-[245px]"
                  /> */}
                  {/* Capabilities List */}
                  <div className="px-[42px] pb-9">
                    <div className="space-y-4 ">
                      {leftSection?.accordion?.items?.map(
                        (capability, index) =>
                          capability?.title && (
                            <div key={index} className="flex items-start gap-3">
                              <Image
                                src="/images/star.png"
                                alt="check-icon"
                                width={16}
                                height={16}
                                className="mt-[4px]"
                              />
                              <BodyText2 className="text-white">
                                {capability?.title}
                              </BodyText2>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                </SmoothScrollContainer>
              )}
            </div>
          </div>
        </FadeInReveal>

        <div
          className={`block lg:hidden md:mx-3 w-auto transition-all duration-700 bg-gradient-orange-3 rounded-2xl mb-9`}
        >
          {/* Accordion Header - Always Visible */}
          {leftSection?.accordion?.title && (
            <button
              onClick={toggleAccordion}
              className="w-full py-3 px-[22px] flex justify-between items-center cursor-pointer"
            >
              <SubH2 className="text-white">
                {leftSection?.accordion?.title}
              </SubH2>
              <span
                className={`text-white text-3xl font-light transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
          )}

          {/* Accordion Content - Collapsible */}
          {leftSection?.accordion?.items?.length > 0 && (
            <div
              className={`transition-all duration-700 ease-in-out 
                ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"} 
                overflow-scroll  
                scrollbar-style
              `}
            >
              {/* Capabilities List */}
              <div className="px-[22px] pb-9">
                <div className="space-y-4 ">
                  {leftSection?.accordion?.items?.map(
                    (capability, index) =>
                      capability?.title && (
                        <div key={index} className="flex items-start gap-3">
                          <Image
                            src="/images/star.png"
                            alt="check-icon"
                            width={14}
                            height={14}
                            className="mt-[3px]"
                          />
                          <BodyText2 className="text-white">
                            {capability?.title}
                          </BodyText2>
                        </div>
                      ),
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <FadeInGroup
          delay={0.2}
          className="grid grid-cols-2 grid-rows-2 gap-4 z-[1] relative lg:w-[35%] w-full"
        >
          {righSection?.values?.map((item, index) => (
            <div
              className="bg-grey-100 py-[28px] lg:px-[24px] px-[20px] rounded-[20px] stat-box  "
              key={"item_" + index}
              data-scroll
            >
              {item?.value && (
                <H2 className="text-orange-200 !text-[40px] lg:!text-[60px]">
                  <CounterValue value={item.value} duration={2000} />
                </H2>
              )}
              {item?.description && (
                <BodyText2 className="lg:w-[80%] w-full">
                  {item?.description}
                </BodyText2>
              )}
            </div>
          ))}
        </FadeInGroup>
      </div>
    </section>
  );
};

export default CDMODriving;
