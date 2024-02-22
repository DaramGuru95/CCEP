// import React from "react";
import { Button, Divider, Box } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../Config/Store";
import {
  createTicketAction,
  deleteTicketAction,
} from "../../../../Config/Store/Slices/actions/ticket_actions/ticket_actions";
import CustomizedDialogs from "../../../DialogModal";
import { useCallback, useState } from "react";
import CraeateNewTicket from "../../../../Pages/Tickets/Components/CreateNewTicket";
import { useSelector } from "react-redux";
import {
  handelModalClose,
  handelModalOpen,
} from "../../../../Config/Store/Slices/reducers/modal_reducers";
import { showAlert } from "../../../../Config/Store/Slices/reducers/alerts";
// import { deleteLocalStorage } from "../../../../Helpers/commonHelper";
// import { TicketState } from "../../../../Config/Store/Slices/reducers/ticket_reducers/createTicket_reducer";
// import { TicketState } from "../../../../Config/Store/Slices/reducers/ticket_reducers/createTicket_reducer";

type Props = {};

const buttonStyleProps = {
  backgroundColor: "#fff",
  border: 1,
  borderColor: "divider",
  color: "#000",
  "&:hover": {
    backgroundColor: "#fff ",
    cursor: "pointer",
  },
};

const TicketsHeaderActions = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { rowSelectionModel } = useSelector(
    (state: RootState) => state.tickets
  );
  const { status: ticketStatus, statusMessage: ticketStatusMessage } =
    useSelector((state: RootState) => state.tickets);

  // const ticketPost = useMemo(() => postTicketDetails, [postTicketDetails]);

  // const [open, setOpen] = useState(false);
  const { open } = useSelector((state: RootState) => state.modalState);
  const [dialogContent, setDialogContent] = useState({});

  const handleClose = () => {
    dispatch(handelModalClose());
  };

  const handleClickOpen = (item: any) => {
    setDialogContent(item);
    dispatch(handelModalOpen());
  };

  const submit = () => {
    dispatch(createTicketAction());
    console.log("ticketStatus", ticketStatus);
    if (ticketStatus == "success") {
      dispatch(
        showAlert({
          message: "Your Ticket has been created",
          status: "success",
        })
      );
    } else {
      dispatch(
        showAlert({
          message: "Your Ticket has been not created please try again",
          status: "error",
        })
      );
    }
    dispatch(handelModalClose());
  };

  const customToolsHeader = useCallback(
    () => (
      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        dialogContent={dialogContent}
        isAttachment={true}
        attachmentClickFunction={() => console.log("Attachmant Clicked")}
      />
    ),
    [dialogContent, handleClose, open]
  );

  // console.log("ticket details", ticketPost);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-around"}
      width={"15rem"}
      alignItems={"center"}
    >
      <Box
        sx={buttonStyleProps}
        paddingX={1.1}
        onClick={() => console.log("Clicked")}
      >
        <SearchOutlinedIcon sx={{ width: 16, height: 16 }} />
      </Box>
      <Box
        sx={buttonStyleProps}
        paddingX={1.1}
        onClick={() => {
          dispatch(deleteTicketAction(rowSelectionModel));
        }}
      >
        <FilterListOutlinedIcon sx={{ width: 16, height: 16 }} />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box>
        <Button
          size="small"
          sx={{
            ...buttonStyleProps,
            paddingX: 1.1,
            fontSize: 11.5,
            textTransform: "none",
          }}
          onClick={(e) => {
            const modalOobject = {
              id: 0,
              text: "Create New Ticket",
              dialogContent: <CraeateNewTicket />,
              submitButtonText: "Submit",
              buttonIcon: null,
              submitButtonFunction: submit,
            };
            handleClickOpen(modalOobject);
          }}
        >
          {"Create New Ticket"}
        </Button>
      </Box>
      {customToolsHeader()}
    </Box>
  );
};

export default TicketsHeaderActions;
