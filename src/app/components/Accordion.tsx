import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

type MainAccordionProps = {
  key?: string;
  expanded: boolean;
  onChange: () => void;
  showIcon?: boolean;
  title?: React.ReactNode;
  children: React.ReactNode;
  borderBottom?: string;
  icon?: React.ReactNode;
};

export default function MainAccordion({
  key,
  expanded,
  onChange,
  showIcon = true,
  title,
  children,
  icon,
  borderBottom,
}: MainAccordionProps) {
  const isMobile = useMediaQuery("(max-width:820px)");

  const styles = {
    "&:before": {
      display: "none",
    },
    "&.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionSummary-root": {
      padding: isMobile ? "16px 0 " : "24px 0",
    },
    "& .MuiAccordionDetails-root": {
      paddingLeft: 0,
      paddingRight: 0,
    },
    boxShadow: "none",
    border: "none",
    borderBottom: borderBottom || "1px solid #D9D9D9",
    background: "transparent",
  };

  return (
    <div>
      <Accordion
        key={key}
        expanded={expanded}
        onChange={onChange}
        sx={styles}
        id="accordion"
      >
        <AccordionSummary
          expandIcon={
            showIcon && (
              <div className="text-2xl font-bold text-[#002F50]">
                {icon ? (
                  // Use custom icon if provided
                  icon
                ) : // Otherwise use default Add/Remove icons
                expanded ? (
                  <Remove className="text-[#DC4C03]" />
                ) : (
                  <Add className="text-[#DC4C03]" />
                )}
              </div>
            )
          }
        >
          {title}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingTop: 0,
          }}
          className="lg:w-[96%]"
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
