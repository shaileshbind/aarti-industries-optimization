"use client";
import React, { useState } from "react";
import { BodyText2, H3, SubH2 } from "../Typography2";
import MainAccordion from "../Accordion";
import Image from "next/image";

export default function KeyRawMaterials() {
  const [expanded, setexpanded] = useState(0);

  return (
    <div className="lg:flex justify-between fluid-container">
      <div className="lg:w-[40%] ">
        <H3>Our Key Raw Materials: The Foundation of Speciality Chemistry</H3>

        <BodyText2 className="pt-4 lg:pt-7">
          Our procurement network manages critical inputs sourced responsibly
          from reputed global and Indian partners. Each material is screened for
          quality, sustainability, and traceability, ensuring that every
          molecule entering our process meets AIL's environmental and ethical
          standards.
        </BodyText2>
      </div>

      <div className="lg:w-1/2 mt-6 lg:mt-0">
        {[16, 16, 16, 16]?.map((_, index) => (
          <MainAccordion
            key={"accordion" + index}
            expanded={expanded === index}
            onChange={() => setexpanded(index)}
            icon={
              <Image
                src={"/images/accordian-down.svg"}
                alt="arrow"
                width={26}
                height={26}
              />
            }
            title={
              <SubH2
                className={`text-lg md:text-2xl text-[#002F50] opacity-40 ${
                  expanded === index && "opacity-100"
                }`}
              >
                Benzotrifluoride
              </SubH2>
            }
          >
            <div className="border-[1px] rounded-[20px] overflow-hidden border-[#e8e8e8]">
              {[16, 16, 16, 16]?.map((_, index2) => (
                <div
                  className="flex py-[18px] px-5 even:bg-[#F7F9FA] "
                  key={"list" + index2}
                >
                  <p>Technical Name :</p>
                  <p>Benzotrifluoride</p>
                </div>
              ))}
            </div>
          </MainAccordion>
        ))}
      </div>
    </div>
  );
}
