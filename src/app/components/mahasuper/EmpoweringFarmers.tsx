"use client";
import Image from "next/image";
import React from "react";
import { BodyText2, H2, H3, BodyText3 } from "../Typography2";
import Button from "../Button";
import { EmpoweringFarmersProps } from "@/app/types/mahasuper.type";

const EmpoweringFarmers: React.FC<EmpoweringFarmersProps> = ({ data }) => {
    const { title, description, states, subtitle, stats, ctaLink, ctaTitle,  image } = data;
  return (
    <section className=" md:py-20 py-[30px] overflow-hidden ">
        <div className="container">
            <div className="grid grid-cols-12 w-full items-center">
                <div className=" md:col-span-6 col-span-12 md:pr-20">
                    <div className="flex flex-col gap-2">
                    {title && (
                        <H3>{title}</H3>
                    )}
                    {description && (
                        <BodyText2 className="text-grey-400 mt-2">{description}</BodyText2>
                    )}
                    {states && (
                        <ul className="flex flex-col gap-2 mt-5">
                            {states.map((state) => (
                                <li key={state.id} className="flex items-center gap-2">
                                    <i className="w-[18px] h-[18px] rounded-full bg-orange-100 border-[4px] border-[#F9C095]"></i> 
                                    {state.title}
                                </li>
                            ))}
                        </ul>
                    )}
                    {subtitle && (
                        <BodyText3 className="text-blue-100 mt-11">{subtitle}</BodyText3>
                    )}
                    {stats && (
                        <ul className="grid grid-cols-2 gap-2 mt-3 max-w-[620px]">
                            {stats.map((stat) => (
                                <li key={stat.id} className="flex flex-col gap-2 bg-grey-100 p-5 rounded-2xl"> 
                                    <H2 className="text-orange-100 !text-[40px] md:!text-[60px]">{stat.value}</H2>
                                    <BodyText3 className="text-[#4C5861]">{stat.label}</BodyText3>
                                </li>
                            ))}
                        </ul>
                    )}
                    {ctaTitle && (
                        <Button title={ctaTitle} className="mt-7" secondary href={ctaLink} />
                    )}
                </div>
                </div>
                <div className=" md:col-span-6 col-span-12 mt-20 md:mt-0">
                    {image && (
                        <Image 
                            src={image.url} 
                            alt={image.alternativeText} 
                            width={685} 
                            height={779}
                        />
                    )}
                </div>
                
            </div>
        </div>
    </section>
  );
};

export default EmpoweringFarmers;