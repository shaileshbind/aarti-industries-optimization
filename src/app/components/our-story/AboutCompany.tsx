"use client";
import React from "react";
import { FadeInRevealBlur } from "../ScrollReveal";
import { BodyText2, H3 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import Button from "../Button";
import { AboutCompanyProps } from "@/app/types/our.story.type";

const AboutCompany: React.FC<AboutCompanyProps> = ({ data }) => {
  if (!data) return null;

  const { sectionTitle, description, ctaButton } = data;

  return (
    <section className="fluid-container flex flex-col lg:flex-row gap-x-[200px] my-[22px] lg:my-[20px]">
      {/* Left Section — Title */}
      <FadeInRevealBlur delay={0.1}>
        {sectionTitle && (
          <BodyText2 className="font-alte-hans capitalize">
            {sectionTitle}
          </BodyText2>
        )}
      </FadeInRevealBlur>

      {/* Right Section — Description & CTA */}
      <div className="w-full lg:w-[60%] mt-5 lg:mt-0">
        {description && (
          <AnimatedText>
            <H3 className="whitespace-pre-line">{description}</H3>
          </AnimatedText>
        )}

        {ctaButton && (
          <Button
            className="mt-12"
            title={ctaButton.title}
            href={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`}
            secondary
          />
        )}
      </div>
    </section>
  );
};

export default AboutCompany;
