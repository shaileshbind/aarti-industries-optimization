import React from "react";
import { BodyText2, H2, H3 } from "../Typography2";

const QuarterlyHigh = () => {
  return (
    <div className="mb-[72px] lg:mb-[100px]">
      <div className="grid xl:grid-cols-[400px_1fr] gap-y-[36px] gap-x-[100px] fluid-container">
        <div>
          <H3 className="text-blue-100">Quarterly Highlights</H3>
          <BodyText2 className="mt-[12px] lg:mt-[16px]">
            We believe long-term value is built on strong relationships. By
            engaging closely with our stakeholders, we align business growth
            with their needs, strengthen trust, and identify areas for
            continuous improvement, ensuring sustainable, future-ready
            performance.
          </BodyText2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-[30px]"> 
          {[0, 1, 2,3]?.map((index) => {
            return (
              <div
                key={index}
                className="pb-[40px] lg:flex gap-x-[50px] justify-between border-b border-grey-200 items-center"
              >
                <BodyText2>Revenue</BodyText2>
                <H2 className="text-orange-200">₹2,250 Cr</H2>
                <BodyText2>
                  Lorem ipsum dolor sit amet consectetur. Mus vitae iaculis.
                </BodyText2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuarterlyHigh;
