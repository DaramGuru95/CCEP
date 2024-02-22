// import React from "react";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import { Box, Chip, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

type Props = {
  time: string;
  date: string;
  description: string;
  ticketTitle: string;
  priority: string;
  status: string;
  group: string;
  agent: string;
  created: string;
  fistResponse: string;
  ticketStatus: string;
};

const CustomTimeLine = (props: Props) => {
  return (
    <Timeline
      position="right"
      sx={{
        ".MuiTimelineConnector-root": {
          backgroundColor: "#0096C54D",
        },
        ".MuiTimelineDot-root": {
          backgroundColor: "#fff",
          boxShadow: "none",
          color: "#000",
          padding: 0,
          margin: 0,
        },
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator sx={{ paddingLeft: 1.5 }}>
          <TimelineDot>
            <Chip
              label={props.date}
              size="small"
              sx={{
                position: "absolute",
                left: props.date === "Today" ? "1.5%" : "5%",
                transform: "translate(-50%, -50%)",
                zIndex: 5,
                backgroundColor: "#f0f2f2",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            />
            {/* <Typography>{props.ticketTitle}</Typography> */}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator sx={{ paddingLeft: -3 }}>
          <TimelineDot>
            <LanguageIcon sx={{ color: "#7F8E92", fontWeight: 0 }} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box>
            <Typography sx={{ fontSize: "0.8rem" }} variant="subtitle1">
              {props.time}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
            >
              {props.ticketTitle}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography sx={{ fontSize: "0.8rem" }} variant="subtitle1">
                {`Priority:${props.priority}`}&#x2022;
              </Typography>
              <Typography sx={{ fontSize: "0.8rem" }} variant="subtitle1">
                {`Status:${props.status}`}&#x2022;
              </Typography>
              <Typography sx={{ fontSize: "0.8rem" }} variant="subtitle1">
                {`Group:${props.group}`}&#x2022;
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem" }}
                variant="subtitle1"
              >{`Agent: ${props.agent}`}</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontSize: "0.8rem" }} variant="subtitle1">
                {`Created: ${props.created}`}
              </Typography>

              <Typography sx={{ fontSize: "0.8rem" }} variant="subtitle1">
                &#x2022; {`First Response: ${props.fistResponse}`}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "#00875F",
                fontWeight: 600,
                background: "#EBF9EF",
                width: "3rem",
                textAlign: "center",
                borderRadius: 3,
              }}
              variant="subtitle1"
            >
              {`${props.ticketStatus}`}
            </Typography>
          </Box>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default CustomTimeLine;

export const timeLineObj = [
  {
    time: "4:50 PM",
    date: "Today",
    ticketTitle:
      "New Ticket: Wallet Related | Loaded my wallet through Payment Gateway: Money not yet credited into wallet | #13276",
    description:
      "Priority: Medium • Status: Open • Group: Customer Support • Agent: John Smith",
    priority: "Medium",
    status: "Open",
    group: "Customer Support",
    agent: "John Smith",
    created: "41 minutes ago",
    fistResponse: "18 Hours",
    ticketStatus: "New",
  },
  {
    time: "9.24 AM",
    date: "Sun,4th Dec,2023",
    ticketTitle:
      "New Ticket: Wallet Related | Loaded my wallet through Payment Gateway: Money not yet credited into wallet | #13276",
    description:
      "Priority: Medium • Status: Open • Group: Customer Support • Agent: John Smith",
    priority: "Medium",
    status: "Open",
    group: "Customer Support",
    agent: "John Smith",
    created: "41 minutes ago",
    fistResponse: "18 Hours",
    ticketStatus: "New",
  },
  {
    id: "3",
    time: "9.24 AM",
    date: "Sun,4th Dec,2023",
    ticketTitle:
      "New Ticket: Wallet Related | Loaded my wallet through Payment Gateway: Money not yet credited into wallet | #13276",
    description:
      "Priority: Medium • Status: Open • Group: Customer Support • Agent: John Smith",
    priority: "Medium",
    status: "Open",
    group: "Customer Support",
    agent: "John Smith",
    created: "41 minutes ago",
    fistResponse: "18 Hours",
    ticketStatus: "New",
  },
];
