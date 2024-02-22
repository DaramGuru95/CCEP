import HomeIcon from "@mui/icons-material/Home";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import AgentHeaderActions from "../../Header/HeaderActions/AgentHeaderAction";
import TicketsHeaderActions from "../../Header/HeaderActions/TicketHeaderActions";
import QandAHeaderActions from "../../Header/HeaderActions/QandAHeaderActions";
import ViewLogsHeaderActions from "../../Header/LogsHeaderActions";
import DetailedTicketForm from "../../../Pages/Tickets/Components/DetailedTicketPage/DetailedTicketForm";
import TicketIdHeader from "../../Header/HeaderActions/TicketHeaderActions/TicketIdHeader";

export const drawerObjects = [
  {
    icon: <HomeIcon />,
    text: "Home",
    to: "/home",
    absolutePath: "/home",
    headerActions: null,
  },
  {
    icon: <ForwardToInboxOutlinedIcon />,
    text: "Agent Console",
    to: "agent-console",
    absolutePath: "/agent-console",
    headerActions: <AgentHeaderActions />,
  },
  {
    icon: <ConfirmationNumberOutlinedIcon />,
    text: "Tickets",
    to: "tickets",
    absolutePath: "/tickets",
    headerActions: <TicketsHeaderActions />,
    TicketIdHeader: <TicketIdHeader />,
    handle: () => <DetailedTicketForm />,
  },
  {
    icon: <TrendingUpOutlinedIcon />,
    text: "Dashboard",
    to: "dashboard",
    absolutePath: "/dashboard",
    headerActions: null,
  },
  {
    icon: <ConfirmationNumberOutlinedIcon />,
    text: "Q&A",
    to: "QandA",
    absolutePath: "/QandA",
    headerActions: <QandAHeaderActions />,
  },
  {
    icon: <Inventory2OutlinedIcon />,
    text: "Archive",
    to: "archive",
    absolutePath: "/archive",
    headerActions: null,
  },
  {
    icon: <SettingsOutlinedIcon />,
    text: "Settings",
    to: "settings",
    absolutePath: "/settings",
    headerActions: null,
  },
  {
    icon: <ListRoundedIcon />,
    text: "View Logs",
    to: "logs",
    absolutePath: "/logs",
    headerActions: <ViewLogsHeaderActions />,
  },
  {
    to: "tickets",
    absolutePath: "/tickets/:id",
    headerActions: <TicketIdHeader />,
    handle: () => <DetailedTicketForm />,
  },
];
