import React from "react";
import clsxN from "../../../utils/clsxN";
import Accordion from "@mui/material/Accordion";
import { SxProps, Theme } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Image from "next/image";
import clsx from "clsx";

type FaqProps = {
  faqTitle: React.ReactNode;
  faqContent: React.ReactNode;
  expanded: boolean;
  handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  showIcon?: boolean;
  className?: string;
  classNameTitle?: string;
  plusMinusVariant?: boolean;
  sx?: SxProps<Theme>;
  iconProp?: React.ReactNode;
  imageClassName?: string;
};

const FaqAccordion = ({
  faqTitle,
  faqContent,
  expanded,
  handleChange,
  showIcon = false,
  className,
  iconProp,
  classNameTitle,
  imageClassName,
  sx,
}: FaqProps) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      className={clsxN("!shadow-none", className)}
      sx={sx}
    >
      <AccordionSummary
        expandIcon={
          showIcon ? (
            iconProp ? (
              iconProp
            ) : (
              <Image
                src="/images/accordian-down.svg"
                alt="img"
                width={28}
                height={28}
                className={clsx("flex-shrink-0", imageClassName)}
              />
            )
          ) : null
        }
        aria-controls="faq-content"
        id="faq-header"
        className={clsxN("!p-[0px]", classNameTitle)}
      >
        {faqTitle}
      </AccordionSummary>
      <AccordionDetails className="!p-[0px]">{faqContent}</AccordionDetails>
    </Accordion>
  );
};

export default FaqAccordion;
