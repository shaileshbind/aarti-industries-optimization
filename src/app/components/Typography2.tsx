import React from "react";
import clsxN from "../../../utils/clsxN";
import { useTitleCase } from "../../../utils/toTitleCase";

type TypographyProps = {
  className?: string;
  children: React.ReactNode;
};

export const H1 = ({ className, children }: TypographyProps) => {
  return (
    <h1
      className={clsxN(
        "font-normal text-[36px] md:text-[44px] xl:text-[54px] leading-[120%] text-blue-200 font-alte-hans",
        className,
      )}
    >
      {useTitleCase(children as string)}
    </h1>
  );
};

export const H2 = ({ className, children }: TypographyProps) => (
  <h2
    className={clsxN(
      "font-normal text-[28px] md:text-[36px] xl:text-[44px] leading-[124%] text-blue-200 font-alte-hans",
      className,
    )}
  >
    {children}
  </h2>
);

export const H3 = ({ className, children }: TypographyProps) => (
  <h3
    className={clsxN(
      "font-normal text-[24px] md:text-[30px] xl:text-[36px] leading-[124%] md:leading-[140%] text-blue-200 font-alte-hans",
      className,
    )}
  >
    {children}
  </h3>
);

export const SubH1 = ({ className, children }: TypographyProps) => (
  <h5
    className={clsxN(
      "font-normal text-[20px] md:text-[24px] xl:text-[30px] leading-[140%] text-blue-200 font-alte-hans",
      className,
    )}
  >
    {children}
  </h5>
);

export const SubH2 = ({ className, children }: TypographyProps) => (
  <h6
    className={clsxN(
      " font-normal text-[18px] md:text-[22px] xl:text-[24px] leading-[140%] text-blue-200 font-alte-hans",
      className,
    )}
  >
    {children}
  </h6>
);

export const SubH3 = ({ className, children }: TypographyProps) => (
  <p
    className={clsxN(
      "font-normal text-[16px] xl:text-[18px] lg:text-[20px] leading-[140%] text-blue-200 font-alte-hans",
      className,
    )}
  >
    {children}
  </p>
);

export const BodyText1 = ({ className, children }: TypographyProps) => (
  <p
    className={clsxN(
      "font-normal text-[14px] md:text-[16px] xl:text-[18px] leading-[154%] lg:leading-[160%] text-grey-400 font-roboto",
      className,
    )}
  >
    {children}
  </p>
);

export const BodyText2 = ({ className, children }: TypographyProps) => (
  <p
    className={clsxN(
      "font-normal text-[14px] md:text-[16px] leading-[154%] text-grey-400 font-roboto",
      className,
    )}
  >
    {children}
  </p>
);
export const BodyText3 = ({ className, children }: TypographyProps) => (
  <p
    className={clsxN(
      "font-normal text-[12px] md:text-[14px] leading-[140%] text-grey-400 font-roboto",
      className,
    )}
  >
    {children}
  </p>
);

export const Cta = ({ className, children }: TypographyProps) => (
  <p
    className={clsxN(
      "text-[16px] font-normal font-alte-hans leading-[120%] bg-white",
      className,
    )}
  >
    {children}
  </p>
);
