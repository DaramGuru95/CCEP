// import React from "react";
import { Button, Divider, Box, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../Config/Store";
import {
  createTicketAction,
  deleteTicketAction,
} from "../../../../Config/Store/Slices/actions/ticket_actions/ticket_actions";
// import CustomizedDialogs from "../../../DialogModal";
import { useCallback, useState } from "react";
import CraeateNewTicket from "../../../../Pages/Tickets/Components/CreateNewTicket";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import { Navigate } from "react-router-dom";
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

const TicketIdHeader = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { rowSelectionModel } = useSelector(
    (state: RootState) => state.tickets
  );

  // const ticketPost = useMemo(() => postTicketDetails, [postTicketDetails]);

  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (item: any) => {
    setDialogContent(item);
    setOpen(true);
  };

  const submit = () => {
    dispatch(createTicketAction());
  };

  // const customToolsHeader = useCallback(
  //   () => (
  //     <CustomizedDialogs
  //       open={open}
  //       handleClose={handleClose}
  //       dialogContent={dialogContent}
  //     />
  //   ),
  //   [dialogContent, open]
  // );

  const navigate = useNavigate();

  // console.log("ticket details", ticketPost);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-around"}
      width={"28rem"}
      alignItems={"center"}
    >
      <Box
        sx={{ display: "flex", gap: 1 }}
        paddingX={1.1}
        onClick={() => console.log("Clicked")}
      >
        <Button
          startIcon={<WestIcon />}
          onClick={() => navigate(-1)}
          sx={{
            background: "#fff",
            color: "#000",
            border: 1,
            borderColor: "#001E2733",
            height: "1.7rem",
            width: "6rem",
            borderRadius: 1,
            textTransform: "none",
          }}
          size="small"
        >
          {"Go Back"}
        </Button>
      </Box>
      <Divider
        orientation="vertical"
        sx={{ height: "7vh", borderRightWidth: 2 }}
        flexItem
      />

      <Box
        sx={buttonStyleProps}
        paddingX={1.1}
        onClick={() => {
          dispatch(deleteTicketAction(rowSelectionModel));
        }}
      >
        <Button
          sx={{
            height: "1.5rem",
            width: "12rem",
            fontSize: "0.8rem",
            color: "#000",
            borderRadius: 2,
          }}
        >
          {"View Conversation History "}
        </Button>
      </Box>
      <Box>
        <Button
          size="small"
          sx={{
            ...buttonStyleProps,
            paddingX: 1.1,
            fontSize: 10,
            background: "#0096C5",
            color: "#fff",
            borderRadius: 1,
          }}
          onClick={(e) => {
            const modalOobject = {
              id: 0,
              text: "Submit",
              // dialogContent: <CraeateNewTicket />,
              submitButtonText: "Submit",
              buttonIcon: null,
              submitButtonFunction: submit,
              
            };
            // handleClickOpen(modalOobject);
            console.log("Button Submit");
          }}
        >
          {"Submit"}
        </Button>
      </Box>
      {/* {customToolsHeader()} */}
    </Box>
  );
};

export default TicketIdHeader;
