// import TicketUserAvatar from "../../../../assets/images/TicketUserAvatar.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

export const detailedCategoryOptions = [
  {
    id: 0,
    value: "All",
  },
  {
    id: 1,
    value: "Open",
  },
  {
    id: 3,
    value: "Pending",
  },
  {
    id: 2,
    value: "Closed",
  },
  {
    id: 4,
    value: "Resolved",
  },
];

export const commentObject = [
  {
    profileIcon: "",
    authorName: "Lalitha Thakur",
    timeStamp: "2023-12-12T02:00:00.000Z",
    description:
      "Transactions can be seen for the customer with the help of transaction ID using the link https.//tickethistory.13254.in",
  },
  {
    profileIcon: "",
    authorName: "Lalitha Thakur",
    timeStamp: "2023-11-12T02:00:00.000Z",
    description:
      "Transactions can be seen for the customer with the help of transaction ID using the link https.//tickethistory.13254.in",
  },
  {
    profileIcon: "",
    authorName: "Mohit Kumar",
    timeStamp: "2023-12-12T02:00:00.000Z",
    description:
      "Transactions can be seen for the customer with the help of transaction ID using the link https.//tickethistory.13254.in",
  },
  {
    profileIcon: "",
    authorName: "Lalitha Thakur",
    timeStamp: "2023-12-12T02:00:00.000Z",
    description:
      "Transactions can be seen for the customer with the help of transaction ID using the link https.//tickethistory.13254.in",
  },
];

export const ticketsSideNavItems = [
  {
    id: 0,
    label: "Info",
    icon: <InfoOutlinedIcon />,
    ref:'infoRef'
  },
  {
    id: 1,
    label: "Timeline",
    icon: <ComputerRoundedIcon />,
  },
  {
    id: 2,
    label: "Parent Child",
    icon: <AccountTreeOutlinedIcon sx={{ transform: "rotate(90deg)" }} />,
  },
  {
    id: 3,
    label: "Recent Session",
    icon: <EventOutlinedIcon />,
  },
  {
    id: 4,
    label: "Jira",
    icon: <KeyboardDoubleArrowUpIcon sx={{ transform: "rotate(45deg)" }} />,
    ref:'jiraRef'
  },
];
