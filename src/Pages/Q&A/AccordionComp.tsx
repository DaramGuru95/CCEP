import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

export const AccordionComp = (props: any) => {
  const [expandedAccordion, setExpandedAccordion] = useState<any>(null);

  const { answer, question, key } = props;
  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: any) => {
      setExpandedAccordion(isExpanded ? panel : null);
    };
  return (
    <Accordion
      className="mt-2"
      key={key}
      expanded={expandedAccordion === `panel${key}`}
      onChange={handleChangeAccordion(`panel${key}`)}
      sx={{
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <AccordionSummary
        sx={{
          background: "#d6eef6",
        }}
        expandIcon={expandedAccordion ? <RemoveIcon /> : <AddIcon />}
        aria-controls={`panel${key}-content`}
        id={`panel${key}-header`}
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: "#334b52" }}>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
