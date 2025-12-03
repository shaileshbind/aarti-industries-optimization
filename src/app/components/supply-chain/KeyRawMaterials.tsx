"use client";
import React, { useState } from "react";
import { BodyText2, H3, SubH2 } from "../Typography2";
import MainAccordion from "../Accordion";
import Image from "next/image";
import { KeyRawMaterialsProps } from "@/app/types/supply-chain.type";

export default function KeyRawMaterials({ data }: KeyRawMaterialsProps) {
  const { title, description, products } = data;

  const [expanded, setexpanded] = useState(0);

  return (
    <div className="lg:flex justify-between fluid-container">
      <div className="lg:w-[40%] ">
        {title && <H3>{title}</H3>}

        {description && (
          <BodyText2 className="pt-4 lg:pt-7">{description}</BodyText2>
        )}
      </div>

      {products?.length > 0 && (
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          {products?.map((item, index) => (
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
                  {item?.productName}
                </SubH2>
              }
            >
              <div className="border-[1px] rounded-[20px] overflow-hidden border-[#e8e8e8]">
                <div className="flex py-[18px] px-5 even:bg-[#F7F9FA] ">
                  <p className="text-[#002F50] w-[60%]">Technical Name :</p>
                  <p className="text-[#4C5861]">
                    {item?.productDetails?.commonName || "-"}
                  </p>
                </div>
                <div className="flex py-[18px] px-5 even:bg-[#F7F9FA] ">
                  <p className="text-[#002F50] w-[60%]">CAS No. :</p>
                  <p className="text-[#4C5861]">
                    {item?.productDetails?.casNo || "-"}
                  </p>
                </div>
                <div className="flex py-[18px] px-5 even:bg-[#F7F9FA] ">
                  <p className="text-[#002F50] w-[60%]">Molecular Formula :</p>
                  <p className="text-[#4C5861]">
                    {item?.productDetails?.chemicalFormula || "-"}
                  </p>
                </div>
                <div className="flex py-[18px] px-5 even:bg-[#F7F9FA] ">
                  <p className="text-[#002F50] w-[60%]">
                    Packaging Material Requirement :
                  </p>
                  <p className="text-[#4C5861]">
                    {item?.productDetails?.material || "-"}
                  </p>
                </div>
              </div>
            </MainAccordion>
          ))}
        </div>
      )}
    </div>
  );
}
