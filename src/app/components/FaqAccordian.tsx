import React from "react";
import clsxN from "../../../utils/clsxN";
import Accordion from "@mui/material/Accordion";
import { SxProps, Theme } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

type FaqProps = {
  faqTitle: React.ReactNode;
  faqContent: React.ReactNode;
  expanded: boolean;
  handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  showIcon?: boolean;
  className?: string;
  plusMinusVariant?: boolean;
  sx?:SxProps<Theme>;
};

const FaqAccordion = ({
  faqTitle,
  faqContent,
  expanded,
  handleChange,
  showIcon = false,
  className,
  plusMinusVariant,
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
            plusMinusVariant ? (
              expanded ? <RemoveRoundedIcon htmlColor="#1152AD" /> : <AddRoundedIcon htmlColor="#1152AD" />
            ) : (
              <ExpandMoreIcon />
            )
          ) : null
        }
        aria-controls="faq-content"
        id="faq-header"
        className="!p-[0px]"
      >
        {faqTitle}
      </AccordionSummary>
      <AccordionDetails className="!p-[0px]">{faqContent}</AccordionDetails>
    </Accordion>
  );
};

export default FaqAccordion;
