import React from "react";
import { H2, SubH1 } from "../Typography2";
import Image from "next/image";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";

export default function LatestBlog() {
  return (
    <div className="fluid-container">
      <H2>Latest Blog</H2>

      <div className="md:flex justify-between items-center mt-[30px]">
        <FadeInReveal className="md:w-1/2 h-[280px] md:h-[336px] rounded-[14px] overflow-hidden mb-2 md:mb-0">
          <Image
            src="/images/home/hero-banner1.png"
            width={650}
            height={340}
            alt="banner"
            className="w-full h-full"
          />
        </FadeInReveal>

        <FadeInReveal delay={0.4} className="md:w-[46%]">
          <p className="text-sm text-[#DC4C03]">May 21, 2025</p>

          <SubH1 className="py-2">Striding for a noble cause</SubH1>

          <p className="text-base text-[#4C5861] lg:max-w-[536px]">
            Lorem ipsum dolor sit amet consectetur. Augue eu lobortis praesent
            purus pharetra. Diam id pharetra nisi felis varius tristique nulla.
            Elit mauris ipsum lacus aliquet. Volutpat vitae dui vestibulum
            volutpat aliquet enim neque eu leo. Blandit convallis ut vitae
            bibendum elementum. Cras eget maecenas ultrices cursus. Consequat id
            lobortis tempus porttitor ac sed.
          </p>

          <Button title="Read more" className="mt-[30px]" />
        </FadeInReveal>
      </div>
    </div>
  );
}
