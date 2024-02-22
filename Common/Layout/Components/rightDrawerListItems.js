import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import TransferChat from "../../DialogContent/TransferChat";
import ForwardToExpert from "../../DialogContent/ForwardToExprt";
import RiseTicket from "../../DialogContent/RiseTicket";
import transferChatAction from "../../../Config/Store/Slices/actions/agent_console_action/transferChat_action";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import ForwardExpertIcon from ".././../../assets/icons/expertIcon2.svg";
import CreateNewTicket from "../../../Pages/Tickets/Components/CreateNewTicket";
import { createTicketAction } from "../../../Config/Store/Slices/actions/ticket_actions/ticket_actions";
import {
  handelModalClose,
  handleShowAttechmentOpen,
} from "../../../Config/Store/Slices/reducers/modal_reducers";

export const rightNavItems = [
  {
    id: 0,
    text: "Transfer Chat",
    icon: <ForwardToInboxRoundedIcon />,
    dialogContent: <TransferChat />,
    submitButtonText: "Submit",
    submitButtonFunction: (dispatch) => {
      dispatch(transferChatAction("TRANSFER_CHAT"));
    },
  },
  {
    id: 1,
    text: "Forward to Expert",
    icon: <img src={ForwardExpertIcon} alt="" width={30} />,
    dialogContent: <ForwardToExpert />,
    submitButtonText: "Submit",
    submitButtonFunction: (dispatch) => {
      dispatch(transferChatAction("TRANSFER_TO_EXPERT"));
    },
  },
  {
    id: 2,
    text: "Raise a Ticket",
    icon: <ConfirmationNumberOutlinedIcon />,
    dialogContent: <CreateNewTicket />,
    // dialogContent: <RiseTicket />,
    submitButtonText: "Submit",
    submitButtonFunction: (dispatch) => {
      dispatch(createTicketAction());
      dispatch(handelModalClose());
    },
    extraButtonFunction: (dispatch) => {
      console.log("extraButton add clicked");
      dispatch(handleShowAttechmentOpen());
    },
  },
];
