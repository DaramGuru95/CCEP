import React, { useEffect, useState } from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomizedDialogs from "../../DialogModal";
import { useLocation } from "react-router-dom";
import { getLocalStorage } from "../../../Helpers/commonHelper";
import { rightNavItems } from "./rightDrawerListItems";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Config/Store";
import { useDispatch } from "react-redux";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import {
  handelModalClose,
  handelModalOpen,
  handleShowAttechmentClose,
  handleShowAttechmentOpen,
} from "../../../Config/Store/Slices/reducers/modal_reducers";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import AddAttechment from "../../DialogContent/AddAttechment";
import CreateNewTicket from "../../../Pages/Tickets/Components/CreateNewTicket";
import { createTicketAction } from "../../../Config/Store/Slices/actions/ticket_actions/ticket_actions";

type Props = {
  conv_session_id?: string;
  activeSessionList?: any;
  selected_customer?: any;
  rightDrawerClick?: any;
};

const RightDrawer = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { open, showAttechmentPopUp } = useSelector(
    (state: RootState) => state.modalState
  );
  const [dialogContent, setDialogContent] = useState<any>({});
  const createTicketPopup = {
    id: 2,
    text: "Raise a Ticket",
    icon: <ConfirmationNumberOutlinedIcon />,
    dialogContent: <CreateNewTicket />,
    submitButtonText: "Submit",
    submitButtonFunction: () => {
      dispatch(createTicketAction());
      dispatch(handelModalClose());
    },
    extraButtonFunction: () => {
      console.log("extraButton add clicked");
      dispatch(handleShowAttechmentOpen());
    },
  };

  const addAttechment = {
    id: 1,
    text: "Add Attechment",
    icon: <ForwardToInboxRoundedIcon />,
    dialogContent: <AddAttechment />,
    submitButtonText: "Submit",
    submitButtonFunction: () => {
      console.log("Clicked");
      dispatch(handleShowAttechmentClose());
      setDialogContent(createTicketPopup);
    },
    extraButtonFunction: () => {
      console.log("extraButton add clicked");
    },
  };

  useEffect(() => {
    if (showAttechmentPopUp) {
      setDialogContent(addAttechment);
    }
  }, [showAttechmentPopUp]);

  const handleClickOpen = (e: any, item: any) => {
    setDialogContent(item);
    dispatch(handelModalOpen());
  };

  const handleClose = () => {
    dispatch(handelModalClose());
  };

  const { state } = useLocation();
  const getStoreType = getLocalStorage("agent_page");

  return (
    <Box
      component={Paper}
      width={"80px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ position: "relative", right: -8 }}
    >
      {rightNavItems.map((item) => (
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          padding={0.8}
          key={item.id}
          sx={{
            cursor:
              // (!state && !getStoreType) || !props.activeSessionList.length
              !props.rightDrawerClick ? "not-allowed" : "pointer",
            opacity:
              // (!state && !getStoreType) || !props.activeSessionList.length
              !props.rightDrawerClick ? 0.5 : 1,
            "&:hover": {
              opacity:
                // !state && !getStoreType
                props.rightDrawerClick ? 0.5 : 1,
            },
          }}
          // sx={{ cursor: "pointer" }}
        >
          <IconButton
            onClick={(e) => handleClickOpen(e, item)}
            disabled={
              // (!state && !getStoreType) || !props.activeSessionList.length
              !props.rightDrawerClick ? true : false
            }
            sx={{
              cursor:
                // (!state && !getStoreType) || !props.activeSessionList.length
                !props.rightDrawerClick ? "not-allowed" : "pointer",
              opacity:
                // (!state && !getStoreType) || !props.activeSessionList.length
                !props.rightDrawerClick ? 0.5 : 1,
              "&:hover": {
                opacity:
                  // (!state && !getStoreType) || !props.activeSessionList
                  !props.rightDrawerClick ? 0.5 : 1,
              },
              color: "#49454f",
            }}
          >
            {item.icon}
          </IconButton>
          <Typography
            onClick={(e) => {
              handleClickOpen(e, item);
            }}
            variant="caption"
            sx={{ textAlign: "center", fontSize: 12, fontWeight: 600 }}
          >
            {item.text}
          </Typography>
        </Box>
      ))}

      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        dialogContent={dialogContent}
        isAttachment={false}
        attachmentClickFunction={() => console.log("Attachmant Clicked")}
      />
    </Box>
  );
};

export default RightDrawer;
