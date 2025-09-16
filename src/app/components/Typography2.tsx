import React from "react";
import clsxN from "../../../utils/clsxN";

type TypographyProps = {
  className?: string;
  children: React.ReactNode;
};

export const H1 = ({ className, children }: TypographyProps) => (
  <h1
    className={clsxN(
      "font-normal text-[36px] md:text-[54px] leading-[120%] text-blue-200",
      className
    )}
  >
    {children}
  </h1>
);

export const H2 = ({ className, children }: TypographyProps) => (
  <h2
    className={clsxN(
      "font-normal text-[28px] md:text-[44px] leading-[124%] text-blue-200",
      className
    )}
  >
    {children}
  </h2>
);

export const H3 = ({ className, children }: TypographyProps) => (
  <h3
    className={clsxN(
      "font-normal text-[24px] md:text-[36px] leading-[124%] md:leading-[140%] text-blue-200",
      className
    )}
  >
    {children}
  </h3>
);

// export const H4 = ({ className, children }: TypographyProps) => (
//   <h4 className={clsxN("text-[24px] md:text-[42px] font-medium leading-[140%]", className)}>
//     {children}
//   </h4>
// );

// export const H5 = ({ className, children }: TypographyProps) => (
//   <h4 className={clsxN("text-[24px] md:text-[36px] font-semibold leading-[140%]", className)}>
//     {children}
//   </h4>
// );

export const SubH1 = ({ className, children }: TypographyProps) => (
  <h5
    className={clsxN(
      "font-normal text-[20px] md:text-[30px] leading-[140%] text-blue-200",
      className
    )}
  >
    {children}
  </h5>
);

export const SubH2 = ({ className, children }: TypographyProps) => (
  <h6
    className={clsxN(
      " font-normal text-[18px] md:text-[24px] leading-[140%] text-blue-200",
      className
    )}
  >
    {children}
  </h6>
);
// export const SubH3 = ({ className, children }: TypographyProps) => (
//   <p className={clsxN("font-normal  text-[18px] md:text-[20px] leading-[140%] text-blue-200", className)}>
//     {children}
//   </p>
// );

// export const SubH4 = ({ className, children }: TypographyProps) => (
//   <p className={clsxN("text-[16px] md:text-[18px] font-semibold leading-[140%] lg:leading-[150%] ", className)}>
//     {children}
//   </p>
// );
// export const SubH5 = ({ className, children }: TypographyProps) => (
//   <p className={clsxN("text-[14px] md:text-[16px] font-medium leading-[170%] lg:leading-[160%]", className)}>
//     {children}
//   </p>
// );

export const BodyText1 = ({ className, children }: TypographyProps) => (
  <p
    className={clsxN(
      "font-normal text-[14px] md:text-[18px] leading-[154%] lg:leading-[160%] text-grey-400",
      className
    )}
  >
    {children}
  </p>
);

export const BodyText2 = ({ className, children }: TypographyProps) => (
  <p
    className={clsxN(
      "font-normal text-[14px] md:text-[16px] leading-[154%] text-grey-400",
      className
    )}
  >
    {children}
  </p>
);
export const BodyText3 = ({ className, children }: TypographyProps) => (
  <p
    className={clsxN(
      "font-normal text-[12px] md:text-[14px] leading-[140%] text-grey-400",
      className
    )}
  >
    {children}
  </p>
);

// export const Tag = ({ className, children }: TypographyProps) => (
//   <p
//     className={clsxN(
//       "text-[14px] tracking-widest uppercase text-white",
//       className
//     )}
//   >
//     {children}
//   </p>
// );
