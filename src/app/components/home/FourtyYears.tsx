import React from "react";
import Image from "next/image";
import { BodyText1, H2 } from "../Typography2";

const FourtyYears = () => {
    return (
        <div className="container mx-auto">
            <Image
                src="/images/home/line.svg"
                alt="line"
                width={1}
                height={120}
                className="mx-auto h-[64px] md:h-[120px]"
            />
            <div className="max-w-[unset] lg:max-w-[780px] mx-auto text-center">
                <H2 className="mt-[14px] md:mt-[20px] text-orange-100">40 Years of Trusted</H2>
                <H2 className="text-blue-100">Speciality Chemical Excellence</H2>
                <BodyText1 className="mt-[16px] md:mt-[20px] text-grey-400">
                    From our labs to your applications, we bring together 40 years of
                    speciality chemical expertise, with a sustainable, people-first
                    approach. Combining process chemistry expertise with scale-up
                    engineering, we deliver advanced intermediates for a wide range of
                    applications, including agrochemicals, pharmaceuticals, polymers,
                    dyes, and more.
                </BodyText1>
            </div>
            <div className="relative mt-[30px] md:mt-[36px] w-[37px] mx-auto grid justify-items-center">
                <Image src="/images/home/star.svg" alt="line" width={37} height={37} />
                <Image
                    src="/images/home/star-line.svg"
                    alt="line"
                    width={1}
                    height={144}
                    className="mt-[-10px] h-[88px] md:h-[144px]"
                />
            </div>
        </div>
    );
};

export default FourtyYears;
