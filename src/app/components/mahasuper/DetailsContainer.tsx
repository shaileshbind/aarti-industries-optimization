"use client";
import React, { useEffect, useRef } from "react";
import { H3 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import { EthicsAndCodeProps } from "../../types/ethics.type";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EthicsAndCode: React.FC<EthicsAndCodeProps> = ({ data }) => {
    const { description } = data;
    const topLineRef = useRef(null);
    const wrapperRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                topLineRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                {
                    scaleY: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top 85%",
                        end: "bottom 65%",
                        scrub: true,
                    },
                }
            );
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className=" max-w-[1030px] mx-auto pb-[20px] md:pb-[70px] px-[15px]">
            <div
                ref={topLineRef}
                className="mx-auto h-[64px] md:h-[120px] w-[1px] mb-20 lg:mb-0 border-l border-orange-100 mt-[50px]"
            >

            </div>
            <div className="flex w-full py-[70px]">


                {description && (
                    <AnimatedText>
                        <H3 className="max-w-[unset] lg:max-w-[1000px] text-center mx-[unset] lg:mx-auto">
                            {description}
                        </H3>
                    </AnimatedText>
                )}
            </div>
        </div>
    );
};

export default EthicsAndCode;
